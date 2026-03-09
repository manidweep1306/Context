import React from "react";
import { Link } from "react-router-dom";

export default function StudyHistoryPage() {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100 overflow-hidden">

      <Sidebar />

      <main className="flex-1 flex flex-col overflow-y-auto">

        <Header />

        <div className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8">

          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">Study History</h1>
            <p className="text-slate-500 mt-2">
              Access and review all your previously generated AI explanations.
            </p>
          </div>

          <HistoryTable />

          <Pagination />

          <TipsSection />

        </div>

      </main>

    </div>
  );
}


/* SIDEBAR */

function Sidebar() {
  return (
    <aside className="w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col fixed h-full z-10 hidden lg:flex">

      <div className="p-6 flex items-center gap-3">
        <Link to="/" className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white hover:bg-indigo-700 transition">
          <span className="material-symbols-outlined">auto_stories</span>
        </Link>
        <div>
          <h1 className="font-bold text-lg">Study AI</h1>
          <p className="text-xs text-slate-500">Personal Tutor</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        <NavItem icon="dashboard" text="Dashboard" to="/dashboard" />
        <NavItem icon="history" text="History" active />
        <NavItem icon="bookmark" text="Saved Notes" />
        <NavItem icon="school" text="Learning Path" />
      </nav>

    </aside>
  );
}


/* NAV ITEM */

function NavItem({ icon, text, active, to }) {
  const Component = to ? Link : 'button';
  return (
    <Component
      to={to}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors text-left ${
        active
          ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-semibold"
          : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
      }`}
    >
      <span className="material-symbols-outlined text-xl">{icon}</span>
      {text}
    </Component>
  );
}


/* HEADER */

function Header() {
  return (
    <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-8 py-4 flex justify-between items-center ml-0 lg:ml-72 transition-all">
       <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link to="/dashboard" className="hover:text-indigo-600">Dashboard</Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-slate-900 dark:text-white font-medium">History</span>
      </div>
    </header>
  );
}


/* HISTORY TABLE */

function HistoryTable() {
  const historyData = [
    {
      id: 1,
      title: "Quantum Physics: Superposition",
      date: "Mar 8, 2026",
      type: "Explanation",
      tags: ["Physics", "Quantum"],
      status: "Completed",
    },
    {
      id: 2,
      title: "Photosynthesis Process",
      date: "Mar 7, 2026",
      type: "Summary",
      tags: ["Biology", "Botany"],
      status: "Review Needed",
    },
    {
      id: 3,
      title: "World War II: Key Events",
      date: "Mar 5, 2026",
      type: "Timeline",
      tags: ["History", "War"],
      status: "Completed",
    },
     {
      id: 4,
      title: "Calculus: Derivatives",
      date: "Mar 2, 2026",
      type: "Problem Set",
      tags: ["Math", "Calculus"],
      status: "In Progress",
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-700">
            <th className="px-6 py-4">Topic</th>
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4">Type</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
          {historyData.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
              <td className="px-6 py-4">
                <div className="font-bold text-slate-900 dark:text-white">{item.title}</div>
                <div className="flex gap-2 mt-1">
                  {item.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded">#{tag}</span>
                  ))}
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-slate-500">{item.date}</td>
              <td className="px-6 py-4 text-sm text-slate-500">{item.type}</td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  item.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                  item.status === 'In Progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                  'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                }`}>
                  {item.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                  <span className="material-symbols-outlined">visibility</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


/* PAGINATION */

function Pagination() {
  return (
    <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-700 pt-6">
      <div className="text-sm text-slate-500">
        Showing <span className="font-bold">1</span> to <span className="font-bold">4</span> of <span className="font-bold">12</span> results
      </div>
      <div className="flex gap-2">
        <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition disabled:opacity-50" disabled>
          Previous
        </button>
        <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition">
          Next
        </button>
      </div>
    </div>
  );
}


/* TIPS SECTION */

function TipsSection() {
  return (
    <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border border-indigo-100 dark:border-indigo-800 flex items-start gap-4">
      <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg text-indigo-600 dark:text-indigo-400 shrink-0">
        <span className="material-symbols-outlined">lightbulb</span>
      </div>
      <div>
        <h3 className="font-bold text-indigo-900 dark:text-indigo-300 mb-1">Study Tip</h3>
        <p className="text-sm text-indigo-700 dark:text-indigo-400/80 leading-relaxed">
          Reviewing material within 24 hours of learning it increases retention by up to 60%. Try revisiting "Calculus: Derivatives" today!
        </p>
      </div>
    </div>
  );
}