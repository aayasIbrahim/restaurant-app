"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface SignUpData { 
  firstName: string; 
  lastName: string; 
  mobile: string; 
  email: string; 
  password: string; 
}

interface SignUpErrors { 
  firstName?: string; 
  lastName?: string; 
  mobile?: string; 
  email?: string; 
  password?: string; 
  general?: string; 
}

export default function SignUp() {
  const router = useRouter();
  const [signup, setSignUp] = useState<SignUpData>({ 
    firstName: "", 
    lastName: "", 
    mobile: "", 
    email: "", 
    password: "" 
  });

  const [errors, setErrors] = useState<SignUpErrors>({});
  const [loading, setLoading] = useState(false);
  const [showConfirmMessage, setShowConfirmMessage] = useState(false);

  const validate = () => {
    const newErrors: SignUpErrors = {};
    if (!signup.firstName.trim()) newErrors.firstName = "First name is required";
    if (!signup.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!signup.mobile.trim()) newErrors.mobile = "Mobile number is required";
    else if (!/^\d{10,15}$/.test(signup.mobile)) newErrors.mobile = "Enter a valid mobile number";
    if (!signup.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(signup.email)) newErrors.email = "Email is invalid";
    if (!signup.password.trim()) newErrors.password = "Password is required";
    else if (signup.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSignUp({ ...signup, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch(`api/register`, { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(signup) 
      });

      const data = await res.json();
      if (res.ok) setShowConfirmMessage(true);
      else setErrors({ general: data.message });
    } catch { 
      setErrors({ general: "Network or server error" }); 
    }
    finally { setLoading(false); }
  };

  if (showConfirmMessage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.6 }} 
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md text-center border border-white/10"
        >
          <h2 className="text-2xl font-bold text-green-500 mb-4">Registration Successful!</h2>
          <p className="text-white/80 mb-6">Please check your email and <span className="text-pink-500 italic">confirm your registration</span>.</p>
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            onClick={() => router.push("/login")} 
            className="w-full py-3 bg-pink-600 text-white rounded-xl font-semibold"
          >
            Go to Login
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 40 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.7 }} 
        className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md border border-white/10 shadow-2xl"
      >
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-2xl font-bold text-white text-center mb-6"
        >
          Create Your Account
        </motion.h2>
        <form onSubmit={handleSignUp} className="space-y-4" noValidate>
          
          {/* First Name */}
          <motion.input 
            whileFocus={{ scale: 1.02 }} 
            type="text" 
            name="firstName" 
            placeholder="First Name" 
            value={signup.firstName} 
            onChange={onInputChange} 
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-gray-500 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400" 
          />
          {errors.firstName && <p className="text-red-400 text-sm">{errors.firstName}</p>}

          {/* Last Name */}
          <motion.input 
            whileFocus={{ scale: 1.02 }} 
            type="text" 
            name="lastName" 
            placeholder="Last Name" 
            value={signup.lastName} 
            onChange={onInputChange} 
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-gray-500 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400" 
          />
          {errors.lastName && <p className="text-red-400 text-sm">{errors.lastName}</p>}

          {/* Mobile Number */}
          <motion.input 
            whileFocus={{ scale: 1.02 }} 
            type="text" 
            name="mobile" 
            placeholder="Mobile Number" 
            value={signup.mobile} 
            onChange={onInputChange} 
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-gray-500 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400" 
          />
          {errors.mobile && <p className="text-red-400 text-sm">{errors.mobile}</p>}

          {/* Email */}
          <motion.input 
            whileFocus={{ scale: 1.02 }} 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={signup.email} 
            onChange={onInputChange} 
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-gray-500 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400" 
          />
          {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}

          {/* Password */}
          <motion.input 
            whileFocus={{ scale: 1.02 }} 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={signup.password} 
            onChange={onInputChange} 
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-gray-500 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400" 
          />
          {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}

          {errors.general && <p className="text-red-400 text-sm">{errors.general}</p>}

          <motion.button 
            whileHover={{ scale: 1.03 }} 
            whileTap={{ scale: 0.97 }} 
            type="submit" 
            disabled={loading} 
            className="w-full py-3 bg-pink-600 text-white rounded-xl font-semibold"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </motion.button>
        </form>

        <motion.p className="text-white text-center mt-4 text-sm">
          Already have an account?{" "}
          <span 
            onClick={() => router.push("/login")} 
            className="text-pink-500 cursor-pointer hover:underline"
          >
            Login
          </span>
        </motion.p>
      </motion.div>
    </div>
  );
}
