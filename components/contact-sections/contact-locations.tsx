"use client";

import { useInView } from "react-intersection-observer";
import { MapPin } from "lucide-react";
import Image from "next/image";

export function ContactLocations() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const locations = [
    {
      name: "Centru",
      address: "Strada Principală 123, Etaj 1",
      city: "București, Sector 1",
      phone: "(021) 123-4567",
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      name: "Victoriei",
      address: "Bulevardul Victoriei 456",
      city: "București, Sector 1",
      phone: "(021) 234-5678",
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      name: "Titan",
      address: "Bulevardul Nicolae Grigorescu 789",
      city: "București, Sector 3",
      phone: "(021) 345-6789",
      image: "/placeholder.svg?height=150&width=300",
    },
  ];

  return (
    <div
      ref={ref}
      className={`${inView ? "fade-in [animation-delay:400ms]" : "opacity-0"}`}
    >
      <h2 className="text-2xl font-bold mb-6">Locațiile Noastre</h2>

      <div className="space-y-6">
        {locations.map((location, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg hover-scale"
          >
            <div className="relative h-[100px] sm:h-[80px] sm:w-[120px] rounded-md overflow-hidden">
              <Image
                src={location.image || "/placeholder.svg"}
                alt={location.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium flex items-center gap-1">
                <MapPin className="h-4 w-4 text-primary" />
                {location.name}
              </h3>
              <address className="not-italic text-sm text-muted-foreground mt-1">
                {location.address}
                <br />
                {location.city}
              </address>
              <p className="text-sm mt-1">{location.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
