import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
  {
    icon: "✂️",
    title: "Hair",
    desc: "Cuts, colour, keratin, highlights and bespoke styling treatments",
    href: "/services#hair",
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
  },
  {
    icon: "🌸",
    title: "Skin & Facials",
    desc: "Luxury facials, rejuvenating rituals and advanced skin treatments",
    href: "/services#skin",
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
  },
  {
    icon: "💄",
    title: "Makeup",
    desc: "Bridal, party, editorial and everyday looks by expert artists",
    href: "/services#makeup",
    img: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=600&q=80",
  },
  {
    icon: "💅",
    title: "Nails",
    desc: "Manicure, pedicure, gel, and intricate nail art designs",
    href: "/services#nails",
    img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80",
  },
  {
    icon: "🪒",
    title: "Men's Grooming",
    desc: "Precision haircuts, beard styling and skincare for men",
    href: "/services#mens",
    img: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&q=80",
  },
  {
    icon: "🧖",
    title: "Spa",
    desc: "Full body massages, aromatherapy and holistic wellness",
    href: "/services#spa",
    img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-28 bg-cream relative overflow-hidden">
      {/* Decorative backgrounds */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-champagne/60 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
      <div className="absolute top-20 left-10 w-px h-40 bg-gradient-to-b from-transparent via-rose-gold/20 to-transparent hidden lg:block" />
      <div className="absolute bottom-32 right-16 w-32 h-px bg-gradient-to-r from-transparent via-rose-gold/20 to-transparent hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="font-sans text-sm tracking-[0.3em] uppercase text-rose-gold mb-3">
              What We Offer
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-espresso leading-tight">
              Our <em className="italic">Services</em>
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 border border-rose-gold text-rose-gold px-8 py-3.5 font-sans text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:bg-rose-gold hover:text-cream self-start md:self-auto"
          >
            View All Services <ArrowRight size={14} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link key={service.title} href={service.href}>
              <div className="group relative overflow-hidden bg-champagne transition-all duration-500 hover:-translate-y-1 hover:shadow-xl cursor-pointer h-72">
                {/* Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${service.img}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/30 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl mb-2 block">{service.icon}</span>
                      <h3 className="font-display text-2xl text-cream mb-1">{service.title}</h3>
                      <p className="font-body text-sm text-cream/70 leading-snug">{service.desc}</p>
                    </div>
                    <ArrowRight
                      size={20}
                      className="text-rose-gold opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
