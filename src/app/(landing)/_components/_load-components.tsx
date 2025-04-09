"use client";

// components
import { CTA } from "@/app/(landing)/_components/cta";
import { FeaturesSection } from "@/app/(landing)/_components/features";
import { Footer } from "@/app/(landing)/_components/footer";
import { HeroSection } from "@/app/(landing)/_components/hero";
import { HowItWorks } from "@/app/(landing)/_components/how-it-works";
import { Navbar } from "@/app/(landing)/_components/navbar";

import React from "react";

export default function LoadComponents() {
  return (
    <div className="relative z-0">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
}
