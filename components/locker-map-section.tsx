/// <reference types="@types/google.maps" />
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, MapPin, Navigation, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// In a real application, you would use environment variables for API keys
const GOOGLE_MAPS_API_KEY = "AIzaSyBHEN1eVvYo9_E3MUd3WLeWVxefjC2WI-Y";

// Mock data for locker locations
const LOCKER_LOCATIONS = [
  {
    id: 1,
    name: "Downtown Lockers",
    address: "123 Main Street, New York, NY 10001",
    lat: 40.7128,
    lng: -74.006,
    availableLockers: 8,
    isOpen24Hours: true,
  },
  {
    id: 2,
    name: "Midtown Lockers",
    address: "456 Park Avenue, New York, NY 10022",
    lat: 40.758,
    lng: -73.9855,
    availableLockers: 5,
    isOpen24Hours: false,
  },
  {
    id: 3,
    name: "Brooklyn Lockers",
    address: "789 Atlantic Avenue, Brooklyn, NY 11217",
    lat: 40.6782,
    lng: -73.9442,
    availableLockers: 12,
    isOpen24Hours: true,
  },
  {
    id: 4,
    name: "Queens Lockers",
    address: "101 Queens Blvd, Queens, NY 11375",
    lat: 40.7282,
    lng: -73.8731,
    availableLockers: 3,
    isOpen24Hours: false,
  },
  {
    id: 5,
    name: "Upper East Side Lockers",
    address: "202 E 70th St, New York, NY 10021",
    lat: 40.7681,
    lng: -73.9592,
    availableLockers: 7,
    isOpen24Hours: true,
  },
];

type GoogleMapProps = {
  apiKey: string;
  center: { lat: number; lng: number };
  zoom: number;
  markers: Array<{
    id: number;
    position: { lat: number; lng: number };
    title: string;
    availableLockers: number;
  }>;
  onMarkerClick: (id: number) => void;
  selectedMarkerId?: number;
};

