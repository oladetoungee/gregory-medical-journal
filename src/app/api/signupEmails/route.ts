
import nodemailer from 'nodemailer';
import { getUserSignupEmailTemplate, getAdminSignupEmailTemplate } from './emailTemplate';

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const { name, email } = req.body;

    try {
      // Configure Nodemailer transport
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
      });

       // Email to the user
       await transporter.sendMail({
        from: '"Gregory Medical Journal" <noreply@gregoryjournal.com>',
        to: email,
        subject: 'Welcome to Gregory Medical Journal!',
        html: getUserSignupEmailTemplate(name), // Use the user email template
      });

      // Email to the admin
      await transporter.sendMail({
        from: '"Gregory Medical Journal" <noreply@gregoryjournal.com>',
        to: 'admin@gregoryjournal.com',
        subject: 'New User Signup Notification',
        html: getAdminSignupEmailTemplate(name, email), // Use the admin email template
      });

      res.status(200).json({ message: 'Signup confirmation emails sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
