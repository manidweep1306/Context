const express = require('express');
const router = express.Router();
const multer = require('multer');

const { uploadFile } = require('../controllers/documentController');
const { listExplanations, getExplanation } = require('../controllers/explanationController');
const { askQuestion } = require('../controllers/chatController');
const { signup, login } = require('../controllers/authController'); // New Auth Controller

// Multer Config
const upload = multer({ storage: multer.memoryStorage() });

// Routes
router.get('/health', async (req, res) => {
    const { supabase } = require('../config/supabase');
    if (supabase) {
        try {
            // Verify connection by attempting to list tables or check connection via a simple query
            // Using 'from' on a likely table
            const { error } = await supabase.from('explanations').select('id').limit(1);
            if (error && error.code !== 'PGRST116') { // Ignore missing table if only confirming connectivity
                console.error("Health Check DB Error:", error);
                return res.json({ status: "ok", database: "connected (Supabase) but query failed: " + error.message });
            }
            return res.json({ status: "ok", database: "connected (Supabase)" });
        } catch (e) {
            console.error("Health Check Connection Error:", e);
             return res.json({ status: "ok", database: "disconnected (Network Error)" });
        }
    }
    return res.json({ status: "ok", database: "disconnected" });
});

// Auth Routes
router.post('/signup', signup);
router.post('/login', login);

router.post('/upload', upload.single('file'), uploadFile);
router.get('/explanations', listExplanations);
router.get('/explanations/:id', getExplanation);
router.post('/question', askQuestion);

module.exports = router;
