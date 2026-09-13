import { NextResponse } from "next/server";

// Never mark a payment as successful without server-to-server verification.
export async function GET() {
  return NextResponse.json(
    {
      success: false,
      verified: false,
      message: "درگاه پرداخت متصل نیست. پرداختی تأیید نشده است.",
    },
    { status: 503 },
  );
}
