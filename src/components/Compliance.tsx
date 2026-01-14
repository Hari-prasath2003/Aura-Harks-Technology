"use client";

import { motion } from "motion/react";
import { Shield, FileCheck, Lock, Scale, Award, CheckCircle } from "lucide-react";

export function Compliance() {
  const complianceItems = [
    {
      icon: FileCheck,
      title: "Tax & Statutory Compliance",
      description: "Full adherence to Indian tax laws and statutory requirements",
    },
    {
      icon: Scale,
      title: "Labor Law Compliance",
      description: "Complete alignment with Indian employment and labor regulations",
    },
    {
      icon: Award,
      title: "Regulatory Adherence",
      description: "Ongoing monitoring and compliance with changing Indian regulations",
    },
    {
      icon: CheckCircle,
      title: "Audit-Ready Operations",
      description: "Transparent, well-documented processes for audit readiness",
    },
    {
      icon: Lock,
      title: "Data Privacy & Security",
      description: "Secure handling of employee data and confidential information",
    },
    {
      icon: Shield,
      title: "Risk Mitigation",
      description: "Proactive identification and mitigation of compliance risks",
    },
  ];

  return (
    <section id="compliance" className="relative py-24 bg-gradient-to-b from-white via-blue-50/20 to-white overflow-hidden">
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
          <motion.div
            className="inline-block mb-6"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.8 }}
          >
            <Shield className="w-10 h-10 text-[#0163c6]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl text-gray-900 mb-6"
          >
            <span className="bg-gradient-to-r from-[#0163c6] to-[#073265] bg-clip-text text-transparent">
              Compliance & Legal
            </span>{" "}
            Handled
          </motion.h2>
        </motion.div>

        {/* Compliance Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {complianceItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 20px 60px rgba(1, 99, 198, 0.15)",
                }}
                className="bg-white border-2 border-gray-200 hover:border-[#0163c6]/40 rounded-2xl p-6 transition-all duration-300 shadow-lg"
              >
                <motion.div
                  className="w-14 h-14 bg-gradient-to-r from-[#0163c6] to-[#073265] rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-[#0163c6]/20"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </motion.div>

                <h3 className="text-gray-900 text-xl mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
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
            Full compliance, zero risk. We handle the complexity.
          </p>
          <p className="text-gray-600 text-lg">
            Your peace of mind is our priority. Every aspect of our operation adheres to Indian regulations 
            and international best practices.
          </p>
        </motion.div>
      </div>
    </section>
  );
}