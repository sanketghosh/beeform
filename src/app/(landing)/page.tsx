"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Activity,
  Calendar,
  CheckCircle,
  ChevronRight,
  Dumbbell,
  Menu,
  Star,
  Target,
  X,
  Users,
  Heart,
  ActivitySquareIcon,
} from "lucide-react";

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Mesh Gradient Background */}
      <div className="fixed inset-0 z-[-1] opacity-30">
        <div className="absolute left-0 right-0 top-0 h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-600 via-blue-700 to-emerald-500 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 h-[600px] w-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-400 via-purple-500 to-blue-800 opacity-20 blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <ActivitySquareIcon className="h-6 w-6 text-emerald-400" />
            <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text font-boldonse text-xl font-bold text-transparent">
              FitFusion
            </span>
          </div>
          <nav className="hidden gap-8 md:flex">
            <Link
              href="#features"
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              How It Works
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              Testimonials
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="hidden text-sm font-medium text-white/70 transition-colors hover:text-white md:block"
            >
              Log in
            </Link>
            <Button className="border-0 bg-gradient-to-r from-emerald-500 to-blue-600 text-white hover:from-emerald-600 hover:to-blue-700">
              Get Started
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative w-full overflow-hidden py-20 md:py-32 lg:py-40"
        >
          {/* Animated Gradient Orbs */}
          <motion.div
            className="absolute left-[10%] top-20 h-64 w-64 rounded-full bg-purple-600/30 blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 8,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-[10%] h-64 w-64 rounded-full bg-emerald-500/30 blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, 30, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 10,
              ease: "easeInOut",
            }}
          />

          <div className="container relative z-10 mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <div className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm backdrop-blur-md">
                  Introducing FitFusion
                </div>
                <h1 className="bg-gradient-to-r from-white via-blue-100 to-emerald-200 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
                  Your Fitness Journey, Reimagined
                </h1>
                <p className="mx-auto max-w-[700px] text-lg text-white/70 md:text-xl">
                  AI-powered personalized workout programs that adapt to your
                  goals, schedule, and progress.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-8 flex flex-col justify-center gap-4 sm:flex-row"
              >
                <Button
                  size="lg"
                  className="border-0 bg-gradient-to-r from-emerald-500 to-blue-600 text-white hover:from-emerald-600 hover:to-blue-700"
                >
                  Start Your Journey
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Watch Demo
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-6 flex items-center justify-center gap-8 text-sm text-white/50"
              >
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  <span>Personalized Plans</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  <span>AI-Powered</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  <span>Expert Guidance</span>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="relative mx-auto mt-16 max-w-4xl"
            >
              <div className="aspect-[16/9] overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-blue-500/10"></div>
                <img
                  src="/assets/hero-image.png"
                  alt="FitFusion App Preview"
                  className="h-full w-full object-cover opacity-80"
                />
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -left-6 -top-6 rounded-lg border border-white/10 bg-black/50 p-4 backdrop-blur-md"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 4,
                  ease: "easeInOut",
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-emerald-500/20 p-2">
                    <Activity className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs text-white/50">Weekly Progress</div>
                    <div className="text-sm font-medium">+15% Strength</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -right-6 rounded-lg border border-white/10 bg-black/50 p-4 backdrop-blur-md"
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 5,
                  ease: "easeInOut",
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-blue-500/20 p-2">
                    <Calendar className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xs text-white/50">Workout Plan</div>
                    <div className="text-sm font-medium">Customized Daily</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-2"
              >
                <div className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm backdrop-blur-md">
                  Features
                </div>
                <h2 className="bg-gradient-to-r from-white via-blue-100 to-emerald-200 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl md:text-5xl">
                  Designed for Results
                </h2>
                <p className="mx-auto max-w-[700px] text-white/70 md:text-lg">
                  Our platform offers everything you need to achieve your
                  fitness goals with personalized workout plans.
                </p>
              </motion.div>
            </div>

            <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Feature Cards */}
              {[
                {
                  icon: <Target className="h-6 w-6 text-emerald-400" />,
                  title: "Personalized Programs",
                  description:
                    "Tailored workout plans based on your goals, fitness level, and available equipment.",
                },
                {
                  icon: <Activity className="h-6 w-6 text-blue-400" />,
                  title: "Progress Tracking",
                  description:
                    "Monitor your improvements with detailed analytics and performance metrics.",
                },
                {
                  icon: <Calendar className="h-6 w-6 text-purple-400" />,
                  title: "Adaptive Scheduling",
                  description:
                    "Flexible workout schedules that adapt to your availability and lifestyle.",
                },
                {
                  icon: <Dumbbell className="h-6 w-6 text-emerald-400" />,
                  title: "Exercise Library",
                  description:
                    "Access to hundreds of exercises with proper form guidance and video demonstrations.",
                },
                {
                  icon: <Users className="h-6 w-6 text-blue-400" />,
                  title: "Community Support",
                  description:
                    "Connect with like-minded individuals on similar fitness journeys for motivation.",
                },
                {
                  icon: <Heart className="h-6 w-6 text-purple-400" />,
                  title: "Health Integration",
                  description:
                    "Sync with health apps to incorporate heart rate, sleep, and recovery data.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
                >
                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-purple-500/10 opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-100"></div>
                  <div className="relative z-10">
                    <div className="mb-4 inline-flex rounded-lg bg-white/5 p-3">
                      {feature.icon}
                    </div>
                    <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                    <p className="text-white/70">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="relative w-full overflow-hidden py-20 md:py-32"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/20 to-black"></div>

          <div className="container relative z-10 mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-2"
              >
                <div className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm backdrop-blur-md">
                  Process
                </div>
                <h2 className="bg-gradient-to-r from-white via-blue-100 to-emerald-200 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl md:text-5xl">
                  How FitFusion Works
                </h2>
                <p className="mx-auto max-w-[700px] text-white/70 md:text-lg">
                  Three simple steps to your personalized fitness journey
                </p>
              </motion.div>
            </div>

            <div className="relative mt-16">
              {/* Connection Line */}
              <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-emerald-500 via-blue-500 to-purple-500 md:block"></div>

              <div className="grid gap-12 md:gap-24">
                {/* Step 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="relative grid items-center gap-8 md:grid-cols-2"
                >
                  <div className="order-2 md:order-1">
                    <div className="space-y-4">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white">
                        <span className="text-lg font-bold">1</span>
                      </div>
                      <h3 className="text-2xl font-bold">
                        Complete Your Profile
                      </h3>
                      <p className="text-white/70">
                        Tell us about your fitness goals, experience level,
                        available equipment, and schedule. Our AI analyzes your
                        inputs to create a foundation for your personalized
                        program.
                      </p>
                    </div>
                  </div>
                  <div className="order-1 flex justify-center md:order-2">
                    <div className="relative h-[250px] w-[250px] overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm md:h-[300px] md:w-[300px]">
                      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-blue-500/10"></div>
                      <Image
                        src="/placeholder.svg?height=300&width=300"
                        alt="Profile Setup"
                        width={300}
                        height={300}
                        className="h-full w-full object-cover opacity-80"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Step 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="relative grid items-center gap-8 md:grid-cols-2"
                >
                  <div className="order-2">
                    <div className="space-y-4">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        <span className="text-lg font-bold">2</span>
                      </div>
                      <h3 className="text-2xl font-bold">Get Your Program</h3>
                      <p className="text-white/70">
                        Our AI generates a personalized workout program tailored
                        specifically to your needs. Each exercise, set, and rep
                        is optimized for your goals and constraints.
                      </p>
                    </div>
                  </div>
                  <div className="order-1 flex justify-center">
                    <div className="relative h-[250px] w-[250px] overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm md:h-[300px] md:w-[300px]">
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10"></div>
                      <Image
                        src="/placeholder.svg?height=300&width=300"
                        alt="Workout Program"
                        width={300}
                        height={300}
                        className="h-full w-full object-cover opacity-80"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Step 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="relative grid items-center gap-8 md:grid-cols-2"
                >
                  <div className="order-2 md:order-1">
                    <div className="space-y-4">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-emerald-500 text-white">
                        <span className="text-lg font-bold">3</span>
                      </div>
                      <h3 className="text-2xl font-bold">Track & Adapt</h3>
                      <p className="text-white/70">
                        Follow your program, track your progress, and watch as
                        your plan adapts to your improvements. Our AI
                        continuously optimizes your workouts based on your
                        performance.
                      </p>
                    </div>
                  </div>
                  <div className="order-1 flex justify-center md:order-2">
                    <div className="relative h-[250px] w-[250px] overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm md:h-[300px] md:w-[300px]">
                      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-emerald-500/10"></div>
                      <Image
                        src="/placeholder.svg?height=300&width=300"
                        alt="Progress Tracking"
                        width={300}
                        height={300}
                        className="h-full w-full object-cover opacity-80"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-2"
              >
                <div className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm backdrop-blur-md">
                  Testimonials
                </div>
                <h2 className="bg-gradient-to-r from-white via-blue-100 to-emerald-200 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl md:text-5xl">
                  Success Stories
                </h2>
                <p className="mx-auto max-w-[700px] text-white/70 md:text-lg">
                  See what our users have achieved with FitFusion
                </p>
              </motion.div>
            </div>

            <div className="mx-auto mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  quote:
                    "FitFusion completely transformed my workout routine. The personalized program fits perfectly with my busy schedule, and I've seen amazing results in just 2 months!",
                  name: "Sarah J.",
                  achievement: "Lost 15 lbs in 8 weeks",
                },
                {
                  quote:
                    "As a beginner, I was intimidated by fitness apps, but FitFusion made it so easy to get started. The program grows with me as I improve!",
                  name: "Michael T.",
                  achievement: "Gained 10 lbs of muscle",
                },
                {
                  quote:
                    "I've tried many fitness apps, but FitFusion is the only one that truly adapts to my changing needs. It's like having a personal trainer in my pocket!",
                  name: "Lisa R.",
                  achievement: "Completed first marathon",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
                >
                  <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-purple-500/10 opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-100"></div>
                  <div className="relative z-10 flex h-full flex-col">
                    <div className="mb-4 flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-emerald-400 text-emerald-400"
                        />
                      ))}
                    </div>
                    <p className="mb-6 flex-1 text-white/70">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500"></div>
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-white/50">
                          {testimonial.achievement}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section
          id="pricing"
          className="relative w-full overflow-hidden py-20 md:py-32"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/20 to-black"></div>

          <div className="container relative z-10 mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-2"
              >
                <div className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm backdrop-blur-md">
                  Pricing
                </div>
                <h2 className="bg-gradient-to-r from-white via-blue-100 to-emerald-200 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl md:text-5xl">
                  Simple, Transparent Pricing
                </h2>
                <p className="mx-auto max-w-[700px] text-white/70 md:text-lg">
                  Choose the plan that fits your fitness journey
                </p>
              </motion.div>
            </div>

            <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-3">
              {[
                {
                  name: "Basic",
                  description: "Perfect for beginners",
                  price: "$9.99",
                  features: [
                    { included: true, text: "Personalized workout plan" },
                    { included: true, text: "Basic progress tracking" },
                    { included: true, text: "Monthly plan updates" },
                    { included: false, text: "Nutrition guidance" },
                    { included: false, text: "Advanced analytics" },
                  ],
                  popular: false,
                  gradient: "from-emerald-500/20 to-emerald-500/5",
                },
                {
                  name: "Pro",
                  description: "For dedicated fitness enthusiasts",
                  price: "$19.99",
                  features: [
                    { included: true, text: "Everything in Basic" },
                    { included: true, text: "Nutrition guidance" },
                    { included: true, text: "Weekly plan updates" },
                    { included: true, text: "Advanced analytics" },
                    { included: false, text: "1-on-1 coaching" },
                  ],
                  popular: true,
                  gradient: "from-blue-500/20 to-purple-500/5",
                },
                {
                  name: "Premium",
                  description: "The ultimate fitness experience",
                  price: "$39.99",
                  features: [
                    { included: true, text: "Everything in Pro" },
                    { included: true, text: "Daily plan adjustments" },
                    { included: true, text: "Premium exercise library" },
                    { included: true, text: "1-on-1 coaching sessions" },
                    { included: true, text: "Priority support" },
                  ],
                  popular: false,
                  gradient: "from-purple-500/20 to-emerald-500/5",
                },
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className={`relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b ${plan.gradient} p-6 backdrop-blur-md`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 px-3 py-1 text-xs font-semibold text-white">
                      Most Popular
                    </div>
                  )}
                  <div className="relative z-10">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold">{plan.name}</h3>
                      <p className="text-white/70">{plan.description}</p>
                    </div>
                    <div className="mt-4 flex items-baseline text-3xl font-bold">
                      {plan.price}
                      <span className="ml-1 text-sm font-medium text-white/50">
                        /month
                      </span>
                    </div>
                    <ul className="mt-6 space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center gap-2"
                        >
                          {feature.included ? (
                            <CheckCircle className="h-4 w-4 text-emerald-400" />
                          ) : (
                            <X className="h-4 w-4 text-white/30" />
                          )}
                          <span
                            className={feature.included ? "" : "text-white/50"}
                          >
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Button className="mt-8 w-full border-0 bg-gradient-to-r from-emerald-500 to-blue-600 text-white hover:from-emerald-600 hover:to-blue-700">
                      Get Started
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative mx-auto max-w-3xl overflow-hidden rounded-xl border border-white/10 p-8 md:p-12"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10"></div>
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <h2 className="bg-gradient-to-r from-white via-blue-100 to-emerald-200 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                  Ready to Transform Your Fitness Journey?
                </h2>
                <p className="mt-4 max-w-[600px] text-white/70 md:text-lg">
                  Join thousands of satisfied users who have achieved their
                  fitness goals with FitFusion.
                </p>
                <div className="mt-8 w-full max-w-md">
                  <form className="flex flex-col gap-2 sm:flex-row">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 border-white/10 bg-white/5 text-white placeholder:text-white/50"
                    />
                    <Button className="border-0 bg-gradient-to-r from-emerald-500 to-blue-600 text-white hover:from-emerald-600 hover:to-blue-700">
                      Get Started
                    </Button>
                  </form>
                  <p className="mt-2 text-xs text-white/50">
                    Start your free 7-day trial today. No credit card required.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-white/10 bg-black py-8 md:py-12">
        <div className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 md:flex-row md:justify-between md:px-6">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-6 w-6 text-emerald-400" />
            <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-xl font-bold text-transparent">
              FitFusion
            </span>
          </div>
          <p className="text-center text-sm text-white/50 md:text-left">
            &copy; {new Date().getFullYear()} FitFusion. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-white/50 transition-colors hover:text-white"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-white/50 transition-colors hover:text-white"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-white/50 transition-colors hover:text-white"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
