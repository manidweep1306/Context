const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const admin = require('firebase-admin');
const multer = require('multer');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const pdf = require('pdf-parse');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Firebase Setup
const serviceAccountPath = process.env.FIREBASE_CREDENTIALS || 'serviceAccountKey.json';
let db;

try {
  if (fs.existsSync(serviceAccountPath)) {
    const serviceAccount = require(path.resolve(serviceAccountPath));
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    db = admin.firestore();
    console.log(`✅ Successfully connected to Firebase Project: ${serviceAccount.project_id}`);
  } else {
    console.warn(`Warning: ${serviceAccountPath} not found. Firebase features will be disabled.`);
  }
} catch (error) {
  console.warn(`Warning: Invalid Firebase credentials/setup. Firebase features disabled. Error: ${error.message}`);
}

// Gemini Setup
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Multer Setup for File Uploads
const upload = multer({ storage: multer.memoryStorage() });

// Helper: Build System Prompt
const buildSystemPrompt = (location) => {
  return `You are a world-class educator in ${location}, India. Your goal is to rewrite the provided content so a local student understands it instantly. Replace urban/western tropes (subways, skyscrapers, snow) with 2026 local realities: agricultural drones, solar-powered borewells, RTC buses, local festivals, and specific regional landmarks (rivers, hills, projects). Maintain 100% scientific/academic accuracy. Use simplified English or Hinglish/Telugish if requested.`;
};

// Helper: Build User Prompt
const buildUserPrompt = (location, style, globalContent, extraInstructions) => {
  return `
STRICT JSON OUTPUT REQUIRED.
Do not include any markdown formatting like \`\`\`json.
Return ONLY a valid JSON object with detailed content.

Analyze the following educational content and rewrite it for a student in ${location}, India.
Style/Language: ${style}
Extra Instructions: ${extraInstructions}

Input Content:
"""
${globalContent}
"""

JSON Structure:
{
  "concept_name": "Title of the topic",
  "original_summary": "Brief summary of the original text (2-3 sentences)",
  "local_analogy": "A powerful local analogy explaining the core concept using ${location} context",
  "comparison_table": [
    {
      "aspect": "Aspect being compared",
      "global_context": "How it is usually explained (Western/Global)",
      "local_context": "How it works in ${location} (Local execution)"
    },
    ... (3-5 rows)
  ],
  "key_terms": [
    {
      "term": "Scientific Term",
      "definition": "Simple definition",
      "local_connect": "Relatable local example"
    },
    ... (3-4 terms)
  ],
  "quiz_question": {
    "question": "A conceptual question based on the local analogy",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct_answer": "Option X",
    "explanation": "Why this is correct"
  }
}
`;
};

// --- Endpoints ---

// Health Check
app.get('/health', async (req, res) => {
  if (db) {
    try {
      // Just check if we can list collections (lightweight check) or just return connected
      return res.json({ status: "ok", database: "connected", project_id: admin.app().options.credential.projectId });
    } catch (e) {
      return res.json({ status: "error", database: "connection_failed", error: e.message });
    }
  }
  return res.json({ status: "ok", database: "disconnected", detail: "Add serviceAccountKey.json to backend/" });
});

// Upload and Process File
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { language = "Simplified English", location = "India", extra_instructions = "" } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ detail: "No file uploaded" });
    }

    // 1. Extract Text
    let text = "";
    if (file.mimetype === 'application/pdf' || file.originalname.endsWith('.pdf')) {
      const pdfData = await pdf(file.buffer);
      text = pdfData.text;
    } else if (file.mimetype === 'text/plain' || file.originalname.endsWith('.txt')) {
      text = file.buffer.toString('utf-8');
    } else {
      return res.status(400).json({ detail: "Only PDF or TXT files supported" });
    }

    if (!text.trim()) {
      return res.status(400).json({ detail: "Could not extract text from file." });
    }

    // 2. Generate Explanation with Gemini
    const inputText = text.substring(0, 10000); // Limit context
    const systemPrompt = buildSystemPrompt(location);
    const userPrompt = buildUserPrompt(location, language, inputText, extra_instructions);
    const fullPrompt = `${systemPrompt}\n\n${userPrompt}`;

    let explanationText = "";
    try {
      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      explanationText = response.text();

      // Clean Markdown
      explanationText = explanationText.replace(/```json/g, "").replace(/```/g, "").trim();

      // Validate JSON
      try {
        JSON.parse(explanationText);
      } catch (e) {
        console.warn("Gemini did not return valid JSON, falling back to raw text");
      }
    } catch (e) {
      console.error("AI Generation failed:", e);
      return res.status(500).json({ detail: `AI Generation failed: ${e.message}` });
    }

    // 3. Store in Firestore
    let documentId = "mock_id";
    let explanationId = "mock_exp_id";

    if (db) {
      try {
        // Store Document
        const docRef = db.collection('documents').doc();
        await docRef.set({
          filename: file.originalname,
          text_content: text,
          created_at: admin.firestore.FieldValue.serverTimestamp()
        });
        documentId = docRef.id;

        // Store Explanation
        const expRef = db.collection('explanations').doc();
        await expRef.set({
          document_id: documentId,
          language: language,
          location: location,
          explanation: explanationText,
          created_at: admin.firestore.FieldValue.serverTimestamp()
        });
        explanationId = expRef.id;
        
        return res.json({
          document_id: documentId,
          explanation_id: explanationId,
          filename: file.originalname,
          language: language,
          explanation: explanationText
        });

      } catch (e) {
        console.error("Error saving to Firestore:", e);
      }
    }

    // Fallback if no DB or DB error
    return res.json({
      document_id: documentId,
      filename: file.originalname,
      language: language,
      explanation: explanationText
    });

  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ detail: error.message });
  }
});

// List Explanations
app.get('/explanations', async (req, res) => {
  if (!db) return res.json([]);
  
  try {
    const limit = parseInt(req.query.limit) || 10;
    const snapshot = await db.collection('explanations')
      .orderBy('created_at', 'desc')
      .limit(limit)
      .get();

    const results = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      const result = {
        id: doc.id,
        ...data
      };
      
      // Parse JSON for concept name, but don't error if it fails
      try {
        const parsed = JSON.parse(data.explanation || "{}");
        result.concept_name = parsed.concept_name || "Unknown Concept";
      } catch {
        result.concept_name = "Explanation";
      }

      // Remove heavy explanation text for list view
      delete result.explanation;
      results.push(result);
    });

    res.json(results);
  } catch (error) {
    res.status(500).json({ detail: error.message });
  }
});

// Get Single Explanation
app.get('/explanations/:id', async (req, res) => {
  if (!db) return res.status(500).json({ detail: "Database not configured" });

  try {
    const doc = await db.collection('explanations').doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ detail: "Explanation not found" });
    }
    
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ detail: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
