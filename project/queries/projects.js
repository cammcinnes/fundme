const { withOracleDB } = require('../appService');

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
  fetchAllProjects,
  fetchOrgProjects,
  fetchProjectData,
  deleteProject,
  createPaymentTier,
  deletePaymentTier
}
