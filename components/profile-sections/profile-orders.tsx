"use client";

import { useState, useEffect } from "react";
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
import { useRouter } from "next/navigation";
import { api } from "@/lib/fetch-utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface Order {
  id: number;
  details: {
    weight: number;
    specialInstructions: string | null;
  };
  location: {
    id: number;
    name: string;
    address: string;
  };
  locker: {
    size: string;
    maxWeight: number;
  };
  pricing: {
    basePrice: number;
    totalWeight: number;
    additionalServices: {
      dryCleaning: number;
      specialIroning: number;
    };
    total: number;
  };
  schedule: {
    dropoff: {
      date: string;
      timeSlot: string;
    };
    pickup: {
      date: string;
      timeSlot: string;
    };
  };
  services: {
    base: string;
    additional: {
      dryCleaning: boolean;
      specialIroning: boolean;
    };
  };
  status: string;
  created_at: string;
  updated_at: string;
  awb?: string;
}

export function ProfileOrders() {
  const [orderTab, setOrderTab] = useState("upcoming");
  const router = useRouter();
  const [upcomingOrders, setUpcomingOrders] = useState<Order[]>([]);
  const [pastOrders, setPastOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("http://localhost:8000/api/orders");
        if (!response.ok) throw new Error("Failed to fetch orders");
        const data = await response.json();
        const orders: Order[] = Array.isArray(data.data) ? data.data : [];
        // Normalize status to lowercase for filtering
        setUpcomingOrders(
          orders.filter(o => {
            const status = o.status?.toLowerCase();
            return status === "pending" || status === "scheduled" || status === "processing";
          })
        );
        setPastOrders(
          orders.filter(o => {
            const status = o.status?.toLowerCase();
            return status === "completed" || status === "cancelled";
          })
        );
      } catch (error) {
        setUpcomingOrders([]);
        setPastOrders([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-200"
          >
            <Clock className="mr-1 h-3 w-3" /> În Așteptare
          </Badge>
        );
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

  const OrderDetailsModal = () => {
    const [copied, setCopied] = useState(false);
    return (
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalii Comandă #{selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Plasat pe {formatDateRo(selectedOrder?.created_at ?? "", true)}
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-2">
              {selectedOrder.awb && (
                <div className="flex items-center gap-2">
                  <b>AWB:</b>
                  <span>{selectedOrder.awb}</span>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={e => {
                      e.preventDefault();
                      navigator.clipboard.writeText(selectedOrder.awb!);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1200);
                    }}
                    title="Copiază AWB"
                  >
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-8 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </Button>
                  {copied && <span className="text-xs text-green-600 ml-2">Copiat!</span>}
                </div>
              )}
              <div><b>Status:</b> {getStatusBadge(selectedOrder.status)}</div>
              <div><b>Locație:</b> {selectedOrder.location.name}, {selectedOrder.location.address}</div>
              <div><b>Greutate:</b> {selectedOrder.details.weight} kg</div>
              <div><b>Total:</b> {selectedOrder.pricing.total} RON</div>
              <div><b>Predare:</b> {formatDateRo(selectedOrder.schedule.dropoff.date, true)} ({selectedOrder.schedule.dropoff.timeSlot})</div>
              <div><b>Ridicare:</b> {formatDateRo(selectedOrder.schedule.pickup.date, true)} ({selectedOrder.schedule.pickup.timeSlot})</div>
              <div><b>Servicii:</b> {selectedOrder.services.base}</div>
              <div><b>Instrucțiuni speciale:</b> {selectedOrder.details.specialInstructions || "—"}</div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsModalOpen(false);
            }}>Închide</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  const OrderCard = ({ order }: { order: Order }) => (
    <Card className="hover-scale">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">Comanda #{order.id}</CardTitle>
            <CardDescription>Plasat pe {formatDateRo(order.created_at, true)}</CardDescription>
          </div>
          {getStatusBadge(order.status)}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid gap-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Articole:</span>
            <span className="font-medium">{order.details.weight} kg</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total:</span>
            <span className="font-medium">{order.pricing.total} RON</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Locație:</span>
            <span className="font-medium">{order.location?.name}</span>
          </div>

          <div className="mt-2 space-y-2">
            <div className="flex items-start gap-2 text-sm">
              <Calendar className="h-4 w-4 mt-0.5 text-primary" />
              <div>
                <p className="font-medium">Predare: {formatDateRo(order.schedule.dropoff.date)}</p>
                <p className="text-muted-foreground">{order.schedule.dropoff.timeSlot}</p>
              </div>
            </div>

            <div className="flex items-start gap-2 text-sm">
              <Package className="h-4 w-4 mt-0.5 text-primary" />
              <div>
                <p className="font-medium">Ridicare: {formatDateRo(order.schedule.pickup.date)}</p>
                <p className="text-muted-foreground">{order.schedule.pickup.timeSlot}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button variant="outline" size="sm" className="w-full" onClick={() => { setSelectedOrder(order); setIsModalOpen(true); }}>
          Vezi Detalii
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="space-y-6">
      <OrderDetailsModal />
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Comenzile Mele</h2>
        <Button onClick={() => router.push("/easybox")}>Plasează Comandă Nouă</Button>
      </div>

      {isLoading ? (
        <div className="text-center py-12">Se încarcă comenzile...</div>
      ) : (
        <Tabs
          defaultValue="upcoming"
          value={orderTab}
          onValueChange={setOrderTab}
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
      )}
    </div>
  );
}

export function formatDateRo(dateString: string, withTime: boolean = false): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleString("ro-RO", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: withTime ? "2-digit" : undefined,
    minute: withTime ? "2-digit" : undefined,
  });
}
