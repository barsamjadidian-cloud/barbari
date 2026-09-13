export default function OrdersPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6">Order History</h1>
      <div className="bg-white border border-espresso-100 rounded-[24px] overflow-hidden divide-y divide-espresso-50">
        {[
          { id:"BAR-1042", date:"Aug 16, 2026", items:"Signature Espresso 500g ×2", total:"$78.00", status:"Shipped", tracking:"1Z999AA10123456784" },
          { id:"BAR-1028", date:"Aug 02, 2026", items:"Ethiopia Yirgacheffe 250g", total:"$24.50", status:"Delivered", tracking:"Delivered Aug 05" },
        ].map(o=>(
          <div key={o.id} className="p-6 flex justify-between gap-6">
            <div><div className="font-mono font-semibold">{o.id}</div><div className="text-xs text-espresso-500 mt-1">{o.date} • {o.items}</div><div className="text-xs mt-2 text-blue-600">{o.tracking}</div></div>
            <div className="text-right"><div className="font-semibold">{o.total}</div><div className="mt-2 text-xs px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 inline-block">{o.status}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}
