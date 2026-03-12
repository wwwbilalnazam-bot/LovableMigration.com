import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { createToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body; // 'username' will treat as email

    // 1. Try Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username,
      password: password,
    });

    if (!error && data.user) {
      // Success! Create our custom admin token for the middleware
      // (Or we could switch middleware to use Supabase sessions)
      const token = createToken(data.user.email || username);
      return NextResponse.json({ success: true, token });
    }

    // 2. Fallback to hardcoded credentials (for backward compatibility or recovery)
    // You can remove this once Supabase auth is fully working
    const { validateCredentials } = await import("@/lib/auth");
    if (validateCredentials(username, password)) {
      const token = createToken(username);
      return NextResponse.json({ success: true, token });
    }

    return NextResponse.json(
      { success: false, message: error?.message || "Invalid email or password" },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
