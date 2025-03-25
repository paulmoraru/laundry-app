"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, Edit, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export function ProfileHeader() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  // Mock user data
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    memberSince: "January 2023",
    plan: "Monthly Bundle",
    avatarUrl: "",
  };

  const handleAvatarUpload = () => {
    setIsUploading(true);

    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Profile picture updated",
        description: "Your new profile picture has been saved.",
      });
    }, 1500);
  };

  return (
    <div ref={ref} className={`mb-8 ${inView ? "fade-in" : "opacity-0"}`}>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="relative">
          <Avatar className="h-24 w-24 border-2 border-primary/20">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback className="text-2xl bg-primary/10 text-primary">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <Button
            size="icon"
            variant="secondary"
            className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full shadow-md"
            onClick={handleAvatarUpload}
            disabled={isUploading}
          >
            <Camera className="h-4 w-4" />
            <span className="sr-only">Upload new picture</span>
          </Button>
        </div>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground">{user.email}</p>
              <div className="flex items-center gap-2 mt-1 text-sm">
                <span>Member since {user.memberSince}</span>
                <span className="text-muted-foreground">•</span>
                <span className="font-medium text-primary">{user.plan}</span>
              </div>
            </div>

            <div className="flex gap-2 self-start">
              <Button variant="outline" size="sm" className="gap-2">
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
              <Button size="sm" className="gap-2" asChild>
                <Link href="/book-locker">
                  <Plus className="h-4 w-4" />
                  Book a Locker
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
