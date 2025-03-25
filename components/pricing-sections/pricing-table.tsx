"use client";

import { useInView } from "react-intersection-observer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function PricingTable() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const pricingCategories = [
    {
      id: "wash-fold",
      name: "Spălare și Împăturire",
      items: [
        { name: "Rufe Obișnuite (per kg)", price: "15.99 lei" },
        { name: "Comandă Minimă", price: "79.95 lei" },
        { name: "Express (24h)", price: "+40 lei" },
        { name: "Aceeași Zi", price: "+60 lei" },
        { name: "Pilotă (Single/Double)", price: "99.99 lei" },
        { name: "Pilotă (Queen/King)", price: "139.99 lei" },
        { name: "Pătură", price: "79.99 lei" },
        { name: "Set Lenjerie Pat", price: "59.99 lei" },
        { name: "Prosoape (Baie)", price: "15.99 lei/buc" },
        { name: "Prosoape (Mâini/Față)", price: "7.99 lei/buc" },
      ],
    },
    {
      id: "dry-cleaning",
      name: "Curățătorie Chimică",
      items: [
        { name: "Cămașă/Bluză", price: "27.99 lei" },
        { name: "Pantaloni", price: "35.99 lei" },
        { name: "Sacou", price: "51.99 lei" },
        { name: "Costum Complet (2pc)", price: "79.99 lei" },
        { name: "Rochie (Simplă)", price: "59.99 lei" },
        { name: "Rochie (de Seară)", price: "99.99+ lei" },
        { name: "Palton/Geacă", price: "79.99+ lei" },
        { name: "Pulover", price: "35.99 lei" },
        { name: "Cravată/Eșarfă", price: "27.99 lei" },
        { name: "Fustă", price: "35.99 lei" },
      ],
    },
    {
      id: "specialty",
      name: "Articole Speciale",
      items: [
        { name: "Rochie de Mireasă", price: "399.99+ lei" },
        { name: "Geacă de Piele", price: "199.99 lei" },
        { name: "Articole din Velur", price: "239.99+ lei" },
        { name: "Haină de Blană", price: "319.99+ lei" },
        { name: "Articol cu Paiete", price: "119.99+ lei" },
        { name: "Articole din Mătase", price: "+12 lei" },
        { name: "Draperii (per panou)", price: "79.99+ lei" },
        { name: "Covor (mic)", price: "159.99 lei" },
        { name: "Tratament Pete", price: "+20 lei" },
        { name: "Modificări", price: "Variabil" },
      ],
    },
  ];

  return (
    <section
      id="pricing-table"
      ref={ref}
      className={`container py-12 ${inView ? "fade-in" : "opacity-0"}`}
    >
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
          Lista de Prețuri
        </h2>
        <p className="text-lg text-muted-foreground">
          Prețuri transparente pentru toate nevoile tale de îngrijire a hainelor
        </p>
      </div>

      <Tabs defaultValue="wash-fold" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          {pricingCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {pricingCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            <div className="rounded-lg border shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[70%]">Item</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {category.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-right font-medium">
                        {item.price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              <p>
                * Prețurile pot varia în funcție de material, stare și cerințe
                speciale.
              </p>
              <p>
                * Se pot aplica taxe suplimentare pentru tratarea petelor sau
                manipulare specială.
              </p>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
