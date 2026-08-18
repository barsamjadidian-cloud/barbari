"use client";
import { useEffect, useState } from "react";
type Toast = { id: number; message: string; type?: "success"|"error"|"info" };
let listeners: ((t: Toast[])=>void)[] = [];
let toasts: Toast[] = [];
let idCounter = 0;
export function toast(message: string, type: Toast["type"]="info") {
  const id = ++idCounter;
  toasts = [...toasts, { id, message, type }];
  listeners.forEach(l => l(toasts));
  setTimeout(()=> {
    toasts = toasts.filter(t=>t.id!==id);
    listeners.forEach(l=>l(toasts));
  }, 3000);
}
export function Toaster() {
  const [items, setItems] = useState<Toast[]>([]);
  useEffect(()=>{
    listeners.push(setItems);
    return ()=> { listeners = listeners.filter(l=>l!==setItems); };
  },[]);
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
      {items.map(t=>(
        <div key={t.id} className={`px-5 py-3 rounded-2xl shadow-large text-sm font-medium backdrop-blur-xl border animate-slide-up ${t.type==="success"?"bg-espresso-900 text-cream-50 border-espresso-800": t.type==="error"?"bg-red-600 text-white border-red-700":"bg-white text-espresso-900 border-espresso-100"}`}>{t.message}</div>
      ))}
    </div>
  );
}
