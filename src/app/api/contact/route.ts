import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { checkRateLimit } from "@/lib/rateLimit";

// Input validation and sanitization
function sanitizeInput(input: string): string {
    if (typeof input !== "string") return "";

    // Remove potentially dangerous HTML/script tags
    return input
        .replace(/<[^>]*>/g, "") // Remove HTML tags
        .replace(/javascript:/gi, "") // Remove javascript: protocol
        .replace(/on\w+=/gi, "") // Remove event handlers
        .trim()
        .slice(0, 5000); // Limit length
}

function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
}

export async function POST(request: NextRequest) {
    // Get IP address for rate limiting
    const ip =
        request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
        request.headers.get("x-real-ip") ||
        "unknown";

    // Check rate limit (3 requests per hour)
    const rateLimit = checkRateLimit(ip, 3, 60 * 60 * 1000);

    if (!rateLimit.allowed) {
        const resetDate = new Date(rateLimit.resetTime);
        const resetTime = resetDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });

        return NextResponse.json(
            {
                error: `Too many contact form submissions. Please try again after ${resetTime}.`,
            },
            {
                status: 429,
                headers: {
                    "X-RateLimit-Limit": "3",
                    "X-RateLimit-Remaining": "0",
                    "X-RateLimit-Reset": rateLimit.resetTime.toString(),
                },
            }
        );
    }

    try {
        // Parse and validate request body
        let body;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json(
                { error: "Invalid request body" },
                { status: 400 }
            );
        }

        const { name, email, message } = body;

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "All fields are required: name, email, and message" },
                { status: 400 }
            );
        }

        // Sanitize inputs
        const sanitizedName = sanitizeInput(name);
        const sanitizedEmail = sanitizeInput(email).toLowerCase();
        const sanitizedMessage = sanitizeInput(message);

        // Validate sanitized inputs
        if (!sanitizedName || sanitizedName.length < 2) {
            return NextResponse.json(
                { error: "Please provide a valid name (at least 2 characters)" },
                { status: 400 }
            );
        }

        if (!validateEmail(sanitizedEmail)) {
            return NextResponse.json(
                { error: "Please provide a valid email address" },
                { status: 400 }
            );
        }

        if (!sanitizedMessage || sanitizedMessage.length < 10) {
            return NextResponse.json(
                { error: "Message must be at least 10 characters long" },
                { status: 400 }
            );
        }

        // Check for environment variables
        const smtpHost = process.env.SMTP_HOST;
        const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASS;
        const contactEmail = process.env.CONTACT_EMAIL || "mail@imagetotext.net";

        // If SMTP is not configured, return success for development
        if (!smtpHost || !smtpUser || !smtpPass) {
            console.log("Contact form submission (SMTP not configured):", {
                name: sanitizedName,
                email: sanitizedEmail,
                message: sanitizedMessage,
            });

            // In development, just log and return success
            return NextResponse.json({
                success: true,
                message: "Message received (SMTP not configured - logged to console)",
            });
        }

        // Create transporter
        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465,
            auth: {
                user: smtpUser,
                pass: smtpPass,
            },
        });

        // Send email
        await transporter.sendMail({
            from: `"ImageToText.net Contact" <${smtpUser}>`,
            to: contactEmail,
            replyTo: sanitizedEmail,
            subject: `New Contact Form Submission from ${sanitizedName}`,
            text: `
Name: ${sanitizedName}
Email: ${sanitizedEmail}

Message:
${sanitizedMessage}

---
This message was sent from the ImageToText.net contact form.
      `.trim(),
            html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f8fafc; padding: 20px; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 16px; }
    .label { font-weight: bold; color: #64748b; font-size: 12px; text-transform: uppercase; }
    .value { margin-top: 4px; }
    .message-box { background: white; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; }
    .footer { margin-top: 20px; font-size: 12px; color: #94a3b8; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">New Contact Form Submission</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Name</div>
        <div class="value">${sanitizedName}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a></div>
      </div>
      <div class="field">
        <div class="label">Message</div>
        <div class="message-box">${sanitizedMessage.replace(/\n/g, "<br>")}</div>
      </div>
      <div class="footer">
        This message was sent from the ImageToText.net contact form.
      </div>
    </div>
  </div>
</body>
</html>
      `.trim(),
        });

        return NextResponse.json({
            success: true,
            message: "Your message has been sent successfully!",
        });
    } catch (error) {
        console.error("Contact form error:", error);

        return NextResponse.json(
            { error: "Failed to send message. Please try again later." },
            { status: 500 }
        );
    }
}

// Handle other methods
export async function GET() {
    return NextResponse.json(
        { error: "Method not allowed" },
        { status: 405 }
    );
}
