const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
// Use gemini-1.5-flash-latest or fallback to gemini-pro if flash has issues
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); 

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
  "concept_name": "Title of the topic (e.g., Velocity, Quantum State)",
  "short_description": "Brief summary of the concept (1-2 sentences)",
  "localized_lesson": [
      "Paragraph 1: Introduction using a local scenario (e.g., waiting for a specific bus number at a local stand).",
      "Paragraph 2: Core definition explained simply using the scenario.",
      "Paragraph 3: Deeper technical detail connected back to the local context."
  ],
  "keywords": ["#Tag1", "#Tag2", "#Tag3"],
  "analogies": [
    {
      "icon": "directions_bus", 
      "title": "Local Transport Analogy",
      "text": "Detailed explanation of the analogy (e.g., comparing current flow to traffic at a busy local junction)."
    },
    {
       "icon": "celebration",
       "title": "Festival Analogy",
       "text": "Another analogy using local culture or festivals."
    }
  ],
  "comparison_rows": [
    {
      "concept": "Aspect being compared",
      "global_example_before": "How it is usually explained in textbooks (subways, snow, baseball)",
      "local_example_after": "How it works in ${location} (rickshaws, monsoon, cricket)"
    },
    ... (3-4 rows)
  ]
}
`;
};

const generateExplanation = async (location, language, text, extraInstructions) => {
    const inputText = text.substring(0, 10000); // Limit context
    const systemPrompt = buildSystemPrompt(location);
    const userPrompt = buildUserPrompt(location, language, inputText, extraInstructions);
    const fullPrompt = [systemPrompt, userPrompt]; // Pass as array or concatenated string

    try {
      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      let explanationText = response.text();

      // Clean Markdown
      explanationText = explanationText.replace(/^```json\s*/, "").replace(/^```\s*/, "").replace(/\s*```$/, "").trim();

      // Validate JSON (optional, but good for structured output)
      try {
        JSON.parse(explanationText);
      } catch (e) {
        console.warn("Gemini did not return valid JSON, likely raw text. Attempting to fix...");
        // If it failed, it might be due to remaining markdown or text outside JSON
        const jsonMatch = explanationText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            explanationText = jsonMatch[0];
        } else {
             // Fallback structure
             return JSON.stringify({
                 concept_name: "Error Parsing AI Response",
                 short_description: "The AI generated a response but it wasn't in the correct format.",
                 localized_lesson: [explanationText],
                 keywords: ["#Error"],
                 analogies: [],
                 comparison_rows: []
             });
        }
      }
      return explanationText;
    } catch (e) {
      console.error("AI Generation failed:", e);
      throw new Error(`AI Generation failed: ${e.message}`);
    }
};

const generateAnswer = async (documentContext, question) => {
    const prompt = `
    Context:
    ${documentContext.substring(0, 5000)}

    Question: ${question}

    Answer the question based on the provided context. Keep it concise, accurate, and easy to understand.
    `;
    
    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (e) {
        console.error("AI Answer Generation failed:", e);
        throw new Error(`AI Answer Generation failed: ${e.message}`);
    }
}

module.exports = { generateExplanation, generateAnswer };
