"use client";

import { motion } from "framer-motion";

import { buildWhatsAppLink } from "@/lib/whatsapp";

type WhatsAppCtaProps = {
  label?: string;
  className?: string;
};

export function WhatsAppCta({
  label = "Falar no WhatsApp",
  className = "",
}: WhatsAppCtaProps) {
  return (
    <motion.a
      href={buildWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className={`inline-flex items-center justify-center rounded-full bg-signal px-4 py-2 text-sm font-semibold text-ink shadow-[0_0_20px_rgba(46,230,160,0.35)] transition-opacity hover:opacity-90 sm:px-5 sm:py-2.5 sm:text-base ${className}`}
    >
      {label}
    </motion.a>
  );
}
