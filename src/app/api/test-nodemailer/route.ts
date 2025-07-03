import nodemailer from 'nodemailer';

export async function GET() {
  try {
    // Log environment variables (without exposing passwords)
    console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'Set' : 'Not set');
    console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set' : 'Not set');
    console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL);

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Email credentials not found in environment variables'
        }), 
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Test the connection first
    try {
      await transporter.verify();
      console.log('SMTP connection verified successfully');
    } catch (verifyError) {
      console.error('SMTP verification failed:', verifyError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'SMTP connection failed',
          details: verifyError instanceof Error ? verifyError.message : 'Unknown error'
        }), 
        { status: 500 }
      );
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: ['demilad1998@gmail.com', 'gregorymedicaljournal@gmail.com'], // Send to both emails
      subject: 'Test Email from Nodemailer - Gregory Medical Journal',
      html: `
        <h1>Test Email</h1>
        <p>This is a test email sent using nodemailer with Gmail.</p>
        <p>If you receive this, nodemailer is working correctly!</p>
        <p>Sent at: ${new Date().toISOString()}</p>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Test email sent successfully using nodemailer',
        messageId: result.messageId,
        sentTo: ['demilad1998@gmail.com', 'gregorymedicaljournal@gmail.com']
      }), 
      { status: 200 }
    );
  } catch (error) {
    console.error('Nodemailer test error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        details: error
      }), 
      { status: 500 }
    );
  }
} 