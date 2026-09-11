"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShoppingBag, ArrowLeft, Calendar, Clock } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const sampleOrders = [
  {
    id: "ORD-1001",
    service: "Haircut & Styling",
    date: "2026-09-05",
    time: "10:30 AM",
    status: "Completed",
    amount: 35,
  },
  {
    id: "ORD-1002",
    service: "Classic Facial",
    date: "2026-09-10",
    time: "2:00 PM",
    status: "Upcoming",
    amount: 45,
  },
];

const statusColors = {
  Completed: "bg-green-50 text-green-700 border-green-200",
  Upcoming: "bg-blue-50 text-blue-700 border-blue-200",
  Cancelled: "bg-red-50 text-red-700 border-red-200",
};

export default function OrdersPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/");
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="w-8 h-8 border-2 border-rose-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 font-sans text-sm text-mocha hover:text-rose-gold transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-rose-gold/10 flex items-center justify-center">
            <ShoppingBag size={22} className="text-rose-gold" />
          </div>
          <div>
            <h1 className="font-display text-2xl md:text-3xl text-espresso">
              My Orders
            </h1>
            <p className="font-sans text-sm text-mocha">
              Your booking history and upcoming appointments
            </p>
          </div>
        </div>

        {sampleOrders.length > 0 ? (
          <div className="space-y-4">
            {sampleOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg border border-champagne p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-sans text-sm font-medium text-espresso">
                      {order.service}
                    </h3>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-sans font-medium border ${
                        statusColors[order.status]
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 font-sans text-xs text-mocha">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(order.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {order.time}
                    </span>
                    <span className="text-mocha/50">#{order.id}</span>
                  </div>
                </div>
                <p className="font-sans text-lg font-medium text-espresso">
                  ${order.amount}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-champagne p-12 text-center">
            <ShoppingBag size={40} className="text-champagne mx-auto mb-4" />
            <h3 className="font-display text-lg text-espresso mb-1">
              No orders yet
            </h3>
            <p className="font-sans text-sm text-mocha mb-6">
              Book your first appointment to get started
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 bg-rose-gold text-cream px-6 py-3 font-sans text-xs font-medium tracking-widest uppercase transition-all duration-300 hover:bg-espresso rounded-md"
            >
              Book Now
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
