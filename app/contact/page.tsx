import { ContactHero } from "@/components/contact-sections/contact-hero";
import { ContactForm } from "@/components/contact-sections/contact-form";
import { ContactLocations } from "@/components/contact-sections/contact-locations";
import { ContactInfo } from "@/components/contact-sections/contact-info";

export const metadata = {
  title: "Contactează-ne | FreshPress Laundry",
  description: "Contactează echipa noastră pentru întrebări sau asistență",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <ContactHero />
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12">
        <ContactForm />
        <div className="space-y-12">
          <ContactInfo />
          <ContactLocations />
        </div>
      </div>
    </div>
  );
}
