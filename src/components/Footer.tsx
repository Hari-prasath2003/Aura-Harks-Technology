"use client";

import { motion } from "motion/react";
import { MapPin, Mail, Phone, Linkedin, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  const whatsappNumber = "+917845493857";
  const email = "info@auraharkstechnology.com";
  const phone = "+917845493857";
  const linkedIn = "https://www.linkedin.com/company/aura-harks-technology";
  const location = "Kumaran Kudil Main Rd, Parthasarathy Nagar, Mettukuppam, Thoraipakkam, Tamil Nadu – 600097";

  const officeInfo = [
    { icon: MapPin, text: location, href: "https://maps.google.com/?q=Kumaran+Kudil+Main+Rd+Thoraipakkam+Tamil+Nadu+600097" },
    { icon: Mail, text: email, href: `mailto:${email}` },
    { icon: Phone, text: phone, href: `tel:${phone}` },
  ];

  const services = [
    { name: "Web Application Development", href: "#services" },
    { name: "Product Development", href: "#services" },
    { name: "Data Analysis", href: "#services" },
    { name: "AI & ML", href: "#services" },
    { name: "HR Management", href: "#services" },
    { name: "Payroll Services", href: "#services" },
  ];

  const quickLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Pricing Plans", href: "#pricing" },
    { name: "Impact", href: "#impact" },
    { name: "Contact Us", href: "#contact" },
  ];

  const socialLinks = [
    { icon: Linkedin, label: "LinkedIn", href: linkedIn },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-[#073265] to-gray-900 pt-20 pb-10 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(237, 89, 36, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(237, 89, 36, 0.08) 1px, transparent 1px)
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
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: "rgba(237, 89, 36, 0.08)" }}
          animate={{
            scale: [1, 1.2, 1],
            backgroundColor: ["rgba(237, 89, 36, 0.08)", "rgba(237, 89, 36, 0.12)", "rgba(237, 89, 36, 0.08)"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: "rgba(255, 140, 66, 0.08)" }}
          animate={{
            scale: [1, 1.3, 1],
            backgroundColor: ["rgba(255, 140, 66, 0.08)", "rgba(255, 140, 66, 0.12)", "rgba(255, 140, 66, 0.08)"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Main footer content */}
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Logo & Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mb-6"
            >
              <Logo size="md" />
            </motion.div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Your trusted partner in tech solutions, delivering analytics-driven insights for smarter decisions.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.2, 
                      y: -5,
                      boxShadow: "0 10px 30px rgba(237, 89, 36, 0.4)",
                    }}
                    className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 rounded-lg flex items-center justify-center hover:border-[#ED5924]/50 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5 text-white/70 hover:text-[#FF8C42] transition-colors" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Our Office */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white text-xl mb-6 relative inline-block">
              Our Office
              <motion.div
                className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-[#ED5924] to-[#FF8C42]"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: true }}
              />
            </h3>
            <div className="space-y-4">
              {officeInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-3 text-white/60 hover:text-[#FF8C42] transition-colors duration-300 cursor-pointer"
                  >
                    <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <a href={info.href} className="text-sm">{info.text}</a>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white text-xl mb-6 relative inline-block">
              Services
              <motion.div
                className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-[#ED5924] to-[#FF8C42]"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
              />
            </h3>
            <div className="space-y-3">
              {services.map((service, index) => (
                <motion.a
                  key={index}
                  href={service.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-white/60 hover:text-[#FF8C42] transition-all duration-300 text-sm group"
                >
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-[#ED5924]/50 group-hover:bg-[#FF8C42]"
                    whileHover={{ scale: 1.5 }}
                  />
                  {service.name}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white text-xl mb-6 relative inline-block">
              Quick Links
              <motion.div
                className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-[#ED5924] to-[#FF8C42]"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: 0.6, duration: 0.8 }}
                viewport={{ once: true }}
              />
            </h3>
            <div className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-white/60 hover:text-[#FF8C42] transition-all duration-300 text-sm group"
                >
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-white/40 text-sm">
            © 2026 Aura Harks Technology. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-white/40 hover:text-[#FF8C42] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/40 hover:text-[#FF8C42] transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-white/40 hover:text-[#FF8C42] transition-colors">
              Cookie Policy
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}