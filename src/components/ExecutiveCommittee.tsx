"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Github, Mail } from "lucide-react";

interface CommitteeMember {
  id: number;
  name: string;
  position: string;
  image: string;
  department: string;
  year: string;
  bio: string;
  social: {
    linkedin?: string;
    github?: string;
    email?: string;
  };
}

interface ExecutiveCommitteeProps {
  title?: string;
  description?: string;
  members?: CommitteeMember[];
}

const defaultMembers: CommitteeMember[] = [
  {
    id: 1,
    name: "Md. Rakibul Islam",
    position: "President",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=president",
    department: "Computer Science & Engineering",
    year: "4th Year",
    bio: "Leading the BAUET Computer Society with a passion for AI and machine learning.",
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      email: "president@bauetcs.com",
    },
  },
  {
    id: 2,
    name: "Fatima Ahmed",
    position: "Vice President",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=vicepresident",
    department: "Computer Science & Engineering",
    year: "3rd Year",
    bio: "Cybersecurity enthusiast and competitive programmer with multiple hackathon wins.",
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      email: "vp@bauetcs.com",
    },
  },
  {
    id: 3,
    name: "Abdullah Khan",
    position: "General Secretary",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=secretary",
    department: "Computer Science & Engineering",
    year: "3rd Year",
    bio: "Full-stack developer with expertise in React and Node.js ecosystems.",
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      email: "secretary@bauetcs.com",
    },
  },
  {
    id: 4,
    name: "Nusrat Jahan",
    position: "Treasurer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=treasurer",
    department: "Computer Science & Engineering",
    year: "2nd Year",
    bio: "Data science enthusiast with a keen interest in financial technology.",
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      email: "treasurer@bauetcs.com",
    },
  },
  {
    id: 5,
    name: "Tanvir Rahman",
    position: "Event Coordinator",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=events",
    department: "Computer Science & Engineering",
    year: "3rd Year",
    bio: "Passionate about organizing tech events and hackathons for the community.",
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      email: "events@bauetcs.com",
    },
  },
  {
    id: 6,
    name: "Sabrina Akter",
    position: "Media & Communications",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=media",
    department: "Computer Science & Engineering",
    year: "2nd Year",
    bio: "Creative designer with expertise in UI/UX and digital marketing strategies.",
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      email: "media@bauetcs.com",
    },
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

const ExecutiveCommittee = ({
  title = "Executive Committee",
  description = "Meet the dedicated team leading the BAUET Computer Society for the academic year 2023-2024.",
  members = defaultMembers,
}: ExecutiveCommitteeProps) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 },
    );

    const section = document.getElementById("executive-committee");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section
      id="executive-committee"
      className="py-16 px-4 md:px-8 bg-background w-full"
    >
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {members.map((member) => (
            <motion.div key={member.id} variants={itemVariants}>
              <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-card">
                <CardHeader className="text-center pb-2">
                  <div className="flex justify-center mb-4">
                    <Avatar className="h-24 w-24 border-2 border-primary">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback>
                        {member.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <Badge variant="secondary" className="mt-2">
                    {member.position}
                  </Badge>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    {member.department} | {member.year}
                  </p>
                  <CardDescription className="mt-4">
                    {member.bio}
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-center gap-4 pt-2">
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Linkedin size={18} />
                    </a>
                  )}
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github size={18} />
                    </a>
                  )}
                  {member.social.email && (
                    <a
                      href={`mailto:${member.social.email}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Mail size={18} />
                    </a>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExecutiveCommittee;
