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
                    padding: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }
                .container {
                    background-color: #ffffff;
                    padding: 30px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    text-align: center;
                    max-width: 400px;
                    width: 100%;
                }
                h1 {
                    color: #333333;
                    font-size: 24px;
                    margin-bottom: 20px;
                }
                .code-box {
                    background-color: #f0f0f0;
                    border: 1px solid #ddd;
                    padding: 15px;
                    font-size: 18px;
                    letter-spacing: 2px;
                    font-weight: bold;
                    color: #333333;
                    margin-bottom: 20px;
                    border-radius: 5px;
                }
                p {
                    font-size: 16px;
                    color: #666666;
                }
                .btn {
                    display: inline-block;
                    padding: 10px 20px;
                    color: #ffffff;
                    background-color: #007bff;
                    border-radius: 5px;
                    text-decoration: none;
                    font-size: 16px;
                }
                .btn:hover {
                    background-color: #0056b3;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Reset Your Password</h1>
                <p>Use the code below to reset your password:</p>
                <div class="code-box">${event.request.codeParameter}</div>
                <p>If you did not request this, please ignore this email.</p>
            </div>
        </body>
        </html>
        `;
    event.response.emailSubject = "Reset my password";
  } else if (event.triggerSource === "CustomMessage_SignUp") {
    event.response.emailMessage = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Account</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f7f7f7;
                margin: 0;
                padding: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }
            .container {
                background-color: #ffffff;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                text-align: center;
                max-width: 400px;
                width: 100%;
            }
            h1 {
                color: #444444;
                font-size: 28px;
                margin-bottom: 10px;
            }
            h2 {
                color: #007bff;
                font-size: 22px;
                margin-bottom: 20px;
            }
            .code-box {
                background-color: #f0f0f0;
                border: 1px solid #ddd;
                padding: 15px;
                font-size: 18px;
                letter-spacing: 2px;
                font-weight: bold;
                color: #333333;
                margin-bottom: 20px;
                border-radius: 5px;
            }
            p {
                font-size: 16px;
                color: #666666;
            }
            .btn {
                display: inline-block;
                padding: 10px 20px;
                color: #ffffff;
                background-color: #28a745;
                border-radius: 5px;
                text-decoration: none;
                font-size: 16px;
            }
            .btn:hover {
                background-color: #218838;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>VoltaRocks</h1>
            <h2>Verify Your Account</h2>
            <p>Your verification code is:</p>
            <div class="code-box">${event.request.codeParameter}</div>
            <p>Please enter this code on the verification page to activate your account.</p>
            <p>If you did not sign up for a VoltaRocks account, please disregard this email.</p>
            <a href="#" class="btn">Verify Account</a>
        </div>
    </body>
    </html>
    `;
    event.response.emailSubject = "Verification code";
  }

  return event;
};
