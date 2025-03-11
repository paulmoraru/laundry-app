"use client";

import { useInView } from "react-intersection-observer";
import { Check, Clock, Shield, Award } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Benefits() {
  // Add client-side only state
  const [isMounted, setIsMounted] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Only enable animations after initial client-side mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const benefits = [
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Economisiți Timp",
      description:
        "Nu mai pierdeți timpul la spălătorii. Predați și ridicați hainele după programul dumneavoastră.",
    },
    {
      icon: <Check className="h-6 w-6" />,
      title: "Îngrijire Profesională",
      description:
        "Specialiștii noștri urmează cele mai bune practici pentru toate tipurile de țesături.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Dulapuri Securizate",
      description:
        "Articolele dumneavoastră sunt în siguranță în dulapurile noastre securizate și tehnologizate.",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Garanția Calității",
      description:
        "Nu sunteți mulțumit? Vă spălăm din nou articolele fără costuri suplimentare.",
    },
  ];

  // Always render with initial state during SSR and first render
  const shouldAnimate = isMounted && inView;

  return (
    <section className="bg-muted/30 py-20" ref={ref}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[500px] rounded-xl overflow-hidden shadow-lg order-2 lg:order-1">
            <Image
              src="/placeholder.svg?height=500&width=600"
              alt="imagine"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="space-y-8 order-1 lg:order-2">
            <div className={shouldAnimate ? "fade-in" : "opacity-0"}>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                De ce să alegeți FreshPress?
              </h2>
              <div className="text-lg text-muted-foreground mb-8">
                Am reinventat serviciul de spălătorie pentru a se potrivi
                stilului dumneavoastră de viață ocupat, punând accent pe
                confort, calitate și securitate.
              </div>
            </div>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className={`flex gap-4 items-start ${
                    shouldAnimate
                      ? `fade-in [animation-delay:${index * 150}ms]`
                      : "opacity-0"
                  }`}
                >
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">
                      {benefit.title}
                    </h3>
                    <div className="text-muted-foreground">
                      {benefit.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
