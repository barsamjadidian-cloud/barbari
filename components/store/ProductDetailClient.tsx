"use client";
import { useState } from "react";
import Image from "next/image";
import { Star, Minus, Plus, Heart, Truck, Shield, RotateCcw, Coffee } from "lucide-react";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useCart } from "@/lib/store/cart";
import { useWishlist } from "@/lib/store/wishlist";
import { toast } from "@/components/ui/Toaster";
import { formatPriceSimple } from "@/lib/utils";

export default function ProductDetailClient({ product }: { product: Product }) {
  const [selectedWeight, setSelectedWeight] = useState<number>(product.weightOptions[0]);
  const [selectedGrind, setSelectedGrind] = useState<string>(product.grindOptions[0]);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [tab, setTab] = useState<"details"|"brew"|"shipping"|"reviews">("details");

  const wishlist = useWishlist();
  const addItem = useCart(s=>s.addItem);

  const variant = product.variants.find(v=>v.weight===selectedWeight && v.grind===selectedGrind) || product.variants[0];

  const handleAdd = () => {
    addItem({
      id: `${product.id}-${variant.id}`,
      productId: product.id,
      variantId: variant.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      price: variant.price,
      compareAt: variant.compareAt,
      weight: variant.weight,
      grind: variant.grind,
      quantity: qty,
      stock: variant.stock,
    });
    toast(`Added ${qty} × ${product.name} to cart`, "success");
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
      {/* Gallery */}
      <div className="space-y-4">
        <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden bg-cream-100 border border-espresso-100">
          <Image src={product.images[activeImg]} alt={product.name} fill className="object-cover" priority />
          <div className="absolute top-5 left-5 flex gap-2">
            {product.isNew && <Badge variant="new">New Roast</Badge>}
            {variant.compareAt && <Badge variant="sale">{Math.round((1-variant.price/variant.compareAt!)*100)}% Off</Badge>}
          </div>
        </div>
        <div className="flex gap-3">
          {product.images.map((img,i)=>(
            <button key={i} onClick={()=>setActiveImg(i)} className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 ${activeImg===i?"border-espresso-900":"border-transparent opacity-70 hover:opacity-100"}`}>
              <Image src={img} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3 text-center text-[11px] uppercase tracking-wide">
          <div className="bg-cream-50 border border-espresso-100 rounded-2xl p-3"><Coffee size={16} className="mx-auto mb-1" /> Roast: {product.roastLevel}</div>
          <div className="bg-cream-50 border border-espresso-100 rounded-2xl p-3"><Star size={16} className="mx-auto mb-1" /> {product.rating} ({product.reviews})</div>
          <div className="bg-cream-50 border border-espresso-100 rounded-2xl p-3"><Truck size={16} className="mx-auto mb-1" /> Ships in 2h</div>
        </div>
      </div>

      {/* Details */}
      <div>
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-espresso-500"><span>{product.category}</span><span>•</span><span>{product.origin}</span></div>
        <h1 className="font-display text-[32px] md:text-[40px] leading-[0.95] font-bold mt-3">{product.name}</h1>
        <div className="flex items-center gap-3 mt-4">
          <div className="flex gap-1">{Array.from({length:5}).map((_,i)=><Star key={i} size={14} fill={i < Math.round(product.rating) ? "#D4A017" : "none"} stroke="#D4A017" />)}</div>
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-sm text-espresso-500">• {product.reviews} reviews</span>
          <span className={`ml-2 text-[11px] px-2 py-1 rounded-full ${variant.stock>10?"bg-green-50 text-green-700 border border-green-200":"bg-amber-50 text-amber-800 border border-amber-200"}`}>{variant.stock>10?"In Stock":`Only ${variant.stock} left`}</span>
        </div>

        <div className="mt-6 flex items-baseline gap-3">
          <span className="font-display text-[32px] font-bold">{formatPriceSimple(variant.price)}</span>
          {variant.compareAt && <span className="line-through text-espresso-400">{formatPriceSimple(variant.compareAt)}</span>}
          <span className="text-sm text-espresso-500">/ {variant.weight}g</span>
        </div>

        <p className="mt-6 text-[15px] leading-relaxed text-espresso-700">{product.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {product.flavorNotes.map(f=><span key={f} className="px-3 py-1 rounded-full bg-cream-100 border border-espresso-100 text-[11px] uppercase tracking-wide">{f}</span>)}
        </div>

        <div className="mt-8 space-y-6 bg-cream-50 border border-espresso-100 rounded-[24px] p-6">
          <div>
            <label className="text-[11px] uppercase tracking-widest font-semibold">Weight</label>
            <div className="flex gap-2 mt-3">
              {product.weightOptions.map(w=>(
                <button key={w} onClick={()=>setSelectedWeight(w)} className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all ${selectedWeight===w?"bg-espresso-900 text-cream-50 border-espresso-900":"bg-white border-espresso-200 hover:border-espresso-300"}`}>{w===0?"Bundle":`${w}g`}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-widest font-semibold">Grind</label>
            <div className="flex flex-wrap gap-2 mt-3">
              {product.grindOptions.map(g=>(
                <button key={g} onClick={()=>setSelectedGrind(g)} className={`px-4 py-2 rounded-full text-xs font-medium border ${selectedGrind===g?"bg-espresso-900 text-cream-50 border-espresso-900":"bg-white border-espresso-200"}`}>{g}</button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white rounded-full border border-espresso-200 p-1">
              <button onClick={()=>setQty(Math.max(1,qty-1))} className="w-8 h-8 rounded-full hover:bg-cream-100 flex items-center justify-center"><Minus size={14} /></button>
              <span className="w-10 text-center font-medium">{qty}</span>
              <button onClick={()=>setQty(Math.min(variant.stock,qty+1))} className="w-8 h-8 rounded-full hover:bg-cream-100 flex items-center justify-center"><Plus size={14} /></button>
            </div>
            <span className="text-xs text-espresso-500">{variant.stock} available • SKU: {variant.sku}</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-[1fr_auto] gap-3">
          <Button size="lg" variant="primary" onClick={handleAdd} disabled={variant.stock===0} className="w-full">Add to Cart — {formatPriceSimple(variant.price*qty)}</Button>
          <Button size="lg" variant="secondary" onClick={()=>{wishlist.toggle(product.id); toast(wishlist.has(product.id)?"Removed from wishlist":"Added to wishlist");}}><Heart size={18} fill={wishlist.has(product.id)?"currentColor":"none"} /></Button>
        </div>
        <Button size="lg" variant="gold" className="w-full mt-3">Buy Now — Fast Checkout</Button>

        <div className="mt-6 grid grid-cols-3 gap-3 text-[11px] text-center">
          <div className="flex flex-col items-center gap-1 py-3 rounded-2xl bg-white border border-espresso-100"><Truck size={16} /> Free ship over $50</div>
          <div className="flex flex-col items-center gap-1 py-3 rounded-2xl bg-white border border-espresso-100"><RotateCcw size={16} /> 30-day returns</div>
          <div className="flex flex-col items-center gap-1 py-3 rounded-2xl bg-white border border-espresso-100"><Shield size={16} /> Secure checkout</div>
        </div>

        {/* Tabs */}
        <div className="mt-10 border-t border-espresso-100">
          <div className="flex gap-6 border-b border-espresso-100 -mb-px overflow-x-auto">
            {["details","brew","shipping","reviews"].map(t=>(
              <button key={t} onClick={()=>setTab(t as any)} className={`py-4 text-[12px] uppercase tracking-widest font-medium border-b-2 whitespace-nowrap ${tab===t?"border-espresso-900 text-espresso-900":"border-transparent text-espresso-400 hover:text-espresso-700"}`}>{t}</button>
            ))}
          </div>
          <div className="py-6 text-sm leading-relaxed text-espresso-700">
            {tab==="details" && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div><span className="text-espresso-400 text-xs uppercase">Origin</span><div className="font-medium">{product.origin}</div></div>
                  <div><span className="text-espresso-400 text-xs uppercase">Roast</span><div className="font-medium">{product.roastLevel}</div></div>
                  <div><span className="text-espresso-400 text-xs uppercase">Processing</span><div className="font-medium">{product.processing}</div></div>
                  <div><span className="text-espresso-400 text-xs uppercase">Bean Type</span><div className="font-medium">{product.beanType}</div></div>
                </div>
                <p>Traceable, ethically sourced. Light roast preserves origin clarity. Best within 30 days of roast date printed on bag.</p>
              </div>
            )}
            {tab==="brew" && (
              <div className="space-y-4">
                {product.brewing?.map(b=>(
                  <div key={b.method} className="flex justify-between bg-cream-50 rounded-xl p-4">
                    <div><div className="font-semibold">{b.method}</div><div className="text-xs text-espresso-500">Ratio {b.ratio} • Temp {b.temp}</div></div>
                    <div className="font-mono text-sm">{b.time}</div>
                  </div>
                ))}
              </div>
            )}
            {tab==="shipping" && <p>Roasted daily Mon-Sat. Orders before 2pm EST ship same day. Free standard over $50 (2-4 days). Express 24h available in NYC. International coming soon.</p>}
            {tab==="reviews" && <div className="space-y-4"><div className="flex items-center gap-4"><div className="text-4xl font-display font-bold">{product.rating}</div><div><div className="flex gap-1">{Array.from({length:5}).map((_,i)=><Star key={i} size={14} fill="#D4A017" stroke="#D4A017" />)}</div><div className="text-xs text-espresso-500 mt-1">Based on {product.reviews} verified purchases</div></div></div><div className="bg-cream-50 rounded-xl p-4 text-sm italic">&quot;Bright, clean, exactly as described. Will reorder.&quot; — Alex P., verified buyer</div></div>}
          </div>
        </div>
      </div>
    </div>
  );
}
