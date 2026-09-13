import { notFound } from "next/navigation";
import Image from "next/image";

const posts: Record<string, { title:string; image:string; content:string; date:string }> = {
  "how-to-brew-v60": { title:"How to Brew Perfect V60 — A Roaster's Guide", image:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000", date:"Aug 10, 2026", content:"92°C water, 1:16 ratio. Rinse filter, bloom 45s with 60g water, then pulse pours to 360g by 2:00. Total draw 3:30. Grind: medium like sea salt. The secret is agitation control — swirl, don't stir." },
  "ethiopia-yirgacheffe-story": { title:"From Yirgacheffe Highlands to Brooklyn", image:"https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1000", date:"Aug 01, 2026", content:"At 2,100MASL, heirloom varietals grow slow. The Adado washing station is run by sisters, using double fermentation. We cupped 40 lots, selected 2. This is one." },
  "why-fresh-roast-matters": { title:"Why Fresh Roast Matters", image:"https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1000", date:"Jul 22, 2026", content:"Coffee degasses CO2 for 2 weeks post-roast. Best window: day 7-21 for filter, day 10-28 for espresso. We roast daily and ship same day — you get peak, not stale warehouse stock." },
};

export default function BlogPost(props:any) {
  const slug = props?.params?.slug ?? "";
  const post = posts[slug];
  if (!post) return notFound();
  return (
    <div className="container-premium py-12 max-w-[800px]">
      <div className="text-xs uppercase tracking-wide text-espresso-500 mb-3">{post.date}</div>
      <h1 className="font-display text-[32px] md:text-[44px] font-bold leading-tight">{post.title}</h1>
      <div className="relative h-[420px] rounded-[32px] overflow-hidden mt-8"><Image src={post.image} alt={post.title} fill className="object-cover" /></div>
      <p className="mt-8 text-[17px] leading-relaxed text-espresso-800">{post.content}</p>
      <div className="mt-12 bg-cream-50 border border-espresso-100 rounded-2xl p-6 text-sm">Written by Head Roaster, BARBARI. Questions? hello@barbari.coffee</div>
    </div>
  );
}
