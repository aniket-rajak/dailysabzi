"use client";

import React, { useState } from "react";
import { User, ShieldCheck, Truck, Bike } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const roles = [
  { name: "User", icon: User },
  { name: "Admin", icon: ShieldCheck },
  { name: "Driver", icon: Bike },
];

const EditRoleMobile = () => {
  const [role, setRole] = useState("User");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/user/edit-role-mobile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role, mobile }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Something went wrong");
      } else {
        setMessage("✅ Updated successfully!");
      }
    } catch (error) {
      setMessage("❌ Error updating data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto mt-10 p-6 bg-white border border-[#006045]/20 rounded-xl shadow-md"
    >
      <h2 className="text-2xl font-bold text-[#006045] mb-6 text-center">
        Edit Role & Mobile
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Role Buttons */}
        <div>
          <label className="block text-sm font-medium text-[#006045] mb-2">
            Select Role
          </label>

          <div className="flex gap-3">
            {roles.map((item) => {
              const Icon = item.icon;
              const isActive = role === item.name;

              return (
                <motion.button
                  key={item.name}
                  type="button"
                  onClick={() => setRole(item.name)}
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    scale: isActive ? 1.08 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`flex-1 flex flex-col items-center justify-center gap-2 p-3 rounded-lg border
                  ${
                    isActive
                      ? "bg-[#006045] text-white border-[#006045] shadow-md"
                      : "bg-white text-[#006045] border-[#006045]/30 hover:bg-[#009966]/10"
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-sm font-medium">{item.name}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Mobile Input */}
        <div>
          <label className="block text-sm font-medium text-[#006045] mb-1">
            Mobile Number
          </label>

          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            placeholder="Enter mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full border border-[#006045]/30 focus:border-[rgb(0,153,102)] focus:ring-2 focus:ring-[#009966]/30 p-2 rounded-lg outline-none"
            required
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-[#006045] hover:bg-[#009966] transition text-white font-medium py-2 rounded-lg"
        >
          {loading ? "Updating..." : "Update"}
        </motion.button>
      </form>

      {/* Message Animation */}
      <AnimatePresence>
        {message && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 text-center text-sm text-[#006045]"
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EditRoleMobile;
