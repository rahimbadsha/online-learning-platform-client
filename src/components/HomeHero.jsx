// src/components/HomeHero.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: "Master Modern Web Development",
    subtitle: "Learn React, Node.js, and more from industry experts.",
    bg: "bg-[url('https://i.ibb.co/rRdTS90B/wave-haikei.png')] bg-cover bg-center",
    textColor: "text-white",
  },
  {
    title: "Join a Community of Learners",
    subtitle: "Connect, collaborate, and achieve more together.",
    bg: "bg-gradient-to-r from-purple-500 via-pink-500 to-red-400",
    textColor: "text-white",
  },
];

const HomeHero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000); // change slide every 5s

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full relative overflow-hidden min-h-[70vh] flex items-center justify-center">
      <AnimatePresence>
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 flex flex-col items-center justify-center px-4 text-center ${slides[current].bg}`}
        >
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 ${slides[current].textColor}`}
          >
            {slides[current].title}
          </h1>
          <p
            className={`text-lg sm:text-xl md:text-2xl max-w-2xl ${slides[current].textColor}`}
          >
            {slides[current].subtitle}
          </p>
          <button className="btn btn-primary btn-lg mt-6">
            Explore Courses
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HomeHero;
