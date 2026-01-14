"use client";

import { motion } from "motion/react";
import logoImage from "figma:asset/1baf5e0bbca255384eb70755cb004662acdaf313.png";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  className?: string;
  clickable?: boolean;
}

export function Logo({ size = "md", animated = false, className = "", clickable = true }: LogoProps) {
  const sizeClasses = {
    sm: "h-10 w-10",
    md: "h-16 w-16",
    lg: "h-24 w-24",
  };

  const handleClick = () => {
    if (clickable) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const LogoContent = () => (
    <div 
      className={`flex items-center gap-3 ${clickable ? 'cursor-pointer' : ''} ${className}`}
      onClick={handleClick}
    >
      <motion.img
        src={logoImage}
        alt="Aura Harks Technology Logo"
        className={`${sizeClasses[size]} object-contain`}
        animate={animated ? {
          filter: [
            "drop-shadow(0 0 8px rgba(237, 89, 36, 0.3))",
            "drop-shadow(0 0 20px rgba(237, 89, 36, 0.6))",
            "drop-shadow(0 0 8px rgba(237, 89, 36, 0.3))",
          ],
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <div className="flex flex-col leading-none">
        <span className={`${size === 'lg' ? 'text-2xl' : size === 'md' ? 'text-xl' : 'text-lg'} font-bold text-gray-900`}>
          Aura Harks Technology
        </span>
        <span className="text-xs text-[#ED5924] tracking-wider">
          YOUR TRUSTED PARTNER IN TECH SOLUTIONS
        </span>
      </div>
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <LogoContent />
      </motion.div>
    );
  }

  return <LogoContent />;
}