import { AnimatedLink } from "@/components/animations/AnimatedLink";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-[#0a0a0f] py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="text-sm text-zinc-500">
          © {new Date().getFullYear()} Portfolio. Built with Next.js & Framer Motion.
        </p>
        <nav className="flex items-center gap-6">
          {footerLinks.map((link) => (
            <AnimatedLink
              key={link.href}
              href={link.href}
              className="text-xs text-zinc-500 hover:text-zinc-300"
            >
              {link.label}
            </AnimatedLink>
          ))}
        </nav>
        <p className="text-sm text-zinc-600">
          <span className="text-violet-400">&lt;/&gt;</span> with ❤
        </p>
      </div>
    </footer>
  );
}
