"use client";

import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

export function PricingPlans() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const plans = [
    {
      name: "Plătește Pe Loc",
      price: "Fără abonament",
      description: "Perfect pentru nevoi ocazionale de spălătorie",
      features: [
        "Prețuri standard per articol",
        "Fără comandă minimă",
        "Livrare în 48 de ore",
        "Acces la toate serviciile",
        "Acces la aplicația mobilă",
      ],
      cta: "Începe Acum",
      popular: false,
    },
    {
      name: "Pachet Lunar",
      price: "89.99 lei/lună",
      description: "Ideal pentru nevoi regulate de spălătorie",
      features: [
        "20 kg de rufe incluse",
        "10% reducere la curățătorie chimică",
        "Ridicare și livrare gratuită",
        "Serviciu prioritar în 24 ore",
        "Transfer până la 2.5 kg lunar",
      ],
      cta: "Alege Planul",
      popular: true,
    },
    {
      name: "Plan Familie",
      price: "149.99 lei/lună",
      description: "Cea mai bună valoare pentru familii",
      features: [
        "40 kg de rufe incluse",
        "15% reducere la curățătorie chimică",
        "Ridicare și livrare gratuită",
        "Serviciu prioritar în 24 ore",
        "Tratament pete inclus",
      ],
      cta: "Alege Planul",
      popular: false,
    },
  ];

  return (
    <section id="pricing-plans" className="container py-12">
      <div
        ref={ref}
        className={`text-center max-w-3xl mx-auto mb-12 ${
          inView ? "fade-in" : "opacity-0"
        }`}
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
          Alege Planul Tău
        </h2>
        <p className="text-lg text-muted-foreground">
          Selectează opțiunea care se potrivește cel mai bine stilului tău de
          viață și bugetului
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative rounded-xl border ${
              plan.popular ? "border-primary shadow-lg" : "border-border"
            } bg-card p-6 ${
              inView
                ? `fade-in [animation-delay:${index * 150}ms]`
                : "opacity-0"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                Most Popular
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-2">
                <span className="text-3xl font-bold">{plan.price}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {plan.description}
              </p>
            </div>

            <ul className="mb-6 space-y-3">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <Check className="mr-2 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              className="w-full"
              variant={plan.popular ? "default" : "outline"}
              asChild
            >
              <Link href="/signup">{plan.cta}</Link>
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center text-sm text-muted-foreground">
        <p>
          Toate planurile includ acces la sistemul nostru de dulapuri
          inteligente și aplicația mobilă.
        </p>
        <p>
          Prețurile pot varia în funcție de locație. Pot apărea taxe
          suplimentare pentru articole supradimensionate.
        </p>
      </div>
    </section>
  );
}
