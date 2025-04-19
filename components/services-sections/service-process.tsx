"use client";

import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ServiceProcess() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const processes = [
    {
      id: "wash-fold",
      title: "Spălare & Împăturire",
      description:
        "Cel mai popular serviciu pentru hainele și lenjeriile de zi cu zi.",
      steps: [
        "Sortare după culoare și tip de material",
        "Pre-tratarea petelor",
        "Spălare cu detergenți ecologici",
        "Uscare la temperaturi adecvate",
        "Împăturire și ambalare profesională",
      ],
      image: "/img/services-process1.png",
    },
    {
      id: "dry-cleaning",
      title: "Curățare Chimică",
      description:
        "Îngrijire profesională pentru hainele delicate și speciale.",
      steps: [
        "Inspecție și etichetare",
        "Pre-tratarea petelor",
        "Proces delicat de curățare chimică",
        "Călcare și finisare",
        "Verificarea calității și ambalare",
      ],
      image: "/img/services-process2.png",
    },
    {
      id: "specialty",
      title: "Articole Speciale",
      description:
        "Îngrijire personalizată pentru articole unice care necesită atenție specială.",
      steps: [
        "Evaluare de expert",
        "Metode specializate de curățare",
        "Spălare manuală când este necesar",
        "Tehnici atente de uscare",
        "Finisare și ambalare specializată",
      ],
      image: "/img/services-process3.png",
    },
  ];

  return (
    <section
      ref={ref}
      className={`container py-12 ${inView ? "fade-in" : "opacity-0"}`}
    >
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
          Procesul Nostru de Curățare
        </h2>
        <p className="text-lg text-muted-foreground">
          Ne mândrim cu abordarea noastră meticuloasă în îngrijirea hainelor
        </p>
      </div>

      <Tabs defaultValue="wash-fold" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          {processes.map((process) => (
            <TabsTrigger key={process.id} value={process.id}>
              {process.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {processes.map((process) => (
          <TabsContent key={process.id} value={process.id} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">{process.title}</h3>
                <p className="text-muted-foreground">{process.description}</p>

                <div className="space-y-4">
                  <h4 className="font-medium">Procesul Nostru în 5 Pași:</h4>
                  <ol className="space-y-3">
                    {process.steps.map((step, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                          {index + 1}
                        </div>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={process.image || "/placeholder.svg"}
                  alt={`${process.title} process`}
                  fill
                  className="object-fill"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
