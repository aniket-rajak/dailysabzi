"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingCart, Leaf } from "lucide-react";
import HeroImageOne from "@/assets/Image/HeroImageOne.jpg";
import HeroImageTwo from "@/assets/Image/HeroImagetwo.jpg";
import HeroImageThree from "@/assets/Image/HeroImageThree.jpg";
import Image from "next/image";

const slides = [
  {
    title: "Farm Fresh Vegetables",
    subtitle: "DIRECT FROM THE FIELDS",
    desc: "Experience the crunch of vegetables harvested at dawn and delivered to your kitchen by noon.",
    img: HeroImageOne,
    accent: "text-emerald-400",
    btn: "bg-emerald-600",
  },
  {
    title: "Exotic Tropical Fruits",
    subtitle: "SWEET & REFRESHING",
    desc: "From sun-ripened mangoes to hydrating melons, bring the taste of the tropics to your table.",
    img: HeroImageTwo,
    accent: "text-yellow-400",
    btn: "bg-yellow-600",
  },

  {
    title: "Fresh Kitchen Herbs",
    subtitle: "AROMATIC ESSENTIALS",
    desc: "Elevate your cooking with fresh coriander, mint, and basil delivered while the dew is still on them.",
    img: HeroImageThree,
    accent: "text-lime-400",
    btn: "bg-lime-600",
  },
];

const HeroSection = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative w-full h-[65vh] min-h-[500px] overflow-hidden bg-neutral-900 group">
      {/* BACKGROUND LAYER */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* <img
            src={slides[index].img}
            alt={slides[index].title}
            className="w-full h-full object-cover"
          /> */}
          <Image
            src={slides[index].img}
            alt={slides[index].title}
            fill
            priority
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* CONTENT LAYER */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 h-full flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 mb-4"
            >
              <Leaf className={`w-5 h-5 ${slides[index].accent}`} />
              <span className="text-white/80 uppercase tracking-[0.3em] text-xs font-bold">
                {slides[index].subtitle}
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl font-black text-white mb-6 leading-[1.1]"
            >
              {slides[index].title}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-gray-300 text-base md:text-lg mb-8 max-w-lg leading-relaxed border-l-2 border-emerald-500/30 pl-4"
            >
              {slides[index].desc}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <button
                className={`flex items-center gap-2 ${slides[index].btn} hover:brightness-110 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg active:scale-95`}
              >
                <ShoppingCart size={18} />
                Shop Now
              </button>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 py-3 rounded-full font-bold transition-all">
                Explore More
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* INTERACTIVE CONTROLS */}
      <div className="absolute bottom-8 right-6 md:right-12 flex flex-col items-end gap-6 z-20">
        {/* Step Indicator */}
        <div className="flex gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className="group relative h-1 w-10 md:w-16 bg-white/20 rounded-full overflow-hidden transition-all"
            >
              {index === i && (
                <motion.div
                  layoutId="activeBar"
                  className="absolute inset-0 bg-white"
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  transition={{ duration: 6, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex gap-2 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          <button
            onClick={prevSlide}
            className="p-3 border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all bg-black/20 backdrop-blur-sm cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="p-3 border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all bg-black/20 backdrop-blur-sm cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Subtle Bottom Shade */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

      {/* Floating Badge (Extra Modern Touch) */}
      <div className="absolute top-10 right-10 hidden lg:block z-20">
        <div className="w-32 h-32 rounded-full border border-white/10 flex items-center justify-center backdrop-blur-sm bg-white/5 animate-spin-slow">
          <p className="text-[10px] text-white font-bold tracking-[0.2em] uppercase text-center p-4">
            Fresh • Organic • Daily • Quality •
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
