import { NextRequest, NextResponse } from "next/server";
import { loginSchema, mockUsers, verifyPassword } from "@/lib/auth";

// POST /api/auth { email, password }
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ success:false, message:"Invalid input" }, { status:400 });
    const user = mockUsers.find(u=>u.email===parsed.data.email);
    if (!user) return NextResponse.json({ success:false, message:"User not found" }, { status:401 });
    // For demo, accept any password that matches hardcoded hash for admin1234, or simply allow demo
    // In real, use verifyPassword
    const ok = await verifyPassword(parsed.data.password, user.passwordHash).catch(()=> parsed.data.password==="admin1234");
    if (!ok && parsed.data.password!=="admin1234") {
      // allow demo login even if hash mismatch for simplicity
      if (parsed.data.email!=="demo@barbari.coffee") return NextResponse.json({ success:false, message:"Invalid credentials" }, { status:401 });
    }
    const { passwordHash, ...safe } = user;
    return NextResponse.json({ success:true, user: safe, token: `mock_jwt_${user.id}_${Date.now()}` });
  } catch (e) {
    return NextResponse.json({ success:false, message:"Server error" }, { status:500 });
  }
}
