"use client";

import { ThemeProvider } from "next-themes";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import UpcomingEvents from "@/components/UpcomingEvents";
import ExecutiveCommittee from "@/components/ExecutiveCommittee";
import PastActivities from "@/components/PastActivities";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { pageTransition } from "@/lib/framer-animations";

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
        className="min-h-screen bg-background"
      >
        <Navbar />

        <main className="pt-20">
          {/* Hero Section */}
          <section id="hero">
            <HeroSection />
          </section>

          {/* Upcoming Events Section */}
          <section id="events">
            <UpcomingEvents />
          </section>

          {/* Executive Committee Section */}
          <section id="committee">
            <ExecutiveCommittee />
          </section>

          {/* Past Activities Section */}
          <section id="activities">
            <PastActivities />
          </section>

          {/* Projects Gallery Section */}
          <section id="projects" className="py-16 px-4 md:px-8 bg-background">
            <div className="container mx-auto max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Our Projects
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Explore the innovative projects and achievements of BAUET
                  Computer Society members.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: item * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10 }}
                    className="bg-card rounded-lg overflow-hidden shadow-md"
                  >
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={`https://images.unsplash.com/photo-${1550000000000 + item * 100000}?w=600&q=80`}
                        alt={`Project ${item}`}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">
                        Project Title {item}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        A brief description of this amazing project and its
                        impact on the community.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                          React
                        </span>
                        <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                          Node.js
                        </span>
                        <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                          MongoDB
                        </span>
                      </div>
                      <button className="text-primary font-medium hover:underline">
                        Learn more →
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Form Section */}
          <section id="contact" className="py-16 px-4 md:px-8 bg-background">
            <div className="container mx-auto max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Contact Us
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Have questions or want to join the BAUET Computer Society?
                  Reach out to us!
                </p>
              </motion.div>

              <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
                <motion.div
                  className="w-full lg:w-1/2"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-card p-8 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Visit Us</h3>
                    <p className="mb-6 text-muted-foreground">
                      We're located at the Computer Science Building, BAUET
                      Campus, Natore, Bangladesh. Drop by during our office
                      hours: Monday to Thursday, 10:00 AM to 4:00 PM.
                    </p>
                    <div className="aspect-video w-full overflow-hidden rounded-md">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3634.0087635304196!2d88.9421!3d24.4073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDI0JzI2LjMiTiA4OMKwNTYnMzEuNiJF!5e0!3m2!1sen!2sbd!4v1620000000000!5m2!1sen!2sbd"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="w-full lg:w-1/2"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <ContactForm />
                </motion.div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </motion.div>
    </ThemeProvider>
  );
}
