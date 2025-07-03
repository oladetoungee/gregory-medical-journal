export function getAccountUpdateEmailTemplate(name: string, updateType: string, details: string) {
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
        .button { display: inline-block; padding: 10px 20px; background-color: #373A7A; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
        .details { background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Account Update Notification</h1>
        </div>
        <div class="content">
          <h2>Hello, ${name}</h2>
          <p>Your Gregory Medical Journal account has been updated successfully.</p>
          
          <div class="details">
            <h3>Update Details:</h3>
            <p><strong>Type:</strong> ${updateType}</p>
            <p><strong>Details:</strong> ${details}</p>
          </div>
          
          <p>If you did not make this change, please contact us immediately.</p>
          
          <a href="https://gregory-medical-journal.vercel.app/dashboard" class="button">Visit Your Dashboard</a>
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