"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import type {
  BookingFiltersState,
  BookingFormState,
} from "./booking-page-content";
import { Check, CreditCard, MapPin } from "lucide-react";

interface BookingSummaryProps {
  selectedLocation: {
    id: number;
    name: string;
    address: string;
    lat: number;
    lng: number;
    availableLockers: number;
    isOpen24Hours: boolean;
    lockerSizes: string[];
    pricing: {
      small: number;
      medium: number;
      large: number;
    } | null;
  } | null;
  filters: BookingFiltersState;
  formData: BookingFormState;
  price: number;
  onPrevStep: () => void;
  onSubmit: () => void;
}

export function BookingSummary({
  selectedLocation,
  filters,
  formData,
  price,
  onPrevStep,
  onSubmit,
}: BookingSummaryProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("saved");

  // Metode de plată salvate
  const savedPaymentMethods = [
    {
      id: "pm_1",
      name: "Visa se termină în 4242",
      cardNumber: "•••• •••• •••• 4242",
      expiryDate: "09/26",
      isDefault: true,
      cardType: "visa",
    },
    {
      id: "pm_2",
      name: "Mastercard se termină în 5555",
      cardNumber: "•••• •••• •••• 5555",
      expiryDate: "12/25",
      isDefault: false,
      cardType: "mastercard",
    },
  ];

  const handleSubmit = () => {
    setIsSubmitting(true);

    // Simulare procesare plată
    setTimeout(() => {
      onSubmit();
      setIsSubmitting(false);
    }, 1500);
  };

  // Calculare taxă de serviciu
  const serviceFee = 2.99;

  // Calculare TVA
  const tax = (price + serviceFee) * 0.19; // 19% TVA

  // Calculare total
  const total = price + serviceFee + tax;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Verifică Rezervarea</h2>

          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="font-medium mb-2">Locație</h3>
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    {selectedLocation ? (
                      <>
                        <p className="font-medium">{selectedLocation.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedLocation.address}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No location selected
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Predare</h3>
                  {formData.dropoffDate && (
                    <div className="space-y-1">
                      <p className="text-sm">
                        {format(formData.dropoffDate, "EEEE, d MMMM yyyy")}
                      </p>
                      <p className="text-sm">{formData.dropoffTime}</p>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-medium mb-2">Ridicare</h3>
                  {formData.pickupDate && (
                    <div className="space-y-1">
                      <p className="text-sm">
                        {format(formData.pickupDate, "EEEE, d MMMM yyyy")}
                      </p>
                      <p className="text-sm">{formData.pickupTime}</p>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Detalii Serviciu</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-sm">Tip Serviciu</p>
                    <p className="text-sm font-medium capitalize">
                      {filters.serviceType === "wash_fold"
                        ? "Spălare & Împăturire"
                        : filters.serviceType === "dry_clean"
                        ? "Curățare Uscată"
                        : "Spălare & Curățare Uscată"}
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <p className="text-sm">Dimensiune Dulap</p>
                    <p className="text-sm font-medium capitalize">
                      {filters.lockerSize || "Nespecificat"}
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <p className="text-sm">Greutate Estimată</p>
                    <p className="text-sm font-medium">
                      {formData.estimatedWeight} kg
                    </p>
                  </div>

                  {formData.specialInstructions && (
                    <div className="mt-4">
                      <p className="text-sm font-medium">
                        Instrucțiuni Speciale:
                      </p>
                      <p className="text-sm mt-1 p-2 bg-muted rounded-md">
                        {formData.specialInstructions}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Metodă de Plată</h2>

          <Card>
            <CardContent className="p-6">
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="space-y-4"
              >
                <div className="space-y-4">
                  <h3 className="font-medium">Carduri Salvate</h3>

                  {savedPaymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem value={method.id} id={method.id} />
                      <Label
                        htmlFor={method.id}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <CreditCard className="h-4 w-4" />
                        <span>{method.name}</span>
                        {method.isDefault && (
                          <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                            Default
                          </span>
                        )}
                      </Label>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Alte Opțiuni de Plată</h3>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="new" id="new-card" />
                    <Label htmlFor="new-card" className="cursor-pointer">
                      Adaugă card nou
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="apple" id="apple-pay" />
                    <Label htmlFor="apple-pay" className="cursor-pointer">
                      Apple Pay
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="google" id="google-pay" />
                    <Label htmlFor="google-pay" className="cursor-pointer">
                      Google Pay
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-4">
          <h2 className="text-xl font-semibold mb-4">Sumar Comandă</h2>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-sm">Taxă Serviciu</p>
                  <p className="text-sm font-medium">{price.toFixed(2)} lei</p>
                </div>

                <div className="flex justify-between">
                  <p className="text-sm">Taxă Procesare</p>
                  <p className="text-sm font-medium">
                    {serviceFee.toFixed(2)} lei
                  </p>
                </div>

                <div className="flex justify-between">
                  <p className="text-sm">TVA</p>
                  <p className="text-sm font-medium">{tax.toFixed(2)} lei</p>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between">
                <p className="font-medium">Total</p>
                <p className="font-bold text-lg">{total.toFixed(2)} lei</p>
              </div>

              <div className="text-xs text-muted-foreground">
                <p>
                  Continuând, ești de acord cu Termenii și Condițiile și
                  Politica de Confidențialitate.
                </p>
              </div>
            </CardContent>

            <CardFooter className="p-6 pt-0 flex flex-col gap-4">
              <Button
                className="w-full gap-2"
                size="lg"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Se procesează..." : "Confirmă Rezervarea"}
                {!isSubmitting && <Check className="h-4 w-4" />}
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={onPrevStep}
                disabled={isSubmitting}
              >
                Înapoi la Programare
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
