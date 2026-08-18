import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Coffee, Truck, ShieldCheck, Leaf, Clock, Star, Quote } from "lucide-react";
import { products, categories, getFeatured, getBestsellers, getNew } from "@/data/products";
import ProductCard from "@/components/store/ProductCard";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  const featured = getFeatured();
  const bestsellers = getBestsellers();
  const newArrivals = getNew();

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative bg-cream-50 overflow-hidden">
        <div className="container-premium grid lg:grid-cols-2 gap-12 lg:gap-8 items-center py-12 md:py-20 lg:py-28">
          <div className="relative z-10 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 bg-white border border-espresso-100 rounded-full px-4 py-1.5 text-[11px] tracking-widest uppercase font-medium text-espresso-700 mb-6 shadow-soft">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Fresh Roast • Shipped within 2 hours
            </div>
            <h1 className="font-display text-[42px] md:text-[56px] lg:text-[68px] leading-[0.9] tracking-tight font-bold text-espresso-900 text-balance">
              Exceptional<br />
              <span className="text-espresso-400 font-light italic">Coffee,</span><br />
              Roasted to<br />
              Perfection.
            </h1>
            <p className="mt-6 text-[16px] md:text-[18px] leading-relaxed text-espresso-600 max-w-[48ch] text-balance">
              Small-batch, specialty grade. Direct trade, traceable farms. We roast daily in Brooklyn and ship at peak flavor — no warehouse, no compromise.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/shop"><Button variant="primary" size="lg" className="group">Shop Coffee <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></Button></Link>
              <Link href="/about"><Button variant="secondary" size="lg">Explore Collection</Button></Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-espresso-100 pt-8 max-w-[420px]">
              <div><div className="font-display text-2xl font-semibold">92+</div><div className="text-[11px] uppercase tracking-wide text-espresso-500">SCAA Score</div></div>
              <div><div className="font-display text-2xl font-semibold">48h</div><div className="text-[11px] uppercase tracking-wide text-espresso-500">Roast to Ship</div></div>
              <div><div className="font-display text-2xl font-semibold">12k+</div><div className="text-[11px] uppercase tracking-wide text-espresso-500">Happy Customers</div></div>
            </div>
          </div>

          <div className="relative order-1 lg:order-2 lg:h-[640px] h-[520px] flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-cream-200 to-caramel-200 rounded-[40px] lg:rounded-[48px] rotate-1" />
            <div className="relative w-full h-full rounded-[40px] lg:rounded-[48px] overflow-hidden shadow-large -rotate-1 bg-white">
              <Image src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1200&auto=format&fit=crop" alt="Premium coffee beans" fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-xl rounded-[24px] p-5 shadow-medium flex items-center gap-4">
                <Image src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=200&auto=format&fit=crop" alt="bag" width={64} height={64} className="rounded-xl w-16 h-16 object-cover" />
                <div className="flex-1">
                  <div className="text-[12px] uppercase tracking-wide text-espresso-500 font-medium">Today&apos;s Roast</div>
                  <div className="font-display font-semibold text-espresso-900">Ethiopia Yirgacheffe</div>
                  <div className="flex items-center gap-1 mt-1"><Star size={12} fill="#D4A017" stroke="#D4A017" /><span className="text-xs">4.9 (127)</span></div>
                </div>
                <div className="w-10 h-10 rounded-full bg-espresso-900 text-cream-50 flex items-center justify-center"><ArrowRight size={16} /></div>
              </div>
              <div className="absolute top-6 right-6 bg-gold-400 text-espresso-900 px-4 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase shadow-gold">Direct Trade</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-premium">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="text-[11px] tracking-[0.2em] uppercase font-semibold text-gold-400 mb-3">Curated Selection</div>
              <h2 className="font-display text-[36px] md:text-[44px] leading-none font-bold tracking-tight">Featured Products</h2>
            </div>
            <p className="text-[15px] text-espresso-600 max-w-[44ch]">Handpicked by our head roaster. The most expressive coffees of the season.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
            {products.slice(0,4).map(p => <ProductCard key={p.id+"f"} product={p} />)}
          </div>
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="py-20 md:py-28 bg-espresso-950 text-cream-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-5" />
        <div className="container-premium relative">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-display text-[36px] md:text-[48px] leading-none font-medium">Best Sellers</h2>
            <Link href="/shop?sort=bestsellers" className="hidden md:inline-flex items-center gap-2 text-[12px] tracking-widest uppercase font-medium border border-white/20 rounded-full px-6 py-3 hover:bg-white hover:text-espresso-900 transition-colors">View All <ArrowRight size={14} /></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {bestsellers.map(p => <div key={p.id} className="[&>div]:bg-white [&>div]:text-espresso-900"><ProductCard product={p} /></div>)}
            <div className="card-premium bg-gradient-to-br from-gold-400 to-gold-500 text-espresso-900 p-8 flex flex-col justify-between min-h-[460px]">
              <div>
                <div className="w-12 h-12 rounded-full bg-espresso-900 text-cream-50 flex items-center justify-center mb-6"><Award size={22} /></div>
                <h3 className="font-display text-[28px] leading-tight font-semibold">Join 12k+ daily drinkers</h3>
                <p className="mt-4 text-[14px] leading-relaxed opacity-80">Subscribe and save 15%. Fresh roast delivered to your door, exactly how you like it.</p>
              </div>
              <Link href="/shop"><Button variant="primary" className="w-full bg-espresso-900 text-cream-50 hover:bg-espresso-800">Start Subscription</Button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20 md:py-28 bg-cream-50">
        <div className="container-premium">
          <div className="text-center max-w-[60ch] mx-auto mb-14">
            <h2 className="font-display text-[36px] md:text-[44px] leading-tight font-bold">Shop by Craft</h2>
            <p className="mt-4 text-espresso-600">From delicate single origins to bold blends — each with a story.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map(cat => (
              <Link key={cat.slug} href={`/shop?cat=${cat.slug}`} className="group relative aspect-[3/4] rounded-[24px] overflow-hidden bg-white shadow-soft hover:shadow-medium transition-all duration-500">
                <Image src={cat.image} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/80 via-espresso-950/10 to-transparent" />
                <div className="absolute bottom-0 p-4">
                  <h3 className="font-display text-white font-semibold text-[16px]">{cat.name}</h3>
                  <p className="text-[11px] text-cream-200 tracking-wide uppercase mt-1">{cat.count} products</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIAL OFFERS */}
      <section className="py-12">
        <div className="container-premium">
          <div className="rounded-[32px] bg-espresso-900 text-cream-50 overflow-hidden grid md:grid-cols-2">
            <div className="p-10 md:p-14 flex flex-col justify-center">
              <div className="inline-flex bg-gold-400 text-espresso-900 text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full w-fit mb-6">Limited Offer</div>
              <h3 className="font-display text-[32px] md:text-[42px] leading-none font-semibold">20% Off Your First Roast</h3>
              <p className="mt-4 text-cream-200/70 text-[15px]">Use code <span className="text-gold-400 font-mono font-bold">WELCOME10</span> at checkout. Freshly roasted, shipped free over $50.</p>
              <div className="mt-8 flex gap-3">
                <Link href="/shop"><Button variant="ghost" className="bg-white text-espresso-900 hover:bg-cream-100">Shop Now</Button></Link>
                <div className="flex items-center gap-2 text-[12px] text-cream-200/60"><Clock size={14} /> Ends in 48:12:33</div>
              </div>
            </div>
            <div className="relative min-h-[320px] bg-cream-100">
              <Image src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop" alt="Coffee offer" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-white border-y border-espresso-100">
        <div className="container-premium grid md:grid-cols-5 gap-10 text-center">
          {[
            { icon: Leaf, title: "Freshly Roasted", desc: "Roasted daily in small batches, shipped within hours." },
            { icon: Award, title: "Premium Beans", desc: "SCAA 85+ specialty grade, direct trade only." },
            { icon: Truck, title: "Fast Delivery", desc: "Free over $50, express 24h in NYC." },
            { icon: ShieldCheck, title: "Secure Payment", desc: "Encrypted, ZarinPal + Stripe + Apple Pay." },
            { icon: Coffee, title: "Quality Guarantee", desc: "Love it or we re-roast — 30-day guarantee." },
          ].map(f => (
            <div key={f.title} className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-cream-100 border border-espresso-100 flex items-center justify-center mb-4"><f.icon size={22} className="text-espresso-800" /></div>
              <h4 className="font-display font-semibold text-[15px]">{f.title}</h4>
              <p className="text-[13px] text-espresso-600 mt-2 leading-relaxed max-w-[22ch]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SUBSCRIPTION */}
      <section className="py-20 md:py-28 bg-cream-100">
        <div className="container-premium grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-[11px] tracking-[0.2em] uppercase font-bold text-espresso-500 mb-4">Subscription — Save 15%</div>
            <h2 className="font-display text-[36px] md:text-[48px] leading-[0.95] font-bold tracking-tight">Never run out of<br />great coffee.</h2>
            <p className="mt-6 text-espresso-600 max-w-[50ch]">Choose your coffee, grind, quantity, and delivery frequency. Pause, modify, or cancel anytime. Roasted fresh for each shipment.</p>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="bg-white rounded-2xl p-4 border border-espresso-100"><div className="font-semibold">1. Pick Coffee</div><div className="text-xs text-espresso-500 mt-1">Single origin or blend</div></div>
              <div className="bg-white rounded-2xl p-4 border border-espresso-100"><div className="font-semibold">2. Set Frequency</div><div className="text-xs text-espresso-500 mt-1">Weekly / Monthly</div></div>
              <div className="bg-white rounded-2xl p-4 border border-espresso-100"><div className="font-semibold">3. Enjoy Fresh</div><div className="text-xs text-espresso-500 mt-1">Always roasted to order</div></div>
            </div>
            <Link href="/shop" className="inline-block mt-8"><Button size="lg" variant="primary">Build Your Subscription</Button></Link>
          </div>
          <div className="relative lg:h-[560px] h-[420px] rounded-[32px] overflow-hidden bg-white shadow-large border border-espresso-100 p-8 flex flex-col justify-between">
            <Image src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop" alt="subscription" fill className="object-cover opacity-20" />
            <div className="relative bg-white rounded-[20px] border border-espresso-100 p-6 shadow-soft">
              <div className="flex justify-between items-center mb-4"><span className="text-xs uppercase tracking-wide font-medium">Your Plan</span><span className="text-xs bg-gold-400 px-2 py-1 rounded-full font-bold">Save 15%</span></div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span>Coffee</span><span className="font-medium">Signature Espresso 500g</span></div>
                <div className="flex justify-between"><span>Grind</span><span className="font-medium">Espresso</span></div>
                <div className="flex justify-between"><span>Frequency</span><span className="font-medium">Every 2 weeks</span></div>
                <div className="border-t border-dashed border-espresso-200 my-3" />
                <div className="flex justify-between font-semibold text-base"><span>Monthly</span><span>$32.30</span></div>
              </div>
            </div>
            <div className="relative mt-auto grid grid-cols-2 gap-3">
              <div className="bg-espresso-900 text-cream-50 rounded-2xl p-4 text-center"><div className="text-2xl font-display font-bold">2,400+</div><div className="text-[11px] uppercase tracking-wide mt-1 opacity-60">Active subs</div></div>
              <div className="bg-white border border-espresso-100 rounded-2xl p-4 text-center"><div className="text-2xl font-display font-bold">4.9/5</div><div className="text-[11px] uppercase tracking-wide mt-1 text-espresso-500">Subscription rating</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-premium">
          <h2 className="font-display text-[36px] text-center font-bold tracking-tight mb-12">Loved by daily drinkers</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Sofia R.", text: "The Ethiopia Yirgacheffe is unreal. Floral, clean, like nowhere else. Delivery is insanely fast.", rating: 5 },
              { name: "Marcus T.", text: "Finally an espresso that works both straight and in oat milk. Signature blend is my permanent subscription.", rating: 5 },
              { name: "Lena K.", text: "Packaging is premium, but the coffee inside is even better. Customer support answered my grind question in minutes.", rating: 5 },
            ].map((r,i) => (
              <div key={i} className="card-premium p-8">
                <div className="flex gap-1 mb-4">{Array.from({length:r.rating}).map((_,j)=><Star key={j} size={14} fill="#D4A017" stroke="#D4A017" />)}</div>
                <Quote size={20} className="text-espresso-200 mb-4" />
                <p className="text-[15px] leading-relaxed text-espresso-700">&quot;{r.text}&quot;</p>
                <div className="mt-6 flex items-center gap-3"><div className="w-9 h-9 rounded-full bg-espresso-100 flex items-center justify-center font-display font-bold text-xs">{r.name[0]}</div><div><div className="text-sm font-semibold">{r.name}</div><div className="text-xs text-espresso-500">Verified buyer • NYC</div></div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTAGRAM / GALLERY */}
      <section className="py-12 bg-cream-50">
        <div className="container-premium">
          <div className="flex justify-between items-center mb-8"><h3 className="font-display text-2xl font-semibold">@barbari.coffee</h3><a href="#" className="text-xs tracking-widest uppercase font-medium underline">Follow on Instagram</a></div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
            {[
              "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=400",
              "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=400",
              "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=400",
              "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=400",
              "https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=400",
              "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=400",
            ].map((src,i)=><div key={i} className="aspect-square rounded-2xl overflow-hidden relative group"><Image src={src} alt="instagram" fill className="object-cover group-hover:scale-110 transition-transform duration-700" /><div className="absolute inset-0 bg-espresso-900/0 group-hover:bg-espresso-900/20 transition-colors" /></div>)}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-20 bg-gold-400 relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-10" />
        <div className="container-premium relative text-center max-w-[640px]">
          <h2 className="font-display text-[32px] md:text-[40px] font-bold leading-tight tracking-tight text-espresso-900">Get 20% off + brew guides</h2>
          <p className="mt-4 text-espresso-800/70">Join our community. No spam — just roast dates, new arrivals, and brewing secrets.</p>
          <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-[480px] mx-auto">
            <input type="email" placeholder="Your email address" className="flex-1 h-12 rounded-full px-6 bg-white border border-espresso-900/10 text-sm focus:outline-none focus:ring-2 focus:ring-espresso-900" />
            <Button variant="primary" size="lg" className="sm:w-auto w-full">Subscribe</Button>
          </form>
          <p className="mt-4 text-[11px] tracking-wide uppercase text-espresso-800/50">By subscribing you agree to our privacy policy. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
}
