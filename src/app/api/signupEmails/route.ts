import nodemailer from 'nodemailer';
import { getUserSignupEmailTemplate, getAdminSignupEmailTemplate } from './emailTemplate';

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json(); // Parse the request body

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
      html: getUserSignupEmailTemplate(name), // Using the email template
    });

    // Send the email to the admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: 'New User Signup Notification',
      html: getAdminSignupEmailTemplate(name, email), // Using the admin template
    });

    // Corrected Response with JSON.stringify
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Error sending signup emails:', error);
    // Corrected Response with JSON.stringify
    return new Response(JSON.stringify({ success: false, error: error }), { status: 500 });
  }
}
