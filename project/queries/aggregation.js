const { withOracleDB } = require('../appService');


// Gets the contributors that have made over the average donation amount per individual and how many times they did
async function fetchTopContributors() {
    return await withOracleDB(async (connection) => {
        const topContributors = await connection.execute(
            `SELECT IUSERNAME, count(*)
             FROM INDIVIDUAL_MAKES_CONTRIBUTION
             WHERE AMOUNT > (SELECT avg(AMOUNT)
                             FROM INDIVIDUAL_MAKES_CONTRIBUTION)
             GROUP BY IUSERNAME`,
            {},
            { autoCommit: true }
        );
        return topContributors.rows;
    }).catch((err) => {
        throw err;
    });
}

async function getAllUserContributions(username) {
    return await withOracleDB(async (connection) => {
        const userContributions = await connection.execute(
            `SELECT PROJECTNAME, SUM(amount)
             FROM INDIVIDUAL_MAKES_CONTRIBUTION
             WHERE IUSERNAME =:username
             GROUP BY IUSERNAME, PROJECTNAME`,
            {username},
            { autoCommit: true }
        );
        return userContributions.rows;
    }).catch((err) => {
        throw err;
    });
}

module.exports = {
    fetchTopContributors,
    getAllUserContributions
}