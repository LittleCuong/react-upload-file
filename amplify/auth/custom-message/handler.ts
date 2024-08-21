import type { CustomMessageTriggerHandler } from "aws-lambda";

export const handler: CustomMessageTriggerHandler = async (event) => {
  if (event.triggerSource === "CustomMessage_ForgotPassword") {
    //   event.response.emailMessage = `Your new one-time code is ${event.request.codeParameter}`;
    event.response.emailMessage = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Password</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }
            .container {
                background-color: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                width: 100%;
                max-width: 400px;
            }
            h2 {
                text-align: center;
                margin-bottom: 20px;
            }
            input[type="password"], input[type="submit"] {
                width: 100%;
                padding: 10px;
                margin: 10px 0;
                border: 1px solid #ccc;
                border-radius: 4px;
                box-sizing: border-box;
            }
            input[type="submit"] {
                background-color: #4CAF50;
                color: white;
                border: none;
                cursor: pointer;
            }
            input[type="submit"]:hover {
                background-color: #45a049;
            }
            .message {
                text-align: center;
                margin-top: 20px;
                font-size: 14px;
            }
            .message a {
                color: #4CAF50;
                text-decoration: none;
            }
            .message a:hover {
                text-decoration: underline;
            }
        </style>
    </head>
    <body>

        <div class="container">
            <h2>Reset Your Password</h2>
            <span>Your new one-time code is ${event.request.codeParameter}</span>
        </div>

    </body>
    </html>
    `;
    event.response.emailSubject = "Reset my password";
  }

  return event;
};
