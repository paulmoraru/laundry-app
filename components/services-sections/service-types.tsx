"use client";

import { useInView } from "react-intersection-observer";
import {
  Shirt,
  ShirtIcon as Tshirt,
  ShirtIcon,
  Bed,
  Sofa,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ServiceTypes() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      icon: <Shirt className="h-10 w-10" />,
      title: "Spălare & Împăturire",
      description:
        "Perfect pentru hainele de zi cu zi, prosoape și lenjerie. Articolele sunt spălate, uscate și frumos împăturite.",
      items: [
        "Tricouri",
        "Blugi",
        "Lenjerie intimă",
        "Șosete",
        "Prosoape",
        "Cearșafuri",
      ],
    },
    {
      icon: <ShirtIcon className="h-10 w-10" />,
      title: "Curățare Chimică",
      description:
        "Curățare profesională pentru țesături delicate și articole care necesită îngrijire specială.",
      items: [
        "Costume",
        "Rochii",
        "Articole din mătase",
        "Haine din lână",
        "Ținute de gală",
        "Paltoane",
      ],
    },
    {
      icon: <Tshirt className="h-10 w-10" />,
      title: "Spălare & Călcare",
      description:
        "Hainele sunt spălate și călcate profesional pentru un aspect impecabil.",
      items: [
        "Cămăși",
        "Bluze",
        "Pantaloni",
        "Pantaloni casual",
        "Tricouri polo",
        "Fuste",
      ],
    },
    {
      icon: <Bed className="h-10 w-10" />,
      title: "Lenjerii & Textile de Pat",
      description:
        "Curățare profundă pentru articole voluminoase și lenjerii de casă pentru a menține prospețimea căminului.",
      items: [
        "Pilote",
        "Plăpumi",
        "Pături",
        "Perne",
        "Huse de saltea",
        "Fețe de masă",
      ],
    },
    {
      icon: <Sofa className="h-10 w-10" />,
      title: "Articole de Casă",
      description:
        "Servicii de curățare pentru diverse textile de uz casnic și articole decorative.",
      items: [
        "Draperii",
        "Perne decorative",
        "Huse de mobilă",
        "Covoare",
        "Șervețele textile",
        "Țesături decorative",
      ],
    },
    {
      icon: <Sparkles className="h-10 w-10" />,
      title: "Servicii Speciale",
      description:
        "Soluții personalizate de curățare pentru articole unice sau delicate care necesită atenție suplimentară.",
      items: [
        "Rochii de mireasă",
        "Articole din piele",
        "Articole din velur",
        "Blănuri",
        "Haine cu paiete",
        "Haine vintage",
      ],
    },
  ];

  return (
    <section id="service-types" className="bg-muted/30 py-16">
      <div className="container">
        <div
          ref={ref}
          className={`text-center max-w-3xl mx-auto mb-12 ${
            inView ? "fade-in" : "opacity-0"
          }`}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Gama Noastră de Servicii
          </h2>
          <p className="text-lg text-muted-foreground">
            Soluții complete de spălătorie adaptate nevoilor dumneavoastră
            specifice
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-card border rounded-xl p-6 shadow-sm hover-scale ${
                inView
                  ? `fade-in [animation-delay:${index * 100}ms]`
                  : "opacity-0"
              }`}
            >
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-muted-foreground mb-4">
                {service.description}
              </p>

              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Includes:</h4>
                <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
                  {service.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-muted-foreground flex items-center"
                    >
                      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-primary"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/pricing">Vezi Lista de Prețuri</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
