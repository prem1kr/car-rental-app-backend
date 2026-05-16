import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },

    comment: {
        type: String,
        required: true
    },

    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
    }
}, { timestamps: true });

export default mongoose.model("Review", reviewSchema);
