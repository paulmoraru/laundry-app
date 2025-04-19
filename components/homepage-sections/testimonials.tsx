"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function Testimonials() {
  const [isMounted, setIsMounted] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const shouldAnimate = isMounted && inView;

  const testimonials = [
    {
      name: "Maria Popescu",
      role: "Consultant",
      image: "/img/testimonial3.png",
      quote:
        "FreshPress mi-a schimbat complet rutina. Las hainele în drum spre serviciu și le ridic la întoarcere. Totul este perfect curat și frumos împăturit. E ca și cum aș avea un asistent personal pentru spălătorie!",
      rating: 5,
    },
    {
      name: "Ionescu Ion",
      role: "IT Consultant",
      image: "/img/testimonial1.png",
      quote:
        "Cu trei copii, spălatul rufelor îmi ocupa tot weekendul. Acum las totul vineri și ridic hainele curate și proaspete luni. Calitatea este uimitoare, iar confortul este și mai bun.",
      rating: 5,
    },
    {
      name: "Alex Popescu",
      role: "Student la Master",
      image: "/img/testimonial2.png",
      quote:
        "Viața într-un apartament mic fără facilități de spălătorie era o provocare până am descoperit FreshPress. Dulapurile inteligente sunt la doar un bloc distanță, iar aplicația face programările super ușoare. Recomand cu căldură!",
      rating: 4,
    },
    {
      name: "Emil Lăzărescu",
      role: "Antreprenor",
      image: "/img/testimonial4.png",
      quote:
        "Ca persoană care își conduce propria afacere, fiecare minut contează. FreshPress îmi oferă timp prețios și se asigură că am mereu haine curate și profesionale. Atenția lor la detalii este impresionantă.",
      rating: 5,
    },
  ];

  return (
    <section className="container py-20" ref={ref}>
      <div
        className={`text-center max-w-3xl mx-auto mb-12 ${
          shouldAnimate ? "fade-in" : "opacity-0"
        }`}
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
          Ce Spun Clienții Noștri
        </h2>
        <div className="text-lg text-muted-foreground">
          Alăturați-vă miilor de clienți mulțumiți care au făcut ca ziua
          spălatului să devină istorie
        </div>
      </div>

      <div
        className={
          shouldAnimate ? "fade-in [animation-delay:200ms]" : "opacity-0"
        }
      >
        <Carousel className="w-full">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/3 p-2"
              >
                <div className="bg-card border rounded-xl p-6 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{testimonial.name}</h3>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>

                  <div className="flex mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating
                            ? "text-amber-400 fill-amber-400"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>

                  <blockquote className="flex-1">
                    <div className="text-muted-foreground italic">
                      {testimonial.quote}
                    </div>
                  </blockquote>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-6">
            <CarouselPrevious className="relative mr-2" />
            <CarouselNext className="relative" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
