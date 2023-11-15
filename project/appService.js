const oracledb = require('oracledb');
const loadEnvFile = require('./utils/envUtil');

const envVariables = loadEnvFile('./.env');
const fs = require("fs");

// Database configuration setup. Ensure your .env file has the required database credentials.
const dbConfig = {
    user: envVariables.ORACLE_USER,
    password: envVariables.ORACLE_PASS,
    connectString: `${envVariables.ORACLE_HOST}:${envVariables.ORACLE_PORT}/${envVariables.ORACLE_DBNAME}`
};


// ----------------------------------------------------------
// Wrapper to manage OracleDB actions, simplifying connection handling.
async function withOracleDB(action) {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        return await action(connection);
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

async function login(username, password) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT * FROM ACCOUNT WHERE username=:username AND password=:password`,
            [username, password],
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
            return "individual"
        }
        return "organization"
    }).catch((error) => {
        throw Error(error.message);
    });
}


// ----------------------------------------------------------
// Core functions for database operations
// Modify these functions, especially the SQL queries, based on your project's requirements and design.
async function testOracleConnection() {
    return await withOracleDB(async (connection) => {
        return true;
    }).catch(() => {
        return false;
    });
}

async function fetchDemotableFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM DEMOTABLE');
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function initiateDemotable() {
    return await withOracleDB(async (connection) => {
        try {
            console.log("adding project tables and insert statements...: ");
            const statements = fs.readFileSync("./db-setup.sql", "utf8").split(';');

            for (const statement of statements) {
                if (statement.trim()) {
                    console.log(statement.trim());
                    await connection.execute(statement.trim(), [], { autoCommit: false });
                }
            }
            await connection.commit();
            console.log('Executed db-setup.sql successfully.');
            return true;
        } catch (err) {
            console.log(err);
        }
    }).catch(() => {
        return false;
    });
}

async function insertDemotable(id, name) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO DEMOTABLE (id, name) VALUES (:id, :name)`,
            [id, name],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

async function updateNameDemotable(oldName, newName) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `UPDATE DEMOTABLE SET name=:newName where name=:oldName`,
            [newName, oldName],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

async function countDemotable() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT Count(*) FROM DEMOTABLE');
        return result.rows[0][0];
    }).catch(() => {
        return -1;
    });
}

/**
 * Fetches all data from Account table
 *
 * @returns {Promise<*|boolean>}
 */
async function fetchAccountsFromDB() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM ACCOUNT');
        return result.rows;
    }).catch(() => {
        return false;
    });
}

/**
 * Inserts a new account into Account table with given username, password, and
 * email. CreationDate is produced at time of insertion.
 *
 * @param {string} username - must be unique and not null
 * @param {string} password
 * @param {string} email - must be unique and not null
 * @returns {Promise<*|boolean>}
 */
async function insertAccount(username, password, email) {
    return await withOracleDB(async (connection) => {
        const creationDate = new Date();
        const result = await connection.execute(
            `INSERT INTO ACCOUNT (Username, Password, CreationDate, Email)
             VALUES (:username, :password, :creationDate, :email)`,
            { username, password, creationDate, email },
            { autoCommit: true }
        );
        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

module.exports = {
    testOracleConnection,
    fetchDemotableFromDb,
    initiateDemotable,
    insertDemotable, 
    updateNameDemotable, 
    countDemotable,
    insertAccount,
    fetchAccountsFromDB,
    login,
    getAccountType
};
