"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "next-auth/react";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  mobile: string;
  role: "user" | "deliveryboy" | "admin";
  image?: string;
}

const Nav = ({ user }: { user: IUser }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#006045] text-white w-full shadow-md relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-xl font-semibold tracking-wide">
            Daily Sabzi🥕
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-white rounded-full px-3 py-1 w-72">
            <input
              type="text"
              placeholder="Search..."
              className="outline-none text-black w-full px-2 text-sm"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <a href="/" className="hover:text-green-300 transition">
              Home
            </a>

            <a href="/orders" className="hover:text-green-300 transition">
              Orders
            </a>

            <a href="/profile" className="hover:text-green-300 transition">
              Profile
            </a>

            {/* User */}
            <div className="flex items-center gap-2 bg-[rgb(0,153,102)] px-3 py-1 rounded-lg">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              ) : (
                <div className="w-8 h-8 bg-white text-[#006045] flex items-center justify-center rounded-full font-semibold">
                  {user?.name?.charAt(0)}
                </div>
              )}

              {/* <div>
                <span className="text-sm pe-2">
                  <strong>{user?.name}</strong>
                </span>
                <span className="text-sm">[{user?.role}]</span>
              </div> */}
              <span className="text-sm uppercase font-bold">{user?.name}</span>
            </div>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1 cursor-pointer"
          >
            <span className="w-6 h-[2px] bg-white"></span>
            <span className="w-6 h-[2px] bg-white"></span>
            <span className="w-6 h-[2px] bg-white"></span>
          </button>
        </div>
      </div>

      {/* Mobile Slider Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35 }}
            className="fixed top-0 right-0 h-full w-72 bg-[#004d37] shadow-lg z-50 p-6"
          >
            {/* Close Button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="text-white mb-6 cursor-pointer"
            >
              ✕
            </button>

            {/* Search */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-3 py-2 rounded bg-white text-black outline-none"
              />
            </div>

            {/* Links */}
            <div className="flex flex-col gap-4 text-lg">
              <a href="/" onClick={() => setMenuOpen(false)}>
                Home
              </a>

              <a href="/orders" onClick={() => setMenuOpen(false)}>
                Orders
              </a>

              <a href="/profile" onClick={() => setMenuOpen(false)}>
                Profile
              </a>
              <a
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="cursor-pointer"
              >
                Logout
              </a>
            </div>

            {/* User */}
            <div className="mt-10 flex items-center gap-3 border-t border-green-700 pt-6">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className="w-10 h-10 bg-white text-[#006045] flex items-center justify-center rounded-full font-semibold">
                  {user?.name?.charAt(0)}
                </div>
              )}

              <div>
                <p className="font-semibold uppercase font-bold">
                  {user?.name}
                </p>
                <p className="text-sm opacity-80">{user?.email}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Nav;
