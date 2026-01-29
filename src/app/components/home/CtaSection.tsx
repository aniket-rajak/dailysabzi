import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="py-20 bg-emerald-600 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-white animate-fade-up">
        Start Your Healthy Journey Today 🥦
      </h2>

      <p className="mt-4 text-emerald-100 animate-fade-up delay-150">
        Join thousands of happy customers ordering daily groceries online.
      </p>

      <Link
        href="/register"
        className="inline-block mt-8 px-8 py-3 bg-white text-emerald-700 font-semibold rounded-xl shadow hover:scale-105 transition animate-fade-up delay-300"
      >
        Get Started
      </Link>
    </section>
  );
}
