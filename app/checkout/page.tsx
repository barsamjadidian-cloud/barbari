"use client";
import { useState } from "react";
import { useCart } from "@/lib/store/cart";
import { Button } from "@/components/ui/Button";
import { formatPriceSimple } from "@/lib/utils";
import { toast } from "@/components/ui/Toaster";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, total, subtotal, discount, clear } = useCart();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ email:"", phone:"", firstName:"", lastName:"", street:"", city:"", postal:"", country:"US" });
  const [paymentMethod, setPaymentMethod] = useState<"zarinpal"|"card"|"apple">("zarinpal");
  const [processing, setProcessing] = useState(false);

  const handlePayment = async () => {
    setProcessing(true);
    try {
      const res = await fetch("/api/payments/create", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ amount: total(), email: form.email, phone: form.phone, method: paymentMethod, items })
      });
      const data = await res.json();
      if (data.success) {
        toast("Payment initiated — redirecting to gateway", "success");
        // In mock mode, we simulate success
        setTimeout(()=> {
          clear();
          window.location.href = `/checkout/success?order=BAR-${Date.now()}`;
        }, 1200);
      } else {
        toast(data.message || "Payment failed", "error");
      }
    } catch (e) {
      toast("Network error", "error");
    } finally {
      setProcessing(false);
    }
  };

  if (items.length===0) return <div className="container-premium py-20 text-center"><p>Cart empty</p><Link href="/shop"><Button className="mt-4">Shop</Button></Link></div>;

  return (
    <div className="bg-cream-50 min-h-screen py-10">
      <div className="container-premium grid lg:grid-cols-[1.3fr_0.7fr] gap-10 max-w-[1200px]">
        <div className="bg-white rounded-[24px] border border-espresso-100 p-8 shadow-soft">
          <div className="flex items-center gap-3 mb-8">
            {[1,2,3].map(i=>(
              <div key={i} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step>=i?"bg-espresso-900 text-white":"bg-cream-100 text-espresso-400"}`}>{i}</div>
                <span className={`text-xs uppercase tracking-wide ${step>=i?"text-espresso-900 font-medium":"text-espresso-400"}`}>{i===1?"Info":i===2?"Shipping":"Payment"}</span>
                {i<3 && <div className={`w-12 h-[2px] ${step>i?"bg-espresso-900":"bg-cream-200"}`} />}
              </div>
            ))}
          </div>

          {step===1 && (
            <div className="space-y-6">
              <h2 className="font-display text-xl font-semibold">Customer Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <input placeholder="First Name" value={form.firstName} onChange={e=>setForm({...form,firstName:e.target.value})} className="h-11 px-4 rounded-full border border-espresso-200 text-sm" />
                <input placeholder="Last Name" value={form.lastName} onChange={e=>setForm({...form,lastName:e.target.value})} className="h-11 px-4 rounded-full border border-espresso-200 text-sm" />
                <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="h-11 px-4 rounded-full border border-espresso-200 text-sm md:col-span-2" />
                <input placeholder="Phone (+1...)" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="h-11 px-4 rounded-full border border-espresso-200 text-sm md:col-span-2" />
              </div>
              <h3 className="font-semibold pt-4">Shipping Address</h3>
              <div className="grid gap-4">
                <input placeholder="Street Address" value={form.street} onChange={e=>setForm({...form,street:e.target.value})} className="h-11 px-4 rounded-full border border-espresso-200 text-sm" />
                <div className="grid md:grid-cols-3 gap-4">
                  <input placeholder="City" value={form.city} onChange={e=>setForm({...form,city:e.target.value})} className="h-11 px-4 rounded-full border border-espresso-200 text-sm" />
                  <input placeholder="Postal Code" value={form.postal} onChange={e=>setForm({...form,postal:e.target.value})} className="h-11 px-4 rounded-full border border-espresso-200 text-sm" />
                  <input placeholder="Country" value={form.country} onChange={e=>setForm({...form,country:e.target.value})} className="h-11 px-4 rounded-full border border-espresso-200 text-sm" />
                </div>
              </div>
              <Button onClick={()=>setStep(2)} className="w-full mt-4" size="lg">Continue to Shipping</Button>
            </div>
          )}

          {step===2 && (
            <div className="space-y-6">
              <h2 className="font-display text-xl font-semibold">Shipping Method</h2>
              <div className="space-y-3">
                {[
                  { id:"standard", name:"Standard (2-4 days)", price:0, desc:"Free over $50" },
                  { id:"express", name:"Express NYC (24h)", price:12, desc:"Brooklyn & Manhattan" },
                  { id:"priority", name:"Priority (1-2 days)", price:18, desc:"US nationwide" },
                ].map(m=>(
                  <div key={m.id} className="flex items-center justify-between p-4 rounded-2xl border border-espresso-200 hover:border-espresso-900 cursor-pointer"><div><div className="font-medium text-sm">{m.name}</div><div className="text-xs text-espresso-500">{m.desc}</div></div><div className="font-semibold text-sm">{m.price===0?"Free":formatPriceSimple(m.price)}</div></div>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <Button variant="secondary" onClick={()=>setStep(1)}>Back</Button>
                <Button onClick={()=>setStep(3)} className="flex-1">Continue to Payment</Button>
              </div>
            </div>
          )}

          {step===3 && (
            <div className="space-y-6">
              <h2 className="font-display text-xl font-semibold">Payment Method</h2>
              <div className="grid gap-3">
                <button onClick={()=>setPaymentMethod("zarinpal")} className={`p-4 rounded-2xl border text-left flex justify-between ${paymentMethod==="zarinpal"?"border-espresso-900 bg-cream-50":"border-espresso-200"}`}><div><div className="font-medium">ZarinPal (Recommended for IR)</div><div className="text-xs text-espresso-500">Secure gateway, cards & Shaba</div></div><div className="text-xs bg-gold-400 px-2 py-1 rounded-full font-bold">Popular</div></button>
                <button onClick={()=>setPaymentMethod("card")} className={`p-4 rounded-2xl border text-left ${paymentMethod==="card"?"border-espresso-900 bg-cream-50":"border-espresso-200"}`}><div className="font-medium">Credit Card • Stripe</div><div className="text-xs text-espresso-500">Visa, Mastercard, Amex</div></button>
                <button onClick={()=>setPaymentMethod("apple")} className={`p-4 rounded-2xl border text-left ${paymentMethod==="apple"?"border-espresso-900 bg-cream-50":"border-espresso-200"}`}><div className="font-medium">Apple Pay</div><div className="text-xs text-espresso-500">Fast checkout</div></button>
              </div>
              <div className="rounded-2xl bg-cream-100 p-4 text-xs text-espresso-600">🔒 Encrypted payment. No secrets exposed in frontend — all handled via /api/payments/* with env keys.</div>
              <div className="flex gap-3">
                <Button variant="secondary" onClick={()=>setStep(2)}>Back</Button>
                <Button onClick={handlePayment} disabled={processing} className="flex-1" size="lg">{processing ? "Processing..." : `Pay ${formatPriceSimple(total())}`}</Button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-[24px] border border-espresso-100 p-6 h-fit">
          <h3 className="font-semibold mb-4">Order Summary • {items.length} items</h3>
          <div className="space-y-3 max-h-[300px] overflow-auto pr-2">
            {items.map(i=><div key={i.id} className="flex gap-3 text-sm"><div className="flex-1">{i.name} × {i.quantity}</div><div className="font-medium">{formatPriceSimple(i.price*i.quantity)}</div></div>)}
          </div>
          <div className="border-t border-espresso-100 mt-4 pt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-espresso-500">Subtotal</span><span>{formatPriceSimple(subtotal())}</span></div>
            {discount()>0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-{formatPriceSimple(discount())}</span></div>}
            <div className="flex justify-between font-bold text-base pt-2"><span>Total</span><span>{formatPriceSimple(total())}</span></div>
          </div>
          <div className="mt-6 text-[11px] text-espresso-500 text-center">By placing order you agree to Terms & Privacy. Need help? WhatsApp us.</div>
        </div>
      </div>
    </div>
  );
}
