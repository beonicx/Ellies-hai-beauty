"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, Edit3, Check, LogOut, Calendar, Scissors, ShoppingBag, Ticket, Coins } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

export default function DashboardPage() {
  const { user, loading, logout, updateProfile } = useAuth();
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="w-8 h-8 border-2 border-rose-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  async function handleSave() {
    setSaving(true);
    setMessage("");
    try {
      await updateProfile({ name, phone });
      setEditing(false);
      setMessage("Profile updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setSaving(false);
    }
  }

  function handleLogout() {
    logout();
    router.push("/");
  }

  const userInitial = user.name?.charAt(0)?.toUpperCase() || "U";
  const memberSince = new Date(user.createdAt).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-full bg-rose-gold text-cream flex items-center justify-center font-display text-3xl mx-auto mb-4">
            {userInitial}
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-espresso">
            Welcome, {user.name?.split(" ")[0]}
          </h1>
          <p className="font-sans text-sm text-mocha mt-2 flex items-center justify-center gap-2">
            <Calendar size={14} />
            Member since {memberSince}
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-sm border border-champagne overflow-hidden">
          <div className="px-6 py-4 border-b border-champagne flex items-center justify-between">
            <h2 className="font-display text-lg text-espresso">
              Profile Details
            </h2>
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-1.5 font-sans text-xs tracking-widest uppercase text-rose-gold hover:text-espresso transition-colors"
              >
                <Edit3 size={14} />
                Edit
              </button>
            ) : (
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-1.5 font-sans text-xs tracking-widest uppercase text-rose-gold hover:text-espresso transition-colors disabled:opacity-50"
              >
                <Check size={14} />
                {saving ? "Saving..." : "Save"}
              </button>
            )}
          </div>

          {message && (
            <div
              className={`mx-6 mt-4 px-4 py-2 rounded-md font-sans text-sm ${
                message.includes("success")
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {message}
            </div>
          )}

          <div className="p-6 space-y-5">
            {/* Name */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-champagne/50 flex items-center justify-center flex-shrink-0">
                <User size={18} className="text-rose-gold" />
              </div>
              <div className="flex-1">
                <label className="block font-sans text-xs tracking-widest uppercase text-mocha mb-1">
                  Full Name
                </label>
                {editing ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-cream border border-champagne rounded-md font-sans text-sm text-espresso focus:outline-none focus:border-rose-gold transition-colors"
                  />
                ) : (
                  <p className="font-sans text-sm text-espresso">{user.name}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-champagne/50 flex items-center justify-center flex-shrink-0">
                <Mail size={18} className="text-rose-gold" />
              </div>
              <div className="flex-1">
                <label className="block font-sans text-xs tracking-widest uppercase text-mocha mb-1">
                  Email
                </label>
                <p className="font-sans text-sm text-espresso">{user.email}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-champagne/50 flex items-center justify-center flex-shrink-0">
                <Phone size={18} className="text-rose-gold" />
              </div>
              <div className="flex-1">
                <label className="block font-sans text-xs tracking-widest uppercase text-mocha mb-1">
                  Phone
                </label>
                {editing ? (
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-cream border border-champagne rounded-md font-sans text-sm text-espresso focus:outline-none focus:border-rose-gold transition-colors"
                    placeholder="Add phone number"
                  />
                ) : (
                  <p className="font-sans text-sm text-espresso">
                    {user.phone || "Not provided"}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          <a
            href="/booking"
            className="flex items-center gap-4 bg-white rounded-lg border border-champagne p-5 hover:border-rose-gold transition-colors group"
          >
            <div className="w-12 h-12 rounded-full bg-rose-gold/10 flex items-center justify-center group-hover:bg-rose-gold/20 transition-colors">
              <Scissors size={20} className="text-rose-gold" />
            </div>
            <div>
              <h3 className="font-sans text-sm font-medium text-espresso">
                Book Appointment
              </h3>
              <p className="font-sans text-xs text-mocha">
                Schedule your next visit
              </p>
            </div>
          </a>

          <a
            href="/orders"
            className="flex items-center gap-4 bg-white rounded-lg border border-champagne p-5 hover:border-rose-gold transition-colors group"
          >
            <div className="w-12 h-12 rounded-full bg-rose-gold/10 flex items-center justify-center group-hover:bg-rose-gold/20 transition-colors">
              <ShoppingBag size={20} className="text-rose-gold" />
            </div>
            <div>
              <h3 className="font-sans text-sm font-medium text-espresso">
                Orders
              </h3>
              <p className="font-sans text-xs text-mocha">
                View your booking history
              </p>
            </div>
          </a>

          <a
            href="/coupons"
            className="flex items-center gap-4 bg-white rounded-lg border border-champagne p-5 hover:border-rose-gold transition-colors group"
          >
            <div className="w-12 h-12 rounded-full bg-rose-gold/10 flex items-center justify-center group-hover:bg-rose-gold/20 transition-colors">
              <Ticket size={20} className="text-rose-gold" />
            </div>
            <div>
              <h3 className="font-sans text-sm font-medium text-espresso">
                Coupons
              </h3>
              <p className="font-sans text-xs text-mocha">
                Available discount codes
              </p>
            </div>
          </a>

          <a
            href="/supercoins"
            className="flex items-center gap-4 bg-white rounded-lg border border-champagne p-5 hover:border-rose-gold transition-colors group"
          >
            <div className="w-12 h-12 rounded-full bg-rose-gold/10 flex items-center justify-center group-hover:bg-rose-gold/20 transition-colors">
              <Coins size={20} className="text-rose-gold" />
            </div>
            <div>
              <h3 className="font-sans text-sm font-medium text-espresso">
                SuperCoins
              </h3>
              <p className="font-sans text-xs text-mocha">
                Earn & redeem rewards
              </p>
            </div>
          </a>
        </div>

        {/* Sign Out */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 w-full bg-white rounded-lg border border-champagne p-5 hover:border-rose-gold transition-colors group text-left mt-4"
        >
          <div className="w-12 h-12 rounded-full bg-rose-gold/10 flex items-center justify-center group-hover:bg-rose-gold/20 transition-colors">
            <LogOut size={20} className="text-rose-gold" />
          </div>
          <div>
            <h3 className="font-sans text-sm font-medium text-espresso">
              Sign Out
            </h3>
            <p className="font-sans text-xs text-mocha">
              Log out of your account
            </p>
          </div>
        </button>
      </div>
    </section>
  );
}
