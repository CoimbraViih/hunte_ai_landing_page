import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="border-t border-signal/10 bg-ink px-6 py-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-2">
          <Image src="/symbol.svg" alt="" width={20} height={20} aria-hidden />
          <span className="font-display text-sm font-medium text-zinc-300">
            Hunter.AI
          </span>
        </div>
        <p className="font-body text-xs text-zinc-500">
          © 2026 Hunter.AI. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
