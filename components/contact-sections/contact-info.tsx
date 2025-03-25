"use client";

import { useInView } from "react-intersection-observer";
import { Mail, Phone, Clock } from "lucide-react";

export function ContactInfo() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const contactDetails = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      details: [
        { label: "Suport Clienți", value: "support@freshpress.com" },
        { label: "Relații Business", value: "info@freshpress.com" },
      ],
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Telefon",
      details: [
        { label: "Serviciu Clienți", value: "(555) 123-4567" },
        { label: "Suport Tehnic", value: "(555) 987-6543" },
      ],
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Program",
      details: [
        { label: "Luni-Vineri", value: "8:00 - 20:00" },
        { label: "Sâmbătă-Duminică", value: "9:00 - 18:00" },
      ],
    },
  ];

  return (
    <div
      ref={ref}
      className={`${inView ? "fade-in [animation-delay:200ms]" : "opacity-0"}`}
    >
      <h2 className="text-2xl font-bold mb-6">Informații de Contact</h2>

      <div className="space-y-6">
        {contactDetails.map((item, index) => (
          <div key={index} className="flex gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
              {item.icon}
            </div>
            <div>
              <h3 className="font-medium mb-2">{item.title}</h3>
              <ul className="space-y-1">
                {item.details.map((detail, idx) => (
                  <li key={idx} className="text-sm">
                    <span className="text-muted-foreground">
                      {detail.label}:{" "}
                    </span>
                    <span className="font-medium">{detail.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
