import { NextResponse } from "next/server";
import { Resend } from "resend";

type CardTime = "monday-8pm" | "wednesday-8pm" | "flexible";

type ContactPayload = {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  reasons?: string[];
  cardTime?: CardTime;
  message?: string;
};

const CARD_TIME_LABELS: Record<CardTime, string> = {
  "monday-8pm": "Monday 8pm",
  "wednesday-8pm": "Wednesday 8pm",
  flexible: "Flexible"
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitizeText(value?: string) {
  return (value ?? "").trim();
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildEmailHtml(data: {
  fullName: string;
  email: string;
  phoneNumber: string;
  reasons: string[];
  cardTime: CardTime;
  message: string;
}) {
  const reasonsMarkup = data.reasons.map((reason) => `<li>${escapeHtml(reason)}</li>`).join("");
  const safeMessage = data.message ? escapeHtml(data.message) : "Not provided";

  return `
    <div style="margin:0;padding:24px;background:#f4f0ea;font-family:Inter,system-ui,sans-serif;color:#161412;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid rgba(0,0,0,0.08);border-radius:18px;overflow:hidden;">
        <div style="padding:20px 24px;border-bottom:1px solid rgba(0,0,0,0.08);background:linear-gradient(135deg,#f8f3ec,#ece0d3);">
          <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#6b655f;">Wealth You</div>
          <h1 style="margin:10px 0 0;font-size:24px;line-height:1.2;">New contact form submission</h1>
        </div>
        <div style="padding:24px;">
          <p style="margin:0 0 12px;"><strong>Full Name:</strong> ${escapeHtml(data.fullName)}</p>
          <p style="margin:0 0 12px;"><strong>Email:</strong> ${escapeHtml(data.email)}</p>
          <p style="margin:0 0 12px;"><strong>Phone Number:</strong> ${escapeHtml(data.phoneNumber || "Not provided")}</p>
          <p style="margin:0 0 10px;"><strong>CardTime:</strong> ${CARD_TIME_LABELS[data.cardTime]}</p>
          <p style="margin:0 0 8px;"><strong>Reason:</strong></p>
          <ul style="margin:0 0 14px 18px;padding:0;color:#6b655f;">
            ${reasonsMarkup}
          </ul>
          <p style="margin:0 0 6px;"><strong>Message:</strong></p>
          <p style="margin:0;color:#6b655f;white-space:pre-wrap;">${safeMessage}</p>
        </div>
      </div>
    </div>
  `;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey || !toEmail) {
    return NextResponse.json(
      { error: "Server email settings are not configured." },
      { status: 500 }
    );
  }

  const payload = (await request.json()) as ContactPayload;

  const fullName = sanitizeText(payload.fullName);
  const email = sanitizeText(payload.email).toLowerCase();
  const phoneNumber = sanitizeText(payload.phoneNumber);
  const reasons = Array.isArray(payload.reasons)
    ? payload.reasons.map((item) => sanitizeText(item)).filter(Boolean)
    : [];
  const cardTime = payload.cardTime;
  const message = sanitizeText(payload.message);

  if (!fullName || !email || reasons.length === 0 || !cardTime) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  if (!["monday-8pm", "wednesday-8pm", "flexible"].includes(cardTime)) {
    return NextResponse.json({ error: "Invalid CardTime selection." }, { status: 400 });
  }

  if (cardTime === "flexible" && !message) {
    return NextResponse.json(
      { error: "Message is required for Flexible card time." },
      { status: 400 }
    );
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `New meeting request from ${fullName}`,
      replyTo: email,
      html: buildEmailHtml({
        fullName,
        email,
        phoneNumber,
        reasons,
        cardTime,
        message
      })
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to send email right now. Please try again." },
      { status: 500 }
    );
  }
}
