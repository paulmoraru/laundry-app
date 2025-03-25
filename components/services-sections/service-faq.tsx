"use client";

import { useInView } from "react-intersection-observer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function ServiceFAQ() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const faqs = [
    {
      question: "Cât durează curățarea articolelor mele?",
      answer:
        "Serviciul standard durează 48 de ore de la predare până la ridicare. Oferim și serviciu expres cu livrare în 24 de ore contra unui cost suplimentar. Serviciul în aceeași zi este disponibil pentru articolele predate înainte de ora 9:00, cu ridicare după ora 17:00.",
    },
    {
      question: "Ce se întâmplă dacă nu sunt mulțumit de curățare?",
      answer:
        "Satisfacția clienților este prioritatea noastră. Dacă nu sunteți complet mulțumit de serviciul nostru, vă rugăm să ne anunțați în termen de 48 de ore de la ridicare, și vom curăța din nou articolele dumneavoastră fără costuri suplimentare.",
    },
    {
      question: "Cum știu care articole necesită curățare chimică?",
      answer:
        "Verificați eticheta de îngrijire a hainelor. Articolele etichetate cu 'Doar Curățare Chimică' trebuie curățate chimic. Dacă nu sunteți sigur, suntem bucuroși să vă evaluăm articolele și să recomandăm metoda potrivită de curățare.",
    },
    {
      question: "Produsele voastre de curățare sunt ecologice?",
      answer:
        "Da, folosim detergenți și soluții de curățare prietenoase cu mediul, care sunt eficiente dar blânde atât cu hainele dumneavoastră, cât și cu planeta. Procesul nostru de curățare chimică folosește alternative moderne, mai puțin toxice față de solvenții tradiționali.",
    },
    {
      question:
        "Ce se întâmplă dacă hainele mele sunt deteriorate în timpul curățării?",
      answer:
        "Deși avem cea mai mare grijă de articolele dumneavoastră, dacă apar deteriorări în timpul procesului nostru de curățare, vă vom compensa în funcție de vechimea, starea și valoarea articolului. Vă rugăm să raportați orice problemă în termen de 48 de ore de la ridicare.",
    },
    {
      question: "Cât de sigure sunt dulapurile inteligente?",
      answer:
        "Dulapurile noastre inteligente sunt foarte sigure, cu compartimente individuale care pot fi deschise doar cu un cod unic trimis pe telefonul dumneavoastră. Dulapurile sunt sub supraveghere video 24/7 și sunt amplasate în zone bine iluminate și accesibile.",
    },
    {
      question: "Puteți trata pete și nevoi speciale de curățare?",
      answer:
        "Da, ne specializăm în îndepărtarea petelor și putem trata majoritatea petelor comune. Pentru pete deosebit de dificile sau articole speciale, le vom evalua individual și vom comunica cu dumneavoastră despre cea mai bună abordare.",
    },
    {
      question:
        "Ce se întâmplă dacă trebuie să anulez sau să reprogramez comanda?",
      answer:
        "Puteți anula sau reprograma prin intermediul aplicației noastre sau al site-ului web cu până la 2 ore înainte de ora programată pentru predare, fără penalizări. Modificările făcute după această fereastră pot atrage o taxă mică.",
    },
  ];

  return (
    <section
      ref={ref}
      className={`container py-16 ${inView ? "fade-in" : "opacity-0"}`}
    >
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
          Întrebări Frecvente
        </h2>
        <p className="text-lg text-muted-foreground">
          Tot ce trebuie să știți despre serviciile noastre de spălătorie
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

      <div className="mt-12 text-center">
        <p className="text-muted-foreground">
          Aveți alte întrebări?{" "}
          <a
            href="/contact"
            className="text-primary font-medium hover:underline"
          >
            Contactați echipa noastră de suport
          </a>
        </p>
      </div>
    </section>
  );
}
