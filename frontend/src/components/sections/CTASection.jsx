import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1600&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-espresso/75" />

      {/* Decorative overlays */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-rose-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-rose-gold/30 to-transparent" />
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-40 h-40 border border-rose-gold/10 rounded-full hidden lg:block" />
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-56 h-56 border border-rose-gold/10 rounded-full hidden lg:block" />
      <div className="absolute top-8 right-1/4 w-20 h-20 bg-rose-gold/5 rounded-full blur-2xl" />
      <div className="absolute bottom-8 left-1/4 w-28 h-28 bg-rose-gold/5 rounded-full blur-2xl" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <p className="font-sans text-sm tracking-[0.3em] uppercase text-rose-gold mb-4">
          Ready to Transform?
        </p>
        <h2 className="font-display text-5xl md:text-6xl text-cream leading-tight mb-6">
          Book Your <em className="text-rose-gold italic">Appointment</em> Today
        </h2>
        <p className="font-body text-cream/70 text-lg mb-10">
          Whether it&rsquo;s a quick trim or a full bridal package, our team is ready to make your vision
          a reality. Easy online booking — ready in under 2 minutes.
        </p>
        <Link
          href="/booking"
          className="inline-flex items-center gap-2 bg-rose-gold text-cream px-10 py-4 font-sans text-base font-medium tracking-widest uppercase transition-all duration-300 hover:bg-rose-dark hover:scale-105 active:scale-95"
        >
          Reserve Your Spot <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
