"use client";

import { motion } from "framer-motion";
import { RevealSection } from "@/components/animations/RevealSection";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DURATION, EASING } from "@/lib/animation";

const highlights = [
  { label: "Years Experience", value: "5+" },
  { label: "Projects Completed", value: "30+" },
  { label: "Technologies", value: "20+" },
  { label: "Happy Clients", value: "15+" },
];

const timeline = [
  { year: "2024", title: "Senior Developer", desc: "Leading frontend architecture for SaaS products" },
  { year: "2022", title: "Full-Stack Developer", desc: "Building end-to-end web applications" },
  { year: "2021", title: "Frontend Developer", desc: "Specializing in React and modern CSS" },
  { year: "2020", title: "Started Journey", desc: "First steps into web development" },
];

export function AboutSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="about"
      className="relative bg-[#0a0a0f] py-32"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

      <div className="mx-auto max-w-6xl px-6">
        <RevealSection className="mb-16">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-violet-400">
            About Me
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Passionate about creating
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              impactful digital products
            </span>
          </h2>
        </RevealSection>

        <div className="grid gap-16 lg:grid-cols-2">
          <RevealSection direction="left" delay={0.1}>
            <div className="space-y-6 text-lg leading-relaxed text-zinc-400">
              <p>
                I&apos;m a full-stack developer with a deep passion for building web experiences
                that are both beautiful and performant. With over 5 years of experience, I
                specialize in React, TypeScript, and modern web technologies.
              </p>
              <p>
                My approach combines clean architecture with thoughtful animations and
                interactions. I believe that great software should feel intuitive, look
                polished, and work seamlessly across all devices.
              </p>
              <p>
                When I&apos;m not coding, you&apos;ll find me exploring new web technologies,
                contributing to open source, or sharing knowledge through blog posts and
                mentoring.
              </p>
            </div>
          </RevealSection>

          <div className="grid grid-cols-2 gap-6">
            {highlights.map((item, i) => (
              <RevealSection
                key={item.label}
                delay={0.1 * i}
                direction="right"
              >
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm transition-colors hover:border-violet-500/20 hover:bg-white/[0.04]">
                  <motion.span
                    className="block text-4xl font-bold text-white"
                    initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0.5 }}
                    whileInView={prefersReduced ? {} : { opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: DURATION.normal,
                      delay: 0.1 * i,
                      ease: EASING.spring,
                    }}
                  >
                    {item.value}
                  </motion.span>
                  <span className="mt-2 block text-sm text-zinc-500">{item.label}</span>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <RevealSection className="mt-20">
          <h3 className="mb-8 text-2xl font-bold text-white">Experience Timeline</h3>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-white/[0.06]" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <RevealSection key={item.year} delay={0.1 * i} direction="left">
                  <div className="relative pl-10">
                    <div className="absolute left-2.5 top-1.5 h-3 w-3 rounded-full border-2 border-violet-500 bg-[#0a0a0f]" />
                    <span className="text-sm font-mono text-violet-400">{item.year}</span>
                    <h4 className="mt-1 text-lg font-semibold text-white">{item.title}</h4>
                    <p className="mt-1 text-sm text-zinc-500">{item.desc}</p>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
