"use client";

import { motion } from "motion/react";
import { CheckCircle, Focus, Settings, Zap, Heart, Briefcase } from "lucide-react";

export function WhyUs() {
  const features = [
    {
      icon: Focus,
      title: "India-Focused Expertise",
      description: "Not a generic global platform",
    },
    {
      icon: Briefcase,
      title: "IT & Technology Roles",
      description: "Strong understanding of IT and technology roles",
    },
    {
      icon: Settings,
      title: "Customized Engagement",
      description: "No rigid templates — tailored to your needs",
    },
    {
      icon: Zap,
      title: "Hands-On Support",
      description: "Active operational support throughout",
    },
    {
      icon: Heart,
      title: "Founder-Friendly",
      description: "Execution-driven approach that understands startups",
    },
    {
      icon: CheckCircle,
      title: "Team Extension",
      description: "We work as an extension of your team",
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
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
              Why YourIndiaPartner
            </span>
          </motion.h2>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, rotateX: -20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 60px rgba(1, 99, 198, 0.15)",
                }}
                className="bg-white border-2 border-gray-200 hover:border-[#0163c6]/40 rounded-2xl p-6 transition-all duration-300 shadow-lg"
              >
                <motion.div
                  className="w-14 h-14 bg-gradient-to-r from-[#0163c6] to-[#073265] rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-[#0163c6]/20"
                  whileHover={{ 
                    rotate: [0, -10, 10, -10, 0],
                    scale: 1.1,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </motion.div>

                <h3 className="text-gray-900 text-xl mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-[#0163c6]/10 to-[#073265]/10 border border-[#0163c6]/20 rounded-2xl p-8 shadow-lg"
        >
          <p className="text-[#0163c6] text-xl mb-4">
            We're your dedicated India operations team — not a vendor.
          </p>
          <p className="text-gray-600 text-lg">
            Partner with us for India-focused expertise, customized solutions, and hands-on operational support.
          </p>
        </motion.div>
      </div>
    </section>
  );
}