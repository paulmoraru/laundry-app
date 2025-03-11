import { HeroSection } from "@/components/homepage-sections/hero-section";
import { HowItWorks } from "@/components/homepage-sections/how-it-works";
import { Testimonials } from "@/components/homepage-sections/testimonials";
import { Benefits } from "@/components/homepage-sections/benefits";
import { CTASection } from "@/components/homepage-sections/cta-section";
export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-16">
      <HeroSection />
      <HowItWorks />
      <Benefits />
      <Testimonials />
      <CTASection />
    </div>
  );
}
