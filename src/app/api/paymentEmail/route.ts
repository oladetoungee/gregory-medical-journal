import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const { name, email, articleTitle, message } = await req.json();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email, // User email
    cc: process.env.ADMIN_EMAIL, // Admin email
    subject: `Payment Confirmation: ${articleTitle}`,
    html: getEmailTemplate(name, articleTitle, message),
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Error sending payment confirmation email:', error);
    return new Response(JSON.stringify({ success: false, error: error }), { status: 500 });
  }
}

function getEmailTemplate(name: string, articleTitle: string, message: string) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: auto; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
        .header { background-color: #373A7A; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .footer { background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 12px; color: #888; }
        .button { color: #373A7A }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Payment Confirmation</h1>
        </div>
        <div class="content">
          <h3>Dear ${name},</h3>
          <p>${message}</p>
          <p>Your paper titled "<strong>${articleTitle}</strong>" is now live on the Gregory Medical Journal website.</p>
          <a href="https://gregory-medical-journal.vercel.app/" class="button">Visit Our Website</a>
        </div>
        <div class="footer">
          <p>© 2024 Gregory Medical Journal. All rights reserved.</p>
          <p>Contact us at <a href="mailto:gregorymedicaljournal@gmail.com">gregorymedicaljournal@gmail.com</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
}
