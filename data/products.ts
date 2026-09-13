export type RoastLevel = "light" | "medium" | "medium-dark" | "dark";
export type BeanType = "arabica" | "robusta" | "blend";
export type CaffeineLevel = "low" | "medium" | "high" | "decaf";

export interface ProductVariant {
  id: string;
  weight: number; // grams
  grind: string;
  sku: string;
  price: number;
  compareAt?: number;
  stock: number;
  isDefault?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  compareAt?: number;
  images: string[];
  category: string;
  categorySlug: string;
  origin: string;
  roastLevel: RoastLevel;
  flavorNotes: string[];
  processing: string;
  beanType: BeanType;
  caffeine: CaffeineLevel;
  rating: number;
  reviews: number;
  stock: number;
  isFeatured?: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
  variants: ProductVariant[];
  brewing?: {
    method: string;
    ratio: string;
    temp: string;
    time: string;
  }[];
  weightOptions: number[];
  grindOptions: string[];
}

// High quality unsplash coffee images
export const products: Product[] = [
  {
    id: "p1",
    slug: "ethiopia-yirgacheffe-light",
    name: "Ethiopia Yirgacheffe — Light Roast",
    shortDescription: "Floral, bright citrus, jasmine tea finish",
    description: "Our crown jewel from Yirgacheffe highlands, 2,100MASL. Washed process, heirloom varietals. Expect bergamot, stone fruit, and a clean, tea-like body. Light roast to preserve origin character. SCAA 92 points.",
    price: 24.5,
    compareAt: 28,
    images: [
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop",
    ],
    category: "Single Origin",
    categorySlug: "single-origin",
    origin: "Ethiopia, Yirgacheffe",
    roastLevel: "light",
    flavorNotes: ["Jasmine", "Bergamot", "Peach", "Honey"],
    processing: "Washed",
    beanType: "arabica",
    caffeine: "medium",
    rating: 4.9,
    reviews: 127,
    stock: 42,
    isFeatured: true,
    isBestseller: true,
    isNew: true,
    weightOptions: [250, 500, 1000],
    grindOptions: ["Whole Bean", "Filter", "Espresso", "French Press"],
    variants: [
      { id: "p1-250-wb", weight: 250, grind: "Whole Bean", sku: "ETH-YIR-250-WB", price: 24.5, compareAt: 28, stock: 42, isDefault: true },
      { id: "p1-500-wb", weight: 500, grind: "Whole Bean", sku: "ETH-YIR-500-WB", price: 42, stock: 20 },
      { id: "p1-250-es", weight: 250, grind: "Espresso", sku: "ETH-YIR-250-ES", price: 24.5, stock: 15 },
    ],
    brewing: [
      { method: "Pour Over", ratio: "1:16", temp: "92°C", time: "3:30" },
      { method: "Espresso", ratio: "1:2", temp: "93°C", time: "27s" },
    ],
  },
  {
    id: "p2",
    slug: "colombia-huila-medium",
    name: "Colombia Huila — Medium Roast",
    shortDescription: "Caramel sweetness, red apple, milk chocolate",
    description: "From Pitalito, Huila. Family farms at 1,700m. Honey process enhances sweetness. Balanced, approachable, perfect for everyday espresso or filter.",
    price: 22,
    images: [
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504630083234-14187a9df0f5?q=80&w=800&auto=format&fit=crop",
    ],
    category: "Single Origin",
    categorySlug: "single-origin",
    origin: "Colombia, Huila",
    roastLevel: "medium",
    flavorNotes: ["Caramel", "Red Apple", "Milk Chocolate", "Almond"],
    processing: "Honey",
    beanType: "arabica",
    caffeine: "medium",
    rating: 4.8,
    reviews: 203,
    stock: 65,
    isFeatured: true,
    isBestseller: true,
    weightOptions: [250, 500, 1000],
    grindOptions: ["Whole Bean", "Espresso", "Filter", "Moka Pot"],
    variants: [
      { id: "p2-250-wb", weight: 250, grind: "Whole Bean", sku: "COL-HUI-250-WB", price: 22, stock: 65, isDefault: true },
      { id: "p2-500-wb", weight: 500, grind: "Whole Bean", sku: "COL-HUI-500-WB", price: 38, stock: 34 },
    ],
  },
  {
    id: "p3",
    slug: "barbari-signature-espresso",
    name: "BARBARI No.1 — Signature Espresso",
    shortDescription: "Dark chocolate, brown sugar, velvety crema",
    description: "Our signature. 70% Colombia, 20% Guatemala, 10% Ethiopia natural. Developed for 18 months to create the perfect house espresso: syrupy, sweet, persistent crema. Ideal for milk drinks.",
    price: 26,
    compareAt: 30,
    images: [
      "https://images.unsplash.com/photo-1494314671902-399b18174975?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?q=80&w=800&auto=format&fit=crop",
    ],
    category: "Espresso",
    categorySlug: "espresso",
    origin: "Blend — Colombia / Guatemala / Ethiopia",
    roastLevel: "medium-dark",
    flavorNotes: ["Dark Chocolate", "Brown Sugar", "Hazelnut", "Dried Cherry"],
    processing: "Blend — Washed & Natural",
    beanType: "blend",
    caffeine: "high",
    rating: 4.9,
    reviews: 412,
    stock: 88,
    isFeatured: true,
    isBestseller: true,
    weightOptions: [250, 500, 1000],
    grindOptions: ["Whole Bean", "Espresso", "Filter"],
    variants: [
      { id: "p3-250", weight: 250, grind: "Whole Bean", sku: "BAR-SIG-250", price: 26, compareAt: 30, stock: 88, isDefault: true },
      { id: "p3-1k", weight: 1000, grind: "Whole Bean", sku: "BAR-SIG-1000", price: 78, stock: 24 },
    ],
  },
  {
    id: "p4",
    slug: "guatemala-antigua-dark",
    name: "Guatemala Antigua — Dark Roast",
    shortDescription: "Smoky, molasses, spiced dark chocolate",
    description: "Volcanic soil Antigua. Full city+ for those who love classic dark roast without bitterness. Notes of pipe tobacco and dark chocolate, heavy body.",
    price: 23,
    images: [
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop",
    ],
    category: "Single Origin",
    categorySlug: "single-origin",
    origin: "Guatemala, Antigua",
    roastLevel: "dark",
    flavorNotes: ["Molasses", "Dark Chocolate", "Smoke", "Cinnamon"],
    processing: "Washed",
    beanType: "arabica",
    caffeine: "medium",
    rating: 4.7,
    reviews: 89,
    stock: 33,
    isBestseller: true,
    weightOptions: [250, 500],
    grindOptions: ["Whole Bean", "Espresso", "French Press"],
    variants: [
      { id: "p4-250", weight: 250, grind: "Whole Bean", sku: "GUA-ANT-250", price: 23, stock: 33, isDefault: true },
    ],
  },
  {
    id: "p5",
    slug: "kenya-aa-cold-brew",
    name: "Kenya AA — Cold Brew Concentrate",
    shortDescription: "Black currant, grapefruit, sparkling acidity",
    description: "Cold brew concentrate 1:4, brewed 18h at 4°C. Kenya AA Nyeri. Bright, juicy, perfect over ice. 500ml makes ~2L.",
    price: 18,
    images: [
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=800&auto=format&fit=crop",
    ],
    category: "Cold Brew",
    categorySlug: "cold-brew",
    origin: "Kenya, Nyeri",
    roastLevel: "light",
    flavorNotes: ["Black Currant", "Grapefruit", "Brown Sugar", "Rhubarb"],
    processing: "Washed, Cold Brew",
    beanType: "arabica",
    caffeine: "high",
    rating: 4.8,
    reviews: 156,
    stock: 20,
    isNew: true,
    weightOptions: [500],
    grindOptions: ["Concentrate"],
    variants: [
      { id: "p5-500", weight: 500, grind: "Concentrate", sku: "KEN-COLD-500", price: 18, stock: 20, isDefault: true },
    ],
  },
  {
    id: "p6",
    slug: "decaf-colombia-sugarcane",
    name: "Colombia Decaf — Sugarcane Process",
    shortDescription: "Decaf without compromise, caramel & orange",
    description: "EA Sugarcane decaf. 97% caffeine removed naturally using fermented sugarcane. Retains sweetness and complexity. Sweet, clean.",
    price: 24,
    images: [
      "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=800&auto=format&fit=crop",
    ],
    category: "Decaf",
    categorySlug: "decaf",
    origin: "Colombia, Narino",
    roastLevel: "medium",
    flavorNotes: ["Caramel", "Orange Zest", "Milk Chocolate", "Vanilla"],
    processing: "Sugarcane EA Decaf",
    beanType: "arabica",
    caffeine: "decaf",
    rating: 4.6,
    reviews: 78,
    stock: 50,
    isFeatured: true,
    weightOptions: [250, 500],
    grindOptions: ["Whole Bean", "Espresso", "Filter"],
    variants: [
      { id: "p6-250", weight: 250, grind: "Whole Bean", sku: "DEC-COL-250", price: 24, stock: 50, isDefault: true },
    ],
  },
  {
    id: "p7",
    slug: "barbari-midnight-blend",
    name: "Midnight Blend — Espresso & Moka",
    shortDescription: "Intense, smoky-sweet, bittersweet chocolate",
    description: "After-hours blend. Dark roast, 40% Indian Robusta for crema punch. For those who like it strong. Not bitter, just bold.",
    price: 21,
    compareAt: 26,
    images: [
      "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504630083234-14187a9df0f5?q=80&w=800&auto=format&fit=crop",
    ],
    category: "Blends",
    categorySlug: "blends",
    origin: "Blend — Guatemala / India / Colombia",
    roastLevel: "dark",
    flavorNotes: ["Bittersweet Chocolate", "Molasses", "Walnut", "Smoke"],
    processing: "Washed & Natural",
    beanType: "blend",
    caffeine: "high",
    rating: 4.7,
    reviews: 221,
    stock: 60,
    isBestseller: true,
    weightOptions: [250, 500, 1000],
    grindOptions: ["Whole Bean", "Espresso", "Moka Pot"],
    variants: [
      { id: "p7-250", weight: 250, grind: "Whole Bean", sku: "MID-BLE-250", price: 21, compareAt: 26, stock: 60, isDefault: true },
    ],
  },
  {
    id: "p8",
    slug: "chemex-brewer",
    name: "Chemex Classic 8-Cup + Filters",
    shortDescription: "Iconic design, clean filter coffee",
    description: "Handblown borosilicate glass, wood collar. Includes 100 filters. The purest expression of our light roasts.",
    price: 89,
    images: [
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop",
    ],
    category: "Equipment",
    categorySlug: "equipment",
    origin: "USA — Chemex Corp",
    roastLevel: "medium",
    flavorNotes: [],
    processing: "Equipment",
    beanType: "blend",
    caffeine: "medium",
    rating: 4.9,
    reviews: 64,
    stock: 15,
    isFeatured: false,
    isNew: true,
    weightOptions: [0],
    grindOptions: ["Equipment"],
    variants: [
      { id: "p8-chemex", weight: 0, grind: "Equipment", sku: "EQP-CHX-8C", price: 89, stock: 15, isDefault: true },
    ],
  },
];

export const categories = [
  { slug: "espresso", name: "Espresso", count: 24, image: "https://images.unsplash.com/photo-1494314671902-399b18174975?q=80&w=600" },
  { slug: "single-origin", name: "Single Origin", count: 18, image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=600" },
  { slug: "blends", name: "Blends", count: 12, image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=600" },
  { slug: "decaf", name: "Decaf", count: 6, image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=600" },
  { slug: "cold-brew", name: "Cold Brew", count: 8, image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=600" },
  { slug: "equipment", name: "Equipment", count: 22, image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=600" },
];

export const getProductBySlug = (slug: string) => products.find(p => p.slug === slug);
export const getFeatured = () => products.filter(p => p.isFeatured);
export const getBestsellers = () => products.filter(p => p.isBestseller);
export const getNew = () => products.filter(p => p.isNew);
