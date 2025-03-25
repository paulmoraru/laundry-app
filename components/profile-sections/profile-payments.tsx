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
import { CreditCard, Plus, Edit, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ProfilePayments() {
  const { toast } = useToast();
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      name: "Visa ending in 4242",
      cardNumber: "•••• •••• •••• 4242",
      expiryDate: "09/26",
      isDefault: true,
      cardType: "visa",
    },
    {
      id: 2,
      name: "Mastercard ending in 5555",
      cardNumber: "•••• •••• •••• 5555",
      expiryDate: "12/25",
      isDefault: false,
      cardType: "mastercard",
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
    isDefault: false,
  });

  const handleAddPaymentMethod = () => {
    // In a real app, you would send this to your API and use a payment processor
    const id = Math.max(0, ...paymentMethods.map((p) => p.id)) + 1;

    // If this is set as default, update other payment methods
    let updatedPaymentMethods = [...paymentMethods];
    if (newPaymentMethod.isDefault) {
      updatedPaymentMethods = updatedPaymentMethods.map((method) => ({
        ...method,
        isDefault: false,
      }));
    }

    // Format the card number for display
    const last4 = newPaymentMethod.cardNumber.slice(-4);

    // Determine card type (simplified)
    let cardType = "unknown";
    if (newPaymentMethod.cardNumber.startsWith("4")) {
      cardType = "visa";
    } else if (newPaymentMethod.cardNumber.startsWith("5")) {
      cardType = "mastercard";
    } else if (newPaymentMethod.cardNumber.startsWith("3")) {
      cardType = "amex";
    }

    setPaymentMethods([
      ...updatedPaymentMethods,
      {
        id,
        name: `${
          cardType.charAt(0).toUpperCase() + cardType.slice(1)
        } ending in ${last4}`,
        cardNumber: `•••• •••• •••• ${last4}`,
        expiryDate: newPaymentMethod.expiryDate,
        isDefault: newPaymentMethod.isDefault,
        cardType,
      },
    ]);

    setNewPaymentMethod({
      cardNumber: "",
      cardholderName: "",
      expiryDate: "",
      cvv: "",
      isDefault: false,
    });

    setIsAddDialogOpen(false);

    toast({
      title: "Payment method added",
      description: "Your new payment method has been saved.",
    });
  };

  const handleDeletePaymentMethod = (id: number) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id));

    toast({
      title: "Payment method removed",
      description: "The payment method has been removed from your account.",
    });
  };

  const handleSetDefault = (id: number) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );

    toast({
      title: "Default payment method updated",
      description: "Your default payment method has been updated.",
    });
  };

  /*const getCardIcon = (cardType: string) => {
    return <CreditCard className="h-5 w-5" />;
  };*/

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Payment Methods</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Payment Method
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add Payment Method</DialogTitle>
              <DialogDescription>
                Add a new credit or debit card to your account.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={newPaymentMethod.cardNumber}
                  onChange={(e) =>
                    setNewPaymentMethod({
                      ...newPaymentMethod,
                      cardNumber: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cardholderName">Cardholder Name</Label>
                <Input
                  id="cardholderName"
                  placeholder="Name as it appears on card"
                  value={newPaymentMethod.cardholderName}
                  onChange={(e) =>
                    setNewPaymentMethod({
                      ...newPaymentMethod,
                      cardholderName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/YY"
                    value={newPaymentMethod.expiryDate}
                    onChange={(e) =>
                      setNewPaymentMethod({
                        ...newPaymentMethod,
                        expiryDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    type="password"
                    value={newPaymentMethod.cvv}
                    onChange={(e) =>
                      setNewPaymentMethod({
                        ...newPaymentMethod,
                        cvv: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="default-payment"
                  checked={newPaymentMethod.isDefault}
                  onCheckedChange={(checked) =>
                    setNewPaymentMethod({
                      ...newPaymentMethod,
                      isDefault: checked as boolean,
                    })
                  }
                />
                <label
                  htmlFor="default-payment"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Set as default payment method
                </label>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddPaymentMethod}>
                Save Payment Method
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {paymentMethods.map((method) => (
          <Card key={method.id} className="hover-scale">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {/*getCardIcon(method.cardType)}*/}
                  </div>
                  <CardTitle className="text-lg">{method.name}</CardTitle>
                </div>
                {method.isDefault && <Badge variant="secondary">Default</Badge>}
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-1 text-sm">
                <p className="font-mono">{method.cardNumber}</p>
                <p>Expires: {method.expiryDate}</p>
              </div>
            </CardContent>
            <CardFooter className="pt-2 flex justify-between">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-muted-foreground"
                onClick={() => handleDeletePaymentMethod(method.id)}
              >
                <Trash className="h-4 w-4" />
                Remove
              </Button>
              <div className="flex gap-2">
                {!method.isDefault && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSetDefault(method.id)}
                  >
                    Set as Default
                  </Button>
                )}
                <Button variant="outline" size="sm" className="gap-1">
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {paymentMethods.length === 0 && (
        <div className="text-center py-12 border rounded-lg bg-muted/20">
          <CreditCard className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No payment methods</h3>
          <p className="text-muted-foreground mb-6">
            Add a payment method to make checkout faster.
          </p>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            Add Payment Method
          </Button>
        </div>
      )}
    </div>
  );
}
