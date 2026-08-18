import { NextRequest, NextResponse } from "next/server";
import { getPaymentProvider } from "@/lib/payments";

// GET /api/payments/callback?Authority=...&Status=OK
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const authority = searchParams.get("Authority") || searchParams.get("paymentId");
  const status = searchParams.get("Status");

  if (!authority) return NextResponse.redirect("/checkout?error=missing_payment");

  const provider = getPaymentProvider();
  // For ZarinPal, status OK indicates user completed payment, need verify
  if (status && status !== "OK") {
    return NextResponse.redirect(`/checkout?error=payment_cancelled`);
  }

  try {
    const verification = await provider.verifyPayment(authority, 0); // amount should be fetched from DB in real app
    if (verification.verified) {
      // Update order status to paid, send notifications
      // await sendNotification(...)
      return NextResponse.redirect(`/checkout/success?order=${authority}&ref=${verification.refId}`);
    } else {
      return NextResponse.redirect(`/checkout?error=verification_failed`);
    }
  } catch (e) {
    console.error("[callback] verify error", e);
    return NextResponse.redirect(`/checkout?error=server_error`);
  }
}
