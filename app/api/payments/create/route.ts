import { NextRequest, NextResponse } from "next/server";
import { getPaymentProvider } from "@/lib/payments";
import { z } from "zod";

const schema = z.object({
  amount: z.number().positive(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  method: z.enum(["zarinpal","card","apple"]).optional(),
  items: z.array(z.any()).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, message: "Invalid request", errors: parsed.error.errors }, { status: 400 });
    }
    const { amount, email, phone } = parsed.data;
    // Basic security checks
    if (amount > 10000) return NextResponse.json({ success: false, message: "Amount too high" }, { status: 400 });

    const provider = getPaymentProvider();
    const orderId = `order_${Date.now()}`;
    const callbackUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/callback`;

    const payment = await provider.createPayment({
      orderId,
      amount,
      currency: provider.name === "zarinpal" ? "IRR" : "USD",
      description: `BARBARI Order ${orderId}`,
      customerEmail: email,
      customerPhone: phone,
      callbackUrl,
    });

    // In real app, save payment to DB: payments table, create order with pending status
    // await db.payments.create({ orderId, provider: provider.name, ... })

    return NextResponse.json({
      success: payment.success,
      paymentId: payment.paymentId,
      redirectUrl: payment.redirectUrl,
      provider: provider.name,
      orderId,
      message: payment.message,
    });
  } catch (err) {
    console.error("[payments/create] error", err);
    return NextResponse.json({ success: false, message: "Internal error" }, { status: 500 });
  }
}
