"use client";

import { motion } from "motion/react";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Discovery & Planning",
      description: "We understand your hiring needs, team structure, and business goals to create a tailored India expansion plan.",
    },
    {
      number: "02",
      title: "Legal & Compliance Setup",
      description: "We handle entity registration, tax setup, and compliance — so you're fully covered under Indian law.",
    },
    {
      number: "03",
      title: "Talent Acquisition & Onboarding",
      description: "We recruit top IT talent, manage onboarding, and provide laptops, infrastructure, and workspace setup.",
    },
    {
      number: "04",
      title: "Ongoing HR & Payroll Management",
      description: "We run payroll, benefits, compliance reporting, and employee support — while you focus on product and growth.",
    },
  ];

  return (
    <section id="how-it-works" className="relative py-24 bg-gradient-to-b from-white via-blue-50/20 to-white overflow-hidden">
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
            How It{" "}
            <span className="bg-gradient-to-r from-[#0163c6] to-[#073265] bg-clip-text text-transparent">
              Works
            </span>
          </motion.h2>
        </motion.div>

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="flex gap-6 items-start"
            >
              {/* Step number */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-[#0163c6] to-[#073265] rounded-2xl flex items-center justify-center shadow-lg shadow-[#0163c6]/20"
              >
                <span className="text-white text-2xl">{step.number}</span>
              </motion.div>

              {/* Step content */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex-1 bg-white border-2 border-gray-200 hover:border-[#0163c6]/40 rounded-2xl p-8 hover:shadow-xl hover:shadow-[#0163c6]/10 transition-all duration-300"
              >
                <h3 className="text-gray-900 text-2xl mb-3">{step.title}</h3>
                <p className="text-gray-600 text-lg">{step.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}