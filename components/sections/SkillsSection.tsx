"use client";

import { motion } from "framer-motion";
import { RevealSection } from "@/components/animations/RevealSection";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DURATION, EASING, STAGGER } from "@/lib/animation";

interface SkillCategory {
  title: string;
  skills: string[];
  icon: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"],
    icon: "◈",
  },
  {
    title: "Backend",
    skills: ["Node.js", "Python", "PostgreSQL", "Redis", "GraphQL", "REST APIs"],
    icon: "⬡",
  },
  {
    title: "3D & Animation",
    skills: ["Three.js", "React Three Fiber", "WebGL", "CSS 3D", "Canvas API", "Shaders"],
    icon: "△",
  },
  {
    title: "Tools & DevOps",
    skills: ["Git", "Docker", "Vercel", "AWS", "CI/CD", "Figma"],
    icon: "⬢",
  },
];

export function SkillsSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="skills" className="relative bg-[#0a0a0f] py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-violet-600/[0.03] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <RevealSection className="mb-16 text-center">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-violet-400">
            Expertise
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Skills &{" "}
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Technologies
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            Technologies I work with daily to build modern web experiences.
          </p>
        </RevealSection>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category, catIdx) => (
            <RevealSection key={category.title} delay={0.1 * catIdx} direction="up">
              <div className="group h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm transition-colors hover:border-violet-500/20 hover:bg-white/[0.04]">
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-lg text-violet-400 transition-colors group-hover:bg-violet-500/20">
                    {category.icon}
                  </span>
                  <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                </div>

                <ul className="space-y-3">
                  {category.skills.map((skill, skillIdx) => (
                    <motion.li
                      key={skill}
                      className="flex items-center gap-3 text-sm text-zinc-400"
                      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, x: -10 }}
                      whileInView={prefersReduced ? {} : { opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: DURATION.fast,
                        delay: 0.1 * catIdx + skillIdx * STAGGER.tight,
                        ease: EASING.decelerate,
                      }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-violet-500/50" />
                      {skill}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
