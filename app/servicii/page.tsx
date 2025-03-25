import { ServiceHero } from "@/components/services-sections/service-hero";
import { ServiceProcess } from "@/components/services-sections/service-process";
import { ServiceTypes } from "@/components/services-sections/service-types";
import { ServiceFAQ } from "@/components/services-sections/service-faq";
import { CTASection } from "@/components/homepage-sections/cta-section";

export const metadata = {
  title: "Servicii | FreshPress Laundry",
  description:
    "Servicii profesionale de spălătorie și curățare chimică cu ridicare și livrare convenabilă prin dulapuri inteligente",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <ServiceHero />
      <ServiceProcess />
      <ServiceTypes />
      <ServiceFAQ />
      <CTASection />
    </div>
  );
}
