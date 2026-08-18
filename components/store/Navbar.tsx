"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingBag, Heart, Search, User, Menu, X, Coffee } from "lucide-react";
import { useCart } from "@/lib/store/cart";
import { useWishlist } from "@/lib/store/wishlist";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import SearchModal from "./SearchModal";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/shop?cat=single-origin", label: "Beans" },
  { href: "/shop?cat=blends", label: "Ground" },
  { href: "/shop?cat=equipment", label: "Equipment" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const cartItems = useCart(s => s.items);
  const wishIds = useWishlist(s => s.ids);
  const openCart = useCart(s => s.open);

  const cartCount = cartItems.reduce((a,b)=>a+b.quantity,0);
  const wishlistCount = wishIds.length;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="w-full bg-espresso-950 text-cream-100 text-[11px] tracking-widest uppercase py-2 text-center font-medium">
        <span className="hidden md:inline">Free shipping over $50 • Freshly roasted daily • </span> 20% off your first order — WELCOME10
      </div>
      <header className={cn("sticky top-0 z-50 w-full border-b transition-all duration-500", scrolled ? "bg-white/80 backdrop-blur-xl border-espresso-100 shadow-soft" : "bg-cream-50 border-transparent")}>
        <div className="container-premium flex h-[76px] items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full bg-espresso-900 flex items-center justify-center text-cream-50 group-hover:bg-gold-400 group-hover:text-espresso-900 transition-colors duration-300">
              <Coffee size={18} />
            </div>
            <span className="font-display text-[22px] font-bold tracking-[0.12em] text-espresso-900">BARBARI</span>
            <span className="hidden lg:inline text-[10px] tracking-[0.2em] uppercase text-espresso-500 ml-1 border-l border-espresso-200 pl-3">Craft Roasters • Est. 2018</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(l => (
              <Link key={l.href} href={l.href} className="text-[13px] font-medium tracking-wide uppercase text-espresso-700 hover:text-espresso-900 link-underline">{l.label}</Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button onClick={()=>setSearchOpen(true)} className="hidden md:flex w-10 h-10 rounded-full hover:bg-espresso-100 items-center justify-center text-espresso-700 transition-colors"><Search size={18} /></button>
            <Link href="/account" className="hidden md:flex w-10 h-10 rounded-full hover:bg-espresso-100 items-center justify-center text-espresso-700 transition-colors"><User size={18} /></Link>
            <Link href="/account/wishlist" className="relative w-10 h-10 rounded-full hover:bg-espresso-100 flex items-center justify-center text-espresso-700 transition-colors">
              <Heart size={18} />
              {wishlistCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold-400 text-espresso-900 text-[10px] font-bold rounded-full flex items-center justify-center">{wishlistCount}</span>}
            </Link>
            <button onClick={openCart} className="relative w-10 h-10 rounded-full hover:bg-espresso-100 flex items-center justify-center text-espresso-700 transition-colors">
              <ShoppingBag size={18} />
              {cartCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-espresso-900 text-cream-50 text-[10px] font-bold rounded-full flex items-center justify-center">{cartCount}</span>}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden ml-2 w-10 h-10 rounded-full bg-espresso-900 text-cream-50 flex items-center justify-center">
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        <SearchModal open={searchOpen} onClose={()=>setSearchOpen(false)} />
        {/* Mobile */}
        {mobileOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-espresso-100 shadow-large animate-slide-up">
            <div className="p-6 flex flex-col gap-5">
              {navLinks.map(l => <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="text-[14px] font-medium tracking-wide uppercase text-espresso-900 py-2 border-b border-espresso-50 last:border-0">{l.label}</Link>)}
              <div className="flex gap-3 pt-4">
                <Link href="/account" className="flex-1"><Button variant="secondary" className="w-full">Account</Button></Link>
                <Link href="/shop" className="flex-1"><Button variant="primary" className="w-full">Shop Coffee</Button></Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
