const { withOracleDB } = require('../appService');

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

async function fetchAllProjectNames() {
    return await withOracleDB(async (connection) => {
        const allProjectNames = await connection.execute(
            `SELECT PROJECTNAME
             FROM ORGANIZATION_CREATES_PROJECT`,
            {},
            { autoCommit: true }
        );
        return allProjectNames.rows;
    }).catch((err) => {
        throw err;
    });
}

async function fetchOrgProjects(username) {
    return await withOracleDB(async (connection) => {
        const orgProjects = await connection.execute(
            `SELECT PROJECTNAME, DESCRIPTION, BALANCE
             FROM ORGANIZATION_CREATES_PROJECT
             WHERE OUSERNAME = :username`,
            { username },
            { autoCommit: true }
        );
        if (orgProjects.rows.length > 0) return orgProjects.rows;
        throw Error("The username does not exist or the organization has no associated projects.");
    }).catch((err) => {
        throw err;
    });
}

// Fetches all data relating to a project: Project info, payment tiers, and posts
// Returns an object { info: projectInfo, paymentTiers: projectPayTiers, posts: projectPosts }.
async function fetchProjectData(projectName) {
    return await withOracleDB(async (connection) => {
        const projectInfo = await connection.execute(
            `SELECT PROJECTNAME, OUSERNAME, DESCRIPTION, BALANCE
             FROM ORGANIZATION_CREATES_PROJECT
             WHERE ProjectName = :projectName`,
            { projectName },
            { autoCommit: true }
        );
        const projectPayTiers = await connection.execute(
            `SELECT DESCRIPTION, MINAMOUNT, MAXAMOUNT
             FROM PaymentTier
             WHERE ProjectName = :projectName`,
            { projectName },
            { autoCommit: true }
        );
        const projectPosts = await connection.execute(
            `SELECT POSTID, CONTENT, IMAGEURL, TIMESTAMP
             FROM ORGANIZATION_CREATES_POST
             WHERE PROJECTNAME = :projectName`,
            { projectName },
            { autoCommit: true }
        );
        if (projectInfo.rows.length > 0) {
            return { info: projectInfo.rows, paymentTiers: projectPayTiers.rows, posts: projectPosts.rows };
        }
        throw Error("There is no existing project with given projectName.");
    }).catch((err) => {
        throw err;
    });
}

async function createProject(projectName, orgUsername, description, balance) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO ORGANIZATION_CREATES_PROJECT (ProjectName, OUsername, Description, Balance)
             VALUES (:projectName, :orgUsername, :description, :balance)`,
            { projectName, orgUsername, description, balance },
            { autoCommit: true }
        );
        return result.rowsAffected > 0;
    }).catch((err) => {
        throw err;
    });
}

async function deleteProject(projectName) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `DELETE
             FROM ORGANIZATION_CREATES_PROJECT
             WHERE ProjectName = :projectName`,
            { projectName },
            { autoCommit: true }
        );
        if (result.rowsAffected > 0) return true;
        throw Error(`There exists no project with given projectName.`);
    }).catch((err) => {
        throw err;
    });
}

async function createPaymentTier(payTierID, projectName, orgUsername, description, minAmount, maxAmount) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO PaymentTier(PayTierID, ProjectName, OUserName, Description, minAmount, maxAmount)
             VALUES (:payTierID, :projectName, :orgUsername, :description, :minAmount, :maxAmount)`,
            { payTierID, projectName, orgUsername, description, minAmount, maxAmount },
            { autoCommit: true }
        );
        return result.rowsAffected > 0;
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
        if (result.rowsAffected > 0) return true;
        throw Error(`There exists no payment tier with given payTierID.`);
    }).catch((err) => {
        throw err;
    });
}

module.exports = {
    fetchAllProjects,
    fetchOrgProjects,
    fetchProjectData,
    createProject,
    deleteProject,
    createPaymentTier,
    deletePaymentTier,
    fetchAllProjectNames
}
