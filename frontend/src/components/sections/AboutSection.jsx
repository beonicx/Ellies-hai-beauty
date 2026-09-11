import { Award, Heart, Leaf, Users } from "lucide-react";
import Link from "next/link";

const pillars = [
  {
    icon: <Award size={24} />,
    title: "Award-Winning Expertise",
    desc: "Our stylists hold international certifications and continually train in the latest techniques.",
  },
  {
    icon: <Heart size={24} />,
    title: "Personalised Care",
    desc: "Every visit begins with a consultation — because your hair, skin, and style are uniquely yours.",
  },
  {
    icon: <Leaf size={24} />,
    title: "Premium Products",
    desc: "We use only the finest luxury brands — ammonia-free colours, Guinot skincare and more.",
  },
  {
    icon: <Users size={24} />,
    title: "Welcoming For All",
    desc: "A warm, inclusive space for men, women, brides, and everyone seeking their best self.",
  },
];

export default function AboutSection() {
  return (
    <section className="py-28 bg-espresso text-cream overflow-hidden relative">
      {/* Decorative backgrounds */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-rose-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/4" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-mocha/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/4" />
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-px h-60 bg-gradient-to-b from-transparent via-rose-gold/15 to-transparent hidden xl:block" />
      <div className="absolute top-16 left-1/4 w-40 h-px bg-gradient-to-r from-transparent via-rose-gold/10 to-transparent hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image collage */}
          <div className="relative h-[520px] hidden lg:block">
            <div
              className="absolute top-0 left-0 w-64 h-80 bg-cover bg-center"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1562322140-8baeececf3df?w=500&q=80')" }}
            />
            <div
              className="absolute bottom-0 right-0 w-72 h-72 bg-cover bg-center border-4 border-espresso"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=500&q=80')" }}
            />
            <div className="absolute bottom-24 left-48 bg-rose-gold text-cream p-6 w-40">
              <p className="font-display text-4xl">12</p>
              <p className="font-sans text-xs tracking-widest uppercase mt-1">Years of Excellence</p>
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="font-sans text-sm tracking-[0.3em] uppercase text-rose-gold mb-4">
              About Ellie's
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-cream leading-tight mb-6">
              More Than a Salon —<br />
              <em className="text-rose-gold italic">A Sanctuary</em>
            </h2>
            <p className="font-body text-cream/70 mb-4 text-lg">
              Founded with a passion for transformative beauty, Ellie's Hair & Beauty has grown into one
              of the most trusted names in premium salon experiences. We believe beauty is deeply personal,
              and that's why every service is crafted just for you.
            </p>
            <p className="font-body text-cream/60 mb-10">
              From our flagship location, our team of specialists in hair, skin, makeup and wellness
              combine artistry with science to help you look and feel extraordinary.
            </p>

            {/* Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {pillars.map((p) => (
                <div key={p.title} className="flex gap-4">
                  <div className="text-rose-gold shrink-0 mt-1">{p.icon}</div>
                  <div>
                    <h4 className="font-sans text-sm font-medium text-cream mb-1">{p.title}</h4>
                    <p className="font-body text-sm text-cream/55 leading-snug">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-rose-gold text-cream px-8 py-3.5 font-sans text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:bg-rose-dark hover:scale-105 active:scale-95"
            >
              Learn Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
