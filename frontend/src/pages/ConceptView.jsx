import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function ConceptView() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const defaultData = {
    title: "Schrödinger's Cat",
    category: "Advanced Physics",
    description: "A thought experiment illustrating quantum superposition and the observer effect.",
    explanation_parts: [
      "Imagine a cat placed in a sealed box with a radioactive atom, a detector, and poison. If the atom decays, the poison is released.",
      "Until the box is opened, the system exists in a superposition. Meaning the cat is both alive and dead at the same time."
    ],
    tags: ["#Superposition", "#QuantumStates", "#ObserverEffect"],
    analogies: [
        {
            icon: "payments",
            title: "Spinning Coin",
            text: "A spinning coin is neither heads nor tails while spinning. Only when it stops does it collapse into one state."
        },
        {
            icon: "music_note",
            title: "Musical Chord",
            text: "A chord contains multiple notes played simultaneously. Quantum states are similar blends of possibilities."
        }
    ]
  };

  let data = defaultData;
  
  if (location.state?.result?.parsedExplanation) {
      const parsed = location.state.result.parsedExplanation;
      
      // Normalize explanation to array of strings
      let parts = [];
      if (Array.isArray(parsed.localized_lesson)) {
          parts = parsed.localized_lesson;
      } else if (typeof parsed.localized_lesson === 'string') {
          // Split by paragraphs if it's a long string
          parts = parsed.localized_lesson.split('\n\n').filter(p => p.trim());
      } else {
          parts = [JSON.stringify(parsed.localized_lesson)];
      }

      data = {
          title: parsed.concept_name || parsed.concept || "Explained Concept",
          category: location.state.result.language || "General",
          description: parsed.short_description || "AI Generated Explanation for your uploaded document.",
          explanation_parts: parts,
          tags: parsed.keywords || ["#AI", "#Learning"],
          analogies: parsed.analogies || [],
          comparison_rows: parsed.comparison_rows || []
      };
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100 overflow-hidden">

      <Sidebar />

      <main className="flex-1 flex flex-col overflow-y-auto">

        <Header title={data.title} category={data.category} />

        <div className="max-w-5xl mx-auto w-full px-8 py-10">

          {/* TITLE */}

          <div className="mb-10">
            <div className="flex flex-col md:flex-row items-start justify-between gap-6">

              <div className="space-y-4 max-w-2xl">
                <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-600 border border-indigo-100">
                  {data.category}
                </span>

                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                  {data.title}
                </h1>

                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                  {data.description}
                </p>
              </div>

              <div className="flex gap-3 shrink-0">

                <Link to="/chat" className="flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 dark:shadow-none transition-all">
                  <span className="material-symbols-outlined text-xl">
                    chat_bubble
                  </span>
                  Ask AI
                </Link>

                <button className="flex items-center gap-2 px-5 py-3 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl font-bold transition-all">
                  <span className="material-symbols-outlined text-xl">
                    bookmark_border
                  </span>
                  Save
                </button>

              </div>

            </div>
          </div>


          {/* AI EXPLANATION */}

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 overflow-hidden mb-12">

            <div className="bg-gradient-to-r from-indigo-50 to-white dark:from-indigo-900/20 dark:to-slate-800 px-8 py-5 flex items-center justify-between border-b border-indigo-50 dark:border-slate-700">

              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold">
                <div className="p-1.5 bg-white dark:bg-indigo-900/50 rounded-lg shadow-sm">
                    <span className="material-symbols-outlined text-sm">auto_awesome</span>
                </div>
                AI Explanation
              </div>

              <button className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline">
                <span className="material-symbols-outlined text-sm">
                  refresh
                </span>
                Regenerate
              </button>

            </div>

            <div className="p-8 md:p-10 space-y-6">

              {data.explanation_parts.map((part, index) => (
                  <p key={index} className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {part.replace(/\*\*(.*?)\*\*/g, '$1')}
                  </p>
              ))}

              {data.tags && data.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-100 dark:border-slate-700/50 mt-6">
                    {data.tags.map((tag, i) => <Tag key={i}>{tag}</Tag>)}
                  </div>
              )}

            </div>

          </div>

          {/* COMPARISON TABLE */}

          {data.comparison_rows && data.comparison_rows.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-bold flex items-center gap-3 text-slate-900 dark:text-white mb-6">
                <span className="material-symbols-outlined text-indigo-600 text-3xl">compare_arrows</span>
                Global vs. Local Context
              </h3>
              
              <div className="overflow-hidden bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
                    <tr>
                      <th className="p-5 w-[20%]">Concept</th>
                      <th className="p-5 w-[40%]">Standard Textbook</th>
                      <th className="p-5 w-[40%] text-indigo-600 dark:text-indigo-400">Local Context</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                    {data.comparison_rows.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                        <td className="p-5 font-bold text-slate-700 dark:text-slate-200">{row.concept}</td>
                        <td className="p-5 text-slate-600 dark:text-slate-400">{row.global_example_before}</td>
                        <td className="p-5 bg-indigo-50/30 dark:bg-indigo-900/10 text-slate-800 dark:text-indigo-100 font-medium">
                          {row.local_example_after}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}


          {/* ANALOGY SECTION */}

          {data.analogies && data.analogies.length > 0 && (
            <div className="space-y-6 mb-16">

                <h3 className="text-2xl font-bold flex items-center gap-3 text-slate-900 dark:text-white">
                <span className="material-symbols-outlined text-amber-500 text-3xl">
                    lightbulb
                </span>
                Real-world Analogy
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                {data.analogies.map((analogy, i) => (
                    <AnalogyCard key={i} {...analogy} />
                ))}
                </div>

            </div>
          )}


          {/* FOOTER CTA */}

          <div className="bg-slate-100 dark:bg-slate-800/50 rounded-3xl p-10 flex flex-col items-center text-center border border-slate-200 dark:border-slate-700">

            <div className="mb-6">
                <h4 className="text-xl font-bold mb-2">Still keeping coming back?</h4>
                <p className="text-slate-500">
                Let the AI simplify it further for you.
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">

              <button className="px-6 py-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-bold rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors border border-indigo-100 dark:border-indigo-800">
                Explain like I'm 5
              </button>

              <button className="px-6 py-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-bold rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors border border-indigo-100 dark:border-indigo-800">
                Use visual diagrams
              </button>

              <button className="px-6 py-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-bold rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors border border-indigo-100 dark:border-indigo-800">
                Translate to Hindi
              </button>

            </div>

          </div>

        </div>

      </main>
    </div>
  );
}


