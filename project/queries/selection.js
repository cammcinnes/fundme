const { withOracleDB } = require('../appService');

// queryParams is an array of objects... see QueryParam component for structure
async function getProjectsWithQueryParams(queryParams) {
    return await withOracleDB(async (connection) => {
        // Construct SQL statements
        let sql = "SELECT * FROM ORGANIZATION_CREATES_PROJECT WHERE 1=1";
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

            // Preventing SQL injection
            if (logicalOp === "OR") {
                sql += " OR ";
            } else {
                sql += " AND ";
            }
            if (projectName && projectNameOp) {
                let projectNameAppend = projectName;
                if (projectNameOp === "LIKE") projectNameAppend = `%${projectName}%`;
                sql += `PROJECTNAME ${projectNameOp} :${counter++}`;
                values.push(projectNameAppend);
            }
            if (oUsername && oUsernameOp) {
                let oUsernameAppend = oUsername;
                if (oUsernameOp === "LIKE") oUsernameAppend = `%${oUsername}%`;
                sql += `OUSERNAME ${oUsernameOp} :${counter++}`;
                values.push(oUsernameAppend);
            }
            if (description && descriptionOp) {
                let descriptionAppend = description;
                if (descriptionOp === "LIKE") descriptionAppend = `%${description}%`;
                sql += `DESCRIPTION ${descriptionOp} :${counter++}`;
                values.push(descriptionAppend);
            }
            if (balanceOp) {
                sql += `BALANCE ${balanceOp} :${counter++}`;
                values.push(balance);
            }
        }
        console.log(sql);

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