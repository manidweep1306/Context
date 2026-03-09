-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create 'documents' table
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    filename TEXT NOT NULL,
    text_content TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create 'explanations' table
CREATE TABLE IF NOT EXISTS public.explanations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    document_id UUID REFERENCES public.documents(id),
    language TEXT,
    location TEXT,
    explanation TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) - Optional, but recommended
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.explanations ENABLE ROW LEVEL SECURITY;

-- Create policies (modify as needed)
CREATE POLICY "Public read access" ON public.documents FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON public.documents FOR INSERT WITH CHECK (true);

CREATE POLICY "Public read access" ON public.explanations FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON public.explanations FOR INSERT WITH CHECK (true);