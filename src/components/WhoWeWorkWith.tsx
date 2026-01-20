"use client";

import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Rocket, Code, Users, TrendingUp, Target } from "lucide-react";

export function WhoWeWorkWith() {
  const categories = [
    { icon: Rocket, text: "US and global startups" },
    { icon: Code, text: "SaaS and product companies" },
    { icon: TrendingUp, text: "Technology-driven organizations" },
    { icon: Target, text: "Founders building offshore or hybrid teams" },
    { icon: Users, text: "Companies hiring from 5 to 200+ IT professionals" },
  ];

  return (
    <section id="who" className="relative py-24 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#0163c6]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#073265]/5 rounded-full blur-3xl"></div>

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
            <span className="bg-gradient-to-r from-[#0163c6] to-[#073265] bg-clip-text text-transparent">
              Who We Work With
            </span>
          </motion.h2>
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          {/* Left side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative order-2 md:order-1"
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-3xl"></div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758518729685-f88df7890776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtZWV0aW5nJTIwb2ZmaWNlfGVufDF8fHx8MTc2NzI5MTE1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Professional Meeting"
                className="relative z-10 rounded-3xl shadow-2xl shadow-blue-500/20 w-full h-auto"
              />
            </motion.div>

            {/* Floating particles */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-cyan-400/40 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </motion.div>

          {/* Right side - Client Types */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <div className="space-y-4 mb-8">
              {categories.map((clientType, index) => {
                const Icon = clientType.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="flex items-center gap-4 bg-white border-2 border-gray-200 hover:border-[#0163c6]/40 rounded-xl p-5 hover:shadow-xl hover:shadow-[#0163c6]/10 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#0163c6] to-[#073265] rounded-lg flex items-center justify-center shadow-lg shadow-[#0163c6]/20">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-gray-800 text-lg">{clientType.text}</p>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#0163c6]/10 to-[#073265]/10 border border-[#0163c6]/20 rounded-2xl p-6 shadow-lg"
            >
              <p className="text-[#0163c6] text-xl mb-2">
                If you want control, quality, and compliance — we're the right partner.
              </p>
              <p className="text-gray-600">
                From early-stage startups to established enterprises, we scale with your needs.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}