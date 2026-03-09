import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  
  const stats = [
    { title: "Total Documents", value: "24", icon: "description", trend: "+12% this month" },
    { title: "Explanations", value: "156", icon: "bolt", trend: "+28% this week" },
    { title: "Hours Saved", value: "42h", icon: "schedule", trend: "+15h saved" }
  ];

  const documents = [
    {
      name: "Quantum Physics Basics.pdf",
      category: "Physics",
      date: "Oct 12, 2023",
      status: "Processed"
    },
    {
      name: "Organic Chemistry Vol 1.docx",
      category: "Science",
      date: "Oct 10, 2023",
      status: "Processed"
    },
    {
      name: "Macroeconomics Notes.pdf",
      category: "Economics",
      date: "Oct 08, 2023",
      status: "Processing"
    },
    {
      name: "Neural Networks 101.pdf",
      category: "AI",
      date: "Oct 05, 2023",
      status: "Processed"
    }
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100">

      {/* SIDEBAR */}

      <aside className="w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col fixed h-full z-20">

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
          <SidebarItem icon="dashboard" label="Dashboard" active to="/dashboard" />
          <SidebarItem icon="upload_file" label="Upload" to="/study" />
          <SidebarItem icon="history" label="History" />
          <SidebarItem icon="settings" label="Settings" />
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 font-medium transition-colors">
            <span className="material-symbols-outlined">logout</span>
            Logout
          </Link>
        </div>

      </aside>


      {/* MAIN */}

      <main className="flex-1 ml-72 p-8">

        {/* HEADER */}

        <header className="flex justify-between items-end mb-8">

          <div>
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white">Study Dashboard</h2>
            <p className="text-slate-500 mt-2">
              Manage and explain your study materials
            </p>
          </div>

          <button 
            onClick={() => navigate('/study')}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:bg-indigo-700 hover:-translate-y-0.5 transition-all"
          >
            <span className="material-symbols-outlined">add_circle</span>
            Upload New Document
          </button>

        </header>


        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}

        </div>


        {/* DOCUMENT TABLE */}

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">

          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">

            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Recent Uploads
            </h3>

            <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-sm">search</span>
                <input
                placeholder="Search files..."
                className="pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm w-64 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
            </div>

          </div>

          <table className="w-full text-left">

            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-slate-500">Document</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-500">Category</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-500">Date</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-500">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-500">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">

              {documents.map((doc, index) => (
                <DocumentRow key={index} {...doc} />
              ))}

            </tbody>

          </table>

        </div>


        {/* UPGRADE */}

        <div className="mt-10 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-2xl p-8 flex justify-between items-center">

          <div>
            <h4 className="text-indigo-900 dark:text-indigo-300 text-xl font-bold">
              Need more processing power?
            </h4>

            <p className="text-indigo-600 dark:text-indigo-400 mt-1">
              Upgrade to unlock unlimited uploads and AI voice explanations.
            </p>
          </div>

          <button className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-indigo-200 dark:shadow-none shadow-lg hover:bg-indigo-700 transition">
            Explore Plans
          </button>

        </div>

      </main>

    </div>
  );
}


/* STAT CARD */

function StatCard({ title, value, icon, trend }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">

      <div className="flex justify-between mb-4">

        <span className="text-slate-500 font-medium text-sm">
          {title}
        </span>

        <span className="material-symbols-outlined text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-lg">
          {icon}
        </span>

      </div>

      <p className="text-3xl font-bold text-slate-900 dark:text-white">{value}</p>

      <p className="text-emerald-600 text-sm mt-2 font-semibold flex items-center gap-1">
        <span className="material-symbols-outlined text-sm">trending_up</span>
        {trend}
      </p>

    </div>
  );
}


/* DOCUMENT ROW */

function DocumentRow({ name, category, date, status }) {
  const processed = status === "Processed";

  return (
    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">

      <td className="px-6 py-4 flex items-center gap-3 text-slate-900 dark:text-slate-200 font-medium">
        <div className="p-2 rounded bg-indigo-50 dark:bg-slate-800 text-indigo-600">
            <span className="material-symbols-outlined text-xl">
            description
            </span>
        </div>
        {name}
      </td>

      <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{category}</td>

      <td className="px-6 py-4 text-slate-600 dark:text-slate-400 text-sm">{date}</td>

      <td className="px-6 py-4">

        <span
          className={`px-3 py-1 text-xs font-bold rounded-full ${
            processed
              ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
              : "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
          }`}
        >
          {status}
        </span>

      </td>

      <td className="px-6 py-4">

        {processed ? (
          <button className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-bold text-sm hover:underline">
            View Analysis
          </button>
        ) : (
          <span className="text-slate-400 text-sm italic">
            Please wait...
          </span>
        )}

      </td>

    </tr>
  );
}


/* SIDEBAR ITEM */

function SidebarItem({ icon, label, active, to }) {
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
      <span className="material-symbols-outlined">{icon}</span>
      {label}
    </Component>
  );
}