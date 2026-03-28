import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  // Query the users table for matching email (username) and password_hash (password)
  const { data: user, error } = await supabase
    .from("users")
    .select("id, email, full_name")
    .eq("email", username)
    .eq("password_hash", password)
    .single();

  if (error || !user) {
    return NextResponse.json({ error: "Sai tên đăng nhập hoặc mật khẩu" }, { status: 401 });
  }

  const response = NextResponse.json({ 
    success: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.full_name
    }
  });

  response.cookies.set("admin_session", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8, // 8 giờ
    path: "/",
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete("admin_session");
  return response;
}
