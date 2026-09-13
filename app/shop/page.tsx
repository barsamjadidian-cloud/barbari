import { Suspense } from "react";
import ShopClient from "./ShopClient";

export default function ShopPage() {
  return (
    <div className="container-premium py-10 md:py-14">
      <Suspense fallback={<div className="py-20 text-center">Loading coffees...</div>}>
        <ShopClient />
      </Suspense>
    </div>
  );
}
