import { ProfileHeader } from "@/components/profile-sections/profile-header";
import { ProfileTabs } from "@/components/profile-sections/profile-tabs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile | FreshPress Laundry",
  description:
    "Manage your account, view order history, and update preferences",
};

export default function ProfilePage() {
  return (
    <div className="container py-8 md:py-12">
      <ProfileHeader />
      <ProfileTabs />
    </div>
  );
}
