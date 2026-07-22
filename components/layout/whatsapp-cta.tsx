import { buildWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type WhatsAppCtaProps = {
  label?: string;
  className?: string;
};

export function WhatsAppCta({
  label = "Falar no WhatsApp",
  className = "",
}: WhatsAppCtaProps) {
  return (
    <a
      href={buildWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-signal px-4 py-2 text-sm font-semibold text-ink shadow-[0_0_20px_rgba(46,230,160,0.35)] transition-all duration-150 hover:scale-[1.03] hover:opacity-90 active:scale-[0.97] sm:px-5 sm:py-2.5 sm:text-base",
        className,
      )}
    >
      {label}
    </a>
  );
}
