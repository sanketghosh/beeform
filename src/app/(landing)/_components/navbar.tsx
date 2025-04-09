// packages
import React from "react";
import { motion } from "framer-motion";
import { ZapIcon } from "lucide-react";
import Link from "next/link";

// local modules
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Navbar: React.FC = () => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed left-0 right-0 top-0 z-50 px-6 py-4 md:px-12"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-lg bg-primary/40 px-6 py-3 backdrop-blur-sm">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex cursor-pointer items-center gap-1 font-boldonse text-lg font-bold tracking-tight"
          style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
        >
          <ZapIcon />
          zapform
        </motion.div>

        <Link
          href={"/sign-up"}
          className={cn(
            buttonVariants({
              variant: "default",
              size: "sm",
            }),
          )}
        >
          Get Started
        </Link>
      </div>
    </motion.nav>
  );
};
