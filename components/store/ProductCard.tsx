"use client";
import Link from "next/link";
import Image from "next/image";
import { Heart, Star, ShoppingBag, Eye } from "lucide-react";
import { Product } from "@/data/products";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/store/cart";
import { useWishlist } from "@/lib/store/wishlist";
import { toast } from "@/components/ui/Toaster";
import { formatPriceSimple } from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCart(s => s.addItem);
  const wishlist = useWishlist();
  const isWishlisted = wishlist.has(product.id);
  const defaultVariant = product.variants.find(v => v.isDefault) || product.variants[0];

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: `${product.id}-${defaultVariant.id}`,
      productId: product.id,
      variantId: defaultVariant.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      price: defaultVariant.price,
      compareAt: defaultVariant.compareAt,
      weight: defaultVariant.weight,
      grind: defaultVariant.grind,
      quantity: 1,
      stock: defaultVariant.stock,
    });
    toast(`${product.name} added to cart`, "success");
  };

  return (
    <div className="group card-premium flex flex-col h-full">
      <Link href={`/product/${product.slug}`} className="relative aspect-[4/5] overflow-hidden bg-cream-100">
        <Image src={product.images[0]} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 33vw" />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && <Badge variant="new">New</Badge>}
          {defaultVariant.compareAt && <Badge variant="sale">Sale</Badge>}
          {product.isBestseller && <Badge variant="gold">Bestseller</Badge>}
        </div>
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button onClick={(e) => { e.preventDefault(); wishlist.toggle(product.id); toast(isWishlisted ? "Removed from wishlist" : "Added to wishlist", "info"); }} className={`w-9 h-9 rounded-full bg-white shadow-soft flex items-center justify-center transition-colors ${isWishlisted ? "text-red-500" : "text-espresso-400 hover:text-espresso-900"}`}><Heart size={16} fill={isWishlisted ? "currentColor" : "none"} /></button>
          <Link href={`/product/${product.slug}`} className="w-9 h-9 rounded-full bg-white shadow-soft flex items-center justify-center text-espresso-400 hover:text-espresso-900 transition-colors"><Eye size={16} /></Link>
        </div>
        {defaultVariant.stock < 10 && defaultVariant.stock > 0 && <div className="absolute bottom-3 left-3 right-3 bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-medium px-3 py-1.5 rounded-full text-center">Only {defaultVariant.stock} left — roast fresh weekly</div>}
        {defaultVariant.stock === 0 && <div className="absolute inset-0 bg-cream-50/80 backdrop-blur-sm flex items-center justify-center"><span className="bg-espresso-900 text-cream-50 px-4 py-2 rounded-full text-xs uppercase tracking-wide">Sold Out</span></div>}
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <Link href={`/product/${product.slug}`}><h3 className="font-display text-[17px] leading-tight font-semibold text-espresso-900 group-hover:text-espresso-700 transition-colors line-clamp-2">{product.name}</h3></Link>
            <p className="text-[12px] text-espresso-500 mt-1 line-clamp-1">{product.shortDescription}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star size={12} fill="#D4A017" stroke="#D4A017" />
            <span className="text-[12px] font-medium text-espresso-900">{product.rating}</span>
          </div>
          <span className="text-[11px] text-espresso-400">({product.reviews} reviews)</span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-espresso-100 text-espresso-600 ml-auto">{product.roastLevel}</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.flavorNotes.slice(0,3).map(f => <span key={f} className="text-[10px] tracking-wide uppercase px-2 py-1 rounded-full bg-cream-100 text-espresso-600 border border-espresso-100">{f}</span>)}
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-[18px] font-semibold text-espresso-900">{formatPriceSimple(defaultVariant.price)}</span>
              {defaultVariant.compareAt && <span className="text-[13px] line-through text-espresso-400">{formatPriceSimple(defaultVariant.compareAt)}</span>}
            </div>
            <span className="text-[11px] text-espresso-500">{defaultVariant.weight}g • {defaultVariant.grind}</span>
          </div>
          <Button onClick={handleAdd} size="icon" variant="primary" disabled={defaultVariant.stock===0}><ShoppingBag size={16} /></Button>
        </div>
      </div>
    </div>
  );
}
