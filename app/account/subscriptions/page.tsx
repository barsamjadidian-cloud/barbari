export default function SubsPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6">Coffee Subscriptions</h1>
      <div className="bg-white border border-espresso-100 rounded-[24px] p-6">
        <div className="flex justify-between"><div><div className="font-semibold">Signature Espresso • 500g • Espresso • Every 2 weeks</div><div className="text-sm text-espresso-500 mt-1">Next delivery: Aug 28, 2026 • $32.30</div></div><span className="text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full h-fit">Active</span></div>
        <div className="flex gap-2 mt-6"><button className="text-xs px-4 py-2 rounded-full border border-espresso-200 hover:bg-cream-50">Pause</button><button className="text-xs px-4 py-2 rounded-full border border-espresso-200 hover:bg-cream-50">Modify</button><button className="text-xs px-4 py-2 rounded-full bg-red-50 text-red-600 border border-red-200">Cancel</button></div>
      </div>
    </div>
  );
}
