"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";

interface EventProps {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl: string;
}

const Event = ({
  title = "Event Title",
  date = "June 15, 2023",
  time = "2:00 PM - 5:00 PM",
  location = "BAUET Campus, Room 301",
  description = "Join us for this exciting event where we'll explore the latest technologies and innovations in computer science.",
  imageUrl = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
}: EventProps) => {
  return (
    <Card className="overflow-hidden h-full bg-card border border-border">
      <div className="h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-2 h-4 w-4" />
          <span>{date}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="mr-2 h-4 w-4" />
          <span>{time}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-2 h-4 w-4" />
          <span>{location}</span>
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" className="w-full">
          Register Now
        </Button>
      </CardFooter>
    </Card>
  );
};

interface UpcomingEventsProps {
  events?: EventProps[];
  title?: string;
  subtitle?: string;
}

const UpcomingEvents = ({
  events = [
    {
      title: "Annual Hackathon 2023",
      date: "October 15, 2023",
      time: "9:00 AM - 9:00 PM",
      location: "BAUET Main Auditorium",
      description:
        "Join us for a 12-hour coding marathon where you can showcase your skills, collaborate with peers, and win exciting prizes!",
      imageUrl:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
    },
    {
      title: "Workshop on AI & Machine Learning",
      date: "October 22, 2023",
      time: "2:00 PM - 5:00 PM",
      location: "Computer Lab 2, Building B",
      description:
        "Learn the fundamentals of AI and machine learning with hands-on exercises guided by industry experts.",
      imageUrl:
        "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=800&q=80",
    },
    {
      title: "Tech Talk: Cybersecurity Essentials",
      date: "November 5, 2023",
      time: "3:30 PM - 5:00 PM",
      location: "Virtual (Zoom)",
      description:
        "A comprehensive session on cybersecurity fundamentals, best practices, and emerging threats in the digital landscape.",
      imageUrl:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
    },
  ],
  title = "Upcoming Events",
  subtitle = "Join us for these exciting events organized by the BAUET Computer Society",
}: UpcomingEventsProps) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
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
        damping: 15,
        stiffness: 100,
      },
    },
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-background" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {events.map((event, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Event {...event} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <Button size="lg">View All Events</Button>
        </motion.div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
