"use client"

import type React from "react"

import { useState } from "react"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { userData } from "@/lib/dashboard-data"

interface SettingsSectionProps {
  successMessage: string
  setSuccessMessage: (message: string) => void
}

export default function SettingsSection({ successMessage, setSuccessMessage }: SettingsSectionProps) {
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle form submission
  const handleSaveProfile = () => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSuccessMessage("Profile updated successfully")
      setTimeout(() => setSuccessMessage(""), 3000)
    }, 1000)
  }

  // Handle password update
  const handleSavePassword = () => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSuccessMessage("Password updated successfully")
      setFormData({
        ...formData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      setTimeout(() => setSuccessMessage(""), 3000)
    }, 1000)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight ">Account Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      {successMessage && (
        <Alert className="bg-green-50 border-green-200 text-green-800">
          <AlertCircle className="h-4 w-4 text-green-600" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="bg-gray-100 dark:bg-zinc-800 p-1">
          <TabsTrigger value="profile" className="">
            Profile
          </TabsTrigger>
          <TabsTrigger value="password" className="">
            Password
          </TabsTrigger>
          <TabsTrigger value="preferences" className="">
            Preferences
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card className="bg-white dark:bg-zinc-950 border border-gray-200 shadow-sm rounded-lg overflow-hidden">
            <CardHeader>
              <CardTitle className="">Profile Information</CardTitle>
              <CardDescription className="text-muted-foreground">Update your personal information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="border-gray-300"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                className="bg-red-800 hover:bg-red-900 text-white"
                onClick={handleSaveProfile}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Password Tab */}
        <TabsContent value="password">
          <Card className="bg-white dark:bg-zinc-950 border border-gray-200 shadow-sm rounded-lg overflow-hidden">
            <CardHeader>
              <CardTitle className="">Change Password</CardTitle>
              <CardDescription className="text-muted-foreground">
                Update your password to keep your account secure.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="">
                  Current Password
                </Label>
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className="border-gray-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="">
                  New Password
                </Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="border-gray-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="">
                  Confirm New Password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="border-gray-300"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Password must:</p>
                <ul className="list-disc list-inside pl-2 space-y-1 mt-1">
                  <li>Be at least 8 characters long</li>
                  <li>Include at least one uppercase letter</li>
                  <li>Include at least one number</li>
                  <li>Include at least one special character</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                className="bg-red-800 hover:bg-red-900 text-white"
                onClick={handleSavePassword}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  "Update Password"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <Card className="bg-white dark:bg-zinc-950 border border-gray-200 shadow-sm rounded-lg overflow-hidden">
            <CardHeader>
              <CardTitle className="">Account Preferences</CardTitle>
              <CardDescription className="text-muted-foreground">Manage your account preferences and settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
   

              <Separator className="bg-gray-200" />

              <div>
                <h3 className="text-lg font-medium mb-4 ">Privacy Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="data-collection" className="">
                        Data Collection
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Allow us to collect data about your browsing and shopping habits to improve your experience.
                      </p>
                    </div>
                    <Switch id="data-collection" defaultChecked={true} />
                  </div>
                  <Separator className="bg-gray-200" />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="personalized-ads" className="">
                        Personalized Ads
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Allow us to show you personalized advertisements based on your interests.
                      </p>
                    </div>
                    <Switch id="personalized-ads" defaultChecked={false} />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="text-red-800 border border-gray-300">
                Delete Account
              </Button>
              <Button className="bg-red-800 hover:bg-red-900 text-white">Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Danger Zone */}
      <Card className="border-red-200 bg-red-50 dark:bg-zinc-950">
        <CardHeader>
          <CardTitle className="text-red-800">Danger Zone</CardTitle>
          <CardDescription className="">
            Actions in this section can permanently delete your account and all associated data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="font-medium ">Delete Account</h3>
              <p className="text-sm ">
                Once you delete your account, there is no going back. This action cannot be undone.
              </p>
            </div>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
