"use client";
import { useWishlist } from "@/lib/store/wishlist";
import { products } from "@/data/products";
import ProductCard from "@/components/store/ProductCard";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function WishlistPage() {
  const { ids } = useWishlist();
  const list = products.filter(p=>ids.includes(p.id));
  if (list.length===0) return <div className="py-20 text-center"><p>Your wishlist is empty</p><Link href="/shop" className="inline-block mt-4"><Button>Discover Coffee</Button></Link></div>;
  return <div className="py-8"><h1 className="font-display text-2xl font-bold mb-6">Wishlist • {list.length}</h1><div className="grid md:grid-cols-3 gap-6">{list.map(p=><ProductCard key={p.id} product={p} />)}</div></div>;
}
