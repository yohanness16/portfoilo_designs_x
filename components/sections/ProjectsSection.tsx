"use client";

import { RevealSection } from "@/components/animations/RevealSection";
import { Card3D } from "@/components/animations/Card3D";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { AnimatedLink } from "@/components/animations/AnimatedLink";

interface Project {
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  link: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with real-time inventory, Stripe payments, and an admin dashboard. Built for scale with server-side rendering.",
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    gradient: "from-violet-600/20 to-indigo-600/20",
    link: "#",
    featured: true,
  },
  {
    title: "Real-Time Analytics Dashboard",
    description:
      "Interactive data visualization platform with live WebSocket updates, custom chart builders, and team collaboration features.",
    tags: ["React", "D3.js", "WebSocket", "Redis"],
    gradient: "from-fuchsia-600/20 to-pink-600/20",
    link: "#",
    featured: true,
  },
  {
    title: "AI Content Generator",
    description:
      "An AI-powered writing assistant with GPT integration, template management, and multi-language support for content teams.",
    tags: ["Next.js", "OpenAI", "Prisma", "Tailwind"],
    gradient: "from-cyan-600/20 to-blue-600/20",
    link: "#",
  },
  {
    title: "Design System Library",
    description:
      "A comprehensive component library with 50+ accessible components, dark mode support, and Figma design tokens sync.",
    tags: ["React", "Storybook", "a11y", "CSS Variables"],
    gradient: "from-amber-600/20 to-orange-600/20",
    link: "#",
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card3D className="group h-full">
      <div
        className={`relative flex h-full flex-col rounded-2xl border border-white/[0.06] bg-gradient-to-br ${project.gradient} p-8 backdrop-blur-sm transition-colors hover:border-violet-500/20`}
      >
        {project.featured && (
          <span className="absolute top-4 right-4 rounded-full bg-violet-500/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-violet-300">
            Featured
          </span>
        )}

        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/0 to-fuchsia-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:from-violet-500/5 group-hover:to-fuchsia-500/5" />

        <h3 className="mb-3 text-xl font-bold text-white">{project.title}</h3>
        <p className="mb-6 flex-1 text-sm leading-relaxed text-zinc-400">
          {project.description}
        </p>

        <div className="mb-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/[0.06] bg-white/[0.04] px-3 py-1 text-xs font-medium text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <AnimatedLink
          href={project.link}
          className="inline-flex items-center gap-2 text-sm font-medium text-violet-400"
        >
          View Project
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </AnimatedLink>
      </div>
    </Card3D>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="relative bg-[#0a0a0f] py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

      <div className="mx-auto max-w-6xl px-6">
        <RevealSection className="mb-16 text-center">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-violet-400">
            Portfolio
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Featured{" "}
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
            A selection of projects that showcase my skills in full-stack development,
            UI design, and performance optimization.
          </p>
        </RevealSection>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, i) => (
            <RevealSection key={project.title} delay={0.1 * i} direction="up">
              <ProjectCard project={project} />
            </RevealSection>
          ))}
        </div>

        <RevealSection delay={0.5} className="mt-12 text-center">
          <MagneticButton className="rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10">
            View All Projects
          </MagneticButton>
        </RevealSection>
      </div>
    </section>
  );
}
