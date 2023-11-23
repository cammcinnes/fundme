const express = require('express');
const paymentQuery = require('../queries/payment');
const authQuery = require("../queries/auth");

const router = express.Router();

/**
 * Endpoint for inserting payment information into the database.
 *
 * @returns boolean - true if new payment info is successfully inserted into database
 */

router.post('/payment', async(req, res) => {
    const { ccNumber, cvv, address, postalCode} = req.body;
    if (!ccNumber || !cvv || !address || !postalCode) {
        return res.status(400).json({success: false, error: "Credit Card Number, CVV, Address and PostalCode are required"});
    }
    const ccNumberExists = await paymentQuery.ccExists(ccNumber);
    if (ccNumberExists.length > 0) {
        return res.json({ success: true });
    }
    const insertResult = await paymentQuery.insertPaymentInfo(ccnumber, cvv, address, postalCode);
    if (insertResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

module.exports = router;