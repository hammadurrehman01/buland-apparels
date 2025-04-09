import { CreditCard, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { dashboardData } from "@/lib/dashboard-data"

export default function PaymentMethodsSection() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight ">Payment Methods</h1>
        <p className="text-muted-foreground">Manage your saved payment methods.</p>
      </div>

      <div className="grid gap-6">
        {dashboardData.paymentMethods.map((method) => (
          <Card key={method.id} className="bg-white dark:bg-zinc-950 border border-gray-200 shadow-sm rounded-lg overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                  <div className="h-12 w-16 bg-gray-100 rounded-md flex items-center justify-center">
                    {method.cardType === "Visa" ? (
                      <span className="text-blue-600 font-bold">VISA</span>
                    ) : method.cardType === "Mastercard" ? (
                      <span className="text-red-600 font-bold">MC</span>
                    ) : (
                      <CreditCard className="h-6 w-6" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium ">
                      {method.cardType} •••• {method.lastFour}
                    </h3>
                    <p className="text-sm text-gray-500">Expires {method.expiryDate}</p>
                    {method.default && (
                      <Badge variant="outline" className="mt-1 border-green-500 text-green-600 bg-green-50">
                        Default
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  {!method.default && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 hover:text-gray-950"
                    >
                      Set as Default
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 bg-zinc-50 font-medium hover:bg-zinc-100 border border-gray-300"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-white dark:bg-black border border-gray-200 shadow-sm rounded-lg overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center py-4">
            <h3 className="font-medium mb-2 ">Add a New Payment Method</h3>
            <p className="text-gray-500 text-center mb-4">Add a new credit or debit card to make checkout faster.</p>
            <Button className="bg-red-800 hover:bg-red-900 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Add Payment Method
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
