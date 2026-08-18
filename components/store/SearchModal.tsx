"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";

export default function SearchModal({ open, onClose }: { open:boolean; onClose:()=>void }) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=> {
    if (!q) { setResults([]); return; }
    const id = setTimeout(async ()=> {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        const data = await res.json();
        setResults(data.results || []);
      } catch {}
      setLoading(false);
    }, 300);
    return ()=> clearTimeout(id);
  }, [q]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center pt-[10vh]">
      <div className="absolute inset-0 bg-espresso-950/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-[640px] mx-4 bg-white rounded-[24px] shadow-large border border-espresso-100 overflow-hidden">
        <div className="flex items-center gap-3 p-4 border-b border-espresso-100">
          <Search size={18} className="text-espresso-400" />
          <input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Search coffees, origins, flavors..." className="flex-1 h-10 text-sm outline-none" />
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-cream-100 flex items-center justify-center"><X size={14} /></button>
        </div>
        <div className="max-h-[420px] overflow-auto p-3">
          {loading && <div className="p-6 text-center text-sm text-espresso-500">Searching...</div>}
          {!loading && q && results.length===0 && <div className="p-6 text-center"><p className="text-sm">No results for &quot;{q}&quot;</p><p className="text-xs text-espresso-500 mt-2">Try Ethiopia, Caramel, Espresso...</p></div>}
          {!loading && results.map(r=>(
            <Link key={r.slug} href={`/product/${r.slug}`} onClick={onClose} className="flex gap-4 p-3 rounded-2xl hover:bg-cream-50 transition-colors">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-cream-100"><Image src={r.image} alt={r.name} fill className="object-cover" /></div>
              <div className="flex-1"><div className="text-sm font-medium">{r.name}</div><div className="text-xs text-espresso-500">{r.category} • ${r.price}</div></div>
            </Link>
          ))}
          {!q && <div className="p-6 text-xs text-espresso-500"><div className="uppercase tracking-wide font-semibold mb-3">Popular searches</div><div className="flex flex-wrap gap-2"><span className="px-3 py-1 rounded-full bg-cream-100">Ethiopia</span><span className="px-3 py-1 rounded-full bg-cream-100">Espresso</span><span className="px-3 py-1 rounded-full bg-cream-100">Chocolate</span></div></div>}
        </div>
      </div>
    </div>
  );
}
