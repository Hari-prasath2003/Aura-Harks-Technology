"use client";

import { motion } from "motion/react";
import { MapPin, Mail, Phone, Linkedin } from "lucide-react";

export function Contact() {
  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: "+91 78454 93857",
      href: "tel:+917845493857",
    },
    {
      icon: Mail,
      label: "Email",
      value: "info@auraharkstechnology.com",
      href: "mailto:info@auraharkstechnology.com",
    },
    {
      icon: MapPin,
      label: "Address",
      value: "Kumaran Kudil Main Rd, Parthasarathy Nagar, Mettukuppam, Thoraipakkam, Tamil Nadu – 600097",
      href: "https://maps.google.com/?q=Kumaran+Kudil+Main+Rd+Thoraipakkam+Tamil+Nadu+600097",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Company Page",
      href: "https://www.linkedin.com/company/aura-harks-technology",
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
              Get In Touch
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
              Contact
            </span>{" "}
            Us
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-gray-600 text-xl max-w-3xl mx-auto"
          >
            Ready to transform your business with cutting-edge technology? Let's start the conversation.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl text-gray-900 mb-4">
                Aura Harks Technology
              </h3>
              <p className="text-gray-600 text-lg mb-8">
                Your Trusted Partner in Tech Solutions
              </p>
            </div>

            {contactInfo.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                target={item.icon === Linkedin || item.icon === MapPin ? "_blank" : undefined}
                rel={item.icon === Linkedin || item.icon === MapPin ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                whileHover={{ 
                  x: 10,
                  boxShadow: "0 10px 30px rgba(237, 89, 36, 0.15)",
                }}
                className="flex items-start gap-4 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl p-6 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#ED5924]/10 to-[#FF8C42]/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-6 h-6 text-[#ED5924]" />
                </div>
                <div>
                  <div className="text-gray-500 text-sm mb-1">{item.label}</div>
                  <div className="text-gray-900">{item.value}</div>
                </div>
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#ED5924]/10 to-[#FF8C42]/10 border border-[#ED5924]/30 rounded-2xl p-8"
            >
              <h4 className="text-xl text-gray-900 mb-2">Office Hours</h4>
              <p className="text-gray-600">
                Monday - Friday: 9:00 AM - 6:00 PM IST<br />
                Saturday: 9:00 AM - 2:00 PM IST<br />
                Sunday: Closed
              </p>
            </motion.div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-xl h-full min-h-[600px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0!2d80.2!3d13.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAwJzAwLjAiTiA4MMKwMTInMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "600px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Aura Harks Technology Location"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative gradient orbs */}
      <motion.div 
        className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#ED5924]/10 rounded-full blur-3xl"
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