import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaLeaf, FaTruck, FaShieldAlt } from "react-icons/fa";

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="text-center py-20 bg-green-600 text-white">
        <h1 className="text-4xl font-bold">Fresh & Organic Farm Produce</h1>
        <p className="mt-3 text-lg">
          Delivered straight from the farm to your doorstep!
        </p>
        <Button className="mt-5 bg-white text-green-600 hover:bg-green-500">
          Shop Now
        </Button>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-semibold text-center">Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {["Live", "Processed", "Dry"].map((category) => (
            <Card key={category} className="p-6 text-center bg-white shadow-md">
              <CardContent>
                <h3 className="text-xl font-medium">{category}</h3>
                <p className="text-gray-600 mt-2">
                  Explore fresh {category.toLowerCase()}.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white px-6">
        <h2 className="text-3xl font-semibold text-center">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Card className="p-6 text-center shadow-md">
            <CardContent>
              <FaLeaf size={40} className="text-green-600 mx-auto" />
              <h3 className="text-lg font-medium mt-4">100% Organic</h3>
              <p className="text-gray-600 mt-2">
                We provide fresh, pesticide-free produce.
              </p>
            </CardContent>
          </Card>
          <Card className="p-6 text-center shadow-md">
            <CardContent>
              <FaTruck size={40} className="text-green-600 mx-auto" />
              <h3 className="text-lg font-medium mt-4">Fast Delivery</h3>
              <p className="text-gray-600 mt-2">
                Get your order delivered in no time.
              </p>
            </CardContent>
          </Card>
          <Card className="p-6 text-center shadow-md">
            <CardContent>
              <FaShieldAlt size={40} className="text-green-600 mx-auto" />
              <h3 className="text-lg font-medium mt-4">Secure Payments</h3>
              <p className="text-gray-600 mt-2">
                Your transactions are safe with us.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