/* TAG */

function Tag({ children }) {
  return (
    <span className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm font-semibold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
      {children}
    </span>
  );
}


/* ANALOGY CARD */

function AnalogyCard({ icon, title, text }) {
  return (
    <div className="p-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow group">

      <div className="size-12 bg-indigo-50 dark:bg-slate-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400 text-2xl">
          {icon}
        </span>
      </div>

      <h4 className="font-bold text-lg mb-3 text-slate-900 dark:text-white">{title}</h4>

      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
        {text}
      </p>

    </div>
  );
}


/* SIDEBAR */

function Sidebar() {
  return (
    <aside className="w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col fixed inset-y-0 z-10 hidden lg:flex">

      <div className="p-6 flex items-center gap-3">
        <Link to="/" className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white hover:bg-indigo-700 transition">
            <span className="material-symbols-outlined">auto_stories</span>
        </Link>

        <div>
            <h1 className="font-bold text-lg">AI Study Explainer</h1>
            <p className="text-xs text-slate-500">Premium Plan</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">

        <NavItem icon="dashboard" text="Dashboard" to="/dashboard" />
        <NavItem icon="book_5" text="Subjects" active />
        <NavItem icon="psychology" text="Use AI Tutor" to="/study" />
        <NavItem icon="bookmark" text="Saved Notes" />

      </nav>
      
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 font-medium transition-colors">
            <span className="material-symbols-outlined">logout</span>
            Logout
          </Link>
      </div>

    </aside>
  );
}


/* NAV ITEM */

function NavItem({ icon, text, active, to }) {
  const Component = to ? Link : 'a';
  return (
    <Component
      to={to}
      href={!to ? "#" : undefined}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${
        active
          ? "bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-semibold"
          : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
      }`}
    >
      <span className="material-symbols-outlined text-xl">{icon}</span>
      {text}
    </Component>
  );
}


/* HEADER */

function Header({ title, category }) {
  return (
    <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-8 py-4 flex justify-between items-center ml-0 lg:ml-72 transition-all">

      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link to="/dashboard" className="hover:text-indigo-600">Dashboard</Link>
        <span className="material-symbols-outlined text-sm">
          chevron_right
        </span>
        <span className="hidden sm:inline">{category}</span>
        <span className="material-symbols-outlined text-sm hidden sm:inline">
          chevron_right
        </span>
        <span className="text-slate-900 dark:text-white font-medium truncate max-w-[200px]">
          {title}
        </span>
      </div>

      <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition">
        <span className="material-symbols-outlined text-lg text-slate-400">
          language
        </span>
        English
      </button>

    </header>
  );
}