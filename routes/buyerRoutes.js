const express = require('express');
const buyerInfoController = require('../controllers/buyerInformation');

const router = express.Router();

// Define routes
router.get('/buyers', buyerInfoController.getAllBuyers);
router.get('/buyers/:id', buyerInfoController.getBuyerById);
router.post('/buyers', buyerInfoController.createBuyer);
router.put('/buyers/:id', buyerInfoController.updateBuyer);
router.delete('/buyers/:id', buyerInfoController.deleteBuyer);

module.exports = router;