import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Expert Instructors",
    desc: "Learn from industry professionals with years of experience.",
  },
  {
    title: "Flexible Learning",
    desc: "Study at your own pace, anytime, anywhere.",
  },
  {
    title: "Certification",
    desc: "Get verified certificates for completed courses.",
  },
];

const WhyChooseUs = () => {
  return (
    <div className="py-24 px-4 md:px-12 mt-16 mb-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:fbg-gradient-to-r from-primary via-accent to-secondary rounded-3xl">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
        Why Choose Learnify
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            className="card bg-base-100 text-base-content dark:bg-gray-800 shadow-lg rounded-xl p-6 hover:shadow-2xl transition"
          >
            <h3 className="text-xl font-semibold mb-2 ">
              {feature.title}
            </h3>
            <p className="">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
