// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const ACCESS_KEY = process.env.WEB3FORMS_KEY;

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

    const text = await response.text();
    console.log("Web3Forms raw response:", text);
    
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return NextResponse.json({ success: false, message: "Invalid response from form service." });
    }

    if (data.success) {
      return NextResponse.json({ success: true, message: "Message sent!" });
    } else {
      return NextResponse.json({ success: false, message: data.message || "Failed to send message." });
    }
  } catch (error: any) {
    console.error("Contact form error:", error?.message || error);
    return NextResponse.json({ success: false, message: "Network error. Please try again later." });
  }
}
