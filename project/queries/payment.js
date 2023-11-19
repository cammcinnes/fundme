const { withOracleDB } = require('../appService');

/**
 * Inserts a new payment into Payment Information table with given ccnumber, cvv, address and
 * postal code. Postal Code must already exist in PostalCode_Location table.
 *
 * @param {int} CCNumber - not null and char length = 16
 * @param {int} cvv - not null and char length = 3
 * @param {string} address - not null
 * @param {int} postalCode - not null and char length = 6
 * @returns {Promise<*|boolean>}
 */
async function insertPaymentInfo(CCNumber, cvv, address, postalCode) {
    return await withOracleDB(async (connection) => {
        await connection.execute(
            `INSERT INTO PaymentInformation (CCNumber, CVV, Address, PostalCode)
             VALUES (:CCNumber, :CVV, :Address, :PostalCode)`,
            { CCNumber, cvv, address, postalCode},
            { autoCommit: true }
        );
        return true;
    }).catch((err) => {
        throw err;
    });
}

module.exports = {
    insertPaymentInfo
}