import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/data/products";
import ProductDetailClient from "@/components/store/ProductDetailClient";
import ProductCard from "@/components/store/ProductCard";

export async function generateStaticParams() {
  return products.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: any) {
  const slug = params?.slug;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} | BARBARI`,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [product.images[0]],
    },
  };
}

export default function ProductPage({ params }: any) {
  const slug = params?.slug;
  const product = getProductBySlug(slug);
  if (!product) return notFound();
  const related = products.filter(p => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 4);

  return (
    <div className="container-premium py-10">
      <ProductDetailClient product={product} />

      {related.length > 0 && (
        <div className="mt-24">
          <h2 className="font-display text-[28px] font-bold mb-8">You may also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        image: product.images,
        description: product.description,
        sku: product.variants[0].sku,
        brand: { "@type": "Brand", name: "BARBARI" },
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          price: product.price,
          availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.reviews,
        }
      }) }} />
    </div>
  );
}
