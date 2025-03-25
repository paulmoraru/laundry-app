"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Bell, Mail, Phone, Shield, LogOut } from "lucide-react"

export function ProfileSettings() {
  const { toast } = useToast()

  // Mock user data
  const [userData, setUserData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "(555) 123-4567",
  })

  // Mock notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailOrder: true,
    emailPromotion: false,
    smsOrder: true,
    smsPromotion: false,
    pushOrder: true,
    pushPromotion: false,
  })

  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdateProfile = () => {
    setIsUpdating(true)

    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false)

      toast({
        title: "Profile updated",
        description: "Your profile information has been updated.",
      })
    }, 1000)
  }

  const handleUpdateNotifications = () => {
    setIsUpdating(true)

    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false)

      toast({
        title: "Notification preferences updated",
        description: "Your notification preferences have been saved.",
      })
    }, 1000)
  }

  const handleChangePassword = () => {
    // In a real app, this would open a password change dialog
    toast({
      title: "Password reset email sent",
      description: "Check your email for instructions to reset your password.",
    })
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal information and contact details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={userData.phone}
              onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleUpdateProfile} disabled={isUpdating}>
            {isUpdating ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Manage how and when you receive notifications from us.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Email Notifications</h3>
            </div>
            <div className="grid gap-3 ml-7">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-orders" className="flex-1">
                  Order updates and receipts
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
                  Promotions and special offers
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
              <h3 className="font-medium">SMS Notifications</h3>
            </div>
            <div className="grid gap-3 ml-7">
              <div className="flex items-center justify-between">
                <Label htmlFor="sms-orders" className="flex-1">
                  Order status updates
                </Label>
                <Switch
                  id="sms-orders"
                  checked={notificationSettings.smsOrder}
                  onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, smsOrder: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sms-promotions" className="flex-1">
                  Promotions and special offers
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
              <h3 className="font-medium">Push Notifications</h3>
            </div>
            <div className="grid gap-3 ml-7">
              <div className="flex items-center justify-between">
                <Label htmlFor="push-orders" className="flex-1">
                  Order status updates
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
                  Promotions and special offers
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
            {isUpdating ? "Saving..." : "Save Preferences"}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Manage your account security and password.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Password</h3>
          </div>
          <p className="text-sm text-muted-foreground ml-7">Last changed: 3 months ago</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" className="gap-2 text-destructive hover:text-destructive">
            <LogOut className="h-4 w-4" />
            Sign Out of All Devices
          </Button>
          <Button onClick={handleChangePassword}>Change Password</Button>
        </CardFooter>
      </Card>

      <Card className="border-destructive/20">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>Permanent actions that cannot be undone.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Deleting your account will remove all of your information from our database. This cannot be undone.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="destructive">Delete Account</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

