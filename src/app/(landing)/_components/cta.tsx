// packages
import { motion } from "framer-motion";
import Link from "next/link";

export const CTA: React.FC = () => {
  return (
    <section
      id="cta"
      className="bg-gradient-to-b from-black via-primary/20 to-primary/60 py-20 text-center sm:py-28"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8"
      >
        <div className="mb-8 flex flex-col items-center space-y-2">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="text-center text-lg font-extrabold sm:text-xl md:text-2xl lg:text-3xl"
          >
            Ready to Build Smarter Forms?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="text-center text-muted-foreground"
          >
            Join thousands of creators simplifying their data collection with
            zapform.
          </motion.p>
        </div>
        <Link
          href={"/sign-up"}
          className="w-fit rounded-lg bg-white px-8 py-3 text-sm font-semibold capitalize text-background shadow-md shadow-black/40 transition-all hover:bg-opacity-80 lg:text-base"
        >
          create free account
        </Link>
      </motion.div>
    </section>
  );
};
