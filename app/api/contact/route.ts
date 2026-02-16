// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    const FORMSPREE_ID = process.env.FORMSPREE_ID;

    if (!FORMSPREE_ID) {
      console.error("FORMSPREE_ID is not configured");
      return NextResponse.json(
        { success: false, message: "Form service not configured." },
        { status: 500 }
      );
    }

    const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
        _replyto: email,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json({ success: true, message: "Message sent!" });
    } else {
      console.error("Formspree error:", data);
      return NextResponse.json({ success: false, message: data.error || "Failed to send message." });
    }
  } catch (error: any) {
    console.error("Contact form error:", error?.message || error);
    return NextResponse.json({ success: false, message: "Network error. Please try again later." });
  }
}
