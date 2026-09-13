import Link from "next/link";
import { Button } from "@/components/ui/Button";
export default function NotFound() {
  return (
    <div className="container-premium py-32 text-center max-w-[560px] mx-auto">
      <div className="text-[120px] font-display font-bold leading-none text-espresso-100">404</div>
      <h1 className="font-display text-3xl font-bold mt-4">This roast doesn&apos;t exist</h1>
      <p className="text-espresso-600 mt-3">The page you&apos;re looking for has been moved or brewed away.</p>
      <div className="mt-8 flex justify-center gap-3"><Link href="/"><Button>Go Home</Button></Link><Link href="/shop"><Button variant="secondary">Shop Coffee</Button></Link></div>
    </div>
  );
}
