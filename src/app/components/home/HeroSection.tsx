import Link from "next/link";
import { LogIn, UserPlus } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="container mx-auto px-6 py-24 text-center">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-emerald-800 animate-fade-up">
        Fresh Groceries <br className="hidden sm:block" />
        Delivered to Your Door
      </h1>

      <p className="mt-6 max-w-2xl mx-auto text-gray-600 text-base sm:text-lg animate-fade-up delay-150">
        Farm fresh fruits vegetables & daily essentials delivered fast.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-up delay-300">
        <Link
          href="/login"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
        >
          <LogIn className="w-5 h-5" />
          Login
        </Link>

        <Link
          href="/register"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-emerald-600 text-emerald-700 font-semibold hover:bg-emerald-50 transition"
        >
          <UserPlus className="w-5 h-5" />
          Register
        </Link>
      </div>
    </section>
  );
}
