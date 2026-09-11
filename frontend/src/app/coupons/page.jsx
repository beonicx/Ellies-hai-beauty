"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Ticket, ArrowLeft, Copy } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const sampleCoupons = [
  {
    id: 1,
    code: "WELCOME20",
    discount: "20% Off",
    description: "On your first booking",
    validTill: "2026-12-31",
    minOrder: 50,
  },
  {
    id: 2,
    code: "GLOW15",
    discount: "15% Off",
    description: "On all facial treatments",
    validTill: "2026-10-31",
    minOrder: 40,
  },
  {
    id: 3,
    code: "HAIR10",
    discount: "$10 Off",
    description: "On hair services above $60",
    validTill: "2026-11-15",
    minOrder: 60,
  },
];

export default function CouponsPage() {
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

  function copyCode(code) {
    navigator.clipboard.writeText(code);
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
            <Ticket size={22} className="text-rose-gold" />
          </div>
          <div>
            <h1 className="font-display text-2xl md:text-3xl text-espresso">
              My Coupons
            </h1>
            <p className="font-sans text-sm text-mocha">
              Available discount codes for your next booking
            </p>
          </div>
        </div>

        {sampleCoupons.length > 0 ? (
          <div className="space-y-4">
            {sampleCoupons.map((coupon) => (
              <div
                key={coupon.id}
                className="bg-white rounded-lg border border-champagne overflow-hidden flex"
              >
                <div className="bg-rose-gold/10 px-6 flex items-center justify-center border-r border-dashed border-champagne">
                  <p className="font-display text-lg text-rose-gold whitespace-nowrap">
                    {coupon.discount}
                  </p>
                </div>
                <div className="flex-1 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-sans text-sm font-medium text-espresso mb-0.5">
                      {coupon.description}
                    </h3>
                    <p className="font-sans text-xs text-mocha">
                      Min. order: ${coupon.minOrder} &middot; Valid till{" "}
                      {new Date(coupon.validTill).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => copyCode(coupon.code)}
                    className="flex items-center gap-2 px-4 py-2 border border-rose-gold rounded-md font-sans text-xs font-medium tracking-widest uppercase text-rose-gold hover:bg-rose-gold hover:text-cream transition-all duration-300 self-start"
                  >
                    <Copy size={12} />
                    {coupon.code}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-champagne p-12 text-center">
            <Ticket size={40} className="text-champagne mx-auto mb-4" />
            <h3 className="font-display text-lg text-espresso mb-1">
              No coupons available
            </h3>
            <p className="font-sans text-sm text-mocha">
              Check back later for new offers and discounts
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
