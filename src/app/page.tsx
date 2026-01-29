import Image from "next/image";
import HeroSection from "./components/home/HeroSection";
import FeaturesSection from "./components/home/FeaturesSection";
import CtaSection from "./components/home/CtaSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      <HeroSection />
      <FeaturesSection />
      <CtaSection />
    </main>
  );
}
