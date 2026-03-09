const { supabase } = require('../config/supabase');
// const pdfParse = require('pdf-parse'); // Removed to fix "Command token too long" error
const { generateExplanation } = require('../services/geminiService');

const uploadFile = async (req, res) => {
  try {
    const { language = "Simplified English", location = "India", extra_instructions = "" } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ detail: "No file uploaded" });
    }

    // 1. Extract Text
    let text = "";
    if (file.mimetype === 'application/pdf' || file.originalname.endsWith('.pdf')) {
      try {
          // Dynamic import for pdfjs-dist (legacy build for Node compatibility)
          const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
          
          // Convert Buffer to Uint8Array
          const uint8Array = new Uint8Array(file.buffer);
          
          // Load the document
          const loadingTask = pdfjsLib.getDocument(uint8Array);
          const pdfDocument = await loadingTask.promise;

          let fullText = "";
          for (let i = 1; i <= pdfDocument.numPages; i++) {
              const page = await pdfDocument.getPage(i);
              const textContent = await page.getTextContent();
              const pageText = textContent.items.map(item => item.str).join(' ');
              fullText += pageText + "\n\n";
          }
          text = fullText;

      } catch (pdfError) {
          console.error("PDF Parsing Error:", pdfError);
          // Return a user-friendly error
          return res.status(400).json({ 
              detail: `Failed to read PDF file. It might be corrupted or use an unsupported format. (Error: ${pdfError.message})` 
          });
      }
    } else if (file.mimetype === 'text/plain' || file.originalname.endsWith('.txt')) {
      text = file.buffer.toString('utf-8');
    } else {
      return res.status(400).json({ detail: "Only PDF or TXT files supported" });
    }

    if (!text.trim()) {
      return res.status(400).json({ detail: "Could not extract text from file." });
    }

    // 2. Generate Explanation with Gemini
    let explanationText = "";
    try {
      explanationText = await generateExplanation(location, language, text, extra_instructions);
    } catch (e) {
      console.error("AI Generation failed:", e);
      return res.status(500).json({ detail: `AI Generation failed: ${e.message}` });
    }

    // 3. Store in Supabase
    let documentId = "mock_id";
    let explanationId = "mock_exp_id";

    if (supabase) {
      try {
        // Store Document
        const { data: docData, error: docError } = await supabase
            .from('documents')
            .insert([
                { 
                    filename: file.originalname, 
                    text_content: text 
                }
            ])
            .select();
        
        if (docError) {
             // Handle missing table gracefully
             if (docError.code === 'PGRST116' || docError.message.includes('relation "public.documents" does not exist')) {
                 console.warn("Table 'documents' missing in Supabase. Returning generated result without saving.");
                 // Continue without throwing
             } else {
                 console.error("Supabase Document Insert Error:", docError);
                 throw docError;
             }
        }
        if (docData && docData[0]) documentId = docData[0].id;

        // Store Explanation
        if (documentId !== "mock_id") {
            const { data: expData, error: expError } = await supabase
                .from('explanations')
                .insert([
                    {
                        document_id: documentId,
                        language: language,
                        location: location,
                        explanation: explanationText
                    }
                ])
                .select();

            if (expError) {
                if (expError.code === 'PGRST116' || expError.message.includes('relation "public.explanations" does not exist')) {
                    console.warn("Table 'explanations' missing in Supabase. Returning generated result without saving.");
                } else {
                    console.error("Supabase Explanation Insert Error:", expError);
                    throw expError;
                }
            }
            if (expData && expData[0]) explanationId = expData[0].id;
        }
        
        return res.json({
          documentId: documentId,
          explanationId: explanationId,
          filename: file.originalname,
          language: language,
          explanation: explanationText
        });

      } catch (e) {
        console.error("Error saving to Supabase:", e);
      }
    }

    // Fallback or Supabase failure
    return res.json({
      documentId: documentId,
      filename: file.originalname,
      language: language,
      explanation: explanationText
    });

  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ detail: error.message });
  }
};

module.exports = { uploadFile };
