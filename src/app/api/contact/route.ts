import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { name, phone, email, service, message } = await request.json();

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Vui lòng cung cấp tên và số điện thoại" },
        { status: 400 }
      );
    }

    const newId = `MSG${Math.floor(100000 + Math.random() * 900000)}`;

    const { error: dbError } = await supabase
      .from("contacts")
      .insert([
        {
          id: newId,
          name,
          phone,
          email: email || null,
          subject: service,
          message,
          status: 'new',
          date: new Date().toISOString()
        }
      ]);

    if (dbError) {
      console.error("Lỗi khi lưu vào database:", dbError);
    }
    const { data: smtpSettings } = await supabase
      .from("smtp_settings")
      .select("*")
      .eq("id", 1)
      .single();
    if (smtpSettings && smtpSettings.receive_notifications) {
      const transporter = nodemailer.createTransport({
        host: smtpSettings.host || process.env.SMTP_HOST,
        port: Number(smtpSettings.port) || Number(process.env.SMTP_PORT) || 587,
        secure: (smtpSettings.port === 465 || process.env.SMTP_PORT === "465"),
        auth: {
          user: smtpSettings.user_email || process.env.SMTP_USER,
          pass: smtpSettings.password || process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `"${smtpSettings.from_name || name}" <${smtpSettings.from_email || process.env.SMTP_FROM_EMAIL}>`,
        to: smtpSettings.user_email || process.env.SMTP_USER,
        subject: `[VILA] Yêu cầu tư vấn mới từ ${name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #ea580c;">Yêu cầu tư vấn mới</h2>
            <p><strong>Khách hàng:</strong> ${name}</p>
            <p><strong>Số điện thoại:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email || 'Không cung cấp'}</p>
            <p><strong>Dịch vụ:</strong> ${service}</p>
            <p><strong>Nội dung chi tiết:</strong></p>
            <div style="padding: 15px; background: #f9f9f9; border-radius: 5px; border-left: 4px solid #ea580c;">
              ${message}
            </div>
            <hr style="margin-top: 20px; border: 0; border-top: 1px solid #eee;" />
            <p style="font-size: 12px; color: #666;">Hệ thống quản trị VILA SANMYSHI</p>
          </div>
        `,
      };
      await transporter.sendMail(mailOptions);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Lỗi hệ thống:", error);
    return NextResponse.json(
      { error: "Đã có lỗi xảy ra: " + error.message },
      { status: 500 }
    );
  }
}
