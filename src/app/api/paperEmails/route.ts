// api/paperEmails/sendEmails.ts
import nodemailer from 'nodemailer';
import { getUserEmailTemplate, getAdminEmailTemplate } from './emailTemplate';

export async function POST(req: Request) {
  const { name, email, articleTitle, message } = await req.json();

  // Create the transporter with your email credentials
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email to the user
  const userMailOptions = {
    from: process.env.EMAIL_USER,
    to: email, // User's email
    subject: `Confirmation: Manuscript Submission for "${articleTitle}"`,
    html: getUserEmailTemplate(name, articleTitle),
  };

  // Email to the admin
  const adminMailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL, // Admin email
    subject: `New Manuscript Submitted: "${articleTitle}" by ${name}`,
    html: getAdminEmailTemplate(name, articleTitle, message),
  };

  try {
    // Send email to the user
    await transporter.sendMail(userMailOptions);
    
    // Send email to the admin
    await transporter.sendMail(adminMailOptions);
    
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ success: false, error: error }), { status: 500 });
  }
}
