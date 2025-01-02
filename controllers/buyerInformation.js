const BuyerInfo = require('../models/BuyerInformation');

// Get all buyer information
exports.getAllBuyers = async (req, res) => {
    try {
        const buyers = await BuyerInfo.find();
        res.status(200).json(buyers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get buyer information by ID
exports.getBuyerById = async (req, res) => {
    try {
        const buyer = await BuyerInfo.findById(req.params.id);
        if (!buyer) return res.status(404).json({ message: 'Buyer not found' });
        res.status(200).json(buyer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new buyer information
exports.createBuyer = async (req, res) => {
    const buyer = new BuyerInfo(req.body);
    try {
        const newBuyer = await buyer.save();
        res.status(201).json(newBuyer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update buyer information
exports.updateBuyer = async (req, res) => {
    try {
        const updatedBuyer = await BuyerInfo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBuyer) return res.status(404).json({ message: 'Buyer not found' });
        res.status(200).json(updatedBuyer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete buyer information
exports.deleteBuyer = async (req, res) => {
    try {
        const deletedBuyer = await BuyerInfo.findByIdAndDelete(req.params.id);
        if (!deletedBuyer) return res.status(404).json({ message: 'Buyer not found' });
        res.status(200).json({ message: 'Buyer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};