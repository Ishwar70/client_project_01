import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, verifyOtp } from "../services/auth.service";

const GOLD = "#BFA13B";
const DARK = "#8e7421";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1 = register, 2 = verify
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const res = await registerUser(form);
      setMsg(res.msg || "OTP sent to your email");
      setStep(2);
    } catch (err) {
      setMsg(err.msg || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      await verifyOtp({ email: form.email, otp });
      setMsg("Registration Successful!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMsg(err.msg || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-stone-50 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-60 h-60 rounded-full blur-[70px] opacity-[0.08] pointer-events-none" style={{ background: GOLD }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-60 h-60 rounded-full blur-[70px] opacity-[0.08] pointer-events-none" style={{ background: DARK }} />

      <div className="w-full max-w-95 bg-white rounded-3xl relative z-10 overflow-hidden shadow-xl" style={{ border: `1px solid ${GOLD}10`, fontFamily: "'DM Sans', sans-serif" }}>
        <div className="h-1 w-full" style={{ background: `linear-gradient(to right, ${GOLD}, ${DARK})` }} />

        <div className="p-6 sm:p-7 flex flex-col">
          <div className="text-center mb-5">
            <h2 className="text-2xl font-bold text-stone-800" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {step === 1 ? "Create Account" : "Verify Email"}
            </h2>
            <p className="text-stone-400 text-[11px] tracking-wide uppercase">
              {step === 1 ? "Join our exclusive concierge" : "Enter the code sent to your email"}
            </p>
          </div>

          {step === 1 ? (
            <form onSubmit={handleRegister} className="space-y-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 ml-1">Name</label>
                <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required className="w-full px-4 py-2 rounded-xl border border-stone-100 bg-stone-50 focus:bg-white focus:border-[#BFA13B] outline-none text-sm" />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 ml-1">Email</label>
                <input type="email" name="email" placeholder="email@example.com" value={form.email} onChange={handleChange} required className="w-full px-4 py-2 rounded-xl border border-stone-100 bg-stone-50 focus:bg-white focus:border-[#BFA13B] outline-none text-sm" />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 ml-1">Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} name="password" placeholder="••••••••" value={form.password} onChange={handleChange} required className="w-full px-4 py-2 rounded-xl border border-stone-100 bg-stone-50 focus:bg-white focus:border-[#BFA13B] outline-none text-sm" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400">
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full py-3 rounded-xl text-white font-bold text-[11px] tracking-widest mt-2" style={{ background: `linear-gradient(135deg, ${GOLD} 0%, ${DARK} 100%)` }}>
                {loading ? "PROCESSING..." : "REGISTER NOW"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-4">
              <input type="text" placeholder="OTP CODE" value={otp} onChange={(e) => setOtp(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-center text-lg tracking-[0.4em] font-bold outline-none focus:border-[#BFA13B]" />
              <button type="submit" disabled={loading} className="w-full py-3 rounded-xl text-white font-bold text-[11px] tracking-widest" style={{ background: `linear-gradient(135deg, ${GOLD} 0%, ${DARK} 100%)` }}>
                {loading ? "VERIFYING..." : "CONFIRM OTP"}
              </button>
              <p className="text-center text-[10px] text-stone-400 cursor-pointer" onClick={() => setStep(1)}>← Change Email</p>
            </form>
          )}

          {msg && <p className="mt-4 text-[10px] font-bold text-center uppercase" style={{ color: msg.includes("failed") ? "red" : GOLD }}>{msg}</p>}
        </div>

        <div className="py-4 bg-stone-50 border-t border-stone-100 text-center">
            <p className="text-stone-400 text-[10px]">Already a member? <Link to="/login" className="font-bold ml-1" style={{ color: GOLD }}>Sign In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;