const express = require('express');
const projectQuery = require('../queries/projects');

const router = express.Router();

/**
 * Endpoint for inserting payment information into the database.
 *
 * @returns boolean - true if new payment info is successfully inserted into database
 */

router.post('/payment', async(req, res) => {
    const { ccnumber, cvv, address, postalCode} = req.body;
    const insertResult = await appService.insertPaymentInfo(ccnumber, cvv, address, postalCode);
    if (insertResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

module.exports = router;