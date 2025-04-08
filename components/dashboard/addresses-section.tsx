import { MapPin, Settings, XCircle, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { dashboardData } from "@/lib/dashboard-data"

export default function AddressesSection() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">My Addresses</h1>
        <p className="text-gray-500">Manage your shipping and billing addresses.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {dashboardData.addresses.map((address:any) => (
          <Card key={address.id} className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">
                    {address.type}
                  </Badge>
                  {address.default && (
                    <Badge variant="outline" className="border-green-500 text-green-600 bg-green-50">
                      Default
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-700 hover:bg-gray-100">
                    <Settings className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <XCircle className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-gray-900">{address.name}</p>
                <p className="text-sm text-gray-500">{address.address}</p>
                <p className="text-sm text-gray-500">
                  {address.city}, {address.postalCode}
                </p>
                <p className="text-sm text-gray-500">{address.phone}</p>
              </div>
              <div className="mt-4 flex gap-2">
                {!address.default && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-800"
                  >
                    Set as Default
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-800"
                >
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        <Card className="border-dashed border-2 border-gray-300 bg-white">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center h-full py-6">
              <MapPin className="h-8 w-8 text-gray-400 mb-4" />
              <h3 className="font-medium mb-2 text-gray-900">Add a New Address</h3>
              <p className="text-gray-500 text-center mb-4">Add a new shipping or billing address to your account.</p>
              <Button className="bg-red-800 hover:bg-red-900 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Add New Address
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
