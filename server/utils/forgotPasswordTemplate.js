const forgotPasswordTemplate = ({ name, otp }) => {
    return `
    <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
            <!-- Header -->
            <div style="background-color: #4caf50; color: #ffffff; text-align: center; padding: 20px 10px;">
                <h1 style="margin: 0; font-size: 24px;">Password Reset Request</h1>
            </div>

            <!-- Body -->
            <div style="padding: 20px;">
                <p style="font-size: 18px; margin: 0 0 10px;">Dear ${name},</p>
                <p style="font-size: 16px; margin: 0 0 20px;">
                    You requested a password reset. Please use the following OTP code to reset your password:
                </p>

                <!-- OTP -->
                <div style="text-align: center; margin: 20px 0;">
                    <span style="display: inline-block; padding: 15px 30px; background-color: #f3f4f6; border: 1px solid #ddd; border-radius: 5px; font-size: 24px; font-weight: bold; color: #4caf50;">
                         ${otp}
                    </span>
                </div>

                <p style="font-size: 16px; margin: 0 0 20px;">
                    This OTP is valid for <strong>1 hour</strong>. Enter this code on the Blinkit website to proceed with resetting your password.
                </p>
                <p style="font-size: 14px; color: #555; margin: 0 0 10px;">
                    If you didn’t request this, please ignore this email or contact support.
                </p>
            </div>

            <!-- Footer -->
            <div style="background-color: #f3f4f6; color: #555; text-align: center; padding: 10px;">
                <p style="margin: 0; font-size: 14px;">
                    Best regards,<br>
                    The Blinkit Team
                </p>
            </div>
        </div>
    </div>
    `;
};

export default forgotPasswordTemplate;