import transporter from '../config/miail.js';

const sendEmail = async (to, name) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: to,
            subject: 'Welcome to DriveNow',
            html: `
                <div style="font-family:sans-serif;">
                    <h2>Welcome ${name} 🚗</h2>
                    <p>Your account has been created successfully.</p>
                    <p>Thank you for joining DriveNow.</p>
                </div>
            `,
        });
        console.log('Email Sent Successfully');
    } catch (error) {
        console.log('Email Error:', error);
    }
};

export default sendEmail;