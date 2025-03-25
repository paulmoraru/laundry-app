"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Slider } from "@/components/ui/slider";
import { format, addDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  BookingFormState,
  BookingFiltersState,
  LockerSize,
  LockerLocation,
} from "./booking-page-content";

interface BookingFormProps {
  formData: BookingFormState;
  onFormChange: (data: Partial<BookingFormState>) => void;
  selectedLocation: LockerLocation | null;
  filters: BookingFiltersState;
  onFiltersChange: (filters: Partial<BookingFiltersState>) => void;
}

export function BookingForm({
  formData,
  onFormChange,
  selectedLocation,
  filters,
  onFiltersChange,
}: BookingFormProps) {
  const [dropoffCalendarOpen, setDropoffCalendarOpen] = useState(false);
  const [pickupCalendarOpen, setPickupCalendarOpen] = useState(false);

  // Intervale orare
  const timeSlots = [
    "7:00 - 9:00",
    "9:00 - 11:00",
    "11:00 - 13:00",
    "13:00 - 15:00",
    "15:00 - 17:00",
    "17:00 - 19:00",
    "19:00 - 21:00",
  ];

  // Intervale orare 24 ore
  const timeSlots24Hour = [
    ...timeSlots,
    "21:00 - 23:00",
    "23:00 - 1:00",
    "1:00 - 3:00",
    "3:00 - 5:00",
    "5:00 - 7:00",
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Dimensiune Dulap</h3>
              <RadioGroup
                value={filters.lockerSize || ""}
                onValueChange={(value) =>
                  onFiltersChange({ lockerSize: (value as LockerSize) || null })
                }
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              >
                <div className="flex flex-col items-center space-y-2 border rounded-lg p-4 cursor-pointer hover:border-primary/50 transition-colors">
                  <RadioGroupItem
                    value="small"
                    id="size-small-form"
                    className="sr-only"
                  />
                  <Label
                    htmlFor="size-small-form"
                    className="cursor-pointer text-center"
                  >
                    <span className="block text-lg font-medium">Mic</span>
                    <span className="block text-sm text-muted-foreground">
                      Până la 5 kg
                    </span>
                    <span className="block mt-2 text-primary font-medium">
                      {selectedLocation?.pricing?.small?.toFixed(2) || "4.99"}{" "}
                      lei /zi
                    </span>
                  </Label>
                </div>
                <div className="flex flex-col items-center space-y-2 border rounded-lg p-4 cursor-pointer hover:border-primary/50 transition-colors">
                  <RadioGroupItem
                    value="medium"
                    id="size-medium-form"
                    className="sr-only"
                  />
                  <Label
                    htmlFor="size-medium-form"
                    className="cursor-pointer text-center"
                  >
                    <span className="block text-lg font-medium">Mediu</span>
                    <span className="block text-sm text-muted-foreground">
                      Până la 10 kg
                    </span>
                    <span className="block mt-2 text-primary font-medium">
                      {selectedLocation?.pricing?.medium?.toFixed(2) || "7.99"}{" "}
                      lei /zi
                    </span>
                  </Label>
                </div>
                <div className="flex flex-col items-center space-y-2 border rounded-lg p-4 cursor-pointer hover:border-primary/50 transition-colors">
                  <RadioGroupItem
                    value="large"
                    id="size-large-form"
                    className="sr-only"
                  />
                  <Label
                    htmlFor="size-large-form"
                    className="cursor-pointer text-center"
                  >
                    <span className="block text-lg font-medium">Mare</span>
                    <span className="block text-sm text-muted-foreground">
                      Până la 15 kg
                    </span>
                    <span className="block mt-2 text-primary font-medium">
                      {selectedLocation?.pricing?.large?.toFixed(2) || "9.99"}{" "}
                      lei /zi
                    </span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Detalii Predare</h3>

                <div className="space-y-2">
                  <Label htmlFor="dropoff-date">Data</Label>
                  <Popover
                    open={dropoffCalendarOpen}
                    onOpenChange={setDropoffCalendarOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.dropoffDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.dropoffDate
                          ? format(formData.dropoffDate, "PPP")
                          : "Selectează data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.dropoffDate || undefined}
                        onSelect={(date) => {
                          onFormChange({ dropoffDate: date });
                          setDropoffCalendarOpen(false);
                        }}
                        disabled={(date) =>
                          date < new Date() || date > addDays(new Date(), 30)
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dropoff-time">Interval Ora</Label>
                  <select
                    id="dropoff-time"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.dropoffTime}
                    onChange={(e) =>
                      onFormChange({ dropoffTime: e.target.value })
                    }
                    disabled={!formData.dropoffDate}
                  >
                    <option value="">Selectează un interval orar</option>
                    {(selectedLocation?.isOpen24Hours
                      ? timeSlots24Hour
                      : timeSlots
                    ).map((slot) => (
                      <option key={`dropoff-${slot}`} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Detalii Ridicare</h3>

                <div className="space-y-2">
                  <Label htmlFor="pickup-date">Data</Label>
                  <Popover
                    open={pickupCalendarOpen}
                    onOpenChange={setPickupCalendarOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.pickupDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.pickupDate
                          ? format(formData.pickupDate, "PPP")
                          : "Selectează data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.pickupDate || undefined}
                        onSelect={(date) => {
                          onFormChange({ pickupDate: date });
                          setPickupCalendarOpen(false);
                        }}
                        disabled={(date) => {
                          // Nu poți ridica înainte de predare sau mai mult de 7 zile după
                          if (!formData.dropoffDate) return true;
                          return (
                            date < formData.dropoffDate ||
                            date > addDays(formData.dropoffDate, 7)
                          );
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pickup-time">Interval Ora</Label>
                  <select
                    id="pickup-time"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.pickupTime}
                    onChange={(e) =>
                      onFormChange({ pickupTime: e.target.value })
                    }
                    disabled={!formData.pickupDate}
                  >
                    <option value="">Selectează un interval orar</option>
                    {(selectedLocation?.isOpen24Hours
                      ? timeSlots24Hour
                      : timeSlots
                    ).map((slot) => (
                      <option key={`pickup-${slot}`} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Detalii Rufe</h3>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="estimated-weight">
                    Greutate Estimata (kg)
                  </Label>
                  <span className="text-sm font-medium">
                    {formData.estimatedWeight} kg
                  </span>
                </div>
                <Slider
                  id="estimated-weight"
                  min={1}
                  max={15}
                  step={1}
                  value={[formData.estimatedWeight]}
                  onValueChange={(value) =>
                    onFormChange({ estimatedWeight: value[0] })
                  }
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 kg</span>
                  <span>15 kg</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="special-instructions">
                  Instrucțiuni Speciale (Opțional)
                </Label>
                <Textarea
                  id="special-instructions"
                  placeholder="Orice instrucțiuni specifice pentru gestionarea rufei"
                  value={formData.specialInstructions}
                  onChange={(e) =>
                    onFormChange({ specialInstructions: e.target.value })
                  }
                  rows={3}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
