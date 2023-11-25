const { withOracleDB } = require('../appService');

async function getContributorsToProject(projectName) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT DISTINCT IUSERNAME
             FROM ORGANIZATION_CREATES_PROJECT, INDIVIDUAL_MAKES_CONTRIBUTION
             WHERE ORGANIZATION_CREATES_PROJECT.PROJECTNAME = INDIVIDUAL_MAKES_CONTRIBUTION.PROJECTNAME
             AND ORGANIZATION_CREATES_PROJECT.PROJECTNAME = :projectName`,
            { projectName },
            { autoCommit: true }
        );
        if (result.rows.length > 0) return result.rows;
        throw Error(`There are no contributors for the given project or the project does not exist.`);
    }).catch((err) => {
        throw err;
    });
}

module.exports = {
    getContributorsToProject
}