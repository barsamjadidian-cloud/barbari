// Abstract payment layer — plug ZarinPal, Stripe, or mock via env.
// Never expose secret keys in frontend.

export interface PaymentRequest {
  orderId: string;
  amount: number; // in USD or IRR depending on provider
  currency: string;
  description: string;
  customerEmail?: string;
  customerPhone?: string;
  callbackUrl: string;
}

export interface PaymentResponse {
  success: boolean;
  paymentId?: string;
  redirectUrl?: string;
  message?: string;
  raw?: any;
}

export interface PaymentProvider {
  name: string;
  createPayment(req: PaymentRequest): Promise<PaymentResponse>;
  verifyPayment(paymentId: string, amount: number): Promise<{ verified: boolean; refId?: string; raw?: any }>;
}

// Mock provider for development
export class MockPaymentProvider implements PaymentProvider {
  name = "mock";
  async createPayment(req: PaymentRequest): Promise<PaymentResponse> {
    // simulate network
    await new Promise(r => setTimeout(r, 400));
    const successRate = parseFloat(process.env.PAYMENT_MOCK_SUCCESS_RATE || "0.95");
    if (Math.random() > successRate) {
      return { success: false, message: "Mock payment failed (simulated)" };
    }
    return {
      success: true,
      paymentId: `mock_${Date.now()}`,
      redirectUrl: `${req.callbackUrl}?Authority=mock_${Date.now()}&Status=OK`,
      message: "Mock payment created",
      raw: { mock: true, orderId: req.orderId },
    };
  }
  async verifyPayment(paymentId: string, amount: number) {
    await new Promise(r => setTimeout(r, 300));
    return { verified: paymentId.startsWith("mock_"), refId: `ref_${Date.now()}`, raw: { verified: true } };
  }
}

// ZarinPal provider - structure to plug real API later
export class ZarinPalProvider implements PaymentProvider {
  name = "zarinpal";
  private merchantId: string;
  private sandbox: boolean;
  constructor() {
    this.merchantId = process.env.ZARINPAL_MERCHANT_ID || "";
    this.sandbox = process.env.ZARINPAL_SANDBOX === "true";
    if (!this.merchantId) console.warn("[ZarinPal] Missing MERCHANT_ID");
  }
  async createPayment(req: PaymentRequest): Promise<PaymentResponse> {
    // Real implementation:
    // POST https://api.zarinpal.com/pg/v4/payment/request.json
    // { merchant_id, amount (IRR), callback_url, description, metadata }
    // For now return mock but with zarinpal shape
    console.log("[ZarinPal] createPayment", req);
    // TODO: Replace with fetch to ZarinPal API using merchantId
    // const res = await fetch(...)
    const base = this.sandbox ? "https://sandbox.zarinpal.com/pg/StartPay/" : "https://www.zarinpal.com/pg/StartPay/";
    const authority = `zp_${Date.now()}`;
    return {
      success: true,
      paymentId: authority,
      redirectUrl: `${base}${authority}`,
      message: "ZarinPal payment initiated (sandbox/mocked - plug real API)",
      raw: { authority, sandbox: this.sandbox },
    };
  }
  async verifyPayment(paymentId: string, amount: number) {
    console.log("[ZarinPal] verify", paymentId, amount);
    // POST https://api.zarinpal.com/pg/v4/payment/verify.json
    // { merchant_id, amount, authority }
    // Mock verification for dev
    return { verified: true, refId: `zp_ref_${Date.now()}`, raw: { Authority: paymentId } };
  }
}

export function getPaymentProvider(): PaymentProvider {
  const provider = process.env.PAYMENT_PROVIDER || "mock";
  switch (provider) {
    case "zarinpal":
      return new ZarinPalProvider();
    case "mock":
    default:
      return new MockPaymentProvider();
  }
}
