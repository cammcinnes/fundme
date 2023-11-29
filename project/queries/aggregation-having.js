const { withOracleDB } = require('../appService');

async function getRecurringContributors() {
    return await withOracleDB(async (connection) => {
        try {
            const result = await connection.execute(
                `SELECT IUSERNAME, PROJECTNAME, Count(*)
                 FROM INDIVIDUAL_MAKES_CONTRIBUTION
                 GROUP BY PROJECTNAME, IUSERNAME
                 HAVING Count(*) > 1 ORDER BY IUSERNAME ASC`
            );
            if (result.rows.length > 0) return result.rows;
        } catch (err) {
            throw err;
        }
    });
}

module.exports = {
    getRecurringContributors
};
