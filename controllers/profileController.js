import profileModel from "../models/profileModel.js";

export const ProfielEdit = async (req, res) => {
    try {
        const { name, email, phone, address, drivingLicense, expiry, contact } = req.body;

        const profile = await profileModel.findOne({ email, name });
        if (!profile) {
            return res.status(404).json({ message: 'User not found, Login first' }, profile);
            console.log(`user not found, Login first ${profile}`);
        }
        const updatedProfile = await profileModel.findOneAndUpdate({ email, name }, {
            phone,
            address,
            drivingLicense,
            expiry,
            contact,
        }, { new: true });
        return res.status(200).json({ success: true, message: 'Profile updated successfully', profile: updatedProfile })

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
        console.log(error);
    }
}


export const GetProfile = async (req, res) => {
    try {
        const { email, name } = req.query;
        const profile = await profileModel.findOne({ email, name });
        if (!profile) {
            return res.status(404).json({ success: false, message: 'Profile not found' });
        }
        return res.status(200).json({ success: true, message: 'profile fetched successfully' });

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
        console.log(error);

    }
}