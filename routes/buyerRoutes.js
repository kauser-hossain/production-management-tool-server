
const express = require('express');
const buyerInfoController = require('../controllers/buyerInformation');

const router = express.Router();

// Define routes
router.get('/', buyerInfoController.getAllBuyers);
router.get('/:id', buyerInfoController.getBuyerById);
router.post('/', buyerInfoController.createBuyer);
router.put('/:id', buyerInfoController.updateBuyer);
router.delete('/:id', buyerInfoController.deleteBuyer);

module.exports = router;
