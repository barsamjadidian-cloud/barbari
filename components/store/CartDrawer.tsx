"use client";
import { useCart } from "@/lib/store/cart";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatPriceSimple } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { toast } from "@/components/ui/Toaster";

export default function CartDrawer() {
  const { items, isOpen, close, updateQty, removeItem, subtotal, discount, total, coupon, applyCoupon, removeCoupon } = useCart();
  const [code, setCode] = useState("");
  const count = items.reduce((a,b)=>a+b.quantity,0);

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-espresso-950/40 backdrop-blur-sm z-[60]" onClick={close} />}
      <div className={`fixed top-0 right-0 h-full w-full max-w-[440px] bg-cream-50 z-[70] shadow-large border-l border-espresso-100 flex flex-col transition-transform duration-500 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between p-6 border-b border-espresso-100">
          <h2 className="font-display text-xl font-semibold flex items-center gap-2"><ShoppingBag size={20} /> Cart ({count})</h2>
          <button onClick={close} className="w-9 h-9 rounded-full bg-white border border-espresso-100 flex items-center justify-center hover:bg-espresso-50"><X size={16} /></button>
        </div>

        {items.length===0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
            <div className="w-20 h-20 rounded-full bg-cream-100 flex items-center justify-center mb-5"><ShoppingBag className="text-espresso-300" size={32} /></div>
            <h3 className="font-display text-lg font-semibold mb-2">Your cart is empty</h3>
            <p className="text-sm text-espresso-500 mb-6">Add some exceptional coffee to get started.</p>
            <Link href="/shop" onClick={close}><Button variant="primary">Shop Coffee</Button></Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.map(item=>(
                <div key={item.id} className="flex gap-4 p-3 rounded-2xl bg-white border border-espresso-100 shadow-soft">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-cream-100 flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${item.slug}`} onClick={close} className="font-medium text-sm line-clamp-2 leading-tight hover:underline">{item.name}</Link>
                    <p className="text-xs text-espresso-500 mt-1">{item.weight}g • {item.grind}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 bg-cream-100 rounded-full p-1">
                        <button onClick={()=>updateQty(item.id, item.quantity-1)} className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-espresso-50"><Minus size={12} /></button>
                        <span className="text-xs w-6 text-center font-medium">{item.quantity}</span>
                        <button onClick={()=>updateQty(item.id, item.quantity+1)} className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-espresso-50"><Plus size={12} /></button>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">{formatPriceSimple(item.price*item.quantity)}</div>
                        <button onClick={()=>removeItem(item.id)} className="text-[11px] text-red-500 hover:underline">Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="rounded-2xl bg-white border border-espresso-100 p-4">
                <label className="text-xs uppercase tracking-wide font-medium text-espresso-700">Discount code</label>
                {coupon ? (
                  <div className="mt-2 flex items-center justify-between bg-gold-100 border border-gold-200 rounded-full px-4 py-2">
                    <span className="text-sm font-medium">{coupon.code} — {coupon.type==="percent"? `${coupon.discount}%` : `$${coupon.discount}`} off</span>
                    <button onClick={removeCoupon} className="text-xs text-espresso-900 underline">Remove</button>
                  </div>
                ) : (
                  <div className="mt-2 flex gap-2">
                    <input value={code} onChange={e=>setCode(e.target.value)} placeholder="WELCOME10" className="flex-1 h-10 rounded-full border border-espresso-200 px-4 text-sm focus:outline-none focus:border-gold-400" />
                    <Button variant="secondary" size="sm" onClick={()=>{ if(applyCoupon(code)) { toast(`Coupon ${code.toUpperCase()} applied`,"success"); setCode(""); } else toast("Invalid coupon","error"); }}>Apply</Button>
                  </div>
                )}
                <p className="text-[11px] text-espresso-500 mt-2">Try WELCOME10, BARBARI20, SAVE5</p>
              </div>
            </div>

            <div className="p-6 border-t border-espresso-100 bg-white space-y-3">
              <div className="flex justify-between text-sm"><span className="text-espresso-500">Subtotal</span><span className="font-medium">{formatPriceSimple(subtotal())}</span></div>
              {discount()>0 && <div className="flex justify-between text-sm text-green-600"><span>Discount</span><span>-{formatPriceSimple(discount())}</span></div>}
              <div className="flex justify-between text-sm"><span className="text-espresso-500">Shipping</span><span className="font-medium">{subtotal()>50 ? "Free" : "$6.00"}</span></div>
              <div className="flex justify-between text-base font-semibold pt-3 border-t border-espresso-100"><span>Total</span><span>{formatPriceSimple(total())}</span></div>
              <Link href="/checkout" onClick={close} className="block"><Button variant="primary" className="w-full justify-between">Proceed to Checkout <ArrowRight size={16} /></Button></Link>
              <button onClick={close} className="w-full text-center text-xs uppercase tracking-wide text-espresso-600 hover:text-espresso-900 py-2">Continue Shopping</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
