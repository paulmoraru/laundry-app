"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Edit, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { api } from "@/lib/fetch-utils";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  created_at: string;
  plan?: string;
}

const MONTHS_RO: Record<number, string> = {
  0: 'Ianuarie',
  1: 'Februarie',
  2: 'Martie',
  3: 'Aprilie',
  4: 'Mai',
  5: 'Iunie',
  6: 'Iulie',
  7: 'August',
  8: 'Septembrie',
  9: 'Octombrie',
  10: 'Noiembrie',
  11: 'Decembrie'
};

export function ProfileHeader() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const router = useRouter();
  const { toast } = useToast();
  const { token } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        router.push('/autentificare');
        return;
      }

      try {
        const response = await api.get('http://localhost:8000/api/profile');
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        console.log(data.user.email);
        setUser(data.user);
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Error loading profile",
          description: "Failed to load profile data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [token, toast, router]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = MONTHS_RO[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Se încarcă profilul...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground mb-4">Te rugăm să te autentifici pentru a-ți vedea profilul</p>
        <Button asChild>
          <Link href="/autentificare">Autentificare</Link>
        </Button>
      </div>
    );
  }

  return (
    <div ref={ref} className={`mb-8 ${inView ? "fade-in" : "opacity-0"}`}>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col gap-2"> 
              <h1 className="text-2xl font-bold">{user?.name}</h1>
              <p className="text-muted-foreground">{user?.email}</p>
              <p className="text-muted-foreground">Membru din {user ? formatDate(user.created_at) : ''}</p>
            </div>

            <div className="flex gap-2 self-start">
              <Button variant="outline" size="sm" className="gap-2">
                <Edit className="h-4 w-4" />
                Editează Profilul
              </Button>
              <Button size="sm" className="gap-2" asChild>
                <Link href="/easybox">
                  <Plus className="h-4 w-4" />
                  Rezervă un Dulap
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
