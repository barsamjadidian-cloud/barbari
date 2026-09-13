"use client";
import { MessageCircle } from "lucide-react";
export default function WhatsAppButton() {
  return (
    <a href="https://wa.me/15550102845?text=Hi%20BARBARI%20team!" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-[#25D366] text-white shadow-large flex items-center justify-center hover:scale-110 transition-transform" aria-label="WhatsApp support">
      <MessageCircle size={22} fill="white" />
    </a>
  );
}
