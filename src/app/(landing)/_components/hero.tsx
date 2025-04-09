import React from "react";
import { motion } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import { FlameIcon, GithubIcon, SparkleIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center gap-20 overflow-hidden bg-gradient-to-b from-black to-background px-4 pb-28 pt-56">
      {/* Glowing Gradient Aura */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], rotate: [0, 10, 0] }}
        transition={{ duration: 20, ease: "easeInOut", repeat: Infinity }}
        className="absolute left-[-10%] top-[10%] h-96 w-96 rounded-full bg-primary opacity-30 blur-3xl"
      />
      <motion.div
        animate={{ x: ["-5%", "5%", "-5%"], y: ["2%", "-2%", "2%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[15%] right-[-10%] h-96 w-96 rounded-full bg-primary opacity-20 blur-3xl"
      />

      {/* Hero Text */}
      <div className="relative z-10 w-full max-w-4xl space-y-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center justify-center"
        >
          <div className="flex w-fit items-center justify-center gap-1 rounded-2xl border bg-secondary/40 px-6 py-1.5 text-center text-xs font-semibold capitalize">
            <FlameIcon size={17} />
            We are 100% Open Source
          </div>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-2xl font-extrabold leading-tight tracking-tight lg:text-4xl xl:text-7xl"
        >
          Build Stunning Forms Without Code.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-base font-medium lowercase leading-tight text-muted-foreground md:text-lg lg:text-xl"
        >
          zapform lets you create fast, minimal forms by just dragging and
          dropping elements. Also you can share with anyone and track
          statistics.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.7, ease: "backOut" }}
          className="flex items-center justify-center space-x-4"
        >
          <Link
            href="/sign-up"
            className={cn(
              buttonVariants({
                size: "default",
              }),
              "capitalize",
            )}
          >
            <SparkleIcon />
            Start building now
          </Link>
          <a
            href="https://github.com/sanketghosh/zapform"
            target="_blank"
            className={cn(
              buttonVariants({
                size: "default",
                variant: "secondary",
              }),
              "capitalize",
            )}
          >
            <GithubIcon />
            source code
          </a>
        </motion.div>
      </div>

      {/* Screenshot with Glowing Border */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="relative z-10 mx-auto w-full max-w-5xl"
      >
        <div className="relative w-full rounded-lg bg-gradient-to-r from-primary to-secondary p-0.5">
          <div className="w-full overflow-hidden rounded-lg lg:h-[500px]">
            <img
              src="/assets/dashboard.png"
              alt="zapform Screenshot"
              className="w-full rounded-lg object-cover shadow-[0_0_60px_rgba(124,58,237,0.3)]"
            />
          </div>
        </div>

        {/*   <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -inset-1 -z-10 rounded-3xl bg-primary opacity-20 blur-3xl"
        /> */}
      </motion.div>
    </section>
  );
};
