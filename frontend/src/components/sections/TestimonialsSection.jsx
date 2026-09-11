import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sophie Clarke",
    role: "Regular Client",
    text: "I've been coming to Habib's for three years now and it never disappoints. The balayage they did on me last month was absolutely perfect. My hair has never looked more natural yet vibrant!",
    stars: 5,
    avatar: "SC",
  },
  {
    name: "Priya Sharma",
    role: "Bridal Client",
    text: "They did my bridal makeup and hair for my wedding day. The team was incredibly patient, professional and the end result was beyond what I imagined. Couldn't have asked for better!",
    stars: 5,
    avatar: "PS",
  },
  {
    name: "James Morrison",
    role: "Men's Grooming",
    text: "Found this place for the first time and won't go anywhere else. The fade cut and beard trim were immaculate. Staff are genuinely nice and the salon has such a relaxing vibe.",
    stars: 5,
    avatar: "JM",
  },
  {
    name: "Elena Popescu",
    role: "Spa Client",
    text: "The hot stone massage was the most relaxing 75 minutes of my life. The therapist knew exactly where to focus and the products they used smelled divine. Already booked my next visit!",
    stars: 5,
    avatar: "EP",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-28 bg-champagne relative overflow-hidden">
      {/* Decorative backgrounds */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-rose-light/20 rounded-full blur-3xl -translate-x-1/3" />
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-rose-gold/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cream/40 rounded-full blur-3xl translate-x-1/4 translate-y-1/3" />
      <div className="absolute top-24 right-12 w-px h-32 bg-gradient-to-b from-transparent via-rose-gold/15 to-transparent hidden lg:block" />
      <div className="absolute bottom-20 left-16 w-24 h-px bg-gradient-to-r from-transparent via-rose-gold/15 to-transparent hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="font-sans text-sm tracking-[0.3em] uppercase text-rose-gold mb-3">
            Client Stories
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-espresso leading-tight">
            What Our Clients <em className="italic">Say</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-cream/80 backdrop-blur-sm p-7 relative transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Quote mark */}
              <div className="font-display text-6xl text-rose-gold/20 absolute top-4 right-5 leading-none select-none">
                &ldquo;
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} size={14} className="text-rose-gold fill-rose-gold" />
                ))}
              </div>

              <p className="font-body text-mocha text-sm leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>

              <div className="flex items-center gap-3 pt-4 border-t border-champagne">
                <div className="w-10 h-10 rounded-full bg-rose-gold text-cream flex items-center justify-center font-sans text-xs font-semibold">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-sans text-sm font-medium text-espresso">{t.name}</p>
                  <p className="font-sans text-xs text-mocha/60">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
