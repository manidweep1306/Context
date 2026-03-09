import React, { useEffect, useState } from "react";

export default function Analyzing({ onCancel }) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Uploading document...",
    "Extracting text content...", 
    "Analyzing complex concepts...",
    "Generating localized examples...",
    "Finalizing explanation..."
  ];

  useEffect(() => {
    // Simulation of progress
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return 100;
        }
        const newProgress = Math.min(oldProgress + 1, 100);
        
        // Update steps based on progress
        if (newProgress < 20) setCurrentStep(0);
        else if (newProgress < 40) setCurrentStep(1);
        else if (newProgress < 70) setCurrentStep(2);
        else if (newProgress < 90) setCurrentStep(3);
        else setCurrentStep(4);
        
        return newProgress;
      });
    }, 150); // Adjust speed as needed (total approx 15s)

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100 flex flex-col">

      {/* HEADER */}

      <header className="flex items-center justify-between px-6 md:px-20 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">

        <div className="flex items-center gap-3">
          <div className="size-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-200 dark:shadow-none">
            <span className="material-symbols-outlined text-xl">
              auto_awesome
            </span>
          </div>

          <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            AI Study Explainer
          </h2>
        </div>

        {onCancel && (
            <button 
                onClick={onCancel}
                className="flex items-center justify-center rounded-full size-10 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
            <span className="material-symbols-outlined">close</span>
            </button>
        )}

      </header>


      {/* MAIN */}

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">

        <div className="max-w-[520px] w-full text-center space-y-8">

          {/* LOADING ICON */}

          <div className="relative flex justify-center items-center h-32">

            <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full scale-150 animate-pulse"></div>

            <div className="relative">

              <div className="size-24 rounded-full border-4 border-indigo-200 dark:border-indigo-900 border-t-indigo-600 animate-spin"></div>

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-indigo-600 text-3xl animate-bounce">
                  psychology
                </span>
              </div>

            </div>

          </div>


          {/* TEXT */}

          <div className="space-y-4">

            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Analyzing your document...
            </h1>

            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              Our AI is breaking down complex concepts into simple explanations
              tailored just for you.
            </p>

          </div>


          {/* PROGRESS CARD */}

          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl shadow-indigo-100 dark:shadow-none border border-slate-100 dark:border-slate-700 space-y-6">

            <div className="space-y-3">

              <div className="flex justify-between items-end">

                <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider animate-pulse">
                  {steps[currentStep]}
                </span>

                <span className="text-2xl font-black text-slate-900 dark:text-white">{progress}%</span>

              </div>

              <div className="h-3 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">

                <div
                  className="h-full bg-indigo-600 rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(79,70,229,0.5)]"
                  style={{ width: `${progress}%` }}
                />

              </div>

            </div>


            {/* STEPS VISUALIZATION */}

            <div className="flex flex-col gap-4 pt-6 border-t border-slate-100 dark:border-slate-700/50">

              <Step
                icon="upload_file"
                text="Document uploaded successfully"
                status={currentStep > 0 ? 'completed' : (currentStep === 0 ? 'active' : 'pending')}
              />

              <Step
                icon="text_snippet"
                text="Text extraction complete"
                status={currentStep > 1 ? 'completed' : (currentStep === 1 ? 'active' : 'pending')}
              />

              <Step
                icon="bolt"
                text="Simplifying core concepts"
                status={currentStep > 2 ? 'completed' : (currentStep === 2 ? 'active' : 'pending')}
              />
              
              <Step
                icon="location_on"
                text="Applying local context"
                status={currentStep > 3 ? 'completed' : (currentStep === 3 ? 'active' : 'pending')}
              />

            </div>

          </div>


          {/* FOOT TEXT */}

          <p className="text-slate-400 text-sm flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm text-amber-500">
              lightbulb
            </span>
            Tip: You'll get better results with clearly scanned PDFs.
          </p>

        </div>

      </main>

    </div>
  );
}


/* STEP COMPONENT */

function Step({ icon, text, status }) {
  let colorClass = "text-slate-400 dark:text-slate-500";
  let iconName = icon;

  if (status === 'completed') {
      colorClass = "text-green-500 dark:text-green-400";
      iconName = "check_circle";
  } else if (status === 'active') {
      colorClass = "text-indigo-600 dark:text-indigo-400 font-semibold";
  }

  return (
    <div className={`flex items-center gap-3 transition-colors duration-300 ${colorClass}`}>
      <span className={`material-symbols-outlined text-xl ${status === 'active' ? 'animate-spin-slow' : ''}`}>{iconName}</span>
      <span className="text-sm">{text}</span>
    </div>
  );
}