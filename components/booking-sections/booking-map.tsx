"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// In a real application, you would use environment variables for API keys
const GOOGLE_MAPS_API_KEY = "AIzaSyBHEN1eVvYo9_E3MUd3WLeWVxefjC2WI-Y";

interface Location {
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
  availableLockers: number; // dulapuri disponibile
  isOpen24Hours: boolean; // deschis 24 ore
  lockerSizes: string[]; // dimensiuni dulapuri
}

interface BookingMapProps {
  locations: Location[];
  selectedLocationId: number | null;
  onLocationSelect: (id: number) => void;
}

// Declare google variable
declare global {
  interface Window {
    google: any;
  }
}

export function BookingMap({
  locations,
  selectedLocationId,
  onLocationSelect,
}: BookingMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [mapMarkers, setMapMarkers] = useState<google.maps.Marker[]>([]);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const { toast } = useToast();

  // Load the Google Maps script
  useEffect(() => {
    if (!mapLoaded) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setMapLoaded(true);
      };
      script.onerror = () => {
        toast({
          title: "Map loading error",
          description:
            "There was a problem loading the map. Please try again later.",
          variant: "destructive",
        });
      };
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [mapLoaded, toast]);

  // Get user's location
  const getUserLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  // Initialize the map once the script is loaded
  useEffect(() => {
    if (mapLoaded && mapRef.current && !map) {
      // Get user location
      getUserLocation();

      // Default center (NYC)
      const defaultCenter = { lat: 40.7128, lng: -74.006 };

      // Create map
      const newMap = new window.google.maps.Map(mapRef.current, {
        center: defaultCenter,
        zoom: 12,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        zoomControl: true,
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_TOP,
        },
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      });
      setMap(newMap);
    }
  }, [mapLoaded, map, getUserLocation]);

  // Update map center when user location is available
  useEffect(() => {
    if (map && userLocation) {
      map.setCenter(userLocation);
    }
  }, [map, userLocation]);

  // Add markers to the map
  useEffect(() => {
    if (map && locations.length > 0) {
      // Clear existing markers
      mapMarkers.forEach((marker) => marker.setMap(null));

      // Create new markers
      const newMarkers = locations.map((location) => {
        const isSelected = location.id === selectedLocationId;

        // Create custom marker icon
        const markerIcon = {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: isSelected ? "#0ea5e9" : "#64748b",
          fillOpacity: 1,
          strokeWeight: 1,
          strokeColor: "#ffffff",
          scale: 10,
        };

        // Create the marker
        const newMarker = new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map,
          title: location.name,
          icon: markerIcon,
          animation: isSelected
            ? window.google.maps.Animation.BOUNCE
            : undefined,
          optimized: true,
        });

        // Add click event
        newMarker.addListener("click", () => {
          onLocationSelect(location.id);
        });

        // Create info window with available lockers
        const infoContent = `
          <div style="padding: 8px; max-width: 200px;">
            <h3 style="margin: 0 0 8px; font-weight: 600;">${location.name}</h3>
            <p style="margin: 0; color: ${
              location.availableLockers > 0 ? "#16a34a" : "#dc2626"
            };">
              ${location.availableLockers} dulapuri disponibile
            </p>
          </div>
        `;

        const infoWindow = new window.google.maps.InfoWindow({
          content: infoContent,
        });

        // Show info window on hover
        newMarker.addListener("mouseover", () => {
          infoWindow.open(map, newMarker);
        });

        newMarker.addListener("mouseout", () => {
          infoWindow.close();
        });

        return newMarker;
      });

      setMapMarkers(newMarkers);

      // If a marker is selected, center and zoom to it
      if (selectedLocationId) {
        const selectedLocation = locations.find(
          (l) => l.id === selectedLocationId
        );
        if (selectedLocation) {
          map.panTo({ lat: selectedLocation.lat, lng: selectedLocation.lng });
          map.setZoom(15);
        }
      } else if (locations.length > 0) {
        // Fit bounds to show all markers
        const bounds = new window.google.maps.LatLngBounds();
        locations.forEach((location) => {
          bounds.extend({ lat: location.lat, lng: location.lng });
        });
        map.fitBounds(bounds);
      }
    }
  }, [map, locations, selectedLocationId, onLocationSelect, mapMarkers]);

  return (
    <div className="space-y-4">
      <div className="h-[300px] rounded-lg overflow-hidden border">
        {!mapLoaded && (
          <div className="w-full h-full flex items-center justify-center bg-muted/20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        <div
          ref={mapRef}
          className="w-full h-full"
          style={{ display: mapLoaded ? "block" : "none" }}
        />
      </div>

      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
        {locations.map((location) => (
          <Card
            key={location.id}
            className={`hover:border-primary/50 cursor-pointer transition-all ${
              selectedLocationId === location.id
                ? "border-primary bg-primary/5"
                : ""
            }`}
            onClick={() => onLocationSelect(location.id)}
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
                        Deschis 24/7
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
