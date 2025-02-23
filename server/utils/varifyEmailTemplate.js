const varifyEmailTemplate = ({name, url}) => {
    return `

   <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
    <p style="font-size: 18px;">Dear ${name},</p>
    
    <p style="font-size: 16px;">
        Thank you for registering with Blinkit! Please click the button below to verify your email address.
    </p>

    <a href="${url}" style="
        display: inline-block;
        color: #fff;
        background-color: #007bff;
        padding: 12px 24px;
        margin-top: 20px;
        text-decoration: none;
        border-radius: 5px;
        font-size: 16px;
        font-weight: bold;
        text-align: center;">
        Verify Email
    </a>
    
    <p style="font-size: 14px; color: #555;">
        Best regards,<br>
        The Blinkit Team
    </p>
</div>

    `
}

export default varifyEmailTemplate;