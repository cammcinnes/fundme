const { withOracleDB } = require('../appService');

async function userExists(username) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT Username FROM ACCOUNT WHERE username=:username`,
            [username],
            { autoCommit: true }
        );
        return result.rows;
    }).catch((err) => {
        throw new Error(err);
    });
}

async function emailExists(email) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT Username FROM ACCOUNT WHERE email=:email`,
            [email],
            { autoCommit: true }
        );
        return result.rows;
    }).catch((err) => {
        throw new Error(err);
    });
}

async function registerAccount(username, password, email) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO Account (Username, Password, CreationDate, Email) VALUES (:username, :password, SYSDATE, :email)`,
            [username, password, email],
            { autoCommit: true }
        );
        if (result.rowsAffected !== 1) {
            throw new Error("rows affected is not 1");
        }
    }).catch((err) => {
        throw new Error(err);
    });
}

async function registerIndividual(username, options) {
    let { dob, firstname, lastname } = options;
    dob = dob ?? null; // should be in form 'YYYY-MM-DD'
    firstname = firstname ?? null;
    lastname = lastname ?? null;
    
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO Individual (Username, DateOfBirth, FirstName, LastName) VALUES (:username, TO_DATE(:dob, 'YYYY-MM-DD'), :firstname, :lastname)`,
            [username, dob, firstname, lastname],
            { autoCommit: true }
        );
        if (result.rowsAffected !== 1) {
            throw new Error("rows affected is not 1");
        }
    }).catch((err) => {
        throw new Error(err);
    });
}

async function registerOrganization(username, options) {
    let { foundedDate, orgName } = options;
    foundedDate = foundedDate ?? null;
    orgName = orgName ?? null;
    
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO Organization (Username, FoundedDate, OrgName) VALUES (:username, TO_DATE(:foundedDate, 'YYYY-MM-DD'), :orgName)`,
            [username, foundedDate, orgName],
            { autoCommit: true }
        );
        if (result.rowsAffected !== 1) {
            throw new Error("rows affected is not 1");
        }
    }).catch((err) => {
        throw new Error(err);
    });
}

async function login(username) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT Password FROM ACCOUNT WHERE username=:username`,
            [username],
            { autoCommit: true }
        );
        return result.rows;
    }).catch(() => {
        return [];
    });
}

// assume username exists
async function getAccountType(username) {
    return await withOracleDB(async (connection) => {
        const resultInd = await connection.execute(
            `SELECT * FROM INDIVIDUAL WHERE username=:username`,
            [username],
            { autoCommit: true }
        );
        if (resultInd.rows.length === 1) {
            return ["individual", username];
        }
        return ["organization", username]
    }).catch((error) => {
        throw Error(error.message);
    });
}

module.exports = {
  userExists,
  emailExists,
  registerAccount,
  registerIndividual,
  registerOrganization,
  login,
  getAccountType
}
