import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AuthPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: ""
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const endpoint = isLogin ? "/login" : "/signup";
    const payload = isLogin 
      ? { email: formData.email, password: formData.password }
      : { email: formData.email, password: formData.password, full_name: formData.fullName };

    try {
      // Assuming backend is running on port 8000
      const response = await axios.post(`http://localhost:8000${endpoint}`, payload);
      
      // Store session/token if needed
      if (response.data.session) {
          localStorage.setItem('supabase.auth.token', JSON.stringify(response.data.session));
      }

      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100 min-h-screen">

      {/* HEADER */}

      <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6 md:px-20 py-4 bg-white dark:bg-slate-900">

        <Link to="/" className="flex items-center gap-3 text-indigo-600">
          <span className="material-symbols-outlined text-3xl">auto_stories</span>
          <h2 className="text-xl font-bold">AI Study Explainer</h2>
        </Link>

        <div className="flex items-center gap-4">
          <button className="text-sm text-slate-600 hover:text-indigo-600">
            Help
          </button>
          <button className="text-sm text-slate-600 hover:text-indigo-600">
            Contact
          </button>
        </div>

      </header>


      {/* MAIN */}

      <main className="flex items-center justify-center p-6 min-h-[80vh]">

        <div className="flex flex-col md:flex-row max-w-[1000px] w-full bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">

          {/* LEFT SIDE */}

          <div className="hidden md:flex md:w-1/2 bg-indigo-50 dark:bg-slate-800 p-12 flex-col justify-between relative">

            <div>
              <h1 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">
                Master any subject with AI.
              </h1>

              <p className="text-slate-600 dark:text-slate-300">
                Unlock complex topics through personalized AI-driven
                explanations tailored to your learning style.
              </p>
            </div>

            <div className="flex flex-col gap-4">

              <div className="flex items-center gap-3 bg-white/80 dark:bg-slate-700/80 p-4 rounded-lg">
                <span className="material-symbols-outlined text-indigo-600">
                  psychology
                </span>
                <span className="text-sm font-medium">
                  Adaptive Learning Paths
                </span>
              </div>

              <div className="flex items-center gap-3 bg-white/80 dark:bg-slate-700/80 p-4 rounded-lg">
                <span className="material-symbols-outlined text-indigo-600">
                  translate
                </span>
                <span className="text-sm font-medium">
                  Multi-language Support
                </span>
              </div>

            </div>

          </div>


          {/* RIGHT SIDE FORM */}

          <div className="w-full md:w-1/2 p-8 md:p-12">

            <div className="mb-8">
              <h2 className="text-3xl font-bold">{isLogin ? "Welcome back" : "Create Account"}</h2>
              <p className="text-slate-500">
                {isLogin ? "Please enter your details to continue" : "Join us to start learning smarter"}
              </p>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
                    {error}
                </div>
            )}

            <form className="flex flex-col gap-5" onSubmit={handleAuth}>

              {/* NAME FIELD (Signup Only) */}
              {!isLogin && (
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold">Full Name</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-3 text-slate-400">person</span>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 h-12 pl-10 pr-4 outline-none focus:border-indigo-600"
                        required={!isLogin}
                      />
                    </div>
                  </div>
              )}

              {/* EMAIL */}

              <div className="flex flex-col gap-2">

                <label className="text-sm font-semibold">
                  Email Address
                </label>

                <div className="relative">

                  <span className="material-symbols-outlined absolute left-3 top-3 text-slate-400">
                    mail
                  </span>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 h-12 pl-10 pr-4 outline-none focus:border-indigo-600"
                    required
                  />

                </div>

              </div>


              {/* PASSWORD */}

              <div className="flex flex-col gap-2">

                <div className="flex justify-between">
                  <label className="text-sm font-semibold">Password</label>
                  {isLogin && (
                    <a href="#" className="text-xs text-indigo-600 hover:text-indigo-700">
                        Forgot password?
                    </a>
                  )}
                </div>

                <div className="relative">

                  <span className="material-symbols-outlined absolute left-3 top-3 text-slate-400">
                    lock
                  </span>

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 h-12 pl-10 pr-10 outline-none focus:border-indigo-600"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="material-symbols-outlined absolute right-3 top-3 cursor-pointer text-slate-400 hover:text-indigo-600 border-none bg-transparent"
                  >
                    {showPassword ? "visibility_off" : "visibility"}
                  </button>

                </div>

              </div>


              {/* REMEMBER */}

              {isLogin && (
                <div className="flex items-center gap-2">
                    <input type="checkbox" className="accent-indigo-600 w-4 h-4 cursor-pointer" />
                    <label className="text-sm text-slate-600">
                    Remember me for 30 days
                    </label>
                </div>
              )}


              {/* BUTTONS */}

              <div className="flex flex-col gap-3 mt-4">

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {loading && <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>}
                  {isLogin ? "Login to Account" : "Create Account"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                      setIsLogin(!isLogin);
                      setError(null);
                      setFormData({ email: "", password: "", fullName: "" });
                  }}
                  className="w-full bg-slate-100 dark:bg-slate-800 py-3 rounded-xl font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  {isLogin ? "Register New Account" : "Already have an account? Login"}
                </button>

              </div>


              {/* DIVIDER */}

              <div className="flex items-center py-4">
                <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
                <span className="mx-4 text-xs text-slate-400 uppercase">
                  Or connect with
                </span>
                <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
              </div>


              {/* SOCIAL */}

              <div className="grid grid-cols-2 gap-4">

                <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">

                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
                    className="w-5 h-5"
                    alt="Google"
                  />

                  <span className="text-sm font-medium">
                    Google
                  </span>

                </button>


                <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">

                  <span className="material-symbols-outlined">
                    terminal
                  </span>

                  <span className="text-sm font-medium">
                    GitHub
                  </span>

                </button>

              </div>

            </form>

          </div>

        </div>

      </main>


      {/* FOOTER */}

      <footer className="p-6 text-center text-xs text-slate-500">
        © 2024 AI Study Explainer. All rights reserved.
      </footer>

    </div>
  );
}