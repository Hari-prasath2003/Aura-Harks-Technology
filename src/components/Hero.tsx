"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <div ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white pt-20">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-20"
          style={{ filter: 'brightness(1.2)' }}
        >
          <source src="https://cdn.pixabay.com/video/2022/12/07/142579-779165765_large.mp4" type="video/mp4" />
        </video>
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/80" />
      </div>

      {/* Parallax background grid */}
      <motion.div 
        className="absolute inset-0"
        style={{ y }}
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(1, 99, 198, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(1, 99, 198, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            transform: "perspective(1000px) rotateX(60deg) translateZ(-200px)",
            transformOrigin: "center top",
          }}
        />
      </motion.div>

      {/* Main content */}
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center"
        style={{ opacity, scale }}
      >
        {/* Left side - Text content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="inline-block mb-6"
          >
            <motion.span 
              className="bg-gradient-to-r from-[#ED5924]/10 to-[#FF8C42]/10 border border-[#ED5924]/30 text-[#ED5924] px-4 py-2 rounded-full text-sm relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#ED5924]/5 to-[#FF8C42]/5"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <span className="relative z-10">Aura Harks Technology</span>
            </motion.span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-5xl md:text-7xl text-gray-900 mb-6 leading-tight"
          >
            WE PROVIDE OUTSOURCED{" "}
            <motion.span 
              className="bg-gradient-to-r from-[#ED5924] to-[#FF8C42] bg-clip-text text-transparent relative inline-block"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              IT SERVICES & SOLUTIONS
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-gray-600 text-xl mb-8 leading-relaxed"
          >
            We empower businesses to optimize operations, enhance productivity, and drive growth in the digital age.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-[#ED5924] text-lg mb-8"
          >
            Our Automated Reporting and Analytics solutions deliver actionable insights to support faster, smarter business decisions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.a
              href="https://wa.me/917845493857?text=Hello%2C%20I%20would%20like%20to%20schedule%20a%20consultation%20with%20Aura%20Harks%20Technology."
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 20px 60px rgba(237, 89, 36, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#ED5924] to-[#FF8C42] text-white px-8 py-4 rounded-full shadow-lg shadow-[#ED5924]/20 hover:shadow-xl hover:shadow-[#ED5924]/30 transition-all duration-300 relative overflow-hidden group text-center"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#FF8C42] to-[#ED5924] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <span className="relative z-10">Get Started Today</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right side - Image with enhanced 3D effects */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative"
        >
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
            style={{
              perspective: "1000px",
            }}
          >
            {/* 3D layered glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-blue-600/30 to-cyan-600/30 rounded-3xl blur-2xl"
              animate={{
                scale: [1.1, 1, 1.1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
            
            <motion.div
              whileHover={{
                rotateY: 5,
                rotateX: 5,
                scale: 1.02,
              }}
              transition={{ duration: 0.3 }}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758873268663-5a362616b5a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwdGVhbSUyMGNvbGxhYm9yYXRpb24lMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzY4Mzc2MDczfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Diverse team collaborating in modern workspace"
                className="relative z-10 rounded-3xl shadow-2xl shadow-blue-500/20 w-full h-auto"
                style={{
                  transform: "translateZ(50px)",
                }}
              />
            </motion.div>
          </motion.div>

          {/* Enhanced floating particles with 3D depth */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: `blur(${Math.random() * 2}px)`,
              }}
              animate={{
                y: [0, -50, 0],
                x: [(Math.random() - 0.5) * 30, (Math.random() - 0.5) * -30, (Math.random() - 0.5) * 30],
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.8, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Enhanced decorative gradient orbs with depth */}
      <motion.div 
        className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
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
        className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
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
    </div>
  );
}