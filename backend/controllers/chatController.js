const { supabase } = require('../config/supabase');
const { generateAnswer } = require('../services/geminiService');

const askQuestion = async (req, res) => {
    try {
        const { documentId, question } = req.body;

        if (!documentId || !question) {
            return res.status(400).json({ detail: "documentId and question are required" });
        }

        if (!supabase) {
            return res.status(500).json({ detail: "Database not configured" });
        }

        // 1. Retrieve the document text
        const { data: documentData, error: docError } = await supabase
            .from('documents')
            .select('text_content')
            .eq('id', documentId)
            .single();

        if (docError || !documentData) {
            return res.status(404).json({ detail: "Document not found" }); 
        }

        const documentText = documentData.text_content || "";

        // 2. Generate Answer with AI
        const aiAnswer = await generateAnswer(documentText, question);

        // 3. Store Question & Answer
        const { error: insertError } = await supabase
            .from('questions')
            .insert([
                {
                    document_id: documentId,
                    question: question,
                    answer: aiAnswer
                }
            ]);
            
        if (insertError) console.error("Error saving question:", insertError);

        res.json({
            question: question,
            answer: aiAnswer
        });

    } catch (error) {
        console.error("Question error:", error);
        res.status(500).json({ detail: error.message });
    }
};

module.exports = { askQuestion };