// This component handles loading the Google Maps script and rendering the map
const GoogleMap = ({
  apiKey,
  center,
  zoom,
  markers,
  onMarkerClick,
  selectedMarkerId,
}: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [mapMarkers, setMapMarkers] = useState<google.maps.Marker[]>([]);
  const { toast } = useToast();

  // Load the Google Maps script
  useEffect(() => {
    if (!mapLoaded) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
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
  }, [apiKey, mapLoaded, toast]);

  // Initialize the map once the script is loaded
  useEffect(() => {
    if (mapLoaded && mapRef.current && !map) {
      // Ensure google is available
      if (typeof google === "undefined" || !google.maps) {
        console.error("Google Maps API not loaded.");
        return;
      }

      const newMap = new google.maps.Map(mapRef.current, {
        center,
        zoom,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_TOP,
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
  }, [mapLoaded, center, zoom, map]);

  // Add markers to the map
  useEffect(() => {
    if (map && markers.length > 0) {
      // Clear existing markers
      mapMarkers.forEach((marker) => marker.setMap(null));

      // Create new markers
      const newMarkers = markers.map((marker) => {
        const isSelected = marker.id === selectedMarkerId;

        // Create custom marker icon
        const markerIcon = {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: isSelected ? "#0ea5e9" : "#64748b",
          fillOpacity: 1,
          strokeWeight: 1,
          strokeColor: "#ffffff",
          scale: 10,
        };

        // Create the marker
        const newMarker = new google.maps.Marker({
          position: marker.position,
          map,
          title: marker.title,
          icon: markerIcon,
          animation: isSelected ? google.maps.Animation.BOUNCE : undefined,
          optimized: true,
        });

        // Add click event
        newMarker.addListener("click", () => {
          onMarkerClick(marker.id);
        });

        // Create info window with available lockers
        const infoContent = `
          <div style="padding: 8px; max-width: 200px;">
            <h3 style="margin: 0 0 8px; font-weight: 600;">${marker.title}</h3>
            <p style="margin: 0; color: ${
              marker.availableLockers > 0 ? "#16a34a" : "#dc2626"
            };">
              ${marker.availableLockers} lockers available
            </p>
          </div>
        `;

        const infoWindow = new google.maps.InfoWindow({
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
      if (selectedMarkerId) {
        const selectedMarker = markers.find((m) => m.id === selectedMarkerId);
        if (selectedMarker) {
          map.panTo(selectedMarker.position);
          map.setZoom(15);
        }
      }
    }
  }, [map, markers, onMarkerClick, selectedMarkerId, mapMarkers]);

  return (
    <div className="w-full h-full min-h-[400px] rounded-lg overflow-hidden">
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
  );
};

export function LockerMapSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLockerId, setSelectedLockerId] = useState<number | undefined>(
    undefined
  );
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const { toast } = useToast();

  // Format locker data for the map
  const mapMarkers = LOCKER_LOCATIONS.map((location) => ({
    id: location.id,
    position: { lat: location.lat, lng: location.lng },
    title: location.name,
    availableLockers: location.availableLockers,
  }));

  // Get user's current location
  const getUserLocation = useCallback(() => {
    setIsLoadingLocation(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsLoadingLocation(false);

          toast({
            title: "Location found",
            description: "Showing lockers near your current location.",
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLoadingLocation(false);

          toast({
            title: "Location error",
            description:
              "Unable to get your current location. Please try again or search for a location.",
            variant: "destructive",
          });
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setIsLoadingLocation(false);
      toast({
        title: "Location not supported",
        description:
          "Geolocation is not supported by your browser. Please search for a location instead.",
        variant: "destructive",
      });
    }
  }, [toast]);

  // Filter locations based on search query
  const filteredLocations = searchQuery
    ? LOCKER_LOCATIONS.filter(
        (location) =>
          location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          location.address.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : LOCKER_LOCATIONS;

  // Handle location card click
  const handleLocationClick = (id: number) => {
    setSelectedLockerId(id);
  };

  // Calculate map center
  const mapCenter = userLocation
    ? userLocation
    : selectedLockerId
    ? LOCKER_LOCATIONS.find((l) => l.id === selectedLockerId)
      ? {
          lat: LOCKER_LOCATIONS.find((l) => l.id === selectedLockerId)!.lat,
          lng: LOCKER_LOCATIONS.find((l) => l.id === selectedLockerId)!.lng,
        }
      : { lat: 40.7128, lng: -74.006 } // Default to NYC
    : { lat: 40.7128, lng: -74.006 }; // Default to NYC

  return (
    <section
      ref={ref}
      className={`container py-16 ${inView ? "fade-in" : "opacity-0"}`}
    >
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
          Locker Locations
        </div>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
          Find a Locker Near You
        </h2>
        <p className="text-lg text-muted-foreground">
          Drop off and pick up your laundry at any of our convenient smart
          locker locations throughout the city
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={getUserLocation}
              disabled={isLoadingLocation}
            >
              {isLoadingLocation ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Navigation className="h-4 w-4" />
              )}
              <span className="sr-only">Find nearby</span>
            </Button>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((location) => (
                <Card
                  key={location.id}
                  className={`hover:border-primary/50 cursor-pointer transition-all ${
                    selectedLockerId === location.id
                      ? "border-primary bg-primary/5"
                      : ""
                  }`}
                  onClick={() => handleLocationClick(location.id)}
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
                              location.availableLockers > 0
                                ? "outline"
                                : "secondary"
                            }
                            className={
                              location.availableLockers > 0
                                ? "bg-green-50 text-green-700 hover:bg-green-50 border-green-200"
                                : "bg-red-50 text-red-700 hover:bg-red-50 border-red-200"
                            }
                          >
                            {location.availableLockers}{" "}
                            {location.availableLockers === 1
                              ? "locker"
                              : "lockers"}{" "}
                            available
                          </Badge>
                          {location.isOpen24Hours && (
                            <Badge
                              variant="outline"
                              className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200"
                            >
                              Open 24/7
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 border rounded-lg">
                <p className="text-muted-foreground">No locations found</p>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 h-[500px] rounded-lg overflow-hidden border">
          <GoogleMap
            apiKey={GOOGLE_MAPS_API_KEY}
            center={mapCenter}
            zoom={12}
            markers={mapMarkers}
            onMarkerClick={handleLocationClick}
            selectedMarkerId={selectedLockerId}
          />
        </div>
      </div>

      <div className="mt-8 text-center">
        <Button size="lg">Book a Locker Now</Button>
      </div>
    </section>
  );
}
