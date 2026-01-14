"use client";

import { motion } from "motion/react";

export function SimpleExpansion() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      {/* Animated 3D grid background */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(1, 99, 198, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(1, 99, 198, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          transform: "perspective(1000px) rotateX(50deg) translateZ(-300px)",
          transformOrigin: "center center",
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl text-gray-900 mb-6"
          >
            A Simple Way to{" "}
            <motion.span 
              className="bg-gradient-to-r from-[#0163c6] to-[#073265] bg-clip-text text-transparent inline-block"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              Expand into India
            </motion.span>
          </motion.h2>
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.p
              className="text-gray-700 text-xl mb-6 leading-relaxed"
            >
              Expanding into India brings massive opportunity — but also operational complexity.
            </motion.p>

            <motion.p
              className="text-gray-600 text-lg mb-8 leading-relaxed"
            >
              Legal setup, payroll, compliance, HR operations, laptops, and team management can slow you down.
            </motion.p>

            <motion.div
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 60px rgba(1, 99, 198, 0.2)",
              }}
              className="bg-gradient-to-r from-[#0163c6]/5 to-[#073265]/5 border border-[#0163c6]/20 rounded-2xl p-8 relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#0163c6]/5 to-[#073265]/5"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <p className="text-[#0163c6] text-xl leading-relaxed relative z-10">
                YourIndiaPartner simplifies the entire process by acting as your local India operations partner.
              </p>
            </motion.div>
          </motion.div>

          {/* Right side - Visual elements with 3D cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "⚖️", text: "Legal Setup" },
                { icon: "💰", text: "Payroll" },
                { icon: "✓", text: "Compliance" },
                { icon: "👥", text: "HR Operations" },
                { icon: "💻", text: "IT Assets" },
                { icon: "🏢", text: "Infrastructure" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotateY: 5,
                    boxShadow: "0 20px 60px rgba(1, 99, 198, 0.2)",
                    z: 50,
                  }}
                  className="bg-white border-2 border-[#0163c6]/20 hover:border-[#0163c6]/40 rounded-xl p-6 text-center relative overflow-hidden shadow-lg"
                  style={{
                    perspective: "1000px",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#0163c6]/5 to-[#073265]/5"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 0.5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  />
                  <div className="text-4xl mb-3 relative z-10">{item.icon}</div>
                  <p className="text-gray-700 relative z-10">{item.text}</p>
                </motion.div>
              ))}
            </div>

            {/* Enhanced decorative elements */}
            <motion.div
              className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-2xl"
              style={{ backgroundColor: "rgba(1, 99, 198, 0.1)" }}
              animate={{
                scale: [1, 1.3, 1],
                backgroundColor: ["rgba(1, 99, 198, 0.1)", "rgba(1, 99, 198, 0.2)", "rgba(1, 99, 198, 0.1)"],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-2xl"
              style={{ backgroundColor: "rgba(7, 50, 101, 0.1)" }}
              animate={{
                scale: [1, 1.2, 1],
                backgroundColor: ["rgba(7, 50, 101, 0.1)", "rgba(7, 50, 101, 0.2)", "rgba(7, 50, 101, 0.1)"],
              }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}