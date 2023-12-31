const { withOracleDB } = require('../appService');

/**
 * Checks if Credit Card Number already exists in the database.
 *
 * @param {string} ccNumber
 * @param {string} username
 * @returns {Promise<*|boolean>}
 */
async function ccExists(ccNumber, username) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT CCNumber, IUsername FROM PaymentInformation WHERE CCNumber=:ccNumber AND IUsername=:username`,
            [ccNumber, username],
            { autoCommit: true }
        );
        return result.rows;
    }).catch((err) => {
        throw new Error(err);
    });
}
/**
 * Checks if PostalCode already exists in the database.
 *
 * @param {string} postalCode
 * @returns {Promise<*|boolean>}
 */
async function postalCodeExists(postalCode) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT PostalCode FROM PostalCode_Location WHERE PostalCode=:postalCode`,
            [postalCode],
            { autoCommit: true }
        );
        return result.rows;
    }).catch((err) => {
        throw new Error(err);
    });
}


/**
 * Inserts a new payment into Payment Information table with given ccnumber, cvv, address and
 * postal code. Postal Code must already exist in PostalCode_Location table.
 *
 * @param {int} CCNumber - not null and char length = 16
 * @param {string} iUsername
 * @param {int} cvv - not null and char length = 3
 * @param {string} address - not null
 * @param {int} postalCode - not null and char length = 6
 * @returns {Promise<*|boolean>}
 */
async function insertPaymentInfo(CCNumber, iUsername, cvv, address, postalCode) {
    return await withOracleDB(async (connection) => {
        await connection.execute(
            `INSERT INTO PaymentInformation (CCNumber, IUsername, CVV, Address, PostalCode)
             VALUES (:CCNumber, :IUsername, :CVV, :Address, :PostalCode)`,
            { CCNumber, iUsername, cvv, address, postalCode},
            { autoCommit: true }
        );
        return true;
    }).catch((err) => {
        throw err;
    });
}

async function insertPostalInfo(postalCode, city, province) {
    return await withOracleDB(async (connection) => {
        await connection.execute(
            `INSERT INTO PostalCode_Location (PostalCode, City, Province)
             VALUES (:PostalCode, :City, :Province)`,
            {postalCode, city, province},
            { autoCommit: true }
        );
        return true;
    }).catch((err) => {
        throw err;
    });
}
async function fetchAllInfos(username) {
    return await withOracleDB(async (connection) => {
        const allInfo = await connection.execute(
            `SELECT * 
            FROM PaymentInformation NATURAL JOIN POSTALCODE_LOCATION 
            WHERE IUsername=:username`,
            { username },
            { autoCommit: true }
        );
        return allInfo.rows;
    }).catch((err) => {
        throw err;
    });
}

// async function updatePostalInfo(oldPostalCode, postalCode, city, province) {
//     return await withOracleDB(async (connection) => {
//         await connection.execute(
//             `UPDATE PostalCode_Location
//              SET PostalCode=:postalCode, City=:city, Province=:province
//              WHERE PostalCode=:oldPostalCode`,
//             {oldPostalCode, postalCode, city, province},
//             { autoCommit: true }
//         );
//         return true;
//     }).catch((err) => {
//         throw err;
//     });
// }

async function updateAllPaymentInfo(CCNumber, iUsername, cvv, address, postalCode) {
    return await withOracleDB(async (connection) => {
        await connection.execute(
            `UPDATE PaymentInformation 
             SET CVV=:cvv, Address=:address, PostalCode=:postalCode
             WHERE CCNumber=:CCNumber AND IUsername=:iUsername`,
            { CCNumber, iUsername, cvv, address, postalCode},
            { autoCommit: true }
        );
        return true;
    }).catch((err) => {
        throw err;
    });
}
async function deletePostalInfo(oldPostalCode) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `DELETE
             FROM PostalCode_Location
             WHERE PostalCode = :oldPostalCode`,
            {oldPostalCode},
            {autoCommit: true}
        );
        if (result.rowsAffected > 0) return true;
        throw Error(`There exists no PostalCode Location with given postalCode.`);
    }).catch((err) => {
        throw err;
    });
}
async function updateCVV(CCNumber, iUsername, cvv) {
    return await withOracleDB(async (connection) => {
        await connection.execute(
            `UPDATE PaymentInformation 
             SET CVV=:cvv
             WHERE CCNumber=:CCNumber AND IUsername=:iUsername`,
            { CCNumber, iUsername, cvv},
            { autoCommit: true }
        );
        return true;
    }).catch((err) => {
        throw err;
    });
}
async function updateAddress(CCNumber, iUsername, address) {
    return await withOracleDB(async (connection) => {
        await connection.execute(
            `UPDATE PaymentInformation 
             SET Address=:address
             WHERE CCNumber=:CCNumber AND IUsername=:iUsername`,
            { CCNumber, iUsername, address},
            { autoCommit: true }
        );
        return true;
    }).catch((err) => {
        throw err;
    });
}

async function updateCVVAddress(CCNumber, iUsername, cvv, address) {
    return await withOracleDB(async (connection) => {
        await connection.execute(
            `UPDATE PaymentInformation 
             SET CVV=:cvv, Address=:address
             WHERE CCNumber=:CCNumber AND IUsername=:iUsername`,
            { CCNumber, iUsername, cvv, address},
            { autoCommit: true }
        );
        return true;
    }).catch((err) => {
        throw err;
    });
}

async function updateCVVPostal(CCNumber, iUsername, cvv, postalCode) {
    return await withOracleDB(async (connection) => {
        await connection.execute(
            `UPDATE PaymentInformation 
             SET CVV=:cvv, PostalCode=:postalCode
             WHERE CCNumber=:CCNumber AND IUsername=:iUsername`,
            { CCNumber, iUsername, cvv, postalCode},
            { autoCommit: true }
        );
        return true;
    }).catch((err) => {
        throw err;
    });
}
async function updatePostal(CCNumber, iUsername, postalCode) {
    return await withOracleDB(async (connection) => {
        await connection.execute(
            `UPDATE PaymentInformation 
             SET PostalCode=:postalCode
             WHERE CCNumber=:CCNumber AND IUsername=:iUsername`,
            { CCNumber, iUsername, postalCode},
            { autoCommit: true }
        );
        return true;
    }).catch((err) => {
        throw err;
    });
}

async function updateAddressPostal(CCNumber, iUsername, address, postalCode) {
    return await withOracleDB(async (connection) => {
        await connection.execute(
            `UPDATE PaymentInformation 
             SET Address=:address, PostalCode=:postalCode
             WHERE CCNumber=:CCNumber AND IUsername=:iUsername`,
            { CCNumber, iUsername, address, postalCode},
            { autoCommit: true }
        );
        return true;
    }).catch((err) => {
        throw err;
    });
}
module.exports = {
    insertPaymentInfo,
    ccExists,
    postalCodeExists,
    insertPostalInfo,
    fetchAllInfos,
    updateAllPaymentInfo,
    deletePostalInfo,
    updateCVV,
    updateAddress,
    updateCVVAddress,
    updateCVVPostal,
    updatePostal,
    updateAddressPostal
}