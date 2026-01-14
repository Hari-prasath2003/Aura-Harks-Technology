"use client";

import { motion } from "motion/react";
import { Check, Star } from "lucide-react";

export function PricingPlans() {
  const plans = [
    {
      name: "Basic",
      price: "$99",
      priceINR: "₹8,217",
      period: "per page",
      description: "Essential features, basic add-ons",
      features: [
        "Single Page Development",
        "Basic Layout & Styling",
        "Contact Form",
        "SEO Basics",
        "Mobile Responsive",
        "1 Round of Revisions",
        "7 Days Support",
      ],
      popular: false,
    },
    {
      name: "Silver",
      price: "$199",
      priceINR: "₹16,517",
      period: "per page",
      description: "Core services, advanced features",
      features: [
        "Multi-Page Development",
        "Custom Design System",
        "Advanced Animations",
        "Database Integration",
        "User Authentication",
        "API Integration",
        "2 Rounds of Revisions",
        "15 Days Support",
      ],
      popular: true,
    },
    {
      name: "Gold",
      price: "$299",
      priceINR: "₹24,817",
      period: "per page",
      description: "Premium features, enhanced capabilities",
      features: [
        "Complex Web Application",
        "Advanced Backend Logic",
        "Third-Party Integrations",
        "Payment Gateway Setup",
        "Admin Dashboard",
        "Analytics & Reporting",
        "3 Rounds of Revisions",
        "30 Days Support",
      ],
      popular: false,
    },
    {
      name: "Platinum",
      price: "Custom",
      priceINR: "Tailored",
      period: "pricing",
      description: "Enterprise solutions, unlimited capabilities",
      features: [
        "All Global Features Included",
        "Custom Development",
        "Unlimited Revisions",
        "Dedicated Team",
        "24/7 Priority Support",
        "Ongoing Maintenance",
        "Scalability Planning",
        "Training & Documentation",
      ],
      popular: false,
      isPlatinum: true,
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(237, 89, 36, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(237, 89, 36, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
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
              Transparent Pricing
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
              Web Development
            </span>
            <br />
            and Product Development Pricing
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-gray-600 text-xl max-w-3xl mx-auto"
          >
            Choose from structured pricing plans designed for businesses of all sizes.
          </motion.p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                boxShadow: plan.popular ? "0 30px 60px rgba(237, 89, 36, 0.25)" : "0 20px 40px rgba(0, 0, 0, 0.1)",
              }}
              className={`relative bg-white/80 backdrop-blur-xl border ${
                plan.popular ? "border-[#ED5924] shadow-xl shadow-[#ED5924]/20" : "border-gray-200"
              } rounded-3xl p-8 overflow-hidden group`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-[#ED5924] to-[#FF8C42] text-white px-6 py-2 text-sm rounded-bl-2xl flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current" />
                  Popular
                </div>
              )}

              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${
                  plan.popular ? "from-[#ED5924]/10 to-[#FF8C42]/10" : "from-gray-50 to-transparent"
                } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <div className="relative z-10">
                <h3 className="text-2xl text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-5xl text-gray-900">{plan.price}</span>
                    {!plan.isPlatinum && <span className="text-gray-600">/ {plan.period}</span>}
                  </div>
                  <div className="text-sm text-gray-500">
                    {plan.priceINR} {!plan.isPlatinum && `/ ${plan.period}`}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-600">
                      <Check className="w-5 h-5 text-[#ED5924] flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.a
                  href="https://wa.me/917845493857?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20your%20pricing%20plans."
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`block w-full text-center py-3 rounded-full transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-r from-[#ED5924] to-[#FF8C42] text-white shadow-lg shadow-[#ED5924]/20 hover:shadow-xl hover:shadow-[#ED5924]/30"
                      : "border-2 border-[#ED5924]/30 text-[#ED5924] hover:bg-[#ED5924]/5 hover:border-[#ED5924]/60"
                  }`}
                >
                  Get Started
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative gradient orbs */}
      <motion.div 
        className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#ED5924]/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </section>
  );
}
