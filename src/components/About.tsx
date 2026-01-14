"use client";

import { motion } from "motion/react";
import { Users, TrendingUp, Award, Target } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function About() {
  const highlights = [
    {
      icon: Users,
      value: "30+",
      label: "Years Combined Experience",
    },
    {
      icon: TrendingUp,
      value: "100%",
      label: "Client Satisfaction",
    },
    {
      icon: Award,
      value: "50+",
      label: "Successful Projects",
    },
    {
      icon: Target,
      value: "24/7",
      label: "Support Available",
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-gray-50/50 to-white overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(237, 89, 36, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(237, 89, 36, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
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
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="bg-gradient-to-r from-[#ED5924]/10 to-[#FF8C42]/10 border border-[#ED5924]/30 text-[#ED5924] px-4 py-2 rounded-full text-sm">
              About Aura Harks Technology
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl text-gray-900 mb-6"
          >
            <span className="bg-gradient-to-r from-[#ED5924] to-[#FF8C42] bg-clip-text text-transparent">
              WE HELP CLIENTS
            </span>
            <br />
            INVENT THEIR FUTURE
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Aura Harks Technology is a trusted technology partner helping businesses navigate complex digital challenges. 
            Our team combines deep technical expertise with industry insight to deliver scalable, future-ready solutions 
            that drive growth and efficiency.
          </motion.p>
        </motion.div>

        {/* Highlights Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-8 mb-16"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 40px rgba(237, 89, 36, 0.15)",
              }}
              className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl p-8 text-center relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#ED5924]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              
              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#ED5924]/10 to-[#FF8C42]/10 rounded-full mb-4"
                >
                  <item.icon className="w-8 h-8 text-[#ED5924]" />
                </motion.div>
                
                <div className="text-4xl text-gray-900 mb-2">
                  {item.value}
                </div>
                
                <div className="text-gray-600">
                  {item.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-3xl p-12 mb-16"
        >
          <h3 className="text-3xl text-gray-900 mb-8 text-center">
            Why Choose <span className="text-[#ED5924]">Aura Harks Technology</span>?
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🚀</div>
              <h4 className="text-xl text-gray-900 mb-2">Innovation Driven</h4>
              <p className="text-gray-600">
                Cutting-edge solutions powered by the latest technologies and best practices.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl mb-4">🤝</div>
              <h4 className="text-xl text-gray-900 mb-2">Client Focused</h4>
              <p className="text-gray-600">
                Your success is our priority. We build lasting partnerships based on trust.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h4 className="text-xl text-gray-900 mb-2">Results Oriented</h4>
              <p className="text-gray-600">
                Delivering measurable outcomes that drive real business value.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Team & Collaboration Images */}
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ 
              y: -10,
              boxShadow: "0 25px 50px rgba(237, 89, 36, 0.2)",
            }}
            className="relative rounded-3xl overflow-hidden shadow-xl group"
          >
            <div className="aspect-[4/3] relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1748346918817-0b1b6b2f9bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB0ZWFtd29ya3xlbnwxfHx8fDE3NjgzMjY1Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Modern office teamwork collaboration"
                className="w-full h-full object-cover"
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-[#ED5924]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <h4 className="text-xl mb-2">Collaborative Excellence</h4>
                <p className="text-sm text-white/90">Working together to achieve extraordinary results</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ 
              y: -10,
              boxShadow: "0 25px 50px rgba(237, 89, 36, 0.2)",
            }}
            className="relative rounded-3xl overflow-hidden shadow-xl group"
          >
            <div className="aspect-[4/3] relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1737573477556-ac3ed2db618c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwc3RhcnR1cCUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzY4Mzc0MDY5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Tech startup collaboration and innovation"
                className="w-full h-full object-cover"
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-[#ED5924]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <h4 className="text-xl mb-2">Innovation Hub</h4>
                <p className="text-sm text-white/90">Driving digital transformation through technology</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ 
              y: -10,
              boxShadow: "0 25px 50px rgba(237, 89, 36, 0.2)",
            }}
            className="relative rounded-3xl overflow-hidden shadow-xl group"
          >
            <div className="aspect-[4/3] relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1496180470114-6ef490f3ff22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzY4Mjk2NTI3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Professional business meeting and strategy"
                className="w-full h-full object-cover"
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-[#ED5924]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <h4 className="text-xl mb-2">Strategic Planning</h4>
                <p className="text-sm text-white/90">Crafting solutions that align with your vision</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative gradient orbs */}
      <motion.div 
        className="absolute top-1/4 right-0 w-96 h-96 bg-[#ED5924]/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </section>
  );
}