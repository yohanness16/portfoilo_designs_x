"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RevealSection } from "@/components/animations/RevealSection";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export function ContactSection() {
  const prefersReduced = useReducedMotion();
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: "", email: "", message: "" });
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="relative bg-[#0a0a0f] py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-fuchsia-600/[0.03] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <RevealSection className="mb-16 text-center">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-violet-400">
            Get In Touch
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Let&apos;s{" "}
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Work Together
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
            Have a project in mind? I&apos;d love to hear about it. Send me a message
            and let&apos;s create something amazing.
          </p>
        </RevealSection>

        <div className="grid gap-16 lg:grid-cols-2">
          <RevealSection direction="left">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-zinc-300">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                  className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-white placeholder-zinc-600 outline-none transition-colors focus:border-violet-500/40 focus:bg-white/[0.05]"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-300">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                  className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-white placeholder-zinc-600 outline-none transition-colors focus:border-violet-500/40 focus:bg-white/[0.05]"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-zinc-300">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                  className="w-full resize-none rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-white placeholder-zinc-600 outline-none transition-colors focus:border-violet-500/40 focus:bg-white/[0.05]"
                  placeholder="Tell me about your project..."
                />
              </div>
              <MagneticButton
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-violet-600 py-4 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-colors hover:bg-violet-500 disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </MagneticButton>

              {isSubmitted && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-sm text-emerald-400"
                >
                  Message sent successfully! I&apos;ll get back to you soon.
                </motion.p>
              )}
            </form>
          </RevealSection>

          <RevealSection direction="right" delay={0.2}>
            <div className="space-y-8">
              <div>
                <h3 className="mb-4 text-lg font-semibold text-white">Contact Info</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                      ✉
                    </span>
                    <div>
                      <p className="text-sm text-zinc-500">Email</p>
                      <p className="text-white">hello@portfolio.dev</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                      ◉
                    </span>
                    <div>
                      <p className="text-sm text-zinc-500">Location</p>
                      <p className="text-white">Available Worldwide</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-semibold text-white">Follow Me</h3>
                <div className="flex gap-4">
                  {socialLinks.map((link) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-zinc-400 transition-colors hover:border-violet-500/20 hover:bg-white/[0.06] hover:text-white"
                      whileHover={prefersReduced ? {} : { scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={link.label}
                    >
                      {link.icon}
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6">
                <p className="text-sm leading-relaxed text-zinc-300">
                  💡 <strong className="text-white">Open to opportunities</strong> — I&apos;m
                  currently available for freelance projects and full-time positions.
                  Let&apos;s build something great together!
                </p>
              </div>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}
