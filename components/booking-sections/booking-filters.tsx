"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
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
            <h3 className="text-lg font-medium mb-3">Mărime Dulap</h3>
            <RadioGroup
              value={filters.lockerSize || ""}
              onValueChange={(value) =>
                onFiltersChange({ lockerSize: (value as LockerSize) || null })
              }
              className="flex flex-wrap gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="" id="size-any" />
                <Label htmlFor="size-any" className="cursor-pointer">
                  Orice mărime
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="small" id="size-small" />
                <Label htmlFor="size-small" className="cursor-pointer">
                  Mic
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="size-medium" />
                <Label htmlFor="size-medium" className="cursor-pointer">
                  Mediu
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="large" id="size-large" />
                <Label htmlFor="size-large" className="cursor-pointer">
                  Mare
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Tip Serviciu</h3>
            <RadioGroup
              value={filters.serviceType}
              onValueChange={(value) =>
                onFiltersChange({ serviceType: value as ServiceType })
              }
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="wash_fold" id="service-wash" />
                <Label htmlFor="service-wash" className="cursor-pointer">
                  Spălare și Împăturire
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dry_clean" id="service-dry" />
                <Label htmlFor="service-dry" className="cursor-pointer">
                  Curățare Uscată
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="both" id="service-both" />
                <Label htmlFor="service-both" className="cursor-pointer">
                  Ambele Servicii
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium mb-3">Disponibilitate</h3>
            <div className="flex items-center justify-between">
              <Label htmlFor="open-24-hours" className="cursor-pointer">
                Deschis 24 de Ore
              </Label>
              <Switch
                id="open-24-hours"
                checked={filters.open24Hours}
                onCheckedChange={(checked) =>
                  onFiltersChange({ open24Hours: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="available-now" className="cursor-pointer">
                Disponibil Acum
              </Label>
              <Switch
                id="available-now"
                checked={filters.availableNow}
                onCheckedChange={(checked) =>
                  onFiltersChange({ availableNow: checked })
                }
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
