"use client";

import { useLayoutEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Globe, MessageCircle, RefreshCw, type LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";

const serviceSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://hunterai.com.br/#organization",
      name: "Hunter.AI",
      url: "https://hunterai.com.br",
      description:
        "Agentes de IA humanizados, criação de sites e redesign de sites para pequenos e médios negócios no Brasil.",
    },
    {
      "@type": "Service",
      name: "Agentes de IA para atendimento",
      description:
        "Um agente humanizado atende seus clientes pelo WhatsApp, Instagram ou site, qualifica cada conversa e já marca o horário na sua agenda — 24 horas por dia.",
      provider: { "@id": "https://hunterai.com.br/#organization" },
      areaServed: {
        "@type": "Country",
        name: "Brazil",
      },
      serviceType: "Atendimento ao cliente com agente de IA humanizado",
    },
    {
      "@type": "Service",
      name: "Criação de site",
      description:
        "Sua empresa ainda não tem site? A gente cria uma presença digital profissional que passa credibilidade e traz o cliente até você.",
      provider: { "@id": "https://hunterai.com.br/#organization" },
      areaServed: {
        "@type": "Country",
        name: "Brazil",
      },
      serviceType: "Criação de site institucional",
    },
    {
      "@type": "Service",
      name: "Redesign de site",
      description:
        "Site que já existe, mas não converte? A gente reconstrói com foco em deixar o visitante virar cliente.",
      provider: { "@id": "https://hunterai.com.br/#organization" },
      areaServed: {
        "@type": "Country",
        name: "Brazil",
      },
      serviceType: "Redesign e otimização de site existente",
    },
  ],
};

type Service = {
  icon: LucideIcon;
  index: string;
  title: string;
  body: string;
};

const services: Service[] = [
  {
    icon: MessageCircle,
    index: "01",
    title: "Agentes de IA para atendimento",
    body: "Um agente humanizado atende seus clientes pelo WhatsApp, Instagram ou site, qualifica cada conversa e já marca o horário na sua agenda — 24 horas por dia.",
  },
  {
    icon: Globe,
    index: "02",
    title: "Criação de site",
    body: "Sua empresa ainda não tem site? A gente cria uma presença digital profissional que passa credibilidade e traz o cliente até você.",
  },
  {
    icon: RefreshCw,
    index: "03",
    title: "Redesign de site",
    body: "Site que já existe, mas não converte? A gente reconstrói com foco em deixar o visitante virar cliente.",
  },
];

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Services() {
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
    <section id="servicos" className="bg-ink py-24 sm:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-amber backdrop-blur-sm">
            02 — O QUE FAZEMOS
          </span>

          <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            Três formas de parar de perder venda por atendimento e presença
            digital fracos
          </h2>

          <p className="mt-4 font-body text-base text-zinc-400 sm:text-lg">
            A Hunter.AI cuida da parte técnica. Você recebe o resultado
            pronto — sem precisar entender de IA ou de código.
          </p>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={gridVariants}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3"
        >
          {services.map((service) => (
            <motion.div key={service.index} variants={cardVariants}>
              <Card className="h-full border border-white/10 bg-white/[0.03] text-zinc-50 ring-0 transition hover:-translate-y-1 hover:border-signal/40">
                <CardHeader className="flex flex-row items-start justify-between gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-signal/20 bg-signal/10">
                    <service.icon className="size-5 text-signal" aria-hidden />
                  </div>
                  <span className="font-mono text-xs text-zinc-500">
                    {service.index}
                  </span>
                </CardHeader>

                <CardContent className="flex flex-col gap-2">
                  <h3 className="font-display text-lg font-semibold leading-snug text-zinc-50">
                    {service.title}
                  </h3>
                  <CardDescription className="font-body text-sm text-zinc-400">
                    {service.body}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
