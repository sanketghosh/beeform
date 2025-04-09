import React from "react";
import { motion } from "framer-motion";
import {
  EarthIcon,
  EyeIcon,
  PaintbrushIcon,
  PenSquareIcon,
  Share2Icon,
} from "lucide-react";

const stepVariants = {
  offscreen: { opacity: 0, y: 50 },
  onscreen: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.25,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: PaintbrushIcon,
      title: "Design Your Form",
      description:
        "Use our intuitive drag-and-drop editor to add fields and customize the look.",
    },
    {
      icon: EyeIcon,
      title: "Preview & Adjust",
      description:
        "Instantly see how your form looks on different devices and make tweaks.",
    },
    {
      icon: EarthIcon,
      title: "Save & Publish",
      description:
        "Embed the form on your site or share a direct link to start collecting responses.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="bg-gradient-to-b from-background via-background/80 to-black py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-14 flex flex-col items-center space-y-2">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="text-center text-lg font-extrabold sm:text-xl md:text-2xl lg:text-3xl"
          >
            Get Started in 3 Simple Steps
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="text-center text-muted-foreground"
          >
            Using a form builder was never this easy, just few clicks and you're
            form is ready to be shared. Here's how:
          </motion.p>
        </div>

        <div className="flex flex-col items-center gap-12 md:flex-row md:gap-16">
          {/* Timeline */}
          <div className="relative w-full space-y-12 border-l-2 border-primary/40 pl-6 sm:pl-8 md:w-1/2">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.6 }}
                variants={stepVariants}
                className="relative"
              >
                {/* Icon + Step */}
                <div className="mb-4 flex items-center gap-4">
                  <div className="rounded-full bg-primary p-2 shadow-lg">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <span className="text-base font-semibold text-primary">{`Step ${index + 1}`}</span>
                </div>

                {/* Step Content */}
                <div className="ml-1">
                  <h3 className="mb-2 text-lg font-semibold sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full rounded-lg bg-primary p-0.5 md:w-4/5"
          >
            <img
              src="/assets/form-builder-pad.png" // Replace with your image path
              alt="Form preview illustration"
              className="w-full rounded-lg shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
