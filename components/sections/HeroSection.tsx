"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ParallaxHero, ParallaxLayer } from "@/components/animations/ParallaxHero";
import { AnimatedText } from "@/components/animations/AnimatedText";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { CursorGlow } from "@/components/animations/CursorGlow";
import Scene3D from "@/components/effects/Scene3D";
import { DURATION, EASING, PARALLAX } from "@/lib/animation";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

export function HeroSection() {
  const [greeting, setGreeting] = useState("Welcome");

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  return (
    <>
      <ScrollProgress />
      <CursorGlow />

      <ParallaxHero className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0f]">
        <div className="absolute inset-0 -z-10">
          <Scene3D />
        </div>

        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-fuchsia-900/15 via-transparent to-transparent" />

        <ParallaxLayer
          speed={PARALLAX.deep}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="h-[600px] w-[600px] rounded-full bg-violet-600/5 blur-[120px]" />
        </ParallaxLayer>

        <ParallaxLayer
          speed={PARALLAX.midground}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="h-[400px] w-[400px] translate-x-32 -translate-y-16 rounded-full bg-fuchsia-600/5 blur-[100px]" />
        </ParallaxLayer>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.slow, ease: EASING.decelerate }}
          >
            <motion.span
              className="mb-6 inline-block rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-violet-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: DURATION.normal, delay: 0.2 }}
            >
              {greeting} -- Full-Stack Developer & Designer
            </motion.span>
          </motion.div>

          <AnimatedText
            text="Building Digital Experiences That Matter"
            className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
            as="h1"
            animation="fadeUp"
          />

          <motion.p
            className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-zinc-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.slow, delay: 0.4, ease: EASING.decelerate }}
          >
            I craft performant, accessible, and visually stunning web experiences
            using modern technologies. From concept to deployment, I bring ideas to life
            with clean code and thoughtful design.
          </motion.p>

          <motion.div
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.slow, delay: 0.6, ease: EASING.decelerate }}
          >
            <MagneticButton
              onClick={() =>
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-full bg-violet-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-colors hover:bg-violet-500"
            >
              View My Work
            </MagneticButton>
            <MagneticButton
              onClick={() =>
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              Get In Touch
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-xs uppercase tracking-widest text-zinc-500">Scroll</span>
            <div className="h-10 w-[1px] bg-gradient-to-b from-zinc-500 to-transparent" />
          </motion.div>
        </motion.div>
      </ParallaxHero>
    </>
  );
}
