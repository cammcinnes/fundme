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

module.exports = {
    testOracleConnection,
    initiateDemotable,
    withOracleDB
};
