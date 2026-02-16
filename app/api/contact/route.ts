// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { success: false, message: "Email service not configured." },
        { status: 500 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Apex Nutra Contact <onboarding@resend.dev>",
      to: "kwybrow@apexnutraus.com",
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ success: false, message: error.message || "Failed to send message." });
    }

    return NextResponse.json({ success: true, message: "Message sent!" });
  } catch (error: any) {
    console.error("Contact form error:", error?.message || error);
    return NextResponse.json({ success: false, message: "Network error. Please try again later." });
  }
}
