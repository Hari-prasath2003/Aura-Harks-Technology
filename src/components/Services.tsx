"use client";

import { motion } from "motion/react";
import { Check, Code, Globe, Database, Brain, Users, DollarSign } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Services() {
  const servicesOverview = [
    "Responsive IT support and maintenance",
    "Workflow automation to improve efficiency",
    "Advanced data analytics for better decisions",
    "Robust cybersecurity solutions",
    "Smart HR management systems",
    "Automated payroll with tax and compliance handling",
  ];

  const detailedServices = [
    {
      icon: Code,
      title: "Product Development",
      description: "Innovation-driven development from concept to scalable product.",
    },
    {
      icon: Globe,
      title: "Web Development",
      description: "Design and development of secure, high-performance web applications.",
    },
    {
      icon: Database,
      title: "Data Analysis",
      description: "Transform raw data into actionable insights for smarter decision-making.",
    },
    {
      icon: Brain,
      title: "AI & ML Design and Development",
      description: "AI-powered solutions that enhance automation, personalization, and growth.",
    },
    {
      icon: Users,
      title: "HR Management",
      description: "Simplified onboarding, performance tracking, and compliance management.",
    },
    {
      icon: DollarSign,
      title: "Payroll Services",
      description: "Automated payroll processing with tax compliance and detailed reporting.",
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-blue-50/20 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
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
            <span className="bg-gradient-to-r from-[#ED5924] to-[#FF8C42] bg-clip-text text-transparent">
              BEST IT SOLUTION
            </span>
            <br />
            FOR YOUR BUSINESS
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-gray-600 text-xl max-w-4xl mx-auto leading-relaxed"
          >
            Every business has unique goals and constraints. We design and deliver custom IT solutions 
            that align precisely with your operational needs, helping you scale efficiently in a competitive digital landscape.
          </motion.p>
        </motion.div>

        {/* Key Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-3xl p-12">
            <h3 className="text-2xl text-gray-900 mb-8 text-center">Key Highlights</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicesOverview.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-[#ED5924] to-[#FF8C42] rounded-full flex items-center justify-center mt-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700">{service}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Detailed Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl text-gray-900 mb-12 text-center">Our Services</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {detailedServices.map((service, index) => (
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
                className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl p-8 group relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#ED5924]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#ED5924]/10 to-[#FF8C42]/10 rounded-2xl mb-6"
                  >
                    <service.icon className="w-8 h-8 text-[#ED5924]" />
                  </motion.div>
                  
                  <h4 className="text-xl text-gray-900 mb-3">
                    {service.title}
                  </h4>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Animated Learn More Link */}
                  <motion.a
                    href="#contact"
                    className="inline-flex items-center gap-2 mt-4 text-[#ED5924] group/link"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-sm">Learn More</span>
                    <motion.svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      initial={{ x: 0 }}
                      whileHover={{ x: 3 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </motion.svg>
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Featured Technology Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <h3 className="text-3xl text-gray-900 mb-12 text-center">
            Technology <span className="text-[#ED5924]">in Action</span>
          </h3>
          
<<<<<<< HEAD
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {/* Web Development Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -8,
                boxShadow: "0 20px 40px rgba(237, 89, 36, 0.2)",
              }}
              className="relative rounded-2xl overflow-hidden shadow-lg group bg-white"
            >
              <div className="aspect-square relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1763568258535-fa1066506571?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZyUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3Njg4MDczOTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Web Development"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h4 className="text-white text-lg mb-1">Web Development</h4>
                  <p className="text-white/80 text-sm">Modern web solutions</p>
                </div>
              </div>
            </motion.div>

            {/* Mobile App Development Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -8,
                boxShadow: "0 20px 40px rgba(237, 89, 36, 0.2)",
              }}
              className="relative rounded-2xl overflow-hidden shadow-lg group bg-white"
            >
              <div className="aspect-square relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1767449441925-737379bc2c4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudCUyMGRlc2lnbnxlbnwxfHx8fDE3Njg4MDczOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Mobile App Development"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h4 className="text-white text-lg mb-1">Mobile Apps</h4>
                  <p className="text-white/80 text-sm">iOS & Android solutions</p>
                </div>
              </div>
            </motion.div>

            {/* AI Solutions Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -8,
                boxShadow: "0 20px 40px rgba(237, 89, 36, 0.2)",
              }}
              className="relative rounded-2xl overflow-hidden shadow-lg group bg-white"
            >
              <div className="aspect-square relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjgzMDcwNzV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="AI Solutions"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h4 className="text-white text-lg mb-1">AI Solutions</h4>
                  <p className="text-white/80 text-sm">Intelligent automation</p>
                </div>
              </div>
            </motion.div>

            {/* Cloud Computing Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -8,
                boxShadow: "0 20px 40px rgba(237, 89, 36, 0.2)",
              }}
              className="relative rounded-2xl overflow-hidden shadow-lg group bg-white"
            >
              <div className="aspect-square relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1506399558188-acca6f8cbf41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGNvbXB1dGluZyUyMHNlcnZlcnN8ZW58MXx8fHwxNzY4NzE0NTY4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Cloud Computing"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h4 className="text-white text-lg mb-1">Cloud Computing</h4>
                  <p className="text-white/80 text-sm">Scalable infrastructure</p>
                </div>
              </div>
            </motion.div>
          </div>
          
=======
>>>>>>> 4c5cc588bb627e431d6de5adba19448e5ae149f7
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, rotateY: -20 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                boxShadow: "0 25px 50px rgba(237, 89, 36, 0.25)",
              }}
              className="relative rounded-3xl overflow-hidden shadow-xl group"
              style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
            >
              <div className="aspect-[4/3] relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1565229284535-2cbbe3049123?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBwcm9ncmFtbWluZyUyMGRldmVsb3BlcnxlbnwxfHx8fDE3NjgzNTk3MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Modern coding and software development"
                  className="w-full h-full object-cover"
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-[#ED5924]/90 via-[#ED5924]/50 to-transparent"
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1 }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <motion.h4 
                    className="text-2xl mb-2"
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Development Excellence
                  </motion.h4>
                  <motion.p 
                    className="text-sm text-white/90"
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Crafting clean, scalable code with modern frameworks and best practices
                  </motion.p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                rotateY: -5,
                boxShadow: "0 25px 50px rgba(237, 89, 36, 0.25)",
              }}
              className="relative rounded-3xl overflow-hidden shadow-xl group"
              style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
            >
              <div className="aspect-[4/3] relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc2ODMwNzc1OHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Data analytics and business intelligence"
                  className="w-full h-full object-cover"
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-[#ED5924]/90 via-[#ED5924]/50 to-transparent"
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1 }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <motion.h4 
                    className="text-2xl mb-2"
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Data-Driven Insights
                  </motion.h4>
                  <motion.p 
                    className="text-sm text-white/90"
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    Transforming complex data into actionable business intelligence
                  </motion.p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, rotateY: 20 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                rotateY: -5,
                boxShadow: "0 25px 50px rgba(237, 89, 36, 0.25)",
              }}
              className="relative rounded-3xl overflow-hidden shadow-xl group"
              style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
            >
              <div className="aspect-[4/3] relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjgzMDcwNzV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Artificial intelligence and machine learning"
                  className="w-full h-full object-cover"
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-[#ED5924]/90 via-[#ED5924]/50 to-transparent"
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1 }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <motion.h4 
                    className="text-2xl mb-2"
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    AI & Innovation
                  </motion.h4>
                  <motion.p 
                    className="text-sm text-white/90"
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    Leveraging artificial intelligence to automate and optimize processes
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Decorative gradient orbs */}
      <motion.div 
        className="absolute top-1/4 left-0 w-96 h-96 bg-[#ED5924]/10 rounded-full blur-3xl"
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
      <motion.div 
        className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#FF8C42]/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </section>
  );
}