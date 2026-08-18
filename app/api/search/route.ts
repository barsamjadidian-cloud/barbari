import { NextRequest, NextResponse } from "next/server";
import { products } from "@/data/products";

export async function GET(req: NextRequest) {
  const q = new URL(req.url).searchParams.get("q")?.toLowerCase() || "";
  if (!q) return NextResponse.json({ results: [] });
  const results = products.filter(p => p.name.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q) || p.flavorNotes.join(" ").toLowerCase().includes(q)).slice(0, 8).map(p => ({
    slug: p.slug,
    name: p.name,
    image: p.images[0],
    price: p.price,
    category: p.category,
  }));
  return NextResponse.json({ results });
}
