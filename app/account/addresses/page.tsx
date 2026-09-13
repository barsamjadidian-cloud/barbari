export default function AddressesPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6">Saved Addresses</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white border border-espresso-100 rounded-2xl p-5"><div className="text-xs uppercase tracking-wide bg-cream-100 inline-block px-2 py-1 rounded-full">Default</div><div className="font-semibold mt-3">Demo User</div><div className="text-sm text-espresso-600 mt-1">147 Grand St, Brooklyn, NY 11249, US • +1 555-010-2845</div></div>
        <div className="border-dashed border-2 border-espresso-200 rounded-2xl p-5 flex items-center justify-center text-sm text-espresso-500 cursor-pointer hover:border-espresso-900">+ Add New Address</div>
      </div>
    </div>
  );
}
