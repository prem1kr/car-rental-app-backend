import offerModel from "../models/offerModel.js";

export const addOffer = async (req, res) => {
    try {
        const { title, discount, description, validity } = req.body;
        if (!title || !discount || !description || !validity) {
            return res.status(400).json({ message: "Please fill all details", });
        }

        const offers = await offerModel.create({
            title,
            discount,
            description,
            validity
        });
        return res.status(201).json({ message: "Offer added successfully", offers });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
};



export const getOffers = async (req, res) => {
    try {
        const offers = await offerModel.find().sort({ createdAt: -1 });
        return res.status(200).json({ message: "Offers fetched successfully", offers });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error", });
    }
};



export const deleteOffer = async (req, res) => {
    try {
        const { id } = req.params;
        const offer = await offerModel.findById(id);
        if (!offer) {
            return res.status(404).json({ message: "Offer not found" });
        }

        await offerModel.findByIdAndDelete(id);
        return res.status(200).json({ message: "Offer deleted successfully", });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error", });
    }
};
