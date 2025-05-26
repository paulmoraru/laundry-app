"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/fetch-utils";
import { Button } from "@/components/ui/button";

interface Order {
  id: number;
  status: string;
  created_at: string;
  location: {
    id: number;
    name: string;
  };
  pricing?: {
    processingFee: number;
  };
}

interface Locker {
  id: number;
  name: string;
}

export default function AdminStatistics() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [lockers, setLockers] = useState<Locker[]>([]);
  const [startDate, setStartDate] = useState<string>("2025-01-01");
  const [endDate, setEndDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [selectedLocker, setSelectedLocker] = useState<number | "all">("all");
  const [loading, setLoading] = useState(true);
  const [restricted, setRestricted] = useState(false);
  const router = useRouter();

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value;
    // Ensure start date is not after end date and not before 2025
    if (newStartDate <= endDate && newStartDate >= "2025-01-01") {
      setStartDate(newStartDate);
    } else if (newStartDate < "2025-01-01") {
      setStartDate("2025-01-01");
    } else {
      // If invalid, reset to end date
      setStartDate(endDate);
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = e.target.value;
    // Ensure end date is not before start date and not before 2025
    if (newEndDate >= startDate && newEndDate >= "2025-01-01") {
      setEndDate(newEndDate);
    } else {
      // If invalid, reset to start date
      setEndDate(startDate);
    }
  };

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await api.get("http://localhost:8000/api/profile");
        if (!response.ok) throw new Error("Not authenticated");
        const data = await response.json();
        if (!data.user?.is_admin) {
          setRestricted(true);
          setTimeout(() => {
            router.push("/");
          }, 3000);
          return;
        }
        // Fetch lockers
        const lockersResponse = await api.get("http://localhost:8000/api/locations");
        const lockersData = await lockersResponse.json();
        setLockers(lockersData.data || []);
        
        // Fetch orders
        const ordersResponse = await api.get("http://localhost:8000/api/orders");
        const ordersData = await ordersResponse.json();
        const orders = Array.isArray(ordersData.data) ? ordersData.data : [];
        setOrders(orders);
      } catch {
        setRestricted(true);
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } finally {
        setLoading(false);
      }
    };
    checkAdmin();
  }, [router]);

  const getFilteredOrders = () => {
    const filtered = orders.filter(order => {
      // First apply locker filter
      if (selectedLocker !== "all" && order?.location?.id !== selectedLocker) {
        return false;
      }
      
      // Then apply date range filter
      const orderDate = new Date(order.created_at);
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999); // Include the entire end date

      return orderDate >= start && orderDate <= end;
    });
    return filtered;
  };

  const calculateProfitability = (orders: Order[]) => {
    // Calculate number of months between start and end date
    const start = new Date(startDate);
    const end = new Date(endDate);
    const monthsDiff = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
    
    // Calculate total costs (50 RON per month)
    const totalCosts = monthsDiff * 50;
    
    // Calculate total processing fees from completed orders only
    const totalProcessingFees = orders.reduce((sum, order) => {
      // Only add processing fee if order is completed
      if (order.status === "Completed") {
        return sum + (order.pricing?.processingFee || 0);
      }
      return sum;
    }, 0);
    
    // Calculate profit
    const profit = totalProcessingFees - totalCosts;
    
    // Calculate monthly average
    const monthlyAverage = profit / monthsDiff;
    
    return {
      totalCosts,
      totalProcessingFees,
      profit,
      monthlyAverage,
      monthsDiff,
      completedOrders: orders.filter(o => o.status === "Completed").length
    };
  };

  if (restricted) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-red-600">PAGINA RESTRICȚIONATĂ</h1>
      </div>
    );
  }

  if (loading) return <div>Se încarcă...</div>;

  const filteredOrders = getFilteredOrders();
  const profitability = calculateProfitability(filteredOrders);

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Statistici Comenzi</h1>
      
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-4">
          <div>
            <label className="mr-2">De la:</label>
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              min="2025-01-01"
              max={endDate}
              className="border rounded px-3 py-1"
            />
          </div>
          <div>
            <label className="mr-2">Până la:</label>
            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              min={startDate}
              max={new Date().toISOString().split('T')[0]}
              className="border rounded px-3 py-1"
            />
          </div>
        </div>

        <div>
          <label className="mr-2">Dulapul:</label>
          <select
            value={selectedLocker}
            onChange={(e) => setSelectedLocker(e.target.value === "all" ? "all" : Number(e.target.value))}
            className="border rounded px-3 py-1"
          >
            <option value="all">Toate dulapurile</option>
            {lockers.map(locker => (
              <option key={locker.id} value={locker.id}>
                {locker.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl mb-4">
          Sumar comenzi
          {selectedLocker !== "all" && (
            <span className="text-gray-600 text-base ml-2">
              pentru {lockers.find(l => l.id === selectedLocker)?.name}
            </span>
          )}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <p className="text-gray-600">Număr total comenzi:</p>
            <p className="text-3xl font-bold">{filteredOrders.length}</p>
          </div>
          <div className="p-4 border rounded-lg">
            <p className="text-gray-600">Comenzi după status:</p>
            <ul className="mt-2">
              <li>În așteptare: {filteredOrders.filter(o => o.status === "Pending").length}</li>
              <li>Programate: {filteredOrders.filter(o => o.status === "Scheduled").length}</li>
              <li>În procesare: {filteredOrders.filter(o => o.status === "Processing").length}</li>
              <li>Finalizate: {filteredOrders.filter(o => o.status === "Completed").length}</li>
              <li>Anulate: {filteredOrders.filter(o => o.status === "Cancelled").length}</li>
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl mb-4">Analiza Profitabilitate</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg">
              <p className="text-gray-600">Costuri Totale:</p>
              <p className="text-2xl font-bold text-red-600">{profitability.totalCosts.toFixed(2)} RON</p>
              <p className="text-sm text-gray-500">Pentru {profitability.monthsDiff} luni</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-gray-600">Venituri din Taxe:</p>
              <p className="text-2xl font-bold text-green-600">{profitability.totalProcessingFees.toFixed(2)} RON</p>
              <p className="text-sm text-gray-500">Din {profitability.completedOrders} comenzi finalizate</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-gray-600">Profit Total:</p>
              <p className={`text-2xl font-bold ${profitability.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {profitability.profit.toFixed(2)} RON
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-gray-600">Medie Lunară:</p>
              <p className={`text-2xl font-bold ${profitability.monthlyAverage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {profitability.monthlyAverage.toFixed(2)} RON
              </p>
              <p className="text-sm text-gray-500">
                {profitability.monthlyAverage >= 0 ? 'Profitabil' : 'Neprofitabil'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 