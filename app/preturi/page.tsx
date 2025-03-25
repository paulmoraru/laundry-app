import { PricingHero } from "@/components/pricing-sections/pricing-hero";
import { PricingPlans } from "@/components/pricing-sections/pricing-plans";
import { PricingTable } from "@/components/pricing-sections/pricing-table";
import { PricingFAQ } from "@/components/pricing-sections/pricing-faq";
import { CTASection } from "@/components/homepage-sections/cta-section";

export const metadata = {
  title: "Prețuri | FreshPress Laundry",
  description:
    "Prețuri transparente pentru toate nevoile tale de spălătorie și curățătorie chimică",
};

export default function PricingPage() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <PricingHero />
      <PricingPlans />
      <PricingTable />
      <PricingFAQ />
      <CTASection />
    </div>
  );
}
