"use client";
import { useCart } from "@/lib/store/cart";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatPriceSimple } from "@/lib/utils";

export default function CartPage() {
  const { items, updateQty, removeItem, subtotal, discount, total, coupon } = useCart();
  if (items.length === 0) {
    return (
      <div className="container-premium py-20 text-center">
        <ShoppingBag size={48} className="mx-auto text-espresso-200 mb-6" />
        <h1 className="font-display text-3xl font-bold">Your cart is empty</h1>
        <p className="text-espresso-600 mt-3">Add some exceptional coffee.</p>
        <Link href="/shop" className="inline-block mt-8"><Button>Shop Coffee</Button></Link>
      </div>
    );
  }
  return (
    <div className="container-premium py-10 grid lg:grid-cols-[1fr_380px] gap-10">
      <div>
        <h1 className="font-display text-[32px] font-bold mb-6">Cart ({items.length})</h1>
        <div className="space-y-4">
          {items.map(item=>(
            <div key={item.id} className="flex gap-5 p-5 bg-white border border-espresso-100 rounded-[24px] shadow-soft">
              <div className="relative w-28 h-28 rounded-xl overflow-hidden bg-cream-100"><Image src={item.image} alt={item.name} fill className="object-cover" /></div>
              <div className="flex-1">
                <Link href={`/product/${item.slug}`} className="font-medium hover:underline">{item.name}</Link>
                <div className="text-xs text-espresso-500 mt-1">{item.weight}g • {item.grind} • {formatPriceSimple(item.price)} each</div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2 bg-cream-50 rounded-full p-1 border border-espresso-100">
                    <button onClick={()=>updateQty(item.id, item.quantity-1)} className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center"><Minus size={14} /></button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button onClick={()=>updateQty(item.id, item.quantity+1)} className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center"><Plus size={14} /></button>
                  </div>
                  <div className="flex items-center gap-4"><span className="font-semibold">{formatPriceSimple(item.price*item.quantity)}</span><button onClick={()=>removeItem(item.id)} className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center"><X size={14} /></button></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white border border-espresso-100 rounded-[24px] p-6 h-fit sticky top-[100px] shadow-soft">
        <h2 className="font-semibold mb-5">Order Summary</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between"><span className="text-espresso-500">Subtotal</span><span className="font-medium">{formatPriceSimple(subtotal())}</span></div>
          {coupon && <div className="flex justify-between text-green-600"><span>Discount ({coupon.code})</span><span>-{formatPriceSimple(discount())}</span></div>}
          <div className="flex justify-between"><span className="text-espresso-500">Shipping</span><span className="font-medium">{subtotal()>50?"Free":formatPriceSimple(6)}</span></div>
          <div className="border-t border-espresso-100 pt-3 flex justify-between text-base font-bold"><span>Total</span><span>{formatPriceSimple(total())}</span></div>
        </div>
        <Link href="/checkout" className="block mt-6"><Button className="w-full justify-between" size="lg">Checkout <ArrowRight size={16} /></Button></Link>
        <p className="text-[11px] text-center text-espresso-500 mt-3">Secure checkout • ZarinPal / Cards / Apple Pay</p>
      </div>
    </div>
  );
}
