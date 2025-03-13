"use client";

import { motion } from "framer-motion";
import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";

interface FooterProps {
  clubName?: string;
  address?: string;
  phone?: string;
  email?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    github?: string;
  };
}

const Footer = ({
  clubName = "BAUET Computer Society",
  address = "Bangladesh Army University of Engineering & Technology, Natore",
  phone = "+880 1234-567890",
  email = "bauetcs@example.com",
  socialLinks = {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
}: FooterProps) => {
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
    hover: { scale: 1.2, rotate: 5 },
  };

  return (
    <motion.footer
      className="bg-card text-card-foreground w-full py-8 px-4 md:px-8 border-t"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div variants={itemVariants}>
          <h3 className="text-xl font-bold mb-4">{clubName}</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <MapPin size={16} />
              <span className="text-sm">{address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} />
              <span className="text-sm">{phone}</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} />
              <span className="text-sm">{email}</span>
            </li>
          </ul>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-sm hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm hover:underline">
                Events
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm hover:underline">
                Projects
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm hover:underline">
                Join Us
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
          <div className="flex gap-4 mb-6">
            {socialLinks.facebook && (
              <motion.a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                variants={iconVariants}
                whileHover="hover"
                className="bg-primary/10 p-2 rounded-full hover:bg-primary/20 transition-colors"
              >
                <Facebook size={20} />
              </motion.a>
            )}
            {socialLinks.twitter && (
              <motion.a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                variants={iconVariants}
                whileHover="hover"
                className="bg-primary/10 p-2 rounded-full hover:bg-primary/20 transition-colors"
              >
                <Twitter size={20} />
              </motion.a>
            )}
            {socialLinks.instagram && (
              <motion.a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                variants={iconVariants}
                whileHover="hover"
                className="bg-primary/10 p-2 rounded-full hover:bg-primary/20 transition-colors"
              >
                <Instagram size={20} />
              </motion.a>
            )}
            {socialLinks.linkedin && (
              <motion.a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                variants={iconVariants}
                whileHover="hover"
                className="bg-primary/10 p-2 rounded-full hover:bg-primary/20 transition-colors"
              >
                <Linkedin size={20} />
              </motion.a>
            )}
            {socialLinks.github && (
              <motion.a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                variants={iconVariants}
                whileHover="hover"
                className="bg-primary/10 p-2 rounded-full hover:bg-primary/20 transition-colors"
              >
                <Github size={20} />
              </motion.a>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Switch Theme:</span>
            <ThemeSwitcher />
          </div>
        </motion.div>
      </div>

      <motion.div
        className="mt-8 pt-4 border-t border-border text-center text-sm text-muted-foreground"
        variants={itemVariants}
      >
        <p>
          © {new Date().getFullYear()} {clubName}. All rights reserved.
        </p>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
