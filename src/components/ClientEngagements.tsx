"use client";

import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Briefcase, Users, FileCheck, Laptop } from "lucide-react";

export function ClientEngagements() {
  const clients = [
    { icon: Users, text: "Hiring" },
    { icon: Briefcase, text: "Payroll Management" },
    { icon: FileCheck, text: "Statutory Compliance" },
    { icon: Laptop, text: "HR Operations" },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-blue-50/20 to-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0163c6]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#073265]/5 rounded-full blur-3xl"></div>

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
              Active Client Engagements
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
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#0163c6]/10 to-[#073265]/10 rounded-3xl blur-3xl"></div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1758599543152-a73184816eba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhhbmRzaGFrZSUyMHBhcnRuZXJzaGlwfGVufDF8fHx8MTc2NzMyNzM1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Business Partnership"
              className="relative z-10 rounded-3xl shadow-2xl shadow-blue-500/20 w-full h-auto"
            />
          </motion.div>

          {/* Right side - Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-xl">
              <h3 className="text-gray-900 text-2xl mb-4">
                Supporting Global Companies in India
              </h3>
              
              <p className="text-gray-600 text-lg mb-6">
                YourIndiaPartner is currently supporting a US-based trading company in setting up 
                and managing their India team.
              </p>

              <div className="mb-6">
                <p className="text-[#0163c6] mb-4">Our involvement includes:</p>
                <div className="grid grid-cols-2 gap-3">
                  {clients.map((client, index) => {
                    const Icon = client.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 bg-[#0163c6]/5 border border-[#0163c6]/20 rounded-lg p-3 hover:border-[#0163c6]/40 transition-colors"
                      >
                        <Icon className="w-5 h-5 text-[#0163c6]" />
                        <span className="text-gray-700">{client.text}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <p className="text-gray-600 mb-4">
                We also work with companies across technology, product, support, and digital platforms, 
                including sports-related ventures.
              </p>

              <div className="bg-[#0163c6]/5 border border-[#0163c6]/20 rounded-lg p-4">
                <p className="text-[#0163c6] text-sm italic">
                  Some client engagements operate under confidentiality.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}