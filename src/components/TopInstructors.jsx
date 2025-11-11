import React from "react";
import { motion } from "framer-motion";

const instructors = [
  {
    name: "Abdur Rahim",
    photo: "https://i.ibb.co/KcH98w2R/2c7d99fe281ecd3bcd65ab915bac6dd5.jpg",
    bio: "Senior Frontend Engineer with 10+ years of experience.",
  },
  {
    name: "Tanmi Tanu",
    photo: "https://i.ibb.co/qLB7xVrK/girl.png",
    bio: "Backend Developer specializing in Node.js.",
  },
  {
    name: "Md Rahim Badsha",
    photo: "https://i.ibb.co/Z9vWYf4/tamim.jpg",
    bio: "UI/UX Designer and mentor.",
  },
];

const TopInstructors = () => {
  return (
    <div className="py-16 px-4 md:px-12 bg-base-100 dark:bg-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
        Top Instructors
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {instructors.map((inst, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            className="card bg-base-100 text-base-content dark:bg-gray-900 shadow-lg rounded-xl p-6 text-center hover:shadow-2xl transition"
          >
            <img
              src={inst.photo}
              alt={inst.name}
              className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold mb-1">{inst.name}</h3>
            <p className="text-sm">
              {inst.bio}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TopInstructors;
