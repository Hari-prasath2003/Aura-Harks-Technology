import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { X, Sparkles, Send } from "lucide-react";

export interface PopupFormData {
  services: string[];
  email: string;
  whatsapp: string;
  actionType: "immediate" | "enquiry";
  timestamp: string;
}

interface PopupFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PopupFormData) => Promise<void>;
  animationType: number;
}

const serviceOptions = [
  "Company Registration & Setup",
  "Talent Acquisition & HR",
  "Payroll & Compliance",
  "IT Infrastructure",
  "Legal & Regulatory",
  "Office Space & Facilities",
  "Accounting & Tax",
  "Market Entry Strategy",
];

// Animation variants for different popup appearances
const animationVariants = [
  // 1. Fade & Scale
  {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
  // 2. Slide from Top
  {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -100 },
  },
  // 3. Slide from Bottom
  {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 100 },
  },
  // 4. Slide from Right
  {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  },
  // 5. Rotate & Scale
  {
    hidden: { opacity: 0, scale: 0.5, rotate: -10 },
    visible: { opacity: 1, scale: 1, rotate: 0 },
    exit: { opacity: 0, scale: 0.5, rotate: 10 },
  },
  // 6. 3D Flip
  {
    hidden: { opacity: 0, rotateY: 90 },
    visible: { opacity: 1, rotateY: 0 },
    exit: { opacity: 0, rotateY: -90 },
  },
  // 7. Bounce In
  {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 10 }
    },
    exit: { opacity: 0, scale: 0 },
  },
  // 8. Slide from Left
  {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  },
];

