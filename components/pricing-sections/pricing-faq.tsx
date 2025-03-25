"use client";

import { useInView } from "react-intersection-observer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function PricingFAQ() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const faqs = [
    {
      question:
        "Cum se calculează greutatea pentru serviciul de spălare și împăturire?",
      answer:
        "Cântărim articolele când ajung la unitatea noastră. Greutatea este calculată pe baza articolelor uscate înainte de spălare. Avem o comandă minimă de 79.95 lei, care acoperă aproximativ 5 kg de rufe.",
    },
    {
      question: "Există taxe suplimentare pe care ar trebui să le cunosc?",
      answer:
        "Suntem transparenți în privința prețurilor. Pot apărea taxe suplimentare pentru serviciul express, tratamentul petelor sau articole speciale. Acestea vor fi comunicate clar înainte de procesarea comenzii.",
    },
    {
      question: "Cum funcționează abonamentul lunar?",
      answer:
        "Cu planurile noastre lunare, plătești în avans pentru o cantitate fixă de servicii de spălătorie în fiecare lună. Abonamentul se reînnoiește automat lunar și poți anula oricând. Kilogramele neutilizate în planul Pachet Lunar se pot transfera (până la 2.5 kg) în luna următoare.",
    },
    {
      question:
        "Ce se întâmplă dacă depășesc cantitatea lunară în planul de abonament?",
      answer:
        "Dacă depășești cantitatea lunară, kilogramele suplimentare vor fi taxate la tariful nostru normal per kilogram, dar cu o reducere de 10% pentru abonații Pachet Lunar și 15% pentru abonații Plan Familie.",
    },
    {
      question: "Pot să-mi schimb planul de abonament?",
      answer:
        "Da, poți face upgrade, downgrade sau poți anula abonamentul oricând prin contul tău. Modificările vor intra în vigoare la începutul următorului ciclu de facturare.",
    },
    {
      question: "Oferiți reduceri pentru clienții noi?",
      answer:
        "Da! Clienții noi primesc 20% reducere la prima comandă. Avem și programe de recomandare unde poți câștiga credite recomandând prieteni și familie.",
    },
    {
      question: "Există taxe pentru utilizarea dulapurilor inteligente?",
      answer:
        "Nu, nu există taxe suplimentare pentru utilizarea dulapurilor noastre inteligente. Utilizarea dulapului este inclusă în prețul serviciului.",
    },
    {
      question: "Cum gestionați articolele pierdute sau deteriorate?",
      answer:
        "Deși avem maximă grijă de articolele tale, dacă ceva este pierdut sau deteriorat în timpul procesului nostru, te vom compensa în funcție de vechimea, starea și valoarea articolului. Te rugăm să raportezi orice problemă în termen de 48 de ore de la ridicare.",
    },
  ];

  return (
    <section
      ref={ref}
      className={`container py-16 ${inView ? "fade-in" : "opacity-0"}`}
    >
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
          Întrebări Frecvente despre Prețuri
        </h2>
        <p className="text-lg text-muted-foreground">
          Întrebări comune despre prețurile și planurile noastre
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
