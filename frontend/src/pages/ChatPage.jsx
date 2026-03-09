import React from "react";
import { Link } from "react-router-dom";

export default function ChatPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100">
      
      <Sidebar />

      <main className="flex-1 flex flex-col bg-white dark:bg-slate-900 shadow-xl">
        
        <ChatHeader />

        <div className="flex-1 overflow-y-auto p-8 space-y-8">

          <Message
            role="ai"
            name="StudyAI"
            time="Just now"
            text={`Hi there! I'm your AI tutor. 
            We were looking at "Schrödinger's Cat".
            Would you like me to explain the concept of superposition in more detail?`}
          />

          <Message
            role="user"
            name="You"
            time="2 min ago"
            text={`Can you explain it using a different analogy?`}
          />

          <Message
            role="ai"
            name="StudyAI"
            time="1 min ago"
            text={`Certainly!

Think of a spinning coin. While it's spinning, it's a blur—it's not definitely Heads or Tails. It's in a state of being "both" potentially.

Only when you stop it (make an observation) does it force itself to be either Heads or Tails.

Superposition is like that spinning state.`}
          />

        </div>

        <ChatInput />

      </main>

    </div>
  );
}


/* SIDEBAR */

function Sidebar() {
  return (
    <aside className="w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col p-6 hidden md:flex">

      <div className="flex items-center gap-3 mb-8">

        <Link to="/" className="bg-indigo-50 p-2 rounded-lg text-indigo-600 block">
          <span className="material-symbols-outlined text-2xl">
            auto_stories
          </span>
        </Link>

        <div>
          <h1 className="font-bold">StudyAI</h1>
          <p className="text-xs text-slate-500">Your personal tutor</p>
        </div>

      </div>

      <Link to="/study" className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl mb-6 transition-colors font-medium">
        <span className="material-symbols-outlined">add_box</span>
        New Session
      </Link>

      <nav className="space-y-1">

        <NavItem icon="chat_bubble" text="Active Chat" active to="/chat" />
        <NavItem icon="history" text="History" to="/dashboard?tab=history" />
        <NavItem icon="bookmark" text="Saved Concepts" to="/dashboard?tab=library" />
        <NavItem icon="school" text="Learning Path" to="/dashboard" />

      </nav>

    </aside>
  );
}


/* NAV ITEM */

function NavItem({ icon, text, active, to }) {
  return (
    <Link
      to={to || "#"}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
        active
          ? "bg-indigo-50 text-indigo-600 font-medium dark:bg-indigo-900/20 dark:text-indigo-400"
          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
      }`}
    >
      <span className="material-symbols-outlined">{icon}</span>
      {text}
    </Link>
  );
}


/* HEADER */

function ChatHeader() {
  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 bg-white dark:bg-slate-900 z-10">

      <div className="flex items-center gap-4">
        <span className="material-symbols-outlined text-slate-400">
          psychology
        </span>

        <h2 className="font-semibold text-slate-800 dark:text-white">
          Explaining: Quantum Physics
        </h2>
      </div>

      <div className="flex gap-2">

        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500">
          <span className="material-symbols-outlined">share</span>
        </button>

        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500">
          <span className="material-symbols-outlined">more_vert</span>
        </button>

      </div>

    </header>
  );
}


/* MESSAGE */

function Message({ role, name, time, text }) {

  const isUser = role === "user";

  return (
    <div
      className={`flex gap-4 max-w-4xl ${
        isUser ? "ml-auto flex-row-reverse" : ""
      }`}
    >

      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
          isUser
            ? "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
            : "bg-indigo-600 text-white"
        }`}
      >
        <span className="material-symbols-outlined">
          {isUser ? "person" : "smart_toy"}
        </span>
      </div>

      <div className={`flex flex-col gap-2 ${isUser ? "items-end" : "items-start"}`}>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          {!isUser && <span className="font-bold text-slate-700 dark:text-slate-200">{name}</span>}
          <span>{time}</span>
          {isUser && <span className="font-bold text-slate-700 dark:text-slate-200">You</span>}
        </div>

        <div
          className={`p-5 rounded-2xl leading-relaxed shadow-sm whitespace-pre-line text-sm md:text-base ${
            isUser
              ? "bg-indigo-600 text-white rounded-tr-none"
              : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-slate-700"
          }`}
        >
          {text}
        </div>

      </div>

    </div>
  );
}


/* CHAT INPUT */

function ChatInput() {
  return (
    <footer className="p-6 md:p-8 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">

      <div className="max-w-4xl mx-auto">

        <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 p-2 rounded-2xl border border-slate-200 dark:border-slate-700 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">

          <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
            <span className="material-symbols-outlined">
              attach_file
            </span>
          </button>

          <input
            type="text"
            placeholder="Ask follow-up questions..."
            className="flex-1 bg-transparent outline-none text-slate-900 dark:text-white placeholder-slate-400 h-10"
          />

          <button className="w-10 h-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center justify-center transition-colors shadow-md shadow-indigo-200 dark:shadow-none">
            <span className="material-symbols-outlined text-lg">
              send
            </span>
          </button>

        </div>

      </div>

    </footer>
  );
}