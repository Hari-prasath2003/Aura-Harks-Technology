"use client";

import { motion } from "motion/react";
import { clientLogos, hasLogos } from "../assets/my-clients/index";

export function ClientLogos() {
  // Fallback client names if no logos are uploaded yet
  const fallbackClients = [
    "Quixent",
    "Aerosky Services",
    "The Betzone",
    "GuruTech",
    "Edgewater",
  ];

  // Use logos if available, otherwise use fallback names
  const displayItems = hasLogos ? clientLogos : fallbackClients.map(name => ({ name }));
  
  // Duplicate for seamless loop
  const scrollingItems = [...displayItems, ...displayItems];

  return (
    <section className="relative py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl text-gray-900 mb-4"
          >
            Our{" "}
            <span className="bg-gradient-to-r from-[#ED5924] to-[#FF8C42] bg-clip-text text-transparent">
              Esteemed Clients
            </span>
          </motion.h2>
        </motion.div>

        {/* Scrolling Logo Container */}
        <div className="relative">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

          {/* Scrolling logos */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-12"
              animate={{
                x: [0, -1000],
              }}
              transition={{
                x: {
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              {scrollingItems.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  className="flex-shrink-0 w-48 h-24 bg-white border border-gray-200 rounded-2xl flex items-center justify-center group hover:border-[#ED5924]/50 hover:shadow-lg transition-all duration-300 p-4"
                >
                  {hasLogos ? (
                    // Display logo image
                    <img
                      src={(item as any).src}
                      alt={(item as any).alt}
                      className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  ) : (
                    // Display text fallback
                    <div className="text-center">
                      <div className="text-2xl text-gray-900 group-hover:text-[#ED5924] transition-colors duration-300">
                        {(item as any).name}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Sub-text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center text-gray-600 mt-8"
        >
          Trusted by leading companies across the globe
        </motion.p>
      </div>
    </section>
  );
}