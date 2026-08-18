"use client";
import { useState } from "react";
import { products } from "@/data/products";
import { formatPriceSimple } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Package, DollarSign, Users, TrendingUp, AlertTriangle } from "lucide-react";

export default function AdminPage() {
  const [tab, setTab] = useState<"analytics"|"products"|"orders">("analytics");
  return (
    <div className="min-h-screen bg-cream-50">
      <div className="bg-espresso-950 text-cream-50 py-4">
        <div className="container-premium flex justify-between items-center"><span className="font-display font-bold tracking-widest">BARBARI ADMIN</span><span className="text-xs bg-white/10 px-3 py-1 rounded-full">admin@barbari.coffee</span></div>
      </div>
      <div className="container-premium py-8 grid lg:grid-cols-[220px_1fr] gap-8">
        <aside className="space-y-2">
          {[
            { id:"analytics", label:"Analytics", icon:TrendingUp },
            { id:"products", label:"Products", icon:Package },
            { id:"orders", label:"Orders", icon:DollarSign },
            { id:"customers", label:"Customers", icon:Users },
          ].map(i=>(
            <button key={i.id} onClick={()=>setTab(i.id as any)} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-full text-sm text-left ${tab===i.id?"bg-espresso-900 text-cream-50":"hover:bg-white border border-transparent hover:border-espresso-100"}`}><i.icon size={16}/>{i.label}</button>
          ))}
        </aside>
        <div>
          {tab==="analytics" && (
            <div className="space-y-6">
              <h1 className="font-display text-2xl font-bold">Dashboard</h1>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { label:"Total Sales", value:"$42,580", change:"+12%" },
                  { label:"Orders", value:"1,284", change:"+8%" },
                  { label:"Customers", value:"3,421", change:"+15%" },
                  { label:"Low Stock", value:"05", change:"Alert", icon:AlertTriangle },
                ].map(c=>(
                  <div key={c.label} className="bg-white border border-espresso-100 rounded-2xl p-5 shadow-soft"><div className="text-xs uppercase tracking-wide text-espresso-500">{c.label}</div><div className="text-2xl font-bold mt-2 flex items-center gap-2">{c.value} {c.icon && <AlertTriangle size={16} className="text-amber-500" />}</div><div className="text-xs mt-2 text-green-600">{c.change}</div></div>
                ))}
              </div>
              <div className="bg-white border border-espresso-100 rounded-[24px] p-6">
                <h3 className="font-semibold mb-4">Best Selling Products</h3>
                <div className="space-y-3">
                  {products.slice(0,5).map(p=>(
                    <div key={p.id} className="flex items-center justify-between"><span className="text-sm">{p.name}</span><span className="text-sm font-medium">{p.reviews} sold • {formatPriceSimple(p.price)}</span></div>
                  ))}
                </div>
              </div>
              <div className="bg-white border border-espresso-100 rounded-[24px] p-6">
                <h3 className="font-semibold mb-2">Revenue Chart (Mock)</h3>
                <div className="h-[200px] flex items-end gap-2">
                  {[40,65,45,80,60,90,70,85].map((h,i)=><div key={i} className="flex-1 bg-espresso-900 rounded-t-lg" style={{height:`${h}%`}} />)}
                </div>
                <div className="flex justify-between text-[11px] text-espresso-500 mt-2"><span>Mon</span><span>Sun</span></div>
              </div>
            </div>
          )}
          {tab==="products" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center"><h1 className="font-display text-2xl font-bold">Products</h1><Button size="sm">+ Add Product</Button></div>
              <div className="bg-white border border-espresso-100 rounded-[24px] overflow-hidden">
                <div className="grid grid-cols-12 gap-4 p-4 text-[11px] uppercase tracking-wide text-espresso-500 border-b border-espresso-100"><span className="col-span-5">Product</span><span className="col-span-2">Price</span><span className="col-span-2">Stock</span><span className="col-span-3">Actions</span></div>
                {products.map(p=>(
                  <div key={p.id} className="grid grid-cols-12 gap-4 p-4 items-center border-b border-espresso-50 last:border-0">
                    <span className="col-span-5 text-sm font-medium truncate">{p.name}</span><span className="col-span-2 text-sm">{formatPriceSimple(p.price)}</span><span className="col-span-2 text-sm">{p.stock}</span><span className="col-span-3 flex gap-2"><Button size="sm" variant="secondary" className="h-7 text-xs">Edit</Button><Button size="sm" variant="ghost" className="h-7 text-xs text-red-500">Delete</Button></span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab==="orders" && (
            <div className="space-y-4">
              <h1 className="font-display text-2xl font-bold">Orders</h1>
              <div className="bg-white border border-espresso-100 rounded-[24px] overflow-hidden">
                {["BAR-1042 • $78 • Paid • Shipped • Sofia R.", "BAR-1041 • $42 • Paid • Roasting • Marcus T.", "BAR-1040 • $26 • Pending • Payment • Lena K."].map(o=>(
                  <div key={o} className="p-4 border-b border-espresso-50 flex justify-between text-sm"><span>{o}</span><Button size="sm" variant="secondary" className="h-7">Update Status</Button></div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
