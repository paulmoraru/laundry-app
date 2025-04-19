"use client";

import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ServiceHero() {
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
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
            Serviciile Noastre
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Îngrijire Profesională pentru Toate Hainele Tale
          </h1>
          <p className="text-lg text-muted-foreground">
            De la spălătoria zilnică până la țesături delicate, oferim servicii
            experte de curățare cu ridicare și livrare convenabilă prin sistemul
            nostru de dulapuri inteligente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg">
              <Link href="/preturi">Vezi Prețurile</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="#service-types">Explorează Serviciile</Link>
            </Button>
          </div>
        </div>
        <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/img/services-hero-image.png"
            alt="Serviciu de spălătorie profesional"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}
