"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import type {
  BookingFiltersState,
  LockerSize,
  ServiceType,
} from "./booking-page-content";

interface BookingFiltersProps {
  filters: BookingFiltersState;
  onFiltersChange: (filters: Partial<BookingFiltersState>) => void;
}

export function BookingFilters({
  filters,
  onFiltersChange,
}: BookingFiltersProps) {
  return (
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
                <RadioGroupItem value="small" id="size-small" className="sr-only" />
                <Label htmlFor="size-small" className="cursor-pointer text-center">
                  <span className="block text-lg font-medium">Mic</span>
                  <span className="block text-sm text-muted-foreground">
                    Până la 5 kg
                  </span>
                </Label>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-4 cursor-pointer hover:border-primary/50 transition-colors">
                <RadioGroupItem value="medium" id="size-medium" className="sr-only" />
                <Label htmlFor="size-medium" className="cursor-pointer text-center">
                  <span className="block text-lg font-medium">Mediu</span>
                  <span className="block text-sm text-muted-foreground">
                    Până la 10 kg
                  </span>
                </Label>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-4 cursor-pointer hover:border-primary/50 transition-colors">
                <RadioGroupItem value="large" id="size-large" className="sr-only" />
                <Label htmlFor="size-large" className="cursor-pointer text-center">
                  <span className="block text-lg font-medium">Mare</span>
                  <span className="block text-sm text-muted-foreground">
                    Până la 15 kg
                  </span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Filtre Adiționale</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="open24"
                  checked={filters.open24Hours}
                  onCheckedChange={(checked) =>
                    onFiltersChange({ open24Hours: checked as boolean })
                  }
                />
                <Label htmlFor="open24" className="cursor-pointer">
                  Deschis 24/7
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="available"
                  checked={filters.availableNow}
                  onCheckedChange={(checked) =>
                    onFiltersChange({ availableNow: checked as boolean })
                  }
                />
                <Label htmlFor="available" className="cursor-pointer">
                  Disponibil Acum
                </Label>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
