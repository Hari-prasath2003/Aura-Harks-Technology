"use client";

import { motion } from "motion/react";
import { TrendingUp, Users, DollarSign, Clock, MessageCircle, Target } from "lucide-react";

export function WhyIndia() {
  const benefits = [
    {
      icon: Users,
      title: "Large Skilled Talent Pool",
      description: "Access to a large, skilled IT talent pool",
    },
    {
      icon: DollarSign,
      title: "Cost Efficiency",
      description: "Cost efficiency without compromising quality",
    },
    {
      icon: MessageCircle,
      title: "Strong Communication",
      description: "Strong English communication",
    },
    {
      icon: Clock,
      title: "Time-Zone Overlap",
      description: "Time-zone overlap with global teams",
    },
    {
      icon: TrendingUp,
      title: "Proven Scalability",
      description: "Proven scalability for long-term growth",
    },
    {
      icon: Target,
      title: "Strategic Destination",
      description: "A strategic growth destination, not just cost advantage",
    },
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
            Why India Continues to Be a{" "}
            <span className="bg-gradient-to-r from-[#0163c6] to-[#073265] bg-clip-text text-transparent">
              Global IT Hub
            </span>
          </motion.h2>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
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

                <h3 className="text-gray-900 text-xl mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}