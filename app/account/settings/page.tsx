export default function SettingsPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6">Account Settings</h1>
      <div className="bg-white border border-espresso-100 rounded-[24px] p-8 space-y-4 max-w-[520px]">
        <input defaultValue="demo@barbari.coffee" className="w-full h-11 px-4 rounded-full border border-espresso-200 text-sm" />
        <input defaultValue="Demo User" className="w-full h-11 px-4 rounded-full border border-espresso-200 text-sm" />
        <button className="text-xs uppercase tracking-wide bg-espresso-900 text-cream-50 px-6 py-3 rounded-full">Save Changes</button>
        <div className="pt-6 border-t border-espresso-100 text-xs text-red-500 cursor-pointer">Delete Account</div>
      </div>
    </div>
  );
}
