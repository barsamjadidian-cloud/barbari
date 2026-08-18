"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { toast } from "@/components/ui/Toaster";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="container-premium py-16 grid md:grid-cols-2 gap-12 max-w-[1100px] mx-auto">
      <div>
        <h1 className="font-display text-[40px] font-bold leading-tight">Talk to our<br />roasters</h1>
        <p className="mt-4 text-espresso-600">Questions about grind, subscription, wholesale? Real humans reply within 2h.</p>
        <div className="mt-8 space-y-3 text-sm">
          <div>📍 147 Grand St, Brooklyn, NY 11249 — Roastery & Lab</div>
          <div>📞 +1 (555) 010-2845</div>
          <div>✉️ hello@barbari.coffee</div>
        </div>
      </div>
      <form onSubmit={e=>{e.preventDefault(); setSent(true); toast("Message sent — we’ll reply within 2h","success");}} className="bg-white border border-espresso-100 rounded-[24px] p-8 shadow-soft space-y-4">
        {sent ? <div className="py-10 text-center"><div className="text-2xl">☕️</div><p className="font-semibold mt-4">Message received!</p><p className="text-sm text-espresso-500">We’ll be in touch soon.</p></div> : <>
          <div className="grid md:grid-cols-2 gap-4">
            <input required placeholder="First Name" className="h-11 px-4 rounded-full border border-espresso-200 text-sm" />
            <input required placeholder="Last Name" className="h-11 px-4 rounded-full border border-espresso-200 text-sm" />
          </div>
          <input required type="email" placeholder="Email" className="h-11 px-4 rounded-full border border-espresso-200 text-sm w-full" />
          <input placeholder="Subject — e.g. Subscription help" className="h-11 px-4 rounded-full border border-espresso-200 text-sm w-full" />
          <textarea required placeholder="How can we help?" rows={5} className="w-full rounded-[20px] border border-espresso-200 p-4 text-sm" />
          <Button type="submit" size="lg" className="w-full">Send Message</Button>
          <p className="text-[11px] text-espresso-500 text-center">Protected by reCAPTCHA — Privacy • Terms</p>
        </>}
      </form>
    </div>
  );
}
