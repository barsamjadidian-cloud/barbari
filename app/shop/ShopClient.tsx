"use client";
import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { products as allProducts } from "@/data/products";
import ProductCard from "@/components/store/ProductCard";
import { SlidersHorizontal, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

const roastOptions = ["light", "medium", "medium-dark", "dark"];
const originOptions = ["Ethiopia", "Colombia", "Guatemala", "Kenya", "Blend"];
const grindOptions = ["Whole Bean", "Espresso", "Filter", "French Press", "Concentrate", "Equipment"];

export default function ShopClient() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get("cat") || "all";
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCat);
  const [roast, setRoast] = useState<string>("all");
  const [origin, setOrigin] = useState<string>("all");
  const [grind, setGrind] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [sort, setSort] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = [...allProducts];
    if (search) list = list.filter(p => (p.name + p.shortDescription + p.origin).toLowerCase().includes(search.toLowerCase()));
    if (category !== "all") list = list.filter(p => p.categorySlug === category);
    if (roast !== "all") list = list.filter(p => p.roastLevel === roast);
    if (origin !== "all") list = list.filter(p => p.origin.includes(origin));
    if (grind !== "all") list = list.filter(p => p.grindOptions.includes(grind));
    list = list.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sort) {
      case "price-low": list.sort((a,b)=>a.price-b.price); break;
      case "price-high": list.sort((a,b)=>b.price-a.price); break;
      case "rating": list.sort((a,b)=>b.rating-a.rating); break;
      case "newest": list = list.filter(p=>p.isNew).concat(list.filter(p=>!p.isNew)); break;
      case "bestsellers": list = list.filter(p=>p.isBestseller).concat(list.filter(p=>!p.isBestseller)); break;
      default: break;
    }
    return list;
  }, [search, category, roast, origin, grind, priceRange, sort]);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="font-display text-[40px] md:text-[52px] leading-none font-bold tracking-tight">Shop Coffee</h1>
          <p className="text-espresso-600 mt-3 text-[15px]">{filtered.length} exceptional coffees • Roasted daily in Brooklyn</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-espresso-400" />
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search origin, flavor..." className="h-11 pl-11 pr-5 rounded-full border border-espresso-200 bg-white text-sm w-[260px] focus:outline-none focus:border-gold-400" />
          </div>
          <Button variant="secondary" size="md" onClick={()=>setShowFilters(!showFilters)}><SlidersHorizontal size={16} /> Filters</Button>
          <select value={sort} onChange={e=>setSort(e.target.value)} className="h-11 px-4 rounded-full border border-espresso-200 bg-white text-sm">
            <option value="featured">Featured</option>
            <option value="bestsellers">Best Sellers</option>
            <option value="newest">Newest</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-8">
        <aside className={`${showFilters ? "block" : "hidden"} lg:block space-y-8 bg-white border border-espresso-100 rounded-[24px] p-6 h-fit sticky top-[100px]`}>
          <div>
            <h3 className="text-[12px] uppercase tracking-widest font-semibold mb-4">Category</h3>
            <div className="space-y-2">
              {["all","espresso","single-origin","blends","decaf","cold-brew","equipment"].map(c=>(
                <button key={c} onClick={()=>setCategory(c)} className={`w-full text-left px-4 py-2 rounded-full text-sm capitalize transition-colors ${category===c?"bg-espresso-900 text-cream-50":"hover:bg-cream-100 text-espresso-700"}`}>{c.replace("-"," ")}</button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-[12px] uppercase tracking-widest font-semibold mb-4">Roast Level</h3>
            <div className="flex flex-wrap gap-2">
              {roastOptions.map(r=>(
                <button key={r} onClick={()=>setRoast(roast===r?"all":r)} className={`px-3 py-1.5 rounded-full text-xs capitalize border ${roast===r?"bg-gold-400 border-gold-400 text-espresso-900":"bg-cream-50 border-espresso-200 hover:border-espresso-300"}`}>{r}</button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-[12px] uppercase tracking-widest font-semibold mb-4">Origin</h3>
            <div className="space-y-2">
              {originOptions.map(o=>(
                <label key={o} className="flex items-center gap-2 text-sm"><input type="radio" checked={origin===o} onChange={()=>setOrigin(o)} className="rounded-full" /> {o}</label>
              ))}
              <button onClick={()=>setOrigin("all")} className="text-xs underline">Clear</button>
            </div>
          </div>
          <div>
            <h3 className="text-[12px] uppercase tracking-widest font-semibold mb-4">Grind</h3>
            <div className="flex flex-wrap gap-2">
              {grindOptions.map(g=>(
                <button key={g} onClick={()=>setGrind(grind===g?"all":g)} className={`px-3 py-1 rounded-full text-[11px] border ${grind===g?"bg-espresso-900 text-white border-espresso-900":"bg-white border-espresso-200"}`}>{g}</button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-[12px] uppercase tracking-widest font-semibold mb-4">Price: ${priceRange[0]} - ${priceRange[1]}</h3>
            <input type="range" min={0} max={100} value={priceRange[1]} onChange={e=>setPriceRange([0, parseInt(e.target.value)])} className="w-full accent-espresso-900" />
          </div>
          <Button variant="secondary" size="sm" className="w-full" onClick={()=>{setCategory("all");setRoast("all");setOrigin("all");setGrind("all");setSearch("");setPriceRange([0,100]);}}>Clear All Filters</Button>
        </aside>

        <div>
          {filtered.length===0 ? (
            <div className="py-20 text-center"><p className="text-lg font-medium">No coffees match your filters</p><p className="text-sm text-espresso-500 mt-2">Try adjusting roast, origin, or search.</p></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map(p=><ProductCard key={p.id} product={p} />)}
            </div>
          )}
          <div className="mt-12 flex justify-center"><Button variant="outline">Load More — You&apos;ve seen {filtered.length} of {allProducts.length}</Button></div>
        </div>
      </div>
    </div>
  );
}
