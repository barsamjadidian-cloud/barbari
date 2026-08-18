import Image from "next/image";
import Link from "next/link";

const posts = [
  { slug:"how-to-brew-v60", title:"How to Brew Perfect V60 — A Roaster's Guide", excerpt:"92°C, 1:16, 3:30 — and why bloom matters more than you think.", image:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600", date:"Aug 10, 2026" },
  { slug:"ethiopia-yirgacheffe-story", title:"From Yirgacheffe Highlands to Brooklyn", excerpt:"2,100 MASL, heirloom varietals, and a washing station run by sisters.", image:"https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=600", date:"Aug 01, 2026" },
  { slug:"why-fresh-roast-matters", title:"Why Fresh Roast Matters — Degassing & Flavor", excerpt:"Coffee is a fruit. It changes after roast. Here's how to time it.", image:"https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=600", date:"Jul 22, 2026" },
];

export default function BlogPage() {
  return (
    <div className="container-premium py-14">
      <h1 className="font-display text-[40px] font-bold mb-3">Journal & Brew Guides</h1>
      <p className="text-espresso-600 mb-10 max-w-[60ch]">Stories from farms, roastery diaries, and actionable brew guides from our head roaster.</p>
      <div className="grid md:grid-cols-3 gap-8">
        {posts.map(p=>(
          <Link key={p.slug} href={`/blog/${p.slug}`} className="card-premium group">
            <div className="relative aspect-[4/3] overflow-hidden"><Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" /></div>
            <div className="p-6"><div className="text-[11px] uppercase tracking-wide text-espresso-500">{p.date}</div><h3 className="font-display font-semibold text-[18px] mt-2 leading-tight">{p.title}</h3><p className="text-sm text-espresso-600 mt-2 line-clamp-2">{p.excerpt}</p></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
