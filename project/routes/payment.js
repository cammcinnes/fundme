const express = require('express');
const paymentQuery = require('../queries/payment');

const router = express.Router();

/**
 * Endpoint for inserting payment information into the database.
 *
 * @returns boolean - true if new payment info is successfully inserted into database
 */

router.post('/insert-payment', async(req, res) => {
    try {
        const {ccNumber, username, cvv, address, postalCode, city, province} = req.body;
        if (!ccNumber || !cvv || !address || !postalCode) {
            return res.status(400).json({
                success: false,
                error: "Credit Card Number, CVV, Address and PostalCode are required"
            });
        }
        const ccNumberExists = await paymentQuery.ccExists(ccNumber, username);
        if (ccNumberExists.length > 0) {
            return res.status(400).json({
                success: false,
                error: "Credit Card is already attached to this account!"
            });
        }
        const postalCodeExists = await paymentQuery.postalCodeExists(postalCode);
        if (postalCodeExists.length === 0) {
            await paymentQuery.insertPostalInfo(postalCode, city, province);
        }
        await paymentQuery.insertPaymentInfo(ccNumber, username, cvv, address, postalCode);
        return res.json({success: true});
    } catch (error) {
        return res.status(500).json({success: false, error: error.message});
    }
});

// Get All Payment Info for account
router.get('/', async (req, res) => {
    try {
        const info = await paymentQuery.fetchAllInfos();
        return res.json({ success: true, result: info });
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message});
    }
});

module.exports = router;