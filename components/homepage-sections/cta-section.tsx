"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  const [email, setEmail] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const shouldAnimate = isMounted && inView;

  return (
    <section
      ref={ref}
      className={`bg-primary text-primary-foreground py-16 ${
        shouldAnimate ? "fade-in" : "opacity-0"
      }`}
    >
      <div className="container">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Sunteți gata să vă recâștigați weekendurile?
          </h2>
          <div className="text-lg opacity-90">
            Înregistrați-vă acum și primiți 25% reducere la prima comandă. Nu
            mai pierdeți timpul cu spălatul rufelor.
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Introduceți emailul"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md px-4 py-2.5 text-base w-full text-foreground bg-background"
            />
            <Button variant="secondary" size="lg" className="gap-2 shadow-sm">
              Începeți
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-sm opacity-75">
            Vă vom trimite informații despre rezervări și oferte exclusive.
          </div>
        </div>
      </div>
    </section>
  );
}
