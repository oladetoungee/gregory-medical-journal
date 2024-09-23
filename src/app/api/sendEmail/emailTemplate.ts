
export function getEmailTemplate(name: string, message: string) {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: auto;
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #373A7A;
      padding: 20px;
      text-align: center;
      color: white;
    }
    .header img {
      width: 50px;
      margin-bottom: 10px;
    }
    .content {
      padding: 20px;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #373A7A;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 20px;
    }
    .footer {
      background-color: #f4f4f4;
      text-align: center;
      padding: 10px;
      font-size: 12px;
      color: #888;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="@/public/images/hall1.png" alt="Gregory Medical Journal" />
      <h1>Gregory Medical Journal</h1>
    </div>
    <div class="content">
      <h5>${message}</h5>
      <a href="https://gregory-medical-journal.vercel.app/" class="button">Visit Our Website</a>
    </div>
    <div class="footer">
      <p>© 2024 Gregory Medical Journal. All rights reserved.</p>
      <p>Contact us at <a href="mailto:info@gregorymedicaljournal.com">demilad1998@gmail.com</a></p>
    </div>
  </div>
</body>
</html>

    `;
  }
  