import { NextResponse } from "next/server";

// The previous endpoint trusted client prices and returned mock payment URLs.
// Fail closed until server-side orders, authoritative pricing and a verified
// payment provider are implemented. This route is excluded from Pages exports.
export async function POST() {
  return NextResponse.json(
    {
      success: false,
      message:
        "پرداخت آنلاین هنوز فعال نشده است. هیچ مبلغی دریافت و سفارشی ثبت نمی‌شود.",
    },
    { status: 503 },
  );
}
