import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { title, slug, excerpt, image } = await JSON.parse(await req.text());

    if (!title || !slug) {
      return NextResponse.json({ error: "Missing required information" }, { status: 400 });
    }

    const { data: subscribers, error: subError } = await supabase
      .from("newsletter_subscribers")
      .select("email");

    if (subError) throw subError;
    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({ message: "No subscribers found" });
    }

    const { data: smtp, error: smtpError } = await supabase
      .from("smtp_settings")
      .select("*")
      .single();

    if (smtpError || !smtp) {
      throw new Error("Cấu hình SMTP chưa được thiết lập trong Database");
    }

    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: Number(smtp.port),
      secure: Number(smtp.port) === 465,
      auth: {
        user: smtp.user_email,
        pass: smtp.password,
      },
    });

    const webUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vilasanmyshi.com";
    const postUrl = `${webUrl}/news/${slug}`;
    const emailPromises = subscribers.map((sub) => {
      return transporter.sendMail({
        from: `"${smtp.from_name}" <${smtp.from_email}>`,
        to: sub.email,
        subject: `📬 Tin mới: ${title}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
            <div style="background-color: #007749; padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">VILA SANMYSHI News</h1>
            </div>
            <div style="padding: 30px;">
              <h2 style="color: #333; margin-bottom: 20px;">${title}</h2>
              ${image ? `<img src="${image}" alt="${title}" style="width: 100%; border-radius: 8px; margin-bottom: 20px;">` : ""}
              <p style="color: #666; line-height: 1.6; font-size: 16px;">${excerpt || "Cập nhật những chuyển động mới nhất từ thị trường logistics và Vila Sanmyshi."}</p>
              <div style="text-align: center; margin-top: 30px;">
                <a href="${postUrl}" style="background-color: #007749; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                  ĐỌC BÀI VIẾT NGAY
                </a>
              </div>
            </div>
            <div style="background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #eee;">
              <p>&copy; ${new Date().getFullYear()} VILA SANMYSHI. Tất cả các quyền được bảo lưu.</p>
              <p>Bạn nhận được email này vì đã đăng ký bản tin của chúng tôi.</p>
            </div>
          </div>
        `,
      });
    });

    await Promise.all(emailPromises);

    return NextResponse.json({ message: `Successfully sent to ${subscribers.length} subscribers` });
  } catch (error: any) {
    console.error("Newsletter Email Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
