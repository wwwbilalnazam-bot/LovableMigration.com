import { NextRequest, NextResponse } from "next/server";
import { validateCredentials, createToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json({ error: "Username and password required" }, { status: 400 });
    }
    if (!validateCredentials(username, password)) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    const token = createToken(username);
    return NextResponse.json({ token, message: "Login successful" });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
