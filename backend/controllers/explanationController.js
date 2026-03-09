const { supabase } = require('../config/supabase');

const listExplanations = async (req, res) => {
  if (!supabase) return res.json([]);
  
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    // Check if table exists (optional fallback)
    const { data: explanations, error } = await supabase
        .from('explanations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) {
        // If table doesn't exist, return empty array gracefully
        if (error.code === 'PGRST116' || error.message.includes('relation "public.explanations" does not exist')) {
            console.warn("Explanations table missing, returning empty list.");
            return res.json([]);
        }
        throw error;
    }

    const results = explanations.map(doc => {
      const result = {
        id: doc.id,
        ...doc
      };
      
      // Parse JSON for concept name
      try {
        const parsed = JSON.parse(doc.explanation || "{}");
        result.concept_name = parsed.concept_name || "Unknown Concept";
      } catch {
        result.concept_name = "Explanation";
      }

      // Remove heavy explanation text for list view
      delete result.explanation;
      return result;
    });

    res.json(results);
  } catch (error) {
    res.status(500).json({ detail: error.message });
  }
};

const getExplanation = async (req, res) => {
  if (!supabase) return res.status(500).json({ detail: "Database not configured" });

  try {
    const { data, error } = await supabase
        .from('explanations')
        .select('*')
        .eq('id', req.params.id)
        .single();
        
    if (error || !data) {
      return res.status(404).json({ detail: "Explanation not found" });
    }
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ detail: error.message });
  }
};

module.exports = { listExplanations, getExplanation };
