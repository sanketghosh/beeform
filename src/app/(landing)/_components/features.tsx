// packages
import { motion } from "framer-motion";
import { ChartAreaIcon, PaletteIcon, WindIcon } from "lucide-react";

const featureVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2, // Stagger animation for each card
    },
  },
};

const features = [
  {
    icon: <WindIcon size={30} />,
    title: "Drag & Drop Simplicity",
    description:
      " Effortlessly create custom forms with our visual drag-and-drop interface. ",
  },
  {
    icon: <ChartAreaIcon size={30} />,
    title: "Analytics & Insights",
    description:
      "Track submissions and analyze response data in real-time with our built-in analytics dashboard.",
  },
  {
    icon: <PaletteIcon />, // Placeholder: <FaPlug size={24} />
    title: "Visually Stunning Forms",
    description:
      "Go beyond basic form design. ZapForms allows you to enhance the visual appeal of your forms.",
  },
];

export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="px-4 py-20">
      <div className="mx-auto max-w-7xl text-center">
        <div className="mb-14 flex flex-col items-center space-y-2">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="text-center text-lg font-extrabold sm:text-xl md:text-2xl lg:text-3xl"
          >
            Why should you use zapform ?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="text-center text-muted-foreground"
          >
            Zapform provides features like no other form builder, check out our
            unique features.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible" // Animate when section scrolls into view
          viewport={{ once: true, amount: 0.2 }} // Trigger sooner
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={featureVariants}
              className="transform cursor-pointer select-none rounded-2xl border-2 border-border bg-card p-8 text-left shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-primary" // Glass effect card
            >
              <div className="mb-4 text-4xl">{feature.icon}</div>{" "}
              {/* Icon Placeholder */}
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
