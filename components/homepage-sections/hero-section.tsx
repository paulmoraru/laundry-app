"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

export function HeroSection() {
  const [zipCode, setZipCode] = useState("");
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      ref={ref}
      className={`container py-20 md:py-24 ${inView ? "fade-in" : "opacity-0"}`}
    >
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <span className="block">Spălătorie făcută</span>
            <span className="block text-primary">simplu și eficient</span>
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            Nu mai pierdeți timpul cu spălatul rufelor. Lăsați hainele la
            dulapurile noastre inteligente și le primiți înapoi curate și
            proaspete în doar 24 de ore.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Introduceți codul poștal"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="w-full rounded-md border border-input px-4 py-2.5 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
            <Button size="lg" className="gap-2 h-[46px] px-6" asChild>
              <Link href="/easybox">
                Rezervați Acum
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Disponibil în orașe selectate. Nu este necesară introducerea
            cardului pentru verificare.
          </p>
        </div>
        <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/img/hero-image.png"
            alt="imagine"
            fill
            className="object-fill"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}
