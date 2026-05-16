import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
    carName: {
        type: String,
        required: true,
        trim: true
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    carNumber: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        uppercase: true,
    },
    color: {
        type: String,
        required: true,
        trim: true
    },
    fuelType: {
        type: String,
        required: true,
        enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG']
    },
    price: {
        type: String,
        required: true
    },
    images: [
        {
            type: String,
        }
    ],
    available: {
        type: Boolean,
        default: true
    },
    rating: {
        type: Number,
        default: 0
    },
    totalReviews: {
        type: Number,
        default: 0
    },
    createAt: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true });

export default mongoose.model('Car', carSchema);
export const AddCar = async (req, res) => {

    try {
        const { carName, brand, carNumber, color, fuelType, price, images } = req.body;
        if (!carName || !brand || !carNumber || !color || !fuelType || !price) {
            return res.status(400).json({
                success: false, message: "Please fill all fields",
            });
        }

        const existingCar = await carModel.findOne({ carNumber: carNumber.toUpperCase() });
        if (existingCar) {
            return res.status(400).json({ success: false, message: "Car already exists", });
        }

        // CREATE CAR
        const newCar = await carModel.create({
            carName,
            brand,
            carNumber: carNumber.toUpperCase(),
            color,
            fuelType,
            price,
            images: images || [],

        });

        return res.status(201).json({ success: true, message: "Car added successfully", car: newCar });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const EditCar = async (req, res) => {

    try {
        const { id } = req.params;
        const updatedCar = await carModel.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        res.status(200).json({ success: true, car: updatedCar });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};


export const RemoveCar = async (req, res) => {

    try {
        const { id } = req.params;
        const car = await carModel.findById(id);
        if (!car) {
            return res.status(404).json({ success: false, message: "Car not found" });
        }

        // DELETE CAR
        await carModel.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Car removed successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const getCar = async (req, res) => {

    try {
        const carData = await carModel.find();
        if (!carData || carData.length === 0) {
            return res.status(404).json({ success: false, message: "No cars found" });
        }

        return res.status(200).json({ success: true, totalCars: carData.length, cars: carData });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};


export const TotalCars = async (req, res) => {
    try {
        const total = await carModel.countDocuments();
        return res.status(200).json({ success: true, message: "user count successfully fetched", total });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "server error", error: error.message });
    }
}
