import { useState } from "react";
import { Link } from "react-router-dom"; 
import { loginUser } from "../services/auth.service";

const GOLD = "#BFA13B";
const DARK = "#8e7421";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const res = await loginUser(form);
      setMsg(res.msg);
    } catch (err) {
      setMsg(err.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-stone-50 relative overflow-hidden">
      {/* SIDEWISE RADIUS CIRCLES */}
      <div className="absolute top-[-10%] left-[-10%] w-52 h-52 rounded-full blur-[60px] opacity-[0.07] pointer-events-none" style={{ background: GOLD }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-52 h-52 rounded-full blur-[60px] opacity-[0.07] pointer-events-none" style={{ background: DARK }} />

      <div 
        className="w-full max-w-90 bg-white rounded-[1.25rem] relative z-10 overflow-hidden shadow-2xl"
        style={{ border: `1px solid ${GOLD}10`, fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Top Accent Line */}
        <div className="h-1 w-full" style={{ background: `linear-gradient(to right, ${GOLD}, ${DARK})` }} />

        <div className="p-6 flex flex-col">
          {/* Header Section */}
          <div className="text-center mb-5">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-3 shadow-sm" style={{ background: `linear-gradient(135deg, ${GOLD}, ${DARK})` }}>
               <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
               </svg>
            </div>
            <h2 className="text-xl font-bold text-stone-800" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Login</h2>
            <p className="text-stone-400 text-[11px] tracking-wide uppercase">Enter credentials to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-3.5">
            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-widest text-stone-400 ml-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-xl border border-stone-100 bg-stone-50 focus:bg-white focus:border-[#BFA13B] outline-none transition-all text-sm"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <div className="flex justify-between items-center px-1">
                <label className="text-[9px] font-bold uppercase tracking-widest text-stone-400">Password</label>
                <span className="text-[9px] font-bold cursor-pointer" style={{ color: GOLD }}>Forgot?</span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-xl border border-stone-100 bg-stone-50 focus:bg-white focus:border-[#BFA13B] outline-none transition-all text-sm"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-300 hover:text-stone-500"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88L1.39 1.39m11.11 11.11l8.5 8.5M21 12a9.905 9.905 0 01-1.39 3.612M12 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411" /></svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-white font-bold text-[11px] tracking-[0.2em] shadow-lg transition-all active:scale-[0.98] mt-2 flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${GOLD} 0%, ${DARK} 100%)` }}
            >
              {loading ? "..." : "SIGN IN"}
            </button>
          </form>

          {msg && (
            <div className={`mt-4 p-2 rounded-lg text-center text-[10px] font-bold uppercase tracking-wider ${msg.includes("failed") ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
              {msg}
            </div>
          )}
        </div>

        {/* Compact Footer */}
        <div className="py-4 bg-stone-50 border-t border-stone-100 text-center">
            <p className="text-stone-400 text-[10px] font-medium">
              New user? <Link to="/register" className="font-bold ml-1 transition-colors hover:text-stone-800" style={{ color: GOLD }}>Request Access</Link>
            </p>
        </div>
      </div>

      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=DM+Sans:wght@400;700&display=swap" rel="stylesheet" />
    </div>
  );
};

export default Login;