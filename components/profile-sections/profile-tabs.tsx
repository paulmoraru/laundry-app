"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileOrders } from "@/components/profile-sections/profile-orders";
import { ProfileSettings } from "@/components/profile-sections/profile-settings";
import { ProfilePayments } from "@/components/profile-sections/profile-payments";
import { ProfileAddresses } from "@/components/profile-sections/profile-addresses";

export function ProfileTabs() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div ref={ref} className={`${inView ? "fade-in" : "opacity-0"}`}>
      <Tabs
        defaultValue="orders"
        onValueChange={setActiveTab}
        value={activeTab}
      >
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="payments">Payment Methods</TabsTrigger>
          <TabsTrigger value="settings">Account Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          <ProfileOrders />
        </TabsContent>

        <TabsContent value="addresses" className="space-y-4">
          <ProfileAddresses />
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <ProfilePayments />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <ProfileSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
