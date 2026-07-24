"use client";

import { useLayoutEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";

type Step = {
  index: string;
  label: string;
  title: string;
  body: string;
};

const steps: Step[] = [
  {
    index: "01",
    label: "Rastrear",
    title: "Mapeamos seu negócio",
    body: "Entendemos seus produtos, seu tom de voz, suas dúvidas mais frequentes e onde você está perdendo mais venda — no atendimento, no site ou nos dois.",
  },
  {
    index: "02",
    label: "Mirar",
    title: "Definimos o que faz mais sentido pro seu negócio",
    body: "Agente de IA, site novo ou redesign de site — escolhemos o que resolve seu problema agora, não um pacote fechado.",
  },
  {
    index: "03",
    label: "Capturar",
    title: "Vai ao ar — e você acompanha o resultado",
    body: "Atendimento, presença digital e conversão funcionando de verdade, prontos para o dia a dia do seu negócio.",
  },
];

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.12,
    },
  },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Trust() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useLayoutEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    function handleChange() {
      setPrefersReducedMotion(media.matches);
    }

    handleChange();
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  return (
    <section id="como-funciona" className="bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-amber backdrop-blur-sm">
            03 — COMO FUNCIONA
          </span>

          <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            Rastrear, mirar, capturar — em três etapas
          </h2>

          <p className="mt-4 font-body text-base text-zinc-400 sm:text-lg">
            O instinto de caça que dá nome à marca organiza a entrega do seu
            projeto — da primeira conversa até o serviço no ar.
          </p>
        </motion.div>

        <motion.ol
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={listVariants}
          className="mt-16"
        >
          {steps.map((step, i) => (
            <motion.li
              key={step.index}
              variants={rowVariants}
              className={`grid grid-cols-[56px_1fr] gap-4 py-9 sm:grid-cols-[80px_1fr] sm:gap-7 ${
                i < steps.length - 1 ? "border-b border-dashed border-white/10" : ""
              }`}
            >
              <div
                aria-hidden="true"
                className="flex h-14 w-14 items-center justify-center rounded-full border border-signal/30 bg-signal/5 font-display text-base font-bold text-signal"
              >
                {step.index}
              </div>

              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-amber">
                  {step.label}
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold text-zinc-50">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[56ch] font-body text-zinc-400">
                  {step.body}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
