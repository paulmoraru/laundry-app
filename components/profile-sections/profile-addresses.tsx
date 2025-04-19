"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Home, Building, MapPin, Plus, Edit, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ProfileAddresses() {
  const { toast } = useToast();
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Home",
      line1: "123 Main Street, Apt 4B",
      line2: "",
      city: "New York",
      state: "NY",
      zip: "10001",
      isDefault: true,
      type: "home",
    },
    {
      id: 2,
      name: "Office",
      line1: "456 Park Avenue",
      line2: "Floor 12",
      city: "New York",
      state: "NY",
      zip: "10022",
      isDefault: false,
      type: "work",
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    zip: "",
    isDefault: false,
    type: "home",
  });

  const handleAddAddress = () => {
    // In a real app, you would send this to your API
    const id = Math.max(0, ...addresses.map((a) => a.id)) + 1;

    // If this is set as default, update other addresses
    let updatedAddresses = [...addresses];
    if (newAddress.isDefault) {
      updatedAddresses = updatedAddresses.map((addr) => ({
        ...addr,
        isDefault: false,
      }));
    }

    setAddresses([
      ...updatedAddresses,
      {
        ...newAddress,
        id,
      },
    ]);

    setNewAddress({
      name: "",
      line1: "",
      line2: "",
      city: "",
      state: "",
      zip: "",
      isDefault: false,
      type: "home",
    });

    setIsAddDialogOpen(false);

    toast({
      title: "Address added",
      description: "Your new address has been saved.",
    });
  };

  const handleDeleteAddress = (id: number) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));

    toast({
      title: "Address removed",
      description: "The address has been removed from your account.",
    });
  };

  const handleSetDefault = (id: number) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );

    toast({
      title: "Default address updated",
      description: "Your default address has been updated.",
    });
  };

  const getAddressIcon = (type: string) => {
    switch (type) {
      case "home":
        return <Home className="h-5 w-5" />;
      case "work":
        return <Building className="h-5 w-5" />;
      default:
        return <MapPin className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Adresele Mele</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Adaugă Adresă
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Adaugă Adresă Nouă</DialogTitle>
              <DialogDescription>
                Adaugă o nouă adresă în contul tău pentru livrare și ridicare.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nume Adresă</Label>
                <Input
                  id="name"
                  placeholder="Acasă, Birou, etc."
                  value={newAddress.name}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, name: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="line1">Adresa Linia 1</Label>
                <Input
                  id="line1"
                  placeholder="Strada și numărul"
                  value={newAddress.line1}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, line1: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="line2">Adresa Linia 2 (Opțional)</Label>
                <Input
                  id="line2"
                  placeholder="Apartament, etaj, bloc, etc."
                  value={newAddress.line2}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, line2: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="city">Oraș</Label>
                  <Input
                    id="city"
                    placeholder="Oraș"
                    value={newAddress.city}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, city: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="state">Județ</Label>
                  <Input
                    id="state"
                    placeholder="Județ"
                    value={newAddress.state}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, state: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="zip">Cod Poștal</Label>
                <Input
                  id="zip"
                  placeholder="Cod Poștal"
                  value={newAddress.zip}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, zip: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label>Tip Adresă</Label>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="type-home"
                      name="address-type"
                      checked={newAddress.type === "home"}
                      onChange={() =>
                        setNewAddress({ ...newAddress, type: "home" })
                      }
                    />
                    <Label htmlFor="type-home" className="font-normal">
                      Acasă
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="type-work"
                      name="address-type"
                      checked={newAddress.type === "work"}
                      onChange={() =>
                        setNewAddress({ ...newAddress, type: "work" })
                      }
                    />
                    <Label htmlFor="type-work" className="font-normal">
                      Birou
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="type-other"
                      name="address-type"
                      checked={newAddress.type === "other"}
                      onChange={() =>
                        setNewAddress({ ...newAddress, type: "other" })
                      }
                    />
                    <Label htmlFor="type-other" className="font-normal">
                      Altele
                    </Label>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="default"
                  checked={newAddress.isDefault}
                  onCheckedChange={(checked) =>
                    setNewAddress({
                      ...newAddress,
                      isDefault: checked as boolean,
                    })
                  }
                />
                <label
                  htmlFor="default"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Setează ca adresă principală
                </label>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Anulează
              </Button>
              <Button onClick={handleAddAddress}>Salvează Adresa</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {addresses.map((address) => (
          <Card key={address.id} className="hover-scale">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {getAddressIcon(address.type)}
                  </div>
                  <CardTitle className="text-lg">{address.name}</CardTitle>
                </div>
                {address.isDefault && (
                  <Badge variant="secondary">Principal</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-1 text-sm">
                <p>{address.line1}</p>
                {address.line2 && <p>{address.line2}</p>}
                <p>
                  {address.city}, {address.state} {address.zip}
                </p>
              </div>
            </CardContent>
            <CardFooter className="pt-2 flex justify-between">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-muted-foreground"
                onClick={() => handleDeleteAddress(address.id)}
              >
                <Trash className="h-4 w-4" />
                Șterge
              </Button>
              <div className="flex gap-2">
                {!address.isDefault && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSetDefault(address.id)}
                  >
                    Setează ca Principal
                  </Button>
                )}
                <Button variant="outline" size="sm" className="gap-1">
                  <Edit className="h-4 w-4" />
                  Editează
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {addresses.length === 0 && (
        <div className="text-center py-12 border rounded-lg bg-muted/20">
          <MapPin className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Nu există adrese salvate</h3>
          <p className="text-muted-foreground mb-6">
            Adaugă o adresă pentru a face comenzile mai ușoare.
          </p>
          <Button onClick={() => setIsAddDialogOpen(true)}>Adaugă Adresă</Button>
        </div>
      )}
    </div>
  );
}
