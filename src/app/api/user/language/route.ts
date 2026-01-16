import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { locales, type Locale } from "@/i18n/config";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { language } = body;

    // Validate the language code
    if (!language || !locales.includes(language as Locale)) {
      return NextResponse.json(
        { error: "Invalid language code" },
        { status: 400 }
      );
    }

    // Set the locale cookie
    const cookieStore = await cookies();
    cookieStore.set("locale", language, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: "lax",
    });

    return NextResponse.json({ success: true, language });
  } catch {
    return NextResponse.json(
      { error: "Failed to update language preference" },
      { status: 500 }
    );
  }
}
