
import nodemailer from "nodemailer";
import { getEmailTemplate } from "./emailTemplate"; 

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });


  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    cc: process.env.ADMIN_EMAIL,
    subject: `Support Request from ${name} on the Gregory Journal Website`,
    html: getEmailTemplate(name, message),
    replyTo: email,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ success: false, error: error }), { status: 500 });
  }
}
