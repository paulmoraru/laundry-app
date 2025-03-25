"use client";

import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function PricingHero() {
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
          Prețuri
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Prețuri Simple și Transparente
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Alege planul care se potrivește cel mai bine nevoilor tale de
          spălătorie, fără costuri ascunse sau surprize
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg">
            <Link href="#pricing-plans">Vezi Planurile</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="#pricing-table">Lista de Prețuri</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
