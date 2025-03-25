import { BookingPageContent } from "@/components/booking-sections/booking-page-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rezervă un Dulap | FreshPress Laundry",
  description:
    "Rezervă un dulap inteligent pentru predarea și ridicarea rufelor tale",
};

export default function BookLockerPage() {
  return <BookingPageContent />;
}
