import Image from "next/image";
import { ParticleField } from "@/components/visuals/particle-field";

export default function Home() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-ink px-6 text-center">
      <ParticleField />

      <div className="relative z-10 flex max-w-xl flex-col items-center gap-6">
        <Image src="/logo.svg" alt="Hunter.AI" width={160} height={40} priority />

        <h1 className="font-display text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
          <span className="text-signal">Hunter.AI</span>
        </h1>

        <p className="font-body text-base leading-relaxed text-zinc-400 sm:text-lg">
          Agentes de IA humanizados para atendimento, sites e experiências
          digitais para pequenos e médios negócios.
        </p>

        <span className="mt-2 h-1.5 w-10 rounded-full bg-amber" />
      </div>
    </section>
  );
}
