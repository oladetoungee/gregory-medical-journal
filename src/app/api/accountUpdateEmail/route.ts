import nodemailer from 'nodemailer';
import { getAccountUpdateEmailTemplate } from './emailTemplate';

export async function POST(req: Request) {
  try {
    const { name, email, updateType, details } = await req.json();
    console.log('[accountUpdateEmail] Received update notification:', { name, email, updateType, details });

    // Check for missing fields
    if (!name || !email || !updateType || !details) {
      console.error('[accountUpdateEmail] Missing required fields:', { name, email, updateType, details });
      return new Response(JSON.stringify({ success: false, error: 'Missing required fields' }), { status: 400 });
    }

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
      console.log('[accountUpdateEmail] SMTP connection verified');
    } catch (verifyError) {
      console.error('[accountUpdateEmail] SMTP verification failed:', verifyError);
      return new Response(JSON.stringify({ success: false, error: 'SMTP connection failed', details: verifyError instanceof Error ? verifyError.message : verifyError }), { status: 500 });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Account Update Notification - ${updateType}`,
      html: getAccountUpdateEmailTemplate(name, updateType, details),
    };

    try {
      const result = await transporter.sendMail(mailOptions);
      console.log('[accountUpdateEmail] Account update email sent:', result.messageId);
      
      return new Response(JSON.stringify({ success: true, messageId: result.messageId }), { status: 200 });
    } catch (emailError) {
      console.error('[accountUpdateEmail] Failed to send account update email:', emailError);
      return new Response(JSON.stringify({ success: false, error: 'Failed to send account update email', details: emailError instanceof Error ? emailError.message : emailError }), { status: 500 });
    }
  } catch (error) {
    console.error('[accountUpdateEmail] Unexpected error:', error);
    return new Response(JSON.stringify({ success: false, error: error instanceof Error ? error.message : error }), { status: 500 });
  }
} 