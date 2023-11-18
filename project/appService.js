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

// <----- START AUTH SQL ----->
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
        return result.rowsAffected === 1 ? true : false
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
        return result.rowsAffected === 1 ? true : false
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
        return result.rowsAffected === 1 ? true : false
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
            return "individual"
        }
        return "organization"
    }).catch((error) => {
        throw Error(error.message);
    });
}
// <----- END AUTH SQL ----->

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
            const statements = fs.readFileSync("./db-setup.sql", "utf8").split('--\n');

            for (const statement of statements) {
                const trimStatement = statement.trim();
                if (trimStatement) {
                    if (trimStatement.slice(-4) === "END;") {
                        await connection.execute(statement.trim(), [], { autoCommit: true });
                    } else {
                        await connection.execute(statement.trim().slice(0, -1), [], { autoCommit: true });
                    }
                }
            }
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
        const result = await connection.execute('SELECT * FROM organization');
        return result.rows;
    }).catch((err) => {
        throw err;
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
        await connection.execute(
            `INSERT INTO ACCOUNT (Username, Password, CreationDate, Email)
             VALUES (:username, :password, :creationDate, :email)`,
            { username, password, creationDate, email },
            { autoCommit: true }
        );
        return true;
    }).catch((err) => {
        throw err;
    });
}

// Fetch all projects
async function fetchAllProjects() {
    return await withOracleDB(async (connection) => {
        const allProjects = await connection.execute(
            `SELECT *
             FROM ORGANIZATION_CREATES_PROJECT`,
            {},
            { autoCommit: true }
        );
        return allProjects.rows;
    }).catch((err) => {
        throw err;
    });
}

// Fetches all projects owned by an organization
async function fetchOrgProjects(username) {
    return await withOracleDB(async (connection) => {
        const orgProjects = await connection.execute(
            `SELECT *
             FROM ORGANIZATION_CREATES_PROJECT
             WHERE OUSERNAME = :username`,
            { username },
            { autoCommit: true }
        );
        return orgProjects.rows;
    }).catch((err) => {
        throw err;
    });
}

// Fetches all data relating to a project: Project info, payment tiers, and posts
// Returns an object { info: projectInfo, paymentTiers: projectPayTiers, posts: projectPosts }
async function fetchProjectData(projectName) {
    return await withOracleDB(async (connection) => {
        const projectInfo = await connection.execute(
            `SELECT *
             FROM ORGANIZATION_CREATES_PROJECT
             WHERE ProjectName = :projectName`,
            { projectName },
            { autoCommit: true }
        );

        const projectPayTiers = await connection.execute(
            `SELECT *
             FROM PaymentTier
             WHERE ProjectName = :projectName`,
            { projectName },
            { autoCommit: true }
        );

        const projectPosts = await connection.execute(
            `SELECT *
             FROM ORGANIZATION_CREATES_POST
             WHERE ProjectName = :projectName`,
            { projectName },
            { autoCommit: true }
        );

        return { info: projectInfo, paymentTiers: projectPayTiers, posts: projectPosts };
    }).catch((err) => {
        throw err;
    });
}

async function deleteProject(projectName) {
    return await withOracleDB(async (connection) => {
        await connection.execute(
            `DELETE
             FROM ORGANIZATION_CREATES_PROJECT
             WHERE ProjectName = :projectName`,
            { projectName },
            { autoCommit: true }
        );
        return true;
    }).catch((err) => {
        throw err;
    });
}

async function createPaymentTier(payTierID, projectName, orgUsername, description, minAmount, maxAmount) {
    return await withOracleDB(async (connection) => {
        await connection.execute(
            `INSERT INTO PaymentTier(PayTierID, ProjectName, OUserName, Description, minAmount, maxAmount)
             VALUES (:payTierID, :projectName, :orgUsername, :description, :minAmount, :maxAmount)`,
            { payTierID, projectName, orgUsername, description, minAmount, maxAmount },
            { autoCommit: true }
        );
        return true;
    }).catch((err) => {
        throw err;
    });
}

async function deletePaymentTier(payTierID) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `DELETE
             FROM PAYMENTTIER
             WHERE PAYTIERID = :payTierID`,
            { payTierID },
            { autoCommit: true }
        );
        if (result.rowsAffected) return true;
        throw Error(`There exists no payment tier with given payTierID (${payTierID})`);
    }).catch((err) => {
        throw err;
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
    registerAccount,
    userExists,
    emailExists,
    registerIndividual,
    registerOrganization,
    fetchAllProjects,
    fetchOrgProjects,
    fetchProjectData,
    deleteProject,
    createPaymentTier,
    deletePaymentTier
};
