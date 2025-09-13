"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Login() {
  const router = useRouter();
  const [login, setLogin] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ✅ loading state

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setLogin({ ...login, [e.target.name]: e.target.value });
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true); // start loading

    const res = await signIn("credentials", {
      redirect: false,
      email: login.email,
      password: login.password,
    });

    setLoading(false); // stop loading

    if (res?.error) setError(res.error);
    else router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800 px-4">
      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 w-full max-w-md shadow-2xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-white text-center">Login</h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={login.email}
          onChange={onChange}
          className="w-full px-4 py-3 mb-4 rounded-xl bg-white/5 border border-gray-500 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={login.password}
          onChange={onChange}
          className="w-full px-4 py-3 mb-4 rounded-xl bg-white/5 border border-gray-500 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
          required
        />

        {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading} // disable while loading
          className={`w-full cursor-pointer py-4 rounded-xl font-semibold text-white transition duration-200 ${
            loading ? "bg-pink-400 cursor-not-allowed" : "bg-pink-600 hover:bg-pink-700"
          }`}
        >
          {loading ? "Logging in..." : "Login"} 
        </button>

        <p className="mt-4 text-white text-center text-sm">
          Don t have an account?{" "}
          <span
            onClick={() => router.push("/singUp")}
            className="text-pink-500 cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </motion.form>
    </div>
  );
}
