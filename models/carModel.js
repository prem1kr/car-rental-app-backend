import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
    carName: {
        type: String,
        require: true,
        trim: true
    },
    brand: {
        type: String,
        require: true,
        trim: true
    },
    carNumber: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        uppercase: true,
    },
    color: {
        type: String,
        require: true,
        trim: true
    },
    fuelType: {
        type: String,
        require: true,
        enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG']
    },
    price: {
        type: String,
        require: true
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