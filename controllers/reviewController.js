import reviewModel from "../models/reviewModel.js";
import carModel from "../models/carModel.js";

export const addReview = async (req, res) => {
    try {
        const { userName, rating, comment, carId } = req.body;
        if (!userName || !rating || !comment) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const review = await reviewModel.create({
            userName,
            rating,
            comment,
            carId,
        });

        const reviews = await reviewModel.find({ carId }); // get all review of the this car
        const totalRating = reviews.reduce((sum, item) => sum + item.rating, 0); // calculate the total rating
        const averageRating = totalRating / reviews.length; // calculate the average 

        await carModel.findByIdAndUpdate(carId, {
            rating: averageRating.toFixed(1),
            totalReviews: reviews.length
        });

        res.status(201).json({ success: true, message: "Review added successfully", review });

    } catch (error) {
        console.log("Add Review Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });

    }
}


export const getReview = async (req, res) => {
    try {
        const reviews = await reviewModel.find().populate("carId").sort({ createdAt: -1 });
        res.status(200).json({ success: true, reviews });

    } catch (error) {
        console.log("Get Review Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}


export const deleteReview = (req, res) => {
    try {
        const { id } = req.params;
        await reviewModel.findByIdAndDelete(id);
        req.status(200).json({ success: true, message: "Review deleted successfully" });

    } catch (error) {
        console.log("Delete Review Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}


export const getCarReviews = async (req, res) => {
    try {
        const reviews = await reviewModel.find({
            carId: req.params.carId,
        });
        res.status(200).json({ success: true, reviews });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}; 