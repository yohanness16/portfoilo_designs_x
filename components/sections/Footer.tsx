export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-[#0a0a0f] py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="text-sm text-zinc-500">
          © {new Date().getFullYear()} Portfolio. Built with Next.js & Framer Motion.
        </p>
        <p className="text-sm text-zinc-600">
          <span className="text-violet-400">&lt;/&gt;</span> with ❤
        </p>
      </div>
    </footer>
  );
}
