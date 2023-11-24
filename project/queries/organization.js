const { withOracleDB } = require('../appService');

async function getAllOrgs() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `SELECT * FROM Organization`,
      [],
      { autoCommit: true }
    );
    return result.rows;
  }).catch((err) => {
      throw new Error(err);
  });
}

async function getOrgData(orgId) {
  return await withOracleDB(async (connection) => {
    const [org, projects, donors] = await Promise.all([
      connection.execute(
        `SELECT * FROM Organization WHERE Username = :orgId`,
        [orgId],
        { autoCommit: true }
      ),
      connection.execute(
        `SELECT ProjectName FROM Organization_creates_Project WHERE OUsername = :orgId ORDER BY ProjectName ASC`,
        [orgId],
        { autoCommit: true }
      ),
      connection.execute(
        `SELECT DISTINCT(imc.IUsername) FROM Individual_makes_Contribution imc, Organization_creates_Project ocp WHERE ocp.OUsername = :orgId AND ocp.ProjectName = imc.ProjectName ORDER BY imc.IUsername ASC`,
        [orgId],
        { autoCommit: true }
      )
    ]);
    return { org: org.rows, projects: projects.rows, donors: donors.rows }
  }).catch((err) => {
      throw new Error(err);
  });
}

async function donorsDivideProjects(donors, projects) {
  return await withOracleDB(async (connection) => {
    if (donors.length < 1) {
      throw Error("Requires selecting atleast one donor");
    }
    // although we are dynamically prepping the query string, it is safe from sql injection here because all we are doing is adding fixed strings like :1 or :2. There is no actual input someone can inject.
    let query = `SELECT i.Username FROM Individual i WHERE i.Username in (${donors.map((_, i) => { return ':' + (i + 1)})}) AND NOT EXISTS ((SELECT ocp.ProjectName FROM Organization_creates_Project ocp`;
    if (projects.length > 0) {
      query += ` WHERE ocp.Projectname in (${projects.map((_, i) => { return ':' + (i + 1 + donors.length)})})`;
    } else {
      query += ` WHERE 1 = 0`;
    }
    query += ')';
    query += ` MINUS (SELECT imc.ProjectName FROM Individual_makes_Contribution imc WHERE imc.IUsername = i.Username)) ORDER BY i.Username ASC`;
    const args = [...donors, ...projects];
    const result = await connection.execute(
      query,
      args,
      { autoCommit: true }
    );
    return result.rows;
  }).catch((err) => {
      throw new Error(err);
  });
}

module.exports = {
  getAllOrgs,
  getOrgData,
  donorsDivideProjects
}
