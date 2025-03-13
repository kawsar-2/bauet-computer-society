"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { CheckCircle, AlertCircle, Send } from "lucide-react";

interface ContactFormProps {
  onSubmit?: (data: FormData) => void;
  title?: string;
  description?: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

const formVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

const inputVariants = {
  focus: { scale: 1.02, transition: { duration: 0.2 } },
  blur: { scale: 1, transition: { duration: 0.2 } },
};

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95, transition: { duration: 0.1 } },
  disabled: { opacity: 0.6 },
};

const statusVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
    },
  },
};

const ContactForm = ({
  onSubmit,
  title = "Join BAUET Computer Society",
  description = "Fill out the form below to join our community or get in touch with us.",
}: ContactFormProps) => {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentId: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    // Simulate form submission
    setTimeout(() => {
      // Randomly succeed or fail for demo purposes
      const success = Math.random() > 0.3;

      if (success) {
        setFormStatus("success");
        if (onSubmit) {
          const formDataObj = new FormData();
          Object.entries(formData).forEach(([key, value]) => {
            formDataObj.append(key, value);
          });
          onSubmit(formDataObj);
        }
      } else {
        setFormStatus("error");
      }

      // Reset form after 3 seconds on success
      if (success) {
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            studentId: "",
            message: "",
          });
          setFormStatus("idle");
        }, 3000);
      }
    }, 1500);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={formVariants}
      className="w-full max-w-md mx-auto bg-card"
    >
      <Card className="w-full shadow-lg border-t-4 border-primary">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {title}
          </CardTitle>
          <CardDescription className="text-center">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {formStatus === "success" ? (
            <motion.div
              variants={statusVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center justify-center py-8 text-center"
            >
              <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
              <p className="text-muted-foreground">
                Your message has been submitted successfully. We'll get back to
                you soon.
              </p>
            </motion.div>
          ) : formStatus === "error" ? (
            <motion.div
              variants={statusVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center justify-center py-8 text-center"
            >
              <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Oops!</h3>
              <p className="text-muted-foreground mb-4">
                Something went wrong. Please try again.
              </p>
              <Button variant="outline" onClick={() => setFormStatus("idle")}>
                Try Again
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <motion.div
                  variants={inputVariants}
                  whileFocus="focus"
                  whileBlur="blur"
                >
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full"
                    disabled={formStatus === "submitting"}
                  />
                </motion.div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <motion.div
                  variants={inputVariants}
                  whileFocus="focus"
                  whileBlur="blur"
                >
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full"
                    disabled={formStatus === "submitting"}
                  />
                </motion.div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID (Optional)</Label>
                <motion.div
                  variants={inputVariants}
                  whileFocus="focus"
                  whileBlur="blur"
                >
                  <Input
                    id="studentId"
                    name="studentId"
                    placeholder="e.g. BAU-CSE-2023-001"
                    value={formData.studentId}
                    onChange={handleChange}
                    className="w-full"
                    disabled={formStatus === "submitting"}
                  />
                </motion.div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <motion.div
                  variants={inputVariants}
                  whileFocus="focus"
                  whileBlur="blur"
                >
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us why you want to join or any questions you have..."
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full resize-none"
                    disabled={formStatus === "submitting"}
                  />
                </motion.div>
              </div>
            </form>
          )}
        </CardContent>

        {formStatus === "idle" && (
          <CardFooter>
            <motion.div
              className="w-full"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                type="submit"
                className="w-full"
                onClick={handleSubmit}
                disabled={formStatus === "submitting"}
              >
                <Send className="mr-2 h-4 w-4" />
                Submit
              </Button>
            </motion.div>
          </CardFooter>
        )}

        {formStatus === "submitting" && (
          <CardFooter>
            <Button disabled className="w-full">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="mr-2 h-4 w-4 border-2 border-t-transparent border-white rounded-full"
              />
              Submitting...
            </Button>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
};

export default ContactForm;
