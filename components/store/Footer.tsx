import Link from "next/link";
import { Coffee, Instagram, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-espresso-950 text-cream-100 mt-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none" />
      <div className="container-premium relative py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-cream-50 text-espresso-900 flex items-center justify-center"><Coffee size={20} /></div>
              <span className="font-display text-2xl font-bold tracking-[0.15em]">BARBARI</span>
            </div>
            <p className="text-[14px] leading-relaxed text-cream-200/70 max-w-[32ch]">Exceptional specialty coffee, ethically sourced and freshly roasted in small batches in Brooklyn. Craft, traceability, and flavor above all.</p>
            <div className="flex gap-3 mt-6">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold-400 hover:text-espresso-900 flex items-center justify-center transition-colors"><Instagram size={16} /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold-400 hover:text-espresso-900 flex items-center justify-center transition-colors"><Mail size={16} /></a>
            </div>
          </div>
          <div>
            <h4 className="font-display text-[13px] tracking-widest uppercase mb-5 text-cream-50/90">Shop</h4>
            <ul className="space-y-3 text-[13px] text-cream-200/60">
              <li><Link className="hover:text-cream-50 transition-colors" href="/shop">All Coffee</Link></li>
              <li><Link className="hover:text-cream-50" href="/shop?cat=single-origin">Single Origin</Link></li>
              <li><Link className="hover:text-cream-50" href="/shop?cat=espresso">Espresso</Link></li>
              <li><Link className="hover:text-cream-50" href="/shop?cat=equipment">Equipment</Link></li>
              <li><Link className="hover:text-cream-50" href="/shop">Subscriptions</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-[13px] tracking-widest uppercase mb-5 text-cream-50/90">Learn</h4>
            <ul className="space-y-3 text-[13px] text-cream-200/60">
              <li><Link className="hover:text-cream-50" href="/about">Our Story</Link></li>
              <li><Link className="hover:text-cream-50" href="/blog">Brew Guides</Link></li>
              <li><Link className="hover:text-cream-50" href="/blog">Journal</Link></li>
              <li><Link className="hover:text-cream-50" href="#">Sourcing</Link></li>
              <li><Link className="hover:text-cream-50" href="#">Wholesale</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-[13px] tracking-widest uppercase mb-5 text-cream-50/90">Support</h4>
            <ul className="space-y-3 text-[13px] text-cream-200/60">
              <li className="flex gap-2 items-center"><MapPin size={14} /> Brooklyn, NY</li>
              <li className="flex gap-2 items-center"><Phone size={14} /> +1 (555) 010-2845</li>
              <li><Link className="hover:text-cream-50" href="/contact">Contact Us</Link></li>
              <li><Link className="hover:text-cream-50" href="#">Shipping & Returns</Link></li>
              <li><Link className="hover:text-cream-50" href="#">Privacy & Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-[11px] tracking-wide uppercase text-cream-200/40">
          <span>© {new Date().getFullYear()} BARBARI Coffee Co. All rights reserved. Crafted with obsession.</span>
          <span className="flex gap-6"><span>Visa</span><span>Mastercard</span><span>Apple Pay</span><span>ZarinPal</span></span>
        </div>
      </div>
    </footer>
  );
}
