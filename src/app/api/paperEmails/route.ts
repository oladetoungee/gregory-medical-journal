import nodemailer from 'nodemailer';
import { getUserEmailTemplate, getAdminEmailTemplate } from './emailTemplate';

export async function POST(req: Request) {
  console.log('[paperEmails] Route called - method:', req.method);
  
  try {
    const { name, email, articleTitle, message } = await req.json();
    console.log('[paperEmails] Received submission:', { name, email, articleTitle, message });

    // Check for missing fields
    if (!name || !email || !articleTitle) {
      console.error('[paperEmails] Missing required fields:', { name, email, articleTitle });
      return new Response(JSON.stringify({ success: false, error: 'Missing required fields' }), { status: 400 });
    }

    // Create the transporter with your email credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Test the transporter connection
    try {
      await transporter.verify();
      console.log('[paperEmails] SMTP connection verified');
    } catch (verifyError) {
      console.error('[paperEmails] SMTP verification failed:', verifyError);
      return new Response(JSON.stringify({ success: false, error: 'SMTP connection failed', details: verifyError instanceof Error ? verifyError.message : verifyError }), { status: 500 });
    }

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

    // Send emails
    let userResult, adminResult;
    try {
      userResult = await transporter.sendMail(userMailOptions);
      console.log('[paperEmails] User email sent:', userResult.messageId);
    } catch (userError) {
      console.error('[paperEmails] Failed to send user email:', userError);
      return new Response(JSON.stringify({ success: false, error: 'Failed to send user email', details: userError instanceof Error ? userError.message : userError }), { status: 500 });
    }

    try {
      adminResult = await transporter.sendMail(adminMailOptions);
      console.log('[paperEmails] Admin email sent:', adminResult.messageId);
    } catch (adminError) {
      console.error('[paperEmails] Failed to send admin email:', adminError);
      return new Response(JSON.stringify({ success: false, error: 'Failed to send admin email', details: adminError instanceof Error ? adminError.message : adminError }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true, userMessageId: userResult.messageId, adminMessageId: adminResult.messageId }), { status: 200 });
  } catch (error) {
    console.error('[paperEmails] Unexpected error:', error);
    return new Response(JSON.stringify({ success: false, error: error instanceof Error ? error.message : error }), { status: 500 });
  }
}
