"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MatrixBackground from "./MatrixBackground";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

const HeroSection = ({
  title = "BAUET Computer Society",
  subtitle = "Empowering future tech leaders through innovation, collaboration, and excellence in computing education and research.",
  ctaText = "Join Us",
  ctaLink = "#contact",
}: HeroSectionProps) => {
  const { theme } = useTheme();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.2,
      },
    },
  };

  return (
    <section
      className={`w-full min-h-[800px] flex items-center justify-center py-20 px-4 md:px-8 lg:px-16 relative overflow-hidden ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}
    >
      {/* Matrix Background Animation */}
      <MatrixBackground
        className={theme === "dark" ? "text-blue-500" : "text-purple-600"}
      />

      <motion.div
        className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex-1 text-center lg:text-left">
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              {title}
            </h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto lg:mx-0 text-gray-600 dark:text-gray-300">
              {subtitle}
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href={ctaLink}>
              <Button
                size="lg"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full"
              >
                {ctaText}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="flex-1 flex justify-center items-center"
          variants={logoVariants}
          whileHover={{ scale: 1.05, rotate: 5 }}
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
            <Image
              src="/bauet-cs-logo.png"
              alt="BAUET Computer Society Logo"
              fill
              className="object-contain"
              onError={(e) => {
                // Fallback to a placeholder if the image fails to load
                e.currentTarget.src =
                  "https://api.dicebear.com/7.x/shapes/svg?seed=bauet-cs";
              }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full opacity-10 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full opacity-10 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>
    </section>
  );
};

export default HeroSection;
