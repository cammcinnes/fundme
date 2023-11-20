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

async function fetchOrgProjects(username) {
    return await withOracleDB(async (connection) => {
        const orgProjects = await connection.execute(
            `SELECT *
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
// Returns an object { info: projectInfo, paymentTiers: projectPayTiers, posts: projectPosts }
async function fetchProjectData(projectName) {
    return await withOracleDB(async (connection) => {
        const projectInfo = await connection.execute(
            `SELECT PROJECTNAME, DESCRIPTION, BALANCE
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

        // Returned array:
        // [
        //  [
        //   Post1 content, Post1 ImageURL, Post1 timestamp,
        //    "Commenter1 username", "Comment1 timestamp", "Comment1 content",
        //    ...
        //    "CommenterN username", "CommentN timestamp", "CommentN content"
        //  ],
        //  [
        //    ...post2 with comments... (same template)
        //  ],
        //   ...
        //  [
        //    ...postN with comments
        //  ]
        // ]
        const projectPostsAndComments = await connection.execute(
            `SELECT ORGANIZATION_CREATES_POST.CONTENT,
                    IMAGEURL,
                    ORGANIZATION_CREATES_POST.TIMESTAMP,
                    USERNAME,
                    ACCOUNT_WRITES_COMMENT_ON_POST.TIMESTAMP,
                    ACCOUNT_WRITES_COMMENT_ON_POST.CONTENT
             FROM ORGANIZATION_CREATES_POST, ACCOUNT_WRITES_COMMENT_ON_POST
             WHERE ORGANIZATION_CREATES_POST.POSTID = ACCOUNT_WRITES_COMMENT_ON_POST.POSTID
             AND PROJECTNAME = :projectName`,
            { projectName },
            { autoCommit: true }
        );
        if (projectInfo.rows.length > 0) {
            return { info: projectInfo.rows, paymentTiers: projectPayTiers.rows, postsAndComments: projectPostsAndComments.rows };
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
    deletePaymentTier
}
