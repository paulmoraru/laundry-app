"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { BookingMap } from "@/components/booking-sections/booking-map";
import { BookingFilters } from "@/components/booking-sections/booking-filters";
import { BookingForm } from "@/components/booking-sections/booking-form";
import { BookingSummary } from "@/components/booking-sections/booking-summary";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Steps, Step } from "@/components/ui/steps";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { api } from "@/lib/fetch-utils";



export type LockerSize = "small" | "medium" | "large";
export type ServiceType = "wash_fold" | "dry_clean" | "both";

export interface BookingFiltersState {
  lockerSize: LockerSize | null;
  serviceType: ServiceType;
  open24Hours: boolean;
  availableNow: boolean;
}

export interface BookingFormState {
  dropoffDate: Date | null;
  dropoffTime: string;
  pickupDate: Date | null;
  pickupTime: string;
  estimatedWeight: number;
  specialInstructions: string;
  useStoredPayment: boolean;
}

export interface LockerLocation {
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
  is_active: boolean;
}

export function BookingPageContent() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { toast } = useToast();
  const router = useRouter();

  // State pentru rezervare
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);
  const [locations, setLocations] = useState<LockerLocation[]>([]);
  const [filters, setFilters] = useState<BookingFiltersState>({
    lockerSize: null,
    serviceType: "wash_fold",
    open24Hours: false,
    availableNow: false,
  });

  const [formData, setFormData] = useState<BookingFormState>({
    dropoffDate: null,
    dropoffTime: "",
    pickupDate: null,
    pickupTime: "",
    estimatedWeight: 5,
    specialInstructions: "",
    useStoredPayment: true,
  });

  const [isLoading, setIsLoading] = useState(true);

  // Fetch locations
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await api.get('http://localhost:8000/api/locations');
        if (!response.ok) {
          throw new Error('Failed to fetch locations');
        }
        const data = await response.json();
        console.log('Raw API response:', data);
        const locationsArray = Array.isArray(data.data) ? data.data : [];
        console.log(locationsArray);
        setLocations(locationsArray);
      } catch (error) {
        console.error('Error fetching locations:', error);
        toast({
          title: "Error loading locations",
          description: "Failed to load locker locations. Please try again.",
          variant: "destructive",
        });
        setLocations([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, [toast]);

  if (isLoading) {
    return <div className="container py-8">Se încarcă...</div>;
  }

  // Filtrare locații în funcție de filtrele selectate
  const filteredLocations = locations.filter((location) => {
    // Filtrare după dimensiunea dulapului
    if (
      filters.lockerSize &&
      !location.lockerSizes.includes(filters.lockerSize)
    ) {
      return false;
    }

    // Filtrare după disponibilitatea 24/7
    if (filters.open24Hours && !location.isOpen24Hours) {
      return false;
    }

    // Filtrare după disponibilitatea curentă
    if (filters.availableNow && location.availableLockers <= 0) {
      return false;
    }

    return true;
  });

  const selectedLocation = selectedLocationId
    ? locations.find((loc) => loc.id === selectedLocationId) || null
    : null;

  const handleLocationSelect = (locationId: number) => {
    setSelectedLocationId(locationId);
    // Reset locker size when selecting a new location
    setFilters(prev => ({ ...prev, lockerSize: null }));

    // If we're on step 1, move to step 2 after selecting a location
    if (currentStep === 1) {
      setCurrentStep(2);
    }
  };

  const handleFiltersChange = (newFilters: Partial<BookingFiltersState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleFormChange = (newData: Partial<BookingFormState>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      // Add validation for step 2
      if (currentStep === 2 && !filters.lockerSize) {
        toast({
          title: "Selectează o dimensiune",
          description: "Te rugăm să selectezi dimensiunea dulapului înainte de a continua.",
          variant: "destructive",
        });
        return;
      }
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const calculatePrice = (): number => {
    if (!selectedLocation || !filters.lockerSize) return 0;

    // Preț de bază: 20 Lei/kg
    const basePricePerKg = 20;
    let total: number = basePricePerKg * formData.estimatedWeight;

    // Adăugare preț pentru servicii opționale
    if (filters.serviceType === "dry_clean") {
      total += 20; // Preț fix pentru curățare chimică
    } else if (filters.serviceType === "both") {
      total += 40; // Preț fix pentru ambele servicii opționale
    }

    return total;
  };

  const prepareBookingData = () => {
    if (!selectedLocation || !formData.dropoffDate || !formData.pickupDate) return null;

    return {
      location: {
        id: selectedLocation.id,
        name: selectedLocation.name,
        address: selectedLocation.address
      },
      locker: {
        size: filters.lockerSize,
        maxWeight: filters.lockerSize === "large" ? 15 : filters.lockerSize === "medium" ? 10 : 5
      },
      services: {
        base: "wash_fold",
        additional: {
          dryCleaning: filters.serviceType === "dry_clean" || filters.serviceType === "both",
          specialIroning: filters.serviceType === "both"
        }
      },
      schedule: {
        dropoff: {
          date: formData.dropoffDate.toISOString(),
          timeSlot: formData.dropoffTime
        },
        pickup: {
          date: formData.pickupDate.toISOString(),
          timeSlot: formData.pickupTime
        }
      },
      details: {
        weight: formData.estimatedWeight,
        specialInstructions: formData.specialInstructions || null
      },
      pricing: {
        basePrice: 20, // Lei per kg
        totalWeight: formData.estimatedWeight,
        additionalServices: {
          dryCleaning: filters.serviceType === "dry_clean" || filters.serviceType === "both" ? 20 : 0,
          specialIroning: filters.serviceType === "both" ? 20 : 0
        },
        total: calculatePrice()
      }
    };
  };

  const handleSubmitBooking = async () => {
    const bookingData = prepareBookingData();
    if (!bookingData) {
      toast({
        title: "Eroare",
        description: "Vă rugăm să completați toate câmpurile obligatorii.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Send booking data to the /orders endpoint
      const response = await api.post('http://localhost:8000/api/orders', bookingData);

      if (!response.ok) {
        throw new Error('Order creation failed');
      }

      toast({
        title: "Rezervare confirmată!",
        description: "Dulapul tău a fost rezervat. Verifică-ți emailul pentru detalii.",
      });

      setTimeout(() => {
        router.push("/profilul-meu");
      }, 2000);
    } catch (error) {
      toast({
        title: "Eroare",
        description: "A apărut o eroare la procesarea rezervării. Vă rugăm să încercați din nou.",
        variant: "destructive",
      });
    }
  };

  return (
    <div
      ref={ref}
      className={`container py-8 md:py-12 transition-opacity duration-500 ${
        inView ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Rezervă un Dulap
        </h1>
        <p className="text-muted-foreground">
          Rezervă un dulap inteligent pentru predarea și ridicarea rufelor tale
        </p>
      </div>

      <Steps currentStep={currentStep} className="mb-8">
        <Step step={1} title="Selectează Locația" />
        <Step step={2} title="Programează Serviciul" />
        <Step step={3} title="Verifică și Plătește" />
      </Steps>

      {currentStep === 1 && (
        <div className="space-y-6">
          <BookingFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />

          <div className="flex flex-col gap-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Locații Disponibile</h2>
              <p className="text-sm text-muted-foreground">
                {filteredLocations.length} locații corespund criteriilor tale
              </p>

              <BookingMap
                locations={filteredLocations}
                selectedLocationId={selectedLocationId}
                onLocationSelect={handleLocationSelect}
                filters={filters}
                onResetFilters={() => setFilters({
                  lockerSize: null,
                  serviceType: "wash_fold",
                  open24Hours: false,
                  availableNow: false,
                })}
              />
            </div>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">
                  Programează Serviciul Tău
                </h2>
                <p className="text-muted-foreground">
                  Alege când dorești să predai și să ridici rufele tale
                </p>
              </div>

              {selectedLocation && (
                <div className="mb-6 p-4 border rounded-lg bg-primary/5 border-primary/20">
                  <h3 className="font-medium">Locație Selectată</h3>
                  <p className="text-sm">
                    {selectedLocation.name} - {selectedLocation.address}
                  </p>
                  {selectedLocation.isOpen24Hours ? (
                    <p className="text-xs text-primary mt-1">
                      Deschis non-stop
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground mt-1">
                      Program: 7:00 - 22:00
                    </p>
                  )}
                </div>
              )}

              <BookingForm
                formData={formData}
                onFormChange={handleFormChange}
                selectedLocation={selectedLocation}
                filters={filters}
                onFiltersChange={handleFiltersChange}
              />

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={handlePrevStep}>
                  Înapoi la Locații
                </Button>
                <Button
                  onClick={handleNextStep}
                  disabled={
                    !formData.dropoffDate ||
                    !formData.pickupDate ||
                    !formData.dropoffTime ||
                    !formData.pickupTime
                  }
                >
                  Continuă la Verificare
                </Button>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <h2 className="text-xl font-semibold mb-4">Sumar Serviciu</h2>
                <div className="border rounded-lg p-4 space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Serviciu Selectat</h3>
                    <p className="text-sm capitalize">
                      {filters.serviceType === "wash_fold"
                        ? "Spălare & Împăturire"
                        : filters.serviceType === "dry_clean"
                        ? "Curățare Uscată"
                        : "Spălare & Curățare Uscată"}
                    </p>
                    {filters.lockerSize && (
                      <p className="text-sm mt-1 capitalize">
                        Dulap{" "}
                        {filters.lockerSize === "small"
                          ? "mic"
                          : filters.lockerSize === "medium"
                          ? "mediu"
                          : "mare"}
                      </p>
                    )}
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-2">Preț Estimat</h3>
                    <p className="text-2xl font-bold">
                      {calculatePrice().toFixed(2) || 0} Lei
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Prețul final poate varia în funcție de greutate și
                      serviciu
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <BookingSummary
          selectedLocation={selectedLocation}
          filters={filters}
          formData={formData}
          price={calculatePrice()}
          onPrevStep={handlePrevStep}
          onSubmit={handleSubmitBooking}
        />
      )}
    </div>
  );
}
