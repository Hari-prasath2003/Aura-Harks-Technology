"use client";

import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
import { useState } from "react";

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      client: "Quixent",
      location: "India",
      service: "HR & Payroll",
      website: "",
      testimonial: "Payroll processing, reporting, and recruitment have become seamless with Aura Harks. Their intuitive and compliant platform significantly reduced manual effort while maintaining accuracy and efficiency.",
      logo: "Q",
    },
    {
      client: "Aerosky Services",
      location: "UK",
      service: "Web Development",
      website: "www.aeroskyservices.com",
      testimonial: "Aura Harks delivered a fast, SEO-friendly website with a clean design and strong backend. Communication was clear, timelines were met, and post-launch support has been excellent.",
      logo: "A",
    },
    {
      client: "The Betzone",
      location: "UK",
      service: "Lottery Web Platform",
      website: "",
      testimonial: "Aura Harks is building our lottery platform with real-time ticketing, secure payments, and a scalable backend. Their technical expertise has been outstanding.",
      logo: "B",
    },
    {
      client: "GuruTech",
      location: "India",
      service: "EdTech Platform",
      website: "edugurutech.in",
      testimonial: "They transformed our ideas into a smooth, user-friendly platform that perfectly supports our operations. The final product exceeded expectations.",
      logo: "G",
    },
    {
      client: "Edgewater",
      location: "USA",
      service: "HR & Payroll",
      website: "",
      testimonial: "Aura Harks has been reliable, efficient, and detail-oriented. They've made our HR and payroll processes significantly smoother.",
      logo: "E",
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
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
              Client Success Stories
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl text-gray-900 mb-6"
          >
            What Our{" "}
            <span className="bg-gradient-to-r from-[#ED5924] to-[#FF8C42] bg-clip-text text-transparent">
              Clients Say
            </span>
          </motion.h2>
        </motion.div>

        {/* Main Featured Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-3xl p-12 relative overflow-hidden shadow-xl">
            <motion.div
              className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#ED5924]/10 to-transparent rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <div className="relative z-10">
              <Quote className="w-16 h-16 text-[#ED5924]/20 mb-6" />
              
              <p className="text-2xl text-gray-700 mb-8 leading-relaxed">
                "{testimonials[activeIndex].testimonial}"
              </p>

              <div className="flex items-center gap-6 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED5924] to-[#FF8C42] rounded-full flex items-center justify-center text-white text-2xl">
                  {testimonials[activeIndex].logo}
                </div>
                
                <div>
                  <div className="text-xl text-gray-900 mb-1">
                    {testimonials[activeIndex].client}
                  </div>
                  <div className="text-gray-600">
                    {testimonials[activeIndex].location} • {testimonials[activeIndex].service}
                  </div>
                  {testimonials[activeIndex].website && (
                    <div className="text-[#ED5924] text-sm">
                      {testimonials[activeIndex].website}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#ED5924] fill-current" />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Testimonial Selector Dots */}
        <div className="flex justify-center gap-3 mb-12">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveIndex(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "bg-[#ED5924] w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* All Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
              }}
              onClick={() => setActiveIndex(index)}
              className={`bg-white border ${
                activeIndex === index ? "border-[#ED5924]" : "border-gray-200"
              } rounded-2xl p-6 cursor-pointer transition-all duration-300`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#ED5924] to-[#FF8C42] rounded-full flex items-center justify-center text-white text-lg">
                  {testimonial.logo}
                </div>
                <div>
                  <div className="text-gray-900">{testimonial.client}</div>
                  <div className="text-sm text-gray-600">{testimonial.location}</div>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                "{testimonial.testimonial}"
              </p>
              
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#ED5924] fill-current" />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative gradient orbs */}
      <motion.div 
        className="absolute top-1/3 right-0 w-96 h-96 bg-[#ED5924]/10 rounded-full blur-3xl"
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
