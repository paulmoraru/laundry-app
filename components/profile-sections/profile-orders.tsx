"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Package,
  Truck,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";

interface Order {
  id: string;
  date: string;
  status: string;
  items: string;
  total: string;
  dropoffDate: string;
  dropoffTime: string;
  pickupDate: string;
  pickupTime: string;
  location: string;
}

export function ProfileOrders() {
  const [orderTab, setOrderTab] = useState("upcoming");

  // Mock order data
  const upcomingOrders = [
    {
      id: "ORD-7829",
      date: "March 15, 2025",
      status: "scheduled",
      items: "Wash & Fold (8 lbs)",
      total: "$31.92",
      dropoffDate: "March 15, 2025",
      dropoffTime: "9:00 AM - 11:00 AM",
      pickupDate: "March 17, 2025",
      pickupTime: "4:00 PM - 6:00 PM",
      location: "Downtown Locker #12",
    },
    {
      id: "ORD-7830",
      date: "March 20, 2025",
      status: "processing",
      items: "Dry Cleaning (3 items)",
      total: "$45.99",
      dropoffDate: "March 20, 2025",
      dropoffTime: "2:00 PM - 4:00 PM",
      pickupDate: "March 22, 2025",
      pickupTime: "10:00 AM - 12:00 PM",
      location: "Midtown Locker #5",
    },
  ];

  const pastOrders = [
    {
      id: "ORD-7801",
      date: "March 1, 2025",
      status: "completed",
      items: "Wash & Fold (12 lbs)",
      total: "$47.88",
      dropoffDate: "March 1, 2025",
      dropoffTime: "10:00 AM - 12:00 PM",
      pickupDate: "March 3, 2025",
      pickupTime: "5:00 PM - 7:00 PM",
      location: "Downtown Locker #8",
    },
    {
      id: "ORD-7785",
      date: "February 22, 2025",
      status: "completed",
      items: "Wash & Fold (5 lbs), Dry Cleaning (2 items)",
      total: "$54.93",
      dropoffDate: "February 22, 2025",
      dropoffTime: "9:00 AM - 11:00 AM",
      pickupDate: "February 24, 2025",
      pickupTime: "4:00 PM - 6:00 PM",
      location: "Brooklyn Locker #3",
    },
    {
      id: "ORD-7760",
      date: "February 15, 2025",
      status: "completed",
      items: "Bedding (Queen Set), Wash & Fold (3 lbs)",
      total: "$62.96",
      dropoffDate: "February 15, 2025",
      dropoffTime: "1:00 PM - 3:00 PM",
      pickupDate: "February 17, 2025",
      pickupTime: "5:00 PM - 7:00 PM",
      location: "Midtown Locker #5",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200"
          >
            <Clock className="mr-1 h-3 w-3" /> Programat
          </Badge>
        );
      case "processing":
        return (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-200"
          >
            <Truck className="mr-1 h-3 w-3" /> În Procesare
          </Badge>
        );
      case "completed":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200"
          >
            <CheckCircle className="mr-1 h-3 w-3" /> Finalizat
          </Badge>
        );
      case "cancelled":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200"
          >
            <AlertCircle className="mr-1 h-3 w-3" /> Anulat
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const OrderCard = ({ order }: { order: Order }) => (
    <Card className="hover-scale">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{order.id}</CardTitle>
            <CardDescription>Ordered on {order.date}</CardDescription>
          </div>
          {getStatusBadge(order.status)}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid gap-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Articole:</span>
            <span className="font-medium">{order.items}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total:</span>
            <span className="font-medium">{order.total}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Locație:</span>
            <span className="font-medium">{order.location}</span>
          </div>

          <div className="mt-2 space-y-2">
            <div className="flex items-start gap-2 text-sm">
              <Calendar className="h-4 w-4 mt-0.5 text-primary" />
              <div>
                <p className="font-medium">Predare: {order.dropoffDate}</p>
                <p className="text-muted-foreground">{order.dropoffTime}</p>
              </div>
            </div>

            <div className="flex items-start gap-2 text-sm">
              <Package className="h-4 w-4 mt-0.5 text-primary" />
              <div>
                <p className="font-medium">Ridicare: {order.pickupDate}</p>
                <p className="text-muted-foreground">{order.pickupTime}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button variant="outline" size="sm" className="w-full">
          Vezi Detalii
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Comenzile Mele</h2>
        <Button>Plasează Comandă Nouă</Button>
      </div>

      <Tabs
        defaultValue="upcoming"
        onValueChange={setOrderTab}
        value={orderTab}
      >
        <TabsList>
          <TabsTrigger value="upcoming">Următoare</TabsTrigger>
          <TabsTrigger value="past">Comenzi Anterioare</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6">
          {upcomingOrders.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">Nu există comenzi viitoare</h3>
              <p className="text-muted-foreground mb-6">
                Nu aveți nicio comandă programată în acest moment.
              </p>
              <Button>Plasează o Comandă</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="mt-6">
          {pastOrders.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pastOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">Nu există istoric comenzi</h3>
              <p className="text-muted-foreground">
                Nu ați plasat încă nicio comandă.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
