import Link from "next/link";
import { User, Package, Heart, MapPin, Settings, Coffee } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AccountPage() {
  return (
    <div className="container-premium py-10 grid lg:grid-cols-[260px_1fr] gap-8">
      <aside className="bg-white border border-espresso-100 rounded-[24px] p-5 h-fit space-y-2">
        <div className="flex items-center gap-3 p-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-espresso-900 text-cream-50 flex items-center justify-center font-bold">D</div>
          <div><div className="font-semibold text-sm">Demo User</div><div className="text-xs text-espresso-500">120 loyalty points</div></div>
        </div>
        {[
          { icon: User, label: "Profile", href: "/account" },
          { icon: Package, label: "Orders", href: "/account/orders" },
          { icon: MapPin, label: "Addresses", href: "/account/addresses" },
          { icon: Heart, label: "Wishlist", href: "/account/wishlist" },
          { icon: Coffee, label: "Subscriptions", href: "/account/subscriptions" },
          { icon: Settings, label: "Settings", href: "/account/settings" },
        ].map(item=>(
          <Link key={item.label} href={item.href} className="flex items-center gap-3 px-4 py-2.5 rounded-full text-sm hover:bg-cream-100 transition-colors"><item.icon size={16} /> {item.label}</Link>
        ))}
      </aside>
      <div className="space-y-8">
        <h1 className="font-display text-3xl font-bold">My Account</h1>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white border border-espresso-100 rounded-2xl p-5"><div className="text-xs uppercase tracking-wide text-espresso-500">Orders</div><div className="text-2xl font-bold mt-2">03</div><div className="text-xs mt-2 text-green-600">2 delivered • 1 roasting</div></div>
          <div className="bg-white border border-espresso-100 rounded-2xl p-5"><div className="text-xs uppercase tracking-wide text-espresso-500">Wishlist</div><div className="text-2xl font-bold mt-2">05</div></div>
          <div className="bg-white border border-espresso-100 rounded-2xl p-5"><div className="text-xs uppercase tracking-wide text-espresso-500">Loyalty Points</div><div className="text-2xl font-bold mt-2">120</div><div className="text-xs mt-2">$12 reward available</div></div>
        </div>
        <div className="bg-white border border-espresso-100 rounded-[24px] p-8">
          <h3 className="font-semibold mb-6">Recent Orders</h3>
          <div className="space-y-4">
            {[
              { id:"BAR-1042", date:"Aug 16, 2026", total:"$78.00", status:"Shipped" },
              { id:"BAR-1028", date:"Aug 02, 2026", total:"$42.00", status:"Delivered" },
              { id:"BAR-1011", date:"Jul 18, 2026", total:"$64.50", status:"Delivered" },
            ].map(o=>(
              <div key={o.id} className="flex justify-between items-center py-3 border-b border-espresso-50 last:border-0">
                <div><div className="font-mono text-sm font-medium">{o.id}</div><div className="text-xs text-espresso-500">{o.date}</div></div>
                <div className="text-sm font-medium">{o.total}</div>
                <div className={`text-xs px-3 py-1 rounded-full ${o.status==="Shipped"?"bg-blue-50 text-blue-700 border border-blue-200":"bg-green-50 text-green-700 border border-green-200"}`}>{o.status}</div>
              </div>
            ))}
          </div>
          <Link href="/account/orders" className="inline-block mt-6"><Button variant="secondary" size="sm">View All Orders</Button></Link>
        </div>
      </div>
    </div>
  );
}
