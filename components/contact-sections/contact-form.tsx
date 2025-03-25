"use client";

import type React from "react";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export function ContactForm() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Mesaj trimis!",
      description: "Vă vom răspunde cât mai curând posibil.",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

    setIsSubmitting(false);
  };

  return (
    <div ref={ref} className={`${inView ? "fade-in" : "opacity-0"}`}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Trimite-ne un Mesaj</h2>
        <p className="text-muted-foreground">
          Completează formularul de mai jos și îți vom răspunde cât mai curând
          posibil.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Nume Complet</Label>
            <Input
              id="name"
              name="name"
              placeholder="Numele tău"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Adresa ta de email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="phone">Telefon (Opțional)</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Numărul tău de telefon"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subiect</Label>
            <Input
              id="subject"
              name="subject"
              placeholder="Cu ce te putem ajuta?"
              required
              value={formData.subject}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Mesaj</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Te rugăm să oferi detalii despre solicitarea ta"
            rows={6}
            required
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Se trimite..." : "Trimite Mesajul"}
        </Button>
      </form>
    </div>
  );
}
