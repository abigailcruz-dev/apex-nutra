// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const ACCESS_KEY = process.env.WEB3FORMS_KEY; // server-side only

    if (!ACCESS_KEY) {
      return NextResponse.json(
        { success: false, message: "Form service not configured." },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        ...body,
      }),
    });

    const data = await response.json();

    if (data.success) {
      return NextResponse.json({ success: true, message: "Message sent!" });
    } else {
      return NextResponse.json({ success: false, message: data.message || "Failed to send message." });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: "Network error." });
  }
}