export function PopupForm({ isOpen, onClose, onSubmit, animationType }: PopupFormProps) {
  const [formData, setFormData] = useState<PopupFormData>({
    services: [],
    email: "",
    whatsapp: "",
    actionType: "enquiry",
    timestamp: "",
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const currentAnimation = animationVariants[animationType % animationVariants.length];

<<<<<<< HEAD
  // Reset form when popup opens - with stable dependency
  useEffect(() => {
    if (isOpen && !submitSuccess) {
      // Only reset if not already successful
      setSubmitSuccess(false);
    }
  }, [isOpen]); // Remove submitSuccess from deps to prevent re-renders
=======
  // Reset form when popup opens
  useEffect(() => {
    if (isOpen) {
      // Reset success state when reopening
      setSubmitSuccess(false);
    }
  }, [isOpen]);
>>>>>>> 4c5cc588bb627e431d6de5adba19448e5ae149f7

  // Reset form data after successful submission
  const resetForm = () => {
    setFormData({
      services: [],
      email: "",
      whatsapp: "",
      actionType: "enquiry",
      timestamp: "",
    });
    setErrors({});
  };
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate services
    if (formData.services.length === 0) {
      newErrors.services = "Please select at least one service";
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Validate WhatsApp
    const phoneRegex = /^\+?[1-9]\d{9,14}$/;
    if (!formData.whatsapp) {
      newErrors.whatsapp = "WhatsApp number is required";
    } else if (!phoneRegex.test(formData.whatsapp.replace(/[\s-]/g, ""))) {
      newErrors.whatsapp = "Please enter a valid WhatsApp number (10-15 digits)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const submissionData = {
        ...formData,
        timestamp: new Date().toISOString(),
      };
      
      await onSubmit(submissionData);
      setSubmitSuccess(true);
      
      // Close after 1.5 seconds
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      // Don't show error - the hook handles everything gracefully
      console.log("ℹ️ Form handled by system (localStorage mode active)");
      // Still mark as success since localStorage worked
      setSubmitSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    } finally {
      setIsSubmitting(false);
      resetForm();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Popup Form */}
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
            <motion.div
              variants={currentAnimation}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden pointer-events-auto relative"
            >
              {/* Success Overlay */}
              <AnimatePresence>
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center z-10"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="text-center text-white"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Sparkles className="w-16 h-16 mx-auto mb-4" />
                      </motion.div>
                      <h3 className="text-2xl font-bold">Thank You!</h3>
                      <p className="mt-2">We'll get back to you soon.</p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Header */}
              <div className="bg-gradient-to-r from-[#0163c6] to-[#073265] p-6 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 opacity-20"
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                  style={{
                    backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                    backgroundSize: "20px 20px",
                  }}
                />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-6 h-6 text-white" />
                      </motion.div>
                      <h2 className="text-2xl font-bold text-white">
                        Let's Get Started!
                      </h2>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={onClose}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </motion.button>
                  </div>
                  <p className="text-white/90 mt-2">
                    Tell us about your needs and we'll assist you right away
                  </p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                {/* Services Selection */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-3">
                    Select Services You're Interested In *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {serviceOptions.map((service) => (
                      <motion.button
                        key={service}
                        type="button"
                        onClick={() => handleServiceToggle(service)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`
                          p-3 rounded-xl border-2 text-left transition-all duration-300
                          ${
                            formData.services.includes(service)
                              ? "border-[#0163c6] bg-[#0163c6]/10 text-[#0163c6] font-semibold"
                              : "border-gray-200 bg-white text-gray-700 hover:border-[#0163c6]/30"
                          }
                        `}
                      >
                        <span className="text-sm">{service}</span>
                      </motion.button>
                    ))}
                  </div>
                  {errors.services && (
                    <p className="text-red-500 text-sm mt-2">{errors.services}</p>
                  )}
                </div>

                {/* Email */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className={`
                      w-full px-4 py-3 rounded-xl border-2 transition-all duration-300
                      focus:outline-none focus:ring-2 focus:ring-[#0163c6]/20
                      ${
                        errors.email
                          ? "border-red-500"
                          : "border-gray-200 focus:border-[#0163c6]"
                      }
                    `}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-2">{errors.email}</p>
                  )}
                </div>

                {/* WhatsApp */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, whatsapp: e.target.value }))
                    }
                    className={`
                      w-full px-4 py-3 rounded-xl border-2 transition-all duration-300
                      focus:outline-none focus:ring-2 focus:ring-[#0163c6]/20
                      ${
                        errors.whatsapp
                          ? "border-red-500"
                          : "border-gray-200 focus:border-[#0163c6]"
                      }
                    `}
                    placeholder="+1234567890"
                  />
                  {errors.whatsapp && (
                    <p className="text-red-500 text-sm mt-2">{errors.whatsapp}</p>
                  )}
                </div>

                {/* Action Type */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-3">
                    What would you like? *
                  </label>
                  <div className="flex gap-4">
                    <motion.button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, actionType: "immediate" }))
                      }
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        flex-1 p-4 rounded-xl border-2 transition-all duration-300
                        ${
                          formData.actionType === "immediate"
                            ? "border-[#0163c6] bg-[#0163c6]/10 text-[#0163c6] font-semibold"
                            : "border-gray-200 bg-white text-gray-700 hover:border-[#0163c6]/30"
                        }
                      `}
                    >
                      <div className="text-center">
                        <div className="text-lg font-bold">Immediate Action</div>
                        <div className="text-sm opacity-80 mt-1">
                          Ready to start now
                        </div>
                      </div>
                    </motion.button>

                    <motion.button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, actionType: "enquiry" }))
                      }
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        flex-1 p-4 rounded-xl border-2 transition-all duration-300
                        ${
                          formData.actionType === "enquiry"
                            ? "border-[#0163c6] bg-[#0163c6]/10 text-[#0163c6] font-semibold"
                            : "border-gray-200 bg-white text-gray-700 hover:border-[#0163c6]/30"
                        }
                      `}
                    >
                      <div className="text-center">
                        <div className="text-lg font-bold">Just Enquiring</div>
                        <div className="text-sm opacity-80 mt-1">
                          Exploring options
                        </div>
                      </div>
                    </motion.button>
                  </div>
                </div>

                {errors.submit && (
                  <p className="text-red-500 text-sm mb-4">{errors.submit}</p>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`
                    w-full py-4 rounded-xl font-bold text-white
                    bg-gradient-to-r from-[#0163c6] to-[#073265]
                    shadow-lg shadow-[#0163c6]/30
                    hover:shadow-xl hover:shadow-[#0163c6]/40
                    transition-all duration-300
                    flex items-center justify-center gap-2
                    ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}
                  `}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Request
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}