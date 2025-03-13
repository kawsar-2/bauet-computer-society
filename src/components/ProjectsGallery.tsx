"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Card, CardContent } from "../components/ui/card";
import { useTheme } from "next-themes";
import { ExternalLink, Github, Code } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

interface ProjectsGalleryProps {
  projects?: Project[];
  title?: string;
  subtitle?: string;
}

const defaultProjects: Project[] = [
  {
    id: 1,
    title: "Competitive Programming Portal",
    description:
      "A platform for BAUET students to practice competitive programming with automated judging system.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    tags: ["React", "Node.js", "MongoDB"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: 2,
    title: "BAUET CS Department Website",
    description:
      "Official website for the Computer Science department with course materials and resources.",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    tags: ["Next.js", "Tailwind CSS", "Supabase"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: 3,
    title: "Smart Campus App",
    description:
      "Mobile application for campus navigation, event notifications, and academic resources.",
    image:
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&q=80",
    tags: ["React Native", "Firebase", "Google Maps API"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: 4,
    title: "AI Study Assistant",
    description:
      "AI-powered study assistant that helps students with personalized learning paths and resources.",
    image:
      "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?w=800&q=80",
    tags: ["Python", "TensorFlow", "Flask"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const ProjectCard = ({ project }: { project: Project }) => {
  const { theme } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      initial="hidden"
      animate={controls}
      className="w-full"
    >
      <Card
        className={`overflow-hidden h-full transition-all duration-300 hover:shadow-lg ${theme === "dark" ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"}`}
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        <CardContent className="p-5">
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-sm mb-4 text-gray-500 dark:text-gray-400">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex justify-between mt-auto pt-2 border-t border-gray-200 dark:border-gray-700">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <Github size={16} className="mr-1" />
                <span>Code</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                <ExternalLink size={16} className="mr-1" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ProjectsGallery = ({
  projects = defaultProjects,
  title = "Our Projects & Achievements",
  subtitle = "Showcasing innovative solutions developed by BAUET Computer Society members",
}: ProjectsGalleryProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <section
      className="py-16 px-4 md:px-8 bg-gray-50 dark:bg-gray-900"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={controls}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="#"
            className="inline-flex items-center px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
          >
            <Code className="mr-2" size={18} />
            View All Projects
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsGallery;
