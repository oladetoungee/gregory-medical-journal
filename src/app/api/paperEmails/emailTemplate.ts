
export function getUserEmailTemplate(name: string, articleTitle: string) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
        .header { background-color: #373A7A; padding: 20px; text-align: center; color: white; }
        .content { padding: 20px; }
        .footer { background-color: #f4f4f4; text-align: center; padding: 10px; color: #888; font-size: 12px; }
      
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Gregory Medical Journal</h1>
        </div>
        <div class="content">
          <h2>Hello, ${name}</h2>
          <p>Thank you for submitting your manuscript titled "<strong>${articleTitle}</strong>" to Gregory Medical Journal.</p>
          <p>We have received your manuscript and it is currently under review. You will be notified once the review process is completed.</p>
          <a href="https://gregory-medical-journal.vercel.app/" class="button">Visit Our Website</a>
        </div>
        <div class="footer">
          <p>© 2025 Gregory Medical Journal. All rights reserved.</p>
          <p>Contact us at <a href="mailto:gregorymedicaljournal@gmail.com">gregorymedicaljournal@gmail.com</a></p>
        </div>
      </div>
    </body>
    </html>
    `;
  }
  
  export function getAdminEmailTemplate(name: string, articleTitle: string, message: string) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
        .header { background-color: #373A7A; padding: 20px; text-align: center; color: white; }
        .content { padding: 20px; }
        .footer { background-color: #f4f4f4; text-align: center; padding: 10px; color: #888; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Manuscript Submission</h1>
        </div>
        <div class="content">
          <h2>Manuscript Details</h2>
          <p><strong>Title:</strong> ${articleTitle}</p>
          <p><strong>Submitted by:</strong> ${name}</p>
          <p><strong>Message:</strong> ${message}</p>
          <p>Please review the manuscript at your earliest convenience.</p>
          <a href="https://gregory-medical-journal-backend-production.up.railway.app/admin" class="button">Visit Admin Panel</a>
        </div>
        <div class="footer">
          <p>© 2025 Gregory Medical Journal. All rights reserved.</p>
          <p>Contact us at <a href="mailto:gregorymedicaljournal@gmail.com">gregorymedicaljournal@gmail.com</a></p>
        </div>
      </div>
    </body>
    </html>
    `;
  }
  