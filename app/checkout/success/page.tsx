import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function SuccessPage({ searchParams }: any) {
  const orderId = searchParams?.order || "BAR-0000";
  return (
    <div className="container-premium py-20 text-center max-w-[560px] mx-auto">
      <div className="w-20 h-20 rounded-full bg-green-50 border border-green-200 text-green-600 flex items-center justify-center mx-auto mb-6"><CheckCircle size={40} /></div>
      <h1 className="font-display text-[36px] font-bold leading-tight">Order confirmed!</h1>
      <p className="mt-3 text-espresso-600">Thank you — we&apos;re roasting your coffee now. You&apos;ll receive email + SMS updates.</p>
      <div className="mt-8 bg-white border border-espresso-100 rounded-[24px] p-6 text-left shadow-soft">
        <div className="flex justify-between text-sm"><span className="text-espresso-500">Order Number</span><span className="font-mono font-semibold">{orderId}</span></div>
        <div className="flex justify-between text-sm mt-3"><span className="text-espresso-500">Status</span><span className="bg-green-50 text-green-700 border border-green-200 px-2 py-1 rounded-full text-xs">Paid • Roasting</span></div>
        <div className="mt-4 text-xs text-espresso-500">Estimated delivery: 2-4 business days. Tracking will be available in your account once shipped.</div>
      </div>
      <div className="mt-8 flex gap-3 justify-center">
        <Link href="/account/orders"><Button variant="secondary">View Order</Button></Link>
        <Link href="/shop"><Button>Continue Shopping</Button></Link>
      </div>
    </div>
  );
}
