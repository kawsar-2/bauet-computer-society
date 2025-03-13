"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";

interface NavbarProps {
  logo?: string;
  links?: Array<{ label: string; href: string }>;
}

const Navbar = ({
  logo = "/bauet-cs-logo.png",
  links = [
    { label: "Home", href: "/" },
    { label: "Events", href: "#events" },
    { label: "Committee", href: "#committee" },
    { label: "Activities", href: "#activities" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
}: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, x: "100%" },
    open: { opacity: 1, x: 0 },
  };

  const linkVariants = {
    hover: { scale: 1.05, color: "#3b82f6" },
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3 transition-all duration-300 bg-background ${scrolled ? "shadow-md" : ""}`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <motion.img
            src={logo}
            alt="BAUET CS Logo"
            className="h-10 w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          />
          <motion.span
            className="font-bold text-lg hidden sm:inline-block text-foreground"
            whileHover={{ scale: 1.05 }}
          >
            BAUET CS
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {links.map((link, index) => (
            <motion.div key={index} whileHover="hover" variants={linkVariants}>
              <Link
                href={link.href}
                className="text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
          <ThemeSwitcher />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden space-x-2">
          <ThemeSwitcher />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-background z-50 pt-20 px-6 flex flex-col md:hidden"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="absolute top-4 right-4"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </Button>
            <div className="flex flex-col space-y-6 items-center">
              {links.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover="hover"
                  variants={linkVariants}
                >
                  <Link
                    href={link.href}
                    className="text-foreground hover:text-primary text-xl font-medium"
                    onClick={toggleMenu}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
