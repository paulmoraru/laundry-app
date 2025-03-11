"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Box, ShoppingBag, Shirt, Bell } from "lucide-react";

export function HowItWorks() {
  const [isMounted, setIsMounted] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const shouldAnimate = isMounted && inView;

  const steps = [
    {
      icon: <ShoppingBag className="h-8 w-8" />,
      title: "Predare",
      description:
        "Plasați-vă hainele într-unul din dulapurile noastre inteligente amplasate în tot orașul.",
    },
    {
      icon: <Shirt className="h-8 w-8" />,
      title: "Noi Spălăm",
      description:
        "Profesioniștii noștri vă curăță hainele cu produse eco-friendly și le calcă la perfecțiune.",
    },
    {
      icon: <Bell className="h-8 w-8" />,
      title: "Notificare",
      description:
        "Primiți o notificare când hainele sunt curate și gata de ridicare.",
    },
    {
      icon: <Box className="h-8 w-8" />,
      title: "Ridicare",
      description:
        "Ridicați-vă hainele proaspete din același dulap sau dintr-unul diferit, la alegerea dumneavoastră.",
    },
  ];

  return (
    <section className="container py-12" ref={ref}>
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
          Cum Funcționează
        </h2>
        <div className="text-lg text-muted-foreground">
          Procesul nostru simplu în 4 pași face spălatul rufelor fără efort
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`bg-card p-6 rounded-xl border shadow-sm hover-scale ${
              shouldAnimate
                ? `fade-in [animation-delay:${index * 150}ms]`
                : "opacity-0"
            }`}
          >
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
              {step.icon}
            </div>
            <h3 className="text-xl font-medium mb-2">{step.title}</h3>
            <div className="text-muted-foreground">{step.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
