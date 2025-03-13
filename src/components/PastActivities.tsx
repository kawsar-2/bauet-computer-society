"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ActivityProps {
  title: string;
  date: string;
  time?: string;
  location?: string;
  description: string;
  image?: string;
}

const PastActivities = ({ activities }: { activities?: ActivityProps[] }) => {
  const defaultActivities: ActivityProps[] = [
    {
      title: "Annual Tech Symposium",
      date: "March 15, 2023",
      time: "10:00 AM - 4:00 PM",
      location: "BAUET Main Auditorium",
      description:
        "A day-long event featuring keynote speakers from leading tech companies, workshops, and project showcases by students.",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    },
    {
      title: "Hackathon 2023",
      date: "May 20-21, 2023",
      time: "48 Hours",
      location: "Computer Science Building",
      description:
        "A 48-hour coding competition where teams built innovative solutions to real-world problems.",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
    },
    {
      title: "Workshop on AI and Machine Learning",
      date: "July 10, 2023",
      time: "2:00 PM - 5:00 PM",
      location: "Virtual Event",
      description:
        "An interactive workshop on the fundamentals of AI and machine learning with hands-on exercises.",
      image:
        "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=800&q=80",
    },
    {
      title: "Industry Visit to Tech Park",
      date: "September 5, 2023",
      location: "Dhaka Tech Park",
      description:
        "Students visited leading tech companies to gain insights into industry practices and career opportunities.",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
    },
  ];

  const displayActivities = activities || defaultActivities;
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

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
        damping: 12,
      },
    },
  };

  return (
    <section className="w-full py-16 bg-background" id="past-activities">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Past Activities
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our previous events and activities that have helped shape
            our community and develop skills among our members.
          </p>
          <Separator className="mt-8 max-w-md mx-auto" />
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-8"
        >
          {displayActivities.map((activity, index) => (
            <motion.div key={index} variants={itemVariants} className="h-full">
              <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-card">
                {activity.image && (
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{activity.title}</CardTitle>
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mt-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{activity.date}</span>
                    </div>
                    {activity.time && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{activity.time}</span>
                      </div>
                    )}
                    {activity.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{activity.location}</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {activity.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mt-12"
        >
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            View All Activities
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PastActivities;
