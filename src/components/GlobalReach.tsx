"use client";

import { motion } from "motion/react";
import { Globe } from "lucide-react";

export function GlobalReach() {
  const regions = [
    { name: "North America", icon: "🇺🇸" },
    { name: "Europe", icon: "🇪🇺" },
    { name: "Asia Pacific", icon: "🌏" },
    { name: "Middle East", icon: "🌍" },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#0163c6]/5 rounded-full blur-3xl -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#073265]/5 rounded-full blur-3xl -translate-y-1/2"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block mb-6"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.8 }}
          >
            <Globe className="w-10 h-10 text-[#0163c6]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl text-gray-900 mb-6"
          >
            <span className="bg-gradient-to-r from-[#0163c6] to-[#073265] bg-clip-text text-transparent">
              Global Reach,
            </span>{" "}
            Local Expertise
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-gray-600 text-xl max-w-3xl mx-auto mb-12"
          >
            We serve companies across the globe, helping them establish and scale their operations in India.
          </motion.p>
        </motion.div>

        {/* Regions Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {regions.map((region, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 60px rgba(1, 99, 198, 0.15)",
              }}
              className="bg-white border-2 border-gray-200 hover:border-[#0163c6]/40 rounded-2xl p-8 text-center transition-all duration-300 shadow-lg"
            >
              <motion.div
                className="text-6xl mb-4"
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                {region.icon}
              </motion.div>
              <h3 className="text-gray-900 text-2xl">{region.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}