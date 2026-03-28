import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { to, subject, html, consultationId } = await request.json();

    if (!to || !subject || !html) {
      return NextResponse.json(
        { error: "Thiếu thông tin người nhận, tiêu đề hoặc nội dung" },
        { status: 400 }
      );
    }

    // Fetch SMTP Settings from DB
    const { data: smtpSettings } = await supabase
      .from("smtp_settings")
      .select("*")
      .eq("id", 1)
      .single();

    const transporter = nodemailer.createTransport({
      host: smtpSettings?.host || process.env.SMTP_HOST,
      port: Number(smtpSettings?.port) || Number(process.env.SMTP_PORT) || 587,
      secure: smtpSettings?.port === 465 || process.env.SMTP_PORT === "465",
      auth: {
        user: smtpSettings?.user_email || process.env.SMTP_USER,
        pass: smtpSettings?.password || process.env.SMTP_PASS,
      },
    });
    const mailOptions = {
      from: `"${smtpSettings?.from_name || process.env.SMTP_FROM_NAME || 'VILA SANMYSHI'}" <${smtpSettings?.from_email || process.env.SMTP_FROM_EMAIL}>`,
      to: to,
      subject: subject,
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);
    return NextResponse.json({
      success: true,
      messageId: info.messageId
    });

  } catch (error: any) {
    console.error("Lỗi gửi email SMTP:", error);
    return NextResponse.json(
      { error: "Lỗi hệ thống khi gửi email: " + error.message },
      { status: 500 }
    );
  }
}
