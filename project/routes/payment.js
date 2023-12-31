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

// update existing payment information
router.post('/update-payment', async(req, res) => {
    try {
        const {cardNumber, username, newCVV, newAddress, postalCode, newPostalCode, newCity, newProvince, city, province} = req.body;
        if (!newCVV && !newAddress && !newPostalCode) {
            return res.status(400).json({
                success: false,
                error: "CVV, Address or PostalCode is required"
            });
        }
        if (newPostalCode){
            if (!newCity && !newProvince) {
               await paymentQuery.insertPostalInfo(newPostalCode, city, province);
            } else if (!newProvince && newCity) {
                await paymentQuery.insertPostalInfo(newPostalCode, newCity, province);
            } else {
                await paymentQuery.insertPostalInfo(newPostalCode, newCity, newProvince);
            }
        }

        if (!newAddress && !newPostalCode){
            await paymentQuery.updateCVV(cardNumber, username, newCVV);
        } else if (!newCVV && !newPostalCode){
            await paymentQuery.updateAddress(cardNumber, username, newAddress);
        } else if (!newCVV && !newAddress) {
            await paymentQuery.updatePostal(cardNumber, username, newPostalCode);
        } else if (!newAddress) {
            await paymentQuery.updateCVVPostal(cardNumber,username,newCVV, newPostalCode);
        } else if (!newCVV) {
            await paymentQuery.updateAddressPostal(cardNumber,username, newAddress, newPostalCode);
        } else if (!newPostalCode) {
            await paymentQuery.updateCVVAddress(cardNumber,username,newCVV, newAddress);
        } else {
            await paymentQuery.updateAllPaymentInfo(cardNumber, username, newCVV, newAddress, newPostalCode);
        }
        return res.json({success: true});
    } catch (error) {
        return res.status(500).json({success: false, error: error.message});
    }
});

// Get All Payment Info for account
router.get('/:username', async (req, res) => {
    try {
        const { username } = req.params;
        if (!username)
            return res.status(400).json({success: false, error: "Username is required."});
        const info = await paymentQuery.fetchAllInfos(username);
        return res.json({ success: true, result: info });
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message});
    }
});

module.exports = router;