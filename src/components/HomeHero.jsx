import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: "Master Modern Web Development",
    subtitle: "Learn React, Node.js, and more from industry experts.",
    bg: "bg-[url('https://i.ibb.co/rRdTS90B/wave-haikei.png')] bg-cover bg-center",
    textColor: "text-white",
    illustration: "https://i.ibb.co/67zmGg6y/learning.png",
  },
  {
    title: "Join a Community of Learners",
    subtitle: "Connect, collaborate, and achieve more together.",
    bg: "bg-gradient-to-r from-purple-500 via-pink-500 to-red-400",
    textColor: "text-white",
    illustration: "https://i.ibb.co/2YHv016Q/communitys.png",
  },
];

const HomeHero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000); 

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
          className={`absolute inset-0 flex flex-col md:flex-row items-center justify-center px-4 text-center md:text-left ${slides[current].bg}`}
        >
          {/* Text Section */}
          <div className="flex-1 md:pl-12">
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
          </div>

          {/* Illustration */}
          <div className="flex-1 mt-6 md:mt-0 md:ml-12">
            <img
              src={slides[current].illustration}
              alt="Illustration"
              className="w-64 md:w-96 mx-auto"
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HomeHero;
