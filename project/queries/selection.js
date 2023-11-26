const { withOracleDB } = require('../appService');

// queryParams is an array of objects... see QueryParam component for structure
async function getProjectsWithQueryParams(queryParams) {
    return await withOracleDB(async (connection) => {
        // Construct SQL statements
        let sql = "SELECT PROJECTNAME FROM ORGANIZATION_CREATES_PROJECT WHERE 1=1";
        const values = [];
        let counter = 1;

        for (const queryParam of queryParams) {
            const logicalOp = queryParam.logicalOp;
            const {
                projectName,
                projectNameOp,
                oUsername,
                oUsernameOp,
                description,
                descriptionOp,
                balance,
                balanceOp
            } = queryParam.queryData;

            console.log(queryParam);

            // Preventing SQL injection
            if (logicalOp === "OR") {
                sql += " OR 1=1";
            } else {
                sql += " AND 1=1";
            }
            if (projectName && projectNameOp) {
                let projectNameAppend = projectName;
                if (projectNameOp === "LIKE") projectNameAppend = `%${projectName}%`;
                sql += ` AND PROJECTNAME ${projectNameOp} :${counter++}`;
                values.push(projectNameAppend);
            }
            if (oUsername && oUsernameOp) {
                let oUsernameAppend = oUsername;
                if (oUsernameOp === "LIKE") oUsernameAppend = `%${oUsername}%`;
                sql += ` AND OUSERNAME ${oUsernameOp} :${counter++}`;
                values.push(oUsernameAppend);
            }
            if (description && descriptionOp) {
                let descriptionAppend = description;
                if (descriptionOp === "LIKE") descriptionAppend = `%${description}%`;
                sql += ` AND DESCRIPTION ${descriptionOp} :${counter++}`;
                values.push(descriptionAppend);
            }
            if (balance >= 0 && balanceOp) {
                sql += ` AND BALANCE ${balanceOp} :${counter++}`;
                values.push(balance);
            }

            console.log(sql);
        }

        const result = await connection.execute(
            sql,
            values,
            { autoCommit: true }
        );
        return result.rows;
    }).catch((err) => {
        throw err;
    });
}

module.exports = {
    getProjectsWithQueryParams
}