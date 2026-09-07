import nodemailer from "nodemailer";

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

// Builds the premium-looking HTML email body for the delivery OTP
function buildDeliveryOtpHtml(
  otp: string,
  customerName: string,
  orderId: string,
) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Delivery OTP</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f4f7; font-family: 'Helvetica Neue', Arial, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f7; padding:40px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.06);">
            
            <!-- Header -->
            <tr>
              <td style="background-color:#0f172a; padding:32px 40px; text-align:center;">
                <h1 style="margin:0; color:#ffffff; font-size:22px; font-weight:600; letter-spacing:0.5px;">
                  Order Delivery Verification
                </h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:40px;">
                <p style="margin:0 0 8px; font-size:15px; color:#111827;">
                  Hi ${customerName},
                </p>
                <p style="margin:0 0 24px; font-size:15px; color:#4b5563; line-height:1.6;">
                  Your delivery partner is on the way. Please share the OTP below with them to confirm and complete your order delivery.
                </p>

                <!-- OTP Box -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center" style="padding:24px 0;">
                      <div style="display:inline-block; background-color:#f8fafc; border:1px solid #e5e7eb; border-radius:10px; padding:18px 36px;">
                        <span style="font-size:32px; font-weight:700; letter-spacing:10px; color:#0f172a;">
                          ${otp}
                        </span>
                      </div>
                    </td>
                  </tr>
                </table>

                <p style="margin:0 0 4px; font-size:13px; color:#6b7280; text-align:center;">
                  This OTP is valid for the next 10 minutes.
                </p>

                <!-- Order details -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px; border-top:1px solid #e5e7eb; padding-top:20px;">
                  <tr>
                    <td style="font-size:13px; color:#6b7280;">Order ID</td>
                    <td align="right" style="font-size:13px; color:#111827; font-weight:600;">${orderId}</td>
                  </tr>
                </table>

                <p style="margin:24px 0 0; font-size:13px; color:#9ca3af; line-height:1.6;">
                  Do not share this OTP with anyone except your delivery partner at the time of handover. Our team will never call or message you asking for this code.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color:#f9fafb; padding:20px 40px; text-align:center; border-top:1px solid #e5e7eb;">
                <p style="margin:0; font-size:12px; color:#9ca3af;">
                  This is an automated message, please do not reply to this email.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}

interface SendDeliveryOtpParams {
  to: string;
  otp: string;
  customerName: string;
  orderId: string;
}

async function sendDeliveryOtpEmail({
  to,
  otp,
  customerName,
  orderId,
}: SendDeliveryOtpParams) {
  // Send the OTP email through the transporter
  const info = await transporter.sendMail({
    from: `"Order Delivery" <${process.env.GMAIL_USER}>`,
    to,
    subject: `Your Delivery OTP: ${otp}`,
    text: `Hi ${customerName}, your OTP to confirm delivery of order ${orderId} is ${otp}. Valid for 10 minutes.`,
    html: buildDeliveryOtpHtml(otp, customerName, orderId),
  });

  console.log("Delivery OTP email sent:", info.messageId);
  return info;
}

export { sendDeliveryOtpEmail };
