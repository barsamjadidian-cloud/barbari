import Image from "next/image";
export default function AboutPage() {
  return (
    <div className="container-premium py-16">
      <div className="max-w-[800px] mx-auto text-center">
        <div className="text-[11px] tracking-[0.2em] uppercase font-bold text-gold-400 mb-4">Our Story • Est. 2018 Brooklyn</div>
        <h1 className="font-display text-[44px] md:text-[56px] leading-[0.9] font-bold">Craft before<br />commerce.</h1>
        <p className="mt-8 text-[18px] leading-relaxed text-espresso-700">BARBARI began with one Probat roaster, a notebook full of cupping scores, and a obsession with clarity. No dark-roast mask, no commodity blends. Just traceable, seasonal, specialty coffee roasted to highlight origin — not hide it.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 mt-16">
        <div className="relative h-[520px] rounded-[32px] overflow-hidden"><Image src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=800" alt="roastery" fill className="object-cover" /></div>
        <div className="bg-white border border-espresso-100 rounded-[32px] p-10 flex flex-col justify-center">
          <h3 className="font-display text-2xl font-semibold">Direct Trade, No Brokers</h3>
          <p className="mt-4 text-espresso-600 leading-relaxed">We visit farms in Ethiopia, Colombia, Guatemala yearly. We pay 40% above Fair Trade minimum, pre-finance harvests, and invest in processing infrastructure. Transparency report published quarterly.</p>
          <div className="mt-8 grid grid-cols-2 gap-6 text-sm">
            <div><div className="text-2xl font-display font-bold">18</div><div className="text-xs uppercase tracking-wide text-espresso-500">Farm partners</div></div>
            <div><div className="text-2xl font-display font-bold">92+</div><div className="text-xs uppercase tracking-wide text-espresso-500">Avg SCAA score</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
