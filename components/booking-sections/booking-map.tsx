"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/fetch-utils";
import { Button } from "@/components/ui/button";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";

// In a real application, you would use environment variables for API keys
const GOOGLE_MAPS_API_KEY = "AIzaSyBHEN1eVvYo9_E3MUd3WLeWVxefjC2WI-Y";

interface Location {
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
}

interface BookingMapProps {
  locations: Location[];
  selectedLocationId: number | null;
  onLocationSelect: (locationId: number) => void;
  filters: any;
  onResetFilters: () => void;
}

// Declare google variable
declare global {
  interface Window {
    google: typeof google;
  }
}

export function BookingMap({
  locations,
  selectedLocationId,
  onLocationSelect,
  filters,
  onResetFilters,
}: BookingMapProps) {
  const [activeInfoWindow, setActiveInfoWindow] = useState<number | null>(null);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  // Default center (NYC)
  const defaultCenter = { lat: 40.7128, lng: -74.006 };

  // Calculate average center of all locations
  const averageCenter = useMemo(() => {
    if (!locations.length) return defaultCenter;
    const avgLat = locations.reduce((sum, l) => sum + l.lat, 0) / locations.length;
    const avgLng = locations.reduce((sum, l) => sum + l.lng, 0) / locations.length;
    return { lat: avgLat, lng: avgLng };
  }, [locations]);

  const [initialCenter] = useState(averageCenter);
  const [initialZoom] = useState(13);

  // Find selected location for centering
  const selectedLocation = locations.find(l => l.id === selectedLocationId);

  // Pan to selected marker when selectedLocationId changes
  useEffect(() => {
    if (selectedLocation && mapRef.current) {
      mapRef.current.panTo({ lat: selectedLocation.lat, lng: selectedLocation.lng });
      mapRef.current.setZoom(15);
    }
  }, [selectedLocationId]);

  if (loadError) {
    return <div className="text-red-500">Eroare la încărcarea hărții Google.</div>;
  }

  if (!isLoaded) {
    return (
      <div className="space-y-4">
        <div className="h-[300px] rounded-lg overflow-hidden border">
          <div className="w-full h-full flex items-center justify-center bg-muted/20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="h-[400px] rounded-lg overflow-hidden border">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={initialCenter}
          zoom={initialZoom}
          options={{
            mapTypeControl: false,
            fullscreenControl: false,
            streetViewControl: false,
            zoomControl: true,
          }}
          onLoad={map => {
            mapRef.current = map;
          }}
        >
          {locations.map((location) => (
            <Marker
              key={location.id}
              position={{ lat: location.lat, lng: location.lng }}
              title={location.name}
              opacity={location.availableLockers === 0 ? 0.5 : 1}
              onClick={() => {
                  setActiveInfoWindow(location.id);
              }}
            >
              {activeInfoWindow === location.id && (
                <InfoWindow onCloseClick={() => setActiveInfoWindow(null)}>
                  <div style={{ padding: 8, maxWidth: 200 }}>
                    <h3 style={{ margin: "0 0 8px", fontWeight: 600 }}>{location.name}</h3>
                    <p style={{ margin: 0, color: location.availableLockers > 0 ? "#16a34a" : "#dc2626" }}>
                      {location.availableLockers} dulapuri disponibile
                    </p>
                    <Button className="mt-3" variant="outline" onClick={() => {
                      if (location.availableLockers > 0) {
                        onLocationSelect(location.id);
                      }
                    }}>
                      {location.availableLockers > 0 ? "Selectează locație" : "Locație ocupată"}
                    </Button>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}
        </GoogleMap>
      </div>

      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
        <p className="text-muted-foreground">
          Alege o locație pentru a începe programarea
        </p>
        {Array.isArray(locations) && locations.length > 0 ? (
          locations.map((location) => (
            <Card
              key={location.id}
              className={`hover:border-primary/50 transition-all ${
                selectedLocationId === location.id
                  ? "border-primary bg-primary/5"
                  : location.availableLockers === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={() => location.availableLockers > 0 && onLocationSelect(location.id)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      {location.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {location.address}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge
                        variant={
                          location.availableLockers > 0 ? "outline" : "secondary"
                        }
                        className={
                          location.availableLockers > 0
                            ? "bg-green-50 text-green-700 hover:bg-green-50 border-green-200"
                            : "bg-red-50 text-red-700 hover:bg-red-50 border-red-200"
                        }
                      >
                        {location.availableLockers}{" "}
                        {location.availableLockers === 1 ? "dulap" : "dulapuri"}{" "}
                        disponibile
                      </Badge>
                      {location.isOpen24Hours && (
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200"
                        >
                          Deschis non-stop
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12 border rounded-lg">
            <p className="text-muted-foreground mb-4">
              Nicio locație nu corespunde filtrelor curente
            </p>
            <Button
              variant="outline"
              onClick={onResetFilters}
            >
              Resetează Filtrele
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
