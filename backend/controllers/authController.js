const { supabase } = require('../config/supabase'); // Import the initialized client

const signup = async (req, res) => {
    const { email, password, full_name } = req.body;

    try {
        // 1. Sign up the user using Supabase Auth
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { full_name } // Store extra metadata in user_metadata
            }
        });

        if (error) throw error;

        // 2. (Optional) Create a public profile record if you have a separate table
        // For now, we rely on the auth.users table and metadata.

        res.status(201).json({
            message: "User created successfully",
            user: data.user,
            session: data.session
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) throw error;

        res.status(200).json({
            message: "Login successful",
            user: data.user,
            session: data.session
        });

    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

module.exports = { signup, login };