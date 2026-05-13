import sendEmail from '../utils/sendEmail.js';

export const bookCar = async (req, res) => {
    try {

        // booking logic here

        await sendEmail(
            'user@gmail.com',
            'Booking Confirmed',
            'Your car booking is successful!'
        );

        res.status(200).json({
            success: true,
            message: 'Booking confirmed and email sent',
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};