import React from "react";
import { MoveRight, Upload, Brain, Languages, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/auth');
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100 antialiased min-h-screen">

      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex justify-between items-center py-4">

            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <span className="material-symbols-outlined text-primary text-3xl text-indigo-600 dark:text-indigo-400">
                auto_stories
              </span>
              <span className="text-xl font-bold tracking-tight">
                AI Study Explainer
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium hover:text-indigo-600 transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-sm font-medium hover:text-indigo-600 transition-colors">
                Pricing
              </a>
              <a href="#about" className="text-sm font-medium hover:text-indigo-600 transition-colors">
                About
              </a>

              <button 
                onClick={handleStart}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-indigo-200 dark:shadow-none"
              >
                Get Started
              </button>
            </nav>

            <span className="material-symbols-outlined md:hidden cursor-pointer">menu</span>

          </div>
        </div>
      </header>


      {/* HERO SECTION */}

      <section className="py-20 lg:py-32 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white dark:from-slate-900 dark:to-slate-800 -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">

          <div className="flex flex-col gap-6 animate-fade-in-up">

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 w-fit text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
              Next-Gen Learning
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight">
              Master Any Subject <span className="text-indigo-600">Instantly</span>
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg">
              Understand your study materials with AI-powered explanations.
              Turn complex textbooks into clear knowledge in seconds using our advanced PDF analysis engine.
            </p>

            <div className="flex flex-wrap gap-4 mt-4">

              <button 
                onClick={handleStart}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-indigo-200/50 dark:shadow-none transition-all hover:scale-105 flex items-center gap-2"
              >
                Upload Study Material
                <MoveRight className="w-5 h-5" />
              </button>

              <button className="border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-600 hover:text-indigo-600 dark:hover:border-indigo-400 dark:hover:text-indigo-400 px-8 py-4 rounded-xl font-bold text-lg transition-all bg-white dark:bg-slate-800">
                View Sample
              </button>

            </div>

            <div className="flex items-center gap-4 text-sm text-slate-500 mt-4">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-indigo-${i*100} flex items-center justify-center text-xs text-white font-bold`}>
                    {String.fromCharCode(64+i)}
                  </div>
                ))}
              </div>
              <p>Trusted by 1,000+ students</p>
            </div>

          </div>

          {/* Mock AI Card */}

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-2xl ring-1 ring-slate-900/5 dark:ring-white/10">

              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 space-y-4">

                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 animate-pulse mb-8"></div>

                <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 p-4 rounded-xl shadow-sm">

                  <div className="flex items-center gap-2 mb-3 border-b border-slate-100 dark:border-slate-700 pb-2">
                    <span className="material-symbols-outlined text-indigo-600">
                      smart_toy
                    </span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      AI Explanation
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="h-2 bg-indigo-50 dark:bg-indigo-900/20 rounded w-full"></div>
                    <div className="h-2 bg-indigo-50 dark:bg-indigo-900/20 rounded w-11/12"></div>
                    <div className="h-2 bg-indigo-50 dark:bg-indigo-900/20 rounded w-2/3"></div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                    <div className="flex gap-2">
                        <span className="h-6 w-16 bg-green-50 text-green-600 text-[10px] font-bold rounded-full flex items-center justify-center">Concise</span>
                        <span className="h-6 w-16 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full flex items-center justify-center">Accurate</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>

      </section>


      {/* FEATURES */}

      <section id="features" className="py-24 bg-white dark:bg-slate-800/30">

        <div className="max-w-7xl mx-auto px-4">

          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Smarter Learning Features</h2>
            <p className="text-slate-500 text-lg">
              Our AI tools are designed to help you master complex subjects faster than ever before.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            <Feature
              icon="upload_file"
              title="Upload PDFs"
              text="Drop your study materials for instant AI processing and analysis."
              color="text-blue-500"
              bgColor="bg-blue-50"
            />

            <Feature
              icon="psychology"
              title="AI Explanations"
              text="Complex topics simplified into easy-to-understand explanations."
              color="text-purple-500"
              bgColor="bg-purple-50"
            />

            <Feature
              icon="translate"
              title="Multi-language"
              text="Study in your native language with seamless AI translation support."
              color="text-emerald-500"
              bgColor="bg-emerald-50"
            />

            <Feature
              icon="chat"
              title="Ask Questions"
              text="Interact with your study materials directly through chat interface."
              color="text-orange-500"
              bgColor="bg-orange-50"
            />

          </div>

        </div>

      </section>


      {/* PRICING */}

      <section id="pricing" className="py-24">

        <div className="max-w-5xl mx-auto px-4">

          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-slate-500">Start for free, upgrade when you need to.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

            <PricingCard
              title="Student"
              price="$0"
              features={[
                "Unlimited PDF Uploads",
                "Standard AI Explanations",
                "Community Forum Access",
                "Basic Support"
              ]}
              button="Get Started Free"
            />

            <PricingCard
              title="Pro"
              price="$12"
              highlight
              features={[
                "Priority AI Processing",
                "Advanced Concept Mapping",
                "24/7 AI Support",
                "Offline Mode",
                "Custom Study Guides"
              ]}
              button="Go Pro"
            />

          </div>

        </div>

      </section>


      {/* FOOTER */}

      <footer className="py-12 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">

        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-6 items-center">

          <div className="font-bold text-xl flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-600">auto_stories</span>
            AI Study Explainer
          </div>

          <div className="flex gap-8 text-sm text-slate-500 font-medium">
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Support</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Contact</a>
          </div>
          
          <div className="text-sm text-slate-400">
            © 2026 AI Study Explainer. All rights reserved.
          </div>

        </div>

      </footer>

    </div>
  );
}


/* COMPONENTS */

function Feature({ icon, title, text, color, bgColor }) {
  return (
    <div className="p-8 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-50 dark:hover:shadow-none bg-white dark:bg-slate-800 transition-all duration-300 group">
      <div className={`w-14 h-14 rounded-xl ${bgColor} ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
        <span className="material-symbols-outlined text-3xl">
            {icon}
        </span>
      </div>
      <h3 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{title}</h3>
      <p className="text-slate-500 leading-relaxed">{text}</p>
    </div>
  );
}

function PricingCard({ title, price, features, button, highlight }) {
  return (
    <div
      className={`p-8 rounded-3xl border relative overflow-hidden transition-all duration-300 ${
        highlight 
            ? "border-indigo-600 shadow-2xl shadow-indigo-100 dark:shadow-none scale-105 bg-white dark:bg-slate-800 z-10" 
            : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-indigo-300"
      }`}
    >
      {highlight && (
        <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
            POPULAR
        </div>
      )}
      
      <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{title}</h3>

      <div className="flex items-baseline gap-1 mb-8">
        <span className="text-5xl font-black text-slate-900 dark:text-white">{price}</span>
        <span className="text-sm text-slate-500 font-medium">/month</span>
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
            <span className={`material-symbols-outlined text-[20px] ${highlight ? 'text-indigo-600' : 'text-slate-400'}`}>check_circle</span>
            {f}
          </li>
        ))}
      </ul>

      <button
        className={`w-full py-4 rounded-xl font-bold transition-all ${
          highlight
            ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 dark:shadow-none"
            : "bg-white border-2 border-slate-200 hover:border-indigo-600 hover:text-indigo-600 text-slate-600 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
        }`}
      >
        {button}
      </button>
    </div>
  );
}