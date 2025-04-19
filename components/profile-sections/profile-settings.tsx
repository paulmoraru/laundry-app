"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Bell, Mail, Phone, Shield, LogOut, Trash2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context";
import { api } from "@/lib/fetch-utils"
import { useRouter } from "next/navigation";
import { DeleteAccountModal } from "./delete-account-modal";
import Link from "next/link"

interface User {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  address: string;  
  created_at: string;
}

export function ProfileSettings() {
  const { toast } = useToast()
  const { token, logout } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Mock notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailOrder: true,
    emailPromotion: false,
    smsOrder: true,
    smsPromotion: false,
    pushOrder: true,
    pushPromotion: false,
  });

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

  const handleUpdateProfile = async () => {
    if (!user) return;

    setIsUpdating(true);
    try {
      const response = await api.put('http://localhost:8000/api/profile', {
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        address: user.address,
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      toast({
        title: "Profile updated",
        description: "Your profile information has been saved.",
      });
    } catch (error) {
      toast({
        title: "Error updating profile",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdateNotifications = () => {
    setIsUpdating(true);

    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false);

      toast({
        title: "Notification preferences updated",
        description: "Your notification preferences have been saved.",
      });
    }, 1000);
  };

  const handleChangePassword = () => {
    toast({
      title: "Password reset email sent",
      description: "Check your email for instructions to reset your password.",
    });
  };

  const handleDeleteAccount = async (password: string) => {
    setIsDeleting(true);
    try {
      const response = await api.delete('http://localhost:8000/api/profile', { password });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete account');
      }

      toast({
        title: "Account deleted",
        description: "Your account has been successfully deleted.",
      });

      logout();
      router.push('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      toast({
        title: "Error deleting account",
        description: error instanceof Error ? error.message : "Failed to delete account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
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
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Informații Personale</CardTitle>
          <CardDescription>Actualizează-ți informațiile personale și datele de contact.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nume Complet</Label>
            <Input
              id="name"
              value={user?.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={user?.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Număr de Telefon</Label>
            <Input
              id="phone"
              type="tel"
              value={user?.phone_number}
              onChange={(e) => setUser({ ...user, phone_number: e.target.value })}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleUpdateProfile} disabled={isUpdating}>
            {isUpdating ? "Se salvează..." : "Salvează Modificările"}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferințe Notificări</CardTitle>
          <CardDescription>Gestionează cum și când primești notificări de la noi.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Notificări Email</h3>
            </div>
            <div className="grid gap-3 ml-7">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-orders" className="flex-1">
                  Actualizări comenzi și facturi
                </Label>
                <Switch
                  id="email-orders"
                  checked={notificationSettings.emailOrder}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, emailOrder: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="email-promotions" className="flex-1">
                  Promoții și oferte speciale
                </Label>
                <Switch
                  id="email-promotions"
                  checked={notificationSettings.emailPromotion}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, emailPromotion: checked })
                  }
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Notificări SMS</h3>
            </div>
            <div className="grid gap-3 ml-7">
              <div className="flex items-center justify-between">
                <Label htmlFor="sms-orders" className="flex-1">
                  Actualizări stare comenzi
                </Label>
                <Switch
                  id="sms-orders"
                  checked={notificationSettings.smsOrder}
                  onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, smsOrder: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sms-promotions" className="flex-1">
                  Promoții și oferte speciale
                </Label>
                <Switch
                  id="sms-promotions"
                  checked={notificationSettings.smsPromotion}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, smsPromotion: checked })
                  }
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Notificări Push</h3>
            </div>
            <div className="grid gap-3 ml-7">
              <div className="flex items-center justify-between">
                <Label htmlFor="push-orders" className="flex-1">
                  Actualizări stare comenzi
                </Label>
                <Switch
                  id="push-orders"
                  checked={notificationSettings.pushOrder}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, pushOrder: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="push-promotions" className="flex-1">
                  Promoții și oferte speciale
                </Label>
                <Switch
                  id="push-promotions"
                  checked={notificationSettings.pushPromotion}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, pushPromotion: checked })
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleUpdateNotifications} disabled={isUpdating}>
            {isUpdating ? "Se salvează..." : "Salvează Preferințele"}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Securitate</CardTitle>
          <CardDescription>Gestionează securitatea contului și parola.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Parolă</h3>
          </div>
          <p className="text-sm text-muted-foreground ml-7">Ultima modificare: acum 3 luni</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" className="gap-2 text-destructive hover:text-destructive">
            <LogOut className="h-4 w-4" />
            Deconectare de pe Toate Dispozitivele
          </Button>
          <Button onClick={handleChangePassword}>Schimbă Parola</Button>
        </CardFooter>
      </Card>

      <Card className="border-destructive/20">
        <CardHeader>
          <CardTitle className="text-destructive">Zonă Periculoasă</CardTitle>
          <CardDescription>Acțiuni permanente care nu pot fi anulate.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Ștergerea contului va elimina toate informațiile tale din baza noastră de date. Această acțiune nu poate fi anulată.
          </p>
        </CardContent>
        <CardFooter>
          <Button 
            variant="destructive" 
            onClick={() => setIsDeleteModalOpen(true)}
            disabled={isDeleting}
          >
            Șterge Contul
          </Button>
        </CardFooter>
      </Card>

      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        isDeleting={isDeleting}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteAccount}
      />
    </div>
  );
}

