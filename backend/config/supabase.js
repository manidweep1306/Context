const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://xyz.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'your-anon-or-service-role-key';

let supabase;

if (SUPABASE_URL && SUPABASE_KEY) {
    try {
        supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
        console.log("✅ Initialized Supabase Client");
    } catch (e) {
        console.error("❌ Failed to initialize Supabase:", e.message);
    }
} else {
    console.warn("⚠️ Warning: SUPABASE_URL or SUPABASE_KEY is missing. Database features will be disabled.");
}

module.exports = { supabase };
