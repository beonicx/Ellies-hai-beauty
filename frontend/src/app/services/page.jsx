import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
  {
    id: "hair",
    category: "Hair",
    icon: "✂️",
    description: "Expert cutting, colouring, styling and treatment services tailored to your hair type.",
    items: [
      { name: "Haircut & Styling", price: 350, duration: "45 min", description: "Precision cut with blow-dry finish" },
      { name: "Hair Colour", price: 650, duration: "90 min", description: "Full colour with premium ammonia-free products" },
      { name: "Highlights / Balayage", price: 850, duration: "2 hrs", description: "Natural sun-kissed effect or bold highlights" },
      { name: "Hair Spa & Ritual", price: 500, duration: "60 min", description: "Deep nourishing treatment from root to tip" },
      { name: "Rebonding / Smoothening", price: 1200, duration: "3 hrs", description: "Glass-like frizz-free straightening" },
      { name: "Keratin Treatment", price: 1000, duration: "2.5 hrs", description: "Long-lasting smoothness and shine" },
    ],
  },
  {
    id: "skin",
    category: "Skin & Facials",
    icon: "🌸",
    description: "Luxury facials and skincare treatments for radiant, healthy skin using Guinot and premium brands.",
    items: [
      { name: "Classic Facial", price: 450, duration: "60 min", description: "Deep cleanse, exfoliation & moisturise" },
      { name: "Anti-Ageing Facial", price: 750, duration: "75 min", description: "Guinot luxury anti-wrinkle treatment" },
      { name: "Brightening Facial", price: 650, duration: "60 min", description: "Pigmentation & glow-boosting ritual" },
      { name: "Acne Control Facial", price: 550, duration: "60 min", description: "Targeted treatment for blemish-prone skin" },
      { name: "Body Wrap", price: 900, duration: "90 min", description: "Detox and nourish with essential oils" },
    ],
  },
  {
    id: "makeup",
    category: "Makeup",
    icon: "💄",
    description: "Flawless looks for every occasion — from everyday glam to bridal perfection.",
    items: [
      { name: "Party Makeup", price: 600, duration: "60 min", description: "Bold and beautiful for any event" },
      { name: "Bridal Makeup", price: 1500, duration: "2 hrs", description: "Long-lasting bridal look with trial session" },
      { name: "Natural / Everyday Look", price: 400, duration: "45 min", description: "Soft, dewy, effortless finish" },
      { name: "Editorial Makeup", price: 1000, duration: "90 min", description: "Creative & high-fashion looks" },
    ],
  },
  {
    id: "nails",
    category: "Nails",
    icon: "💅",
    description: "Manicure, pedicure and nail art to keep your hands and feet beautifully maintained.",
    items: [
      { name: "Classic Manicure", price: 250, duration: "30 min", description: "Shape, buff & polish" },
      { name: "Gel Manicure", price: 400, duration: "45 min", description: "Long-lasting chip-free shine" },
      { name: "Classic Pedicure", price: 300, duration: "40 min", description: "Relaxing soak, scrub & polish" },
      { name: "Spa Pedicure", price: 500, duration: "60 min", description: "Luxury ritual with mask and massage" },
      { name: "Nail Art", price: 200, duration: "30 min", description: "Custom designs per nail" },
    ],
  },
  {
    id: "mens",
    category: "Men's Grooming",
    icon: "🪒",
    description: "Premium grooming services for men — expert cuts, beard styling and dedicated skincare.",
    items: [
      { name: "Men's Haircut", price: 250, duration: "30 min", description: "Fade, taper or classic cut" },
      { name: "Beard Shaping & Trim", price: 200, duration: "20 min", description: "Precision beard styling" },
      { name: "Hair Colour (Men)", price: 450, duration: "60 min", description: "Natural or fashion colour" },
      { name: "Men's Facial", price: 400, duration: "45 min", description: "Deep cleanse and skin refresh" },
    ],
  },
  {
    id: "spa",
    category: "Spa & Wellness",
    icon: "🧖",
    description: "Indulgent body treatments to relax, restore and rejuvenate your body and mind.",
    items: [
      { name: "Swedish Massage", price: 700, duration: "60 min", description: "Full body relaxation massage" },
      { name: "Deep Tissue Massage", price: 850, duration: "60 min", description: "Targets tension and muscle knots" },
      { name: "Aromatherapy Massage", price: 800, duration: "75 min", description: "Essential oil blends for mind & body" },
      { name: "Hot Stone Therapy", price: 950, duration: "75 min", description: "Volcanic stones melt away stress" },
    ],
  },
];

export const metadata = {
  title: "Services | Habib Salon & Academy",
  description: "Explore our full range of hair, skin, makeup, nail and spa services.",
};

export default function ServicesPage() {
  return (
    <div className="pt-24">
      {/* Page Header */}
      <div className="bg-espresso text-cream py-20 px-6 text-center">
        <p className="font-sans text-sm tracking-[0.3em] uppercase text-rose-gold mb-3">
          What We Offer
        </p>
        <h1 className="font-display text-6xl text-cream">Our Services</h1>
        <p className="font-body text-cream/60 mt-4 max-w-xl mx-auto">
          Every service at Habib's begins with a personal consultation. Because you deserve beauty
          that's truly yours.
        </p>
      </div>

      {/* Services */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="space-y-20">
          {services.map((cat) => (
            <div key={cat.id} id={cat.id} className="scroll-mt-24">
              {/* Category header */}
              <div className="flex items-center gap-4 mb-8 pb-4 border-b border-champagne">
                <span className="text-3xl">{cat.icon}</span>
                <div>
                  <h2 className="font-display text-3xl text-espresso">{cat.category}</h2>
                  <p className="font-body text-mocha text-sm">{cat.description}</p>
                </div>
              </div>

              {/* Items grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.items.map((item) => (
                  <div
                    key={item.name}
                    className="bg-cream border border-champagne p-6 hover:border-rose-gold hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-display text-xl text-espresso group-hover:text-rose-gold transition-colors duration-300">
                        {item.name}
                      </h3>
                      <span className="font-sans text-lg font-semibold text-rose-gold">
                        ₹{item.price}
                      </span>
                    </div>
                    <p className="font-body text-sm text-mocha/70 mb-3">{item.description}</p>
                    <p className="font-sans text-xs text-mocha/50 tracking-wider uppercase">
                      {item.duration}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center bg-champagne p-12">
          <p className="font-sans text-sm tracking-[0.3em] uppercase text-rose-gold mb-3">Ready?</p>
          <h2 className="font-display text-4xl text-espresso mb-6">Book Your Treatment</h2>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 bg-rose-gold text-cream px-8 py-3.5 font-sans text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:bg-espresso hover:scale-105 active:scale-95"
          >
            Reserve Now <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
