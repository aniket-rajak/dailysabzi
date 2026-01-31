"use client";

import { motion } from "framer-motion";
import { Mail, Lock, Home, Eye, EyeOff, UserPlus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const isValid = email.includes("@") && password.length >= 6;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid) {
      setError("Please enter a valid email and password (min 6 chars)");
      return;
    }

    setError("");
    // 🔐 call login API / next-auth signIn here
    console.log({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8"
      >
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl sm:text-3xl font-bold text-center text-emerald-700"
        >
          Welcome Back
        </motion.h1>

        <p className="text-center text-gray-500 text-sm mt-2">
          Login to continue 🥬
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500 w-5 h-5" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500 w-5 h-5" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-12 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />

            <motion.button
              type="button"
              whileTap={{ scale: 0.85 }}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </motion.button>
          </div>

          {/* Error */}
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-red-500"
            >
              {error}
            </motion.p>
          )}

          {/* Login Button */}
          <motion.button
            whileHover={isValid ? { scale: 1.03 } : {}}
            whileTap={isValid ? { scale: 0.97 } : {}}
            disabled={!isValid}
            className={`w-full py-2 rounded-lg font-semibold transition
              ${
                isValid
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "bg-emerald-200 text-white cursor-not-allowed"
              }`}
          >
            Login
          </motion.button>
        </form>

        {/* Footer */}
        <div className="mt-6 flex justify-between items-center text-sm">
          <Link
            href="/"
            className="flex items-center gap-1 text-emerald-600 hover:underline"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>

          <Link
            href="/register"
            className="flex items-center gap-1 text-gray-600 hover:underline"
          >
            <UserPlus className="w-4 h-4" />
            Register
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
