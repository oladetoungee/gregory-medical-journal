import nodemailer from 'nodemailer';
import { getUserSignupEmailTemplate, getAdminSignupEmailTemplate } from './emailTemplate';

export async function POST(req: Request) {
  try {
    // Ensure the request body is not empty or improperly formatted
    if (!req.body) {
      throw new Error("Request body is empty");
    }

    const { name, email } = await req.json();

    if (!name || !email) {
      throw new Error("Name or email is missing in the request body");
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send the email to the user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to Gregory Medical Journal!',
      html: getUserSignupEmailTemplate(name),
    });

    // Send the email to the admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: 'New User Signup Notification',
      html: getAdminSignupEmailTemplate(name, email),
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error:', errorMessage);
    return new Response(JSON.stringify({ success: false, error: errorMessage }), { status: 500 });
  }
}


