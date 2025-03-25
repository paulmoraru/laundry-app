"use client";

import { useInView } from "react-intersection-observer";

export function ContactHero() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      ref={ref}
      className={`container pt-12 pb-8 md:pt-16 md:pb-12 ${
        inView ? "fade-in" : "opacity-0"
      }`}
    >
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
          Contactează-ne
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Ia Legătura cu Noi
        </h1>
        <p className="text-lg text-muted-foreground">
          Ai întrebări sau ai nevoie de asistență? Suntem aici să te ajutăm cu
          toate nevoile tale legate de spălătorie.
        </p>
      </div>
    </section>
  );
}
