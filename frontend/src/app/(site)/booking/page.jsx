"use client";
import { useState, useEffect } from "react";
import { CheckCircle, Loader } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

const staticServices = [
  "Haircut & Styling",
  "Hair Colour",
  "Highlights / Balayage",
  "Hair Spa & Ritual",
  "Rebonding / Smoothening",
  "Keratin Treatment",
  "Classic Facial",
  "Anti-Ageing Facial",
  "Brightening Facial",
  "Party Makeup",
  "Bridal Makeup",
  "Classic Manicure",
  "Gel Manicure",
  "Classic Pedicure",
  "Spa Pedicure",
  "Men's Haircut",
  "Beard Shaping & Trim",
  "Swedish Massage",
  "Deep Tissue Massage",
  "Aromatherapy Massage",
  "Hot Stone Therapy",
];

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
  "6:00 PM", "6:30 PM", "7:00 PM",
];

export default function BookingPage() {
  const { user, loading: authLoading } = useAuth();
  const [serviceOptions, setServiceOptions] = useState(staticServices);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", service: "", date: "", time: "", notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: prev.name || user.name || "",
        email: prev.email || user.email || "",
        phone: prev.phone || user.phone || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    async function loadServices() {
      try {
        const res = await fetch(`${API_BASE}/services`);
        if (!res.ok) return;
        const json = await res.json();
        if (json.success && json.data?.length > 0) {
          const names = json.data.flatMap((cat) =>
            cat.items.map((item) => item.name)
          );
          if (names.length > 0) setServiceOptions(names);
        }
      } catch {
        // keep static fallback
      }
    }
    loadServices();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, date: new Date(form.date).toISOString().split("T")[0] }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.errors?.[0]?.msg || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Unable to connect. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center max-w-md mx-auto px-6">
          <CheckCircle size={64} className="text-rose-gold mx-auto mb-6" />
          <h2 className="font-display text-4xl text-espresso mb-4">Booking Confirmed!</h2>
          <p className="font-body text-mocha mb-8">
            Thank you, {form.name}! Your appointment for <strong>{form.service}</strong> on{" "}
            <strong>{form.date}</strong> at <strong>{form.time}</strong> has been received. We'll
            send a confirmation to {form.email}.
          </p>
          <button
            onClick={() => { setSuccess(false); setForm({ name: user?.name || "", email: user?.email || "", phone: user?.phone || "", service: "", date: "", time: "", notes: "" }); }}
            className="inline-flex items-center gap-2 bg-rose-gold text-cream px-8 py-3.5 font-sans text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:bg-espresso hover:scale-105 active:scale-95"
          >
            Book Another Appointment
          </button>
        </div>
      </div>
    );
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="pt-24">
      <div className="bg-espresso text-cream py-20 px-6 text-center">
        <p className="font-sans text-sm tracking-[0.3em] uppercase text-rose-gold mb-3">
          Reserve Your Spot
        </p>
        <h1 className="font-display text-6xl text-cream">Book Appointment</h1>
        <p className="font-body text-cream/60 mt-4 max-w-xl mx-auto">
          Fill in the form below and we'll confirm your booking within a few hours.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-white shadow-xl p-8 md:p-12">
          {!authLoading && user && (
            <div className="mb-8 px-4 py-3 bg-champagne/50 rounded-md flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-rose-gold text-cream flex items-center justify-center font-sans text-sm font-medium flex-shrink-0">
                {user.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <p className="font-sans text-sm text-mocha">
                Booking as <span className="font-medium text-espresso">{user.name}</span>
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-sans text-xs tracking-widest uppercase text-mocha mb-2">
                  Full Name *
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                  className="w-full border border-champagne px-4 py-3 font-body text-espresso focus:outline-none focus:border-rose-gold transition-colors duration-300 bg-cream"
                />
              </div>

              <div>
                <label className="block font-sans text-xs tracking-widest uppercase text-mocha mb-2">
                  Email Address *
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full border border-champagne px-4 py-3 font-body text-espresso focus:outline-none focus:border-rose-gold transition-colors duration-300 bg-cream"
                />
              </div>

              <div>
                <label className="block font-sans text-xs tracking-widest uppercase text-mocha mb-2">
                  Phone Number *
                </label>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="+91 7700 000000"
                  className="w-full border border-champagne px-4 py-3 font-body text-espresso focus:outline-none focus:border-rose-gold transition-colors duration-300 bg-cream"
                />
              </div>

              <div>
                <label className="block font-sans text-xs tracking-widest uppercase text-mocha mb-2">
                  Service *
                </label>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  required
                  className="w-full border border-champagne px-4 py-3 font-body text-espresso focus:outline-none focus:border-rose-gold transition-colors duration-300 bg-cream appearance-none"
                >
                  <option value="">Select a service</option>
                  {serviceOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-sans text-xs tracking-widest uppercase text-mocha mb-2">
                  Preferred Date *
                </label>
                <input
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  min={today}
                  required
                  className="w-full border border-champagne px-4 py-3 font-body text-espresso focus:outline-none focus:border-rose-gold transition-colors duration-300 bg-cream"
                />
              </div>

              <div>
                <label className="block font-sans text-xs tracking-widest uppercase text-mocha mb-2">
                  Preferred Time *
                </label>
                <select
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                  className="w-full border border-champagne px-4 py-3 font-body text-espresso focus:outline-none focus:border-rose-gold transition-colors duration-300 bg-cream"
                >
                  <option value="">Select a time</option>
                  {timeSlots.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-sans text-xs tracking-widest uppercase text-mocha mb-2">
                Additional Notes
              </label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={4}
                placeholder="Any allergies, preferences, or special requests..."
                className="w-full border border-champagne px-4 py-3 font-body text-espresso focus:outline-none focus:border-rose-gold transition-colors duration-300 bg-cream resize-none"
              />
            </div>

            {error && (
              <p className="text-red-600 font-sans text-sm bg-red-50 px-4 py-3 border border-red-200">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex justify-center items-center gap-2 bg-rose-gold text-cream px-8 py-4 font-sans text-base font-medium tracking-widest uppercase transition-all duration-300 hover:bg-espresso hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <>
                  <Loader size={18} className="animate-spin" /> Processing...
                </>
              ) : (
                "Confirm Booking"
              )}
            </button>

            <p className="text-center font-sans text-xs text-mocha/50">
              We'll confirm your appointment by email within a few hours. You may also call us at{" "}
              <a href="tel:91 9565 459518" className="text-rose-gold hover:underline">
                +91 9565 459518
              </a>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
