"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Coins, ArrowLeft, TrendingUp, TrendingDown, Gift } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const coinBalance = 250;

const coinHistory = [
  { id: 1, type: "earned", amount: 50, description: "Haircut & Styling booking", date: "2026-09-05" },
  { id: 2, type: "earned", amount: 100, description: "Welcome bonus", date: "2026-09-01" },
  { id: 3, type: "redeemed", amount: -30, description: "Discount on Classic Facial", date: "2026-08-28" },
  { id: 4, type: "earned", amount: 130, description: "Bridal Makeup booking", date: "2026-08-20" },
];

const rewards = [
  { id: 1, name: "10% Off Any Service", coins: 100 },
  { id: 2, name: "Free Hair Spa Add-on", coins: 200 },
  { id: 3, name: "$15 Off Next Booking", coins: 300 },
];

export default function SuperCoinsPage() {
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
            <Coins size={22} className="text-rose-gold" />
          </div>
          <div>
            <h1 className="font-display text-2xl md:text-3xl text-espresso">
              SuperCoins
            </h1>
            <p className="font-sans text-sm text-mocha">
              Earn coins on every booking, redeem for rewards
            </p>
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-r from-rose-gold to-rose-dark rounded-lg p-8 text-cream mb-8">
          <p className="font-sans text-sm uppercase tracking-widest opacity-80 mb-1">
            Your Balance
          </p>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-5xl">{coinBalance}</span>
            <span className="font-sans text-sm opacity-80">SuperCoins</span>
          </div>
          <p className="font-sans text-xs mt-3 opacity-70">
            Earn 1 SuperCoin for every $1 spent
          </p>
        </div>

        {/* Redeem Rewards */}
        <h2 className="font-display text-lg text-espresso mb-4">
          Redeem Rewards
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className="bg-white rounded-lg border border-champagne p-5 text-center"
            >
              <Gift size={24} className="text-rose-gold mx-auto mb-3" />
              <h3 className="font-sans text-sm font-medium text-espresso mb-2">
                {reward.name}
              </h3>
              <p className="font-sans text-xs text-mocha mb-4">
                {reward.coins} SuperCoins
              </p>
              <button
                disabled={coinBalance < reward.coins}
                className="w-full py-2 rounded-md font-sans text-xs font-medium tracking-widest uppercase transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed bg-rose-gold text-cream hover:bg-espresso"
              >
                {coinBalance >= reward.coins ? "Redeem" : "Not Enough"}
              </button>
            </div>
          ))}
        </div>

        {/* Transaction History */}
        <h2 className="font-display text-lg text-espresso mb-4">
          Coin History
        </h2>
        <div className="space-y-3">
          {coinHistory.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg border border-champagne px-5 py-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    item.type === "earned"
                      ? "bg-green-50 text-green-600"
                      : "bg-red-50 text-red-500"
                  }`}
                >
                  {item.type === "earned" ? (
                    <TrendingUp size={14} />
                  ) : (
                    <TrendingDown size={14} />
                  )}
                </div>
                <div>
                  <p className="font-sans text-sm text-espresso">
                    {item.description}
                  </p>
                  <p className="font-sans text-xs text-mocha">
                    {new Date(item.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <p
                className={`font-sans text-sm font-medium ${
                  item.type === "earned" ? "text-green-600" : "text-red-500"
                }`}
              >
                {item.type === "earned" ? "+" : ""}
                {item.amount}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
