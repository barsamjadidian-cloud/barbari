import { NextRequest, NextResponse } from "next/server";
import { products } from "@/data/products";

// GET /api/products?category=espresso&search=ethiopia&roast=light&sort=price-low
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  let list = [...products];

  const search = searchParams.get("search");
  if (search) {
    const s = search.toLowerCase();
    list = list.filter(p => (p.name + p.shortDescription + p.origin + p.flavorNotes.join(" ")).toLowerCase().includes(s));
  }
  const category = searchParams.get("category");
  if (category) list = list.filter(p => p.categorySlug === category);
  const roast = searchParams.get("roast");
  if (roast) list = list.filter(p => p.roastLevel === roast);
  const origin = searchParams.get("origin");
  if (origin) list = list.filter(p => p.origin.toLowerCase().includes(origin.toLowerCase()));
  const sort = searchParams.get("sort");
  if (sort === "price-low") list.sort((a,b)=>a.price-b.price);
  if (sort === "price-high") list.sort((a,b)=>b.price-a.price);
  if (sort === "rating") list.sort((a,b)=>b.rating-a.rating);

  return NextResponse.json({ products: list, total: list.length }, { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } });
}
