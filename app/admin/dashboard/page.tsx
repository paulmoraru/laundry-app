"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/fetch-utils";
import { Button } from "@/components/ui/button";

interface Order {
  id: number;
  status: string;
  // Add other fields as needed
}

const statuses = ["pending", "scheduled", "processing", "completed", "cancelled"];

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [restricted, setRestricted] = useState(false);
  const router = useRouter();

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
        // Only fetch orders if admin
        const ordersResponse = await api.get("http://localhost:8000/api/orders");
        const ordersData = await ordersResponse.json();
        const orders = Array.isArray(ordersData.data) ? ordersData.data : [];
        orders.sort((a: Order, b: Order) => b.id - a.id);
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

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    await api.put(`http://localhost:8000/api/orders/${orderId}`, { status: newStatus });
    setOrders(orders =>
      orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  if (restricted) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-red-600">PAGINA RESTRICȚIONATĂ</h1>
      </div>
    );
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <table className="w-full border">
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Change Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td className="border px-2 py-1">{order.id}</td>
              <td className="border px-2 py-1">{order.status}</td>
              <td className="border px-2 py-1">
                <select
                  value={order.status}
                  onChange={e => handleStatusChange(order.id, e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 