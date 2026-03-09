# Varna-Context MVP

This is a Minimum Viable Product (MVP) for an AI-powered study assistant that explains concepts in the student's preferred language using Google Gemini and stores them in PostgreSQL.

## Prerequisites

- [Node.js](https://nodejs.org/) (for React Frontend)
- [Python 3.9+](https://www.python.org/downloads/)
- [Google Gemini API Key](https://makersuite.google.com/app/apikey)
- [Supabase](https://supabase.com/dashboard/project/alhugbwfhykvzbdurgkx) (Optional for MVP, required for DB)

## Setup Instructions

### 1. Configure Environment
1. Open `backend/.env`.
2. Replace `YOUR_GEMINI_API_KEY_HERE` with your actual Google Gemini API Key.
3. (Optional) Place your supabase `serviceAccountKey.json` in the `backend/` folder.

### 2. Install Backend Dependencies
Navigate to the `backend` folder and install Python packages:
```bash
cd backend
pip install -r requirements.txt
```

### 3. Run the Backend Server
Start the FastAPI server:
```bash
uvicorn main:app --reload
```
The server will start at `http://localhost:8000`.

### 4. Install and Run Frontend (React)
Open a new terminal, navigate to the `frontend` folder:
```bash
cd frontend
npm install
npm run dev
```
Open the link shown (usually `http://localhost:5173`) in your browser.

### 5. Use the Application
1. Upload a PDF or Text file containing study notes.
2. Select your preferred language.
3. Click **Generate Explanation**.
4. Wait for the AI to process and display the simplified explanation.

## Project Structure
- `backend/`: FastAPI backend with Firebase & Gemini integration.
- `frontend/`: React + Vite frontend.
- `serviceAccountKey.json`: Supabase credentials (place inside backend).
