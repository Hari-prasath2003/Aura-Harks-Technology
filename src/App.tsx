"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { Loader } from "./components/Loader";
import { Logo } from "./components/Logo";
import { Hero } from "./components/Hero";
import { ClientLogos } from "./components/ClientLogos";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { PricingPlans } from "./components/PricingPlans";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { PopupForm } from "./components/PopupForm";
import { FloatingContactButton } from "./components/FloatingContactButton";
import { usePopupManager } from "./hooks/usePopupManagerSupabase";
import { PageLoadDetector } from "./utils/pageLoadDetector";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const whatsappNumber = "+917845493857"; // Updated WhatsApp number
  const email = "info@auraharkstechnology.com";

  // Detect page load issues
  useEffect(() => {
    console.log('🎯 App component mounted');
    
    // Track mount timing for StrictMode detection
    const currentTime = Date.now();
    const mountTimes = (window as any).__appMountTimes || [];
    mountTimes.push(currentTime);
    (window as any).__appMountTimes = mountTimes;
    
    // Increment mount count
    const mountCount = (window as any).__appMountCount || 0;
    (window as any).__appMountCount = mountCount + 1;
    
    if ((window as any).__appMountCount === 2) {
      // Check if mounts happened very close together (StrictMode pattern)
      if (mountTimes.length >= 2) {
        const timeDiff = mountTimes[1] - mountTimes[0];
        
        if (timeDiff < 100) {
          // Very quick re-mount = likely StrictMode
          console.log('ℹ️ React StrictMode detected (development mode)');
          console.log('   This is expected behavior - components mount twice to detect side effects');
          console.log('   StrictMode will be disabled automatically in production builds');
        } else {
          // Slower re-mount = potential issue
          console.warn(`⚠️ App component mounted ${(window as any).__appMountCount} times`);
          console.warn(`   Time between mounts: ${timeDiff}ms`);
          console.warn('   This may indicate a real issue - check for duplicate renders');
        }
      }
    } else if ((window as any).__appMountCount > 2) {
      console.warn(`⚠️ App component mounted ${(window as any).__appMountCount} times - investigate component re-mounting`);
    }
    
    return () => {
      console.log('🎯 App component unmounting');
    };
  }, []);

  // Popup form management - only start after loading is complete
  const { 
    isPopupOpen, 
    animationType,
    showFloatingButton,
    handleClosePopup, 
    handleSubmitForm,
    handleOpenPopup,
  } = usePopupManager(!isLoading); // Pass the ready state

  const navItems = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Pricing Plans", href: "#pricing" },
    { name: "Impact", href: "#impact" },
  ];

  return (
    <>
      <Loader onLoadingComplete={() => setIsLoading(false)} />
      
      {!isLoading && (
<<<<<<< HEAD
        <div className="min-h-screen bg-white overflow-x-hidden" style={{ position: 'relative', willChange: 'auto' }}>
          {/* Navigation */}
          <motion.nav
            key="main-nav"
=======
        <div className="min-h-screen bg-white overflow-x-hidden" style={{ position: 'relative' }}>
          {/* Navigation */}
          <motion.nav
>>>>>>> 4c5cc588bb627e431d6de5adba19448e5ae149f7
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm"
<<<<<<< HEAD
            style={{ position: 'fixed', willChange: 'transform' }}
=======
            style={{ position: 'fixed' }}
>>>>>>> 4c5cc588bb627e431d6de5adba19448e5ae149f7
          >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
              >
                <Logo size="sm" />
              </motion.div>
              
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                    whileHover={{ 
                      y: -2,
                    }}
                    className="text-gray-600 hover:text-[#f46429] transition-all duration-300 relative group"
                  >
                    {item.name}
                    <motion.div
                      className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#f46429] to-[#ff8c42]"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                ))}
                <motion.a
                  href={`https://wa.me/${whatsappNumber}?text=Hello%2C%20I%20would%20like%20to%20schedule%20a%20consultation%20about%20building%20an%20IT%20team%20in%20India.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 40px rgba(244, 100, 41, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#f46429] to-[#ff8c42] text-white px-6 py-2 rounded-full shadow-lg shadow-[#f46429]/20 hover:shadow-xl hover:shadow-[#f46429]/30 transition-all duration-300 relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#ff8c42] to-[#f46429] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <span className="relative z-10">Book Consultation</span>
                </motion.a>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden relative z-50 p-2 text-gray-600 hover:text-[#f46429] transition-colors"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.nav>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-0 z-40 md:hidden bg-white/95 backdrop-blur-xl"
                style={{ paddingTop: '80px' }}
              >
                <div className="flex flex-col items-center justify-center h-full space-y-8 px-6">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-3xl text-gray-900 hover:text-[#f46429] transition-colors duration-300"
                    >
                      {item.name}
                    </motion.a>
                  ))}
                  <motion.a
                    href={`https://wa.me/${whatsappNumber}?text=Hello%2C%20I%20would%20like%20to%20schedule%20a%20consultation%20with%20Aura%20Harks%20Technology.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: navItems.length * 0.1 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="bg-gradient-to-r from-[#f46429] to-[#ff8c42] text-white px-8 py-4 rounded-full shadow-lg text-lg"
                  >
                    Book Consultation
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hero Section */}
          <section id="hero" className="relative">
            <Hero />
          </section>

          {/* Client Logos Section */}
          <section id="clients" className="relative">
            <ClientLogos />
          </section>

          {/* About Section */}
          <section id="about" className="relative">
            <About />
          </section>

          {/* Services Section */}
          <section id="services" className="relative">
            <Services />
          </section>

          {/* Pricing Plans Section */}
          <section id="pricing" className="relative">
            <PricingPlans />
          </section>

          {/* Testimonials Section */}
          <section id="impact" className="relative">
            <Testimonials />
          </section>

          {/* Contact Section */}
          <section id="contact" className="relative">
            <Contact />
          </section>

          {/* Footer */}
          <Footer />

          {/* Scroll to Top Button */}
          <ScrollToTop />

          {/* Popup Form */}
          <PopupForm
            isOpen={isPopupOpen}
            onClose={handleClosePopup}
            onSubmit={handleSubmitForm}
            animationType={animationType}
          />

          {/* Enhanced background ambient animation */}
          <div className="fixed inset-0 pointer-events-none z-0">
            <motion.div 
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
              style={{ background: "rgba(244, 100, 41, 0.08)" }}
              animate={{ 
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, -30, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
              style={{ background: "rgba(255, 140, 66, 0.08)" }}
              animate={{ 
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.3, 1],
                x: [0, -40, 0],
                y: [0, 20, 0]
              }}
              transition={{ duration: 10, delay: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute top-3/4 left-1/2 w-96 h-96 rounded-full blur-3xl"
              style={{ background: "rgba(20, 31, 53, 0.05)" }}
              animate={{ 
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.1, 1],
                x: [0, 30, 0],
                y: [0, -40, 0]
              }}
              transition={{ duration: 12, delay: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full blur-3xl"
              style={{ background: "rgba(244, 100, 41, 0.06)" }}
              animate={{ 
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.4, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 15, delay: 1, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Floating Contact Button */}
          <FloatingContactButton
            whatsappNumber={whatsappNumber}
            email={email}
            handleOpenPopup={handleOpenPopup}
            showFloatingButton={showFloatingButton}
          />
        </div>
      )}
    </>
  );
}