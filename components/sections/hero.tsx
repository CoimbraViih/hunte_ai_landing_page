"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ParticleField } from "@/components/visuals/particle-field";
import { WhatsAppCta } from "@/components/layout/whatsapp-cta";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Hero() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    function handleChange() {
      setPrefersReducedMotion(media.matches);
    }

    handleChange();
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    function handleMouseMove(event: MouseEvent) {
      const mouseX = event.clientX - window.innerWidth / 2;
      const mouseY = event.clientY - window.innerHeight / 2;
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(() => {
        setParallax({ x: mouseX * -0.02, y: mouseY * -0.02 });
      });
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [prefersReducedMotion]);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-ink pt-20">
      <div
        className="absolute inset-0 -z-10"
        style={{ transform: `translate(${parallax.x}px, ${parallax.y}px)` }}
        aria-hidden
      >
        <ParticleField />
      </div>

      <Image
        src="/symbol.svg"
        alt=""
        aria-hidden
        width={640}
        height={640}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[min(70vh,90vw)] w-[min(70vh,90vw)] opacity-[0.08] sm:h-[min(55vh,70vw)] sm:w-[min(55vh,70vw)]"
        style={{ transform: `translate(calc(-50% + ${parallax.x}px), calc(-50% + ${parallax.y}px))` }}
      />

      <motion.div
        initial={prefersReducedMotion ? false : "hidden"}
        animate="visible"
        variants={containerVariants}
        className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center"
      >
        <motion.span
          variants={itemVariants}
          className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-amber backdrop-blur-sm"
        >
          Atendimento lento. Venda perdida.
        </motion.span>

        <motion.h1
          variants={itemVariants}
          className="font-display text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl"
        >
          Enquanto seu negócio demora para responder, o cliente já fechou com
          o concorrente.
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="font-body text-base leading-relaxed text-zinc-400 sm:text-lg"
        >
          Agentes de IA humanizados da <span className="text-signal">Hunter.AI</span>{" "}
          respondem, qualificam e agendam no WhatsApp, Instagram e site — 24
          horas por dia, sem perder o tom humano.
        </motion.p>

        <motion.div variants={itemVariants}>
          <WhatsAppCta
            label="Falar no WhatsApp agora"
            className="mt-2 px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
