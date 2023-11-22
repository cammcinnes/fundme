const { withOracleDB } = require('../appService');

async function getAllTables() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `SELECT table_name FROM user_tables`,
      [],
      { autoCommit: true }
    );
    return result.rows;
  }).catch((err) => {
      throw new Error(err);
  });
}

async function getTableAttributes(tableName) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `SELECT COLUMN_NAME FROM ALL_TAB_COLUMNS WHERE TABLE_NAME = :tableName`,
      [tableName],
      { autoCommit: true }
    );
    return result.rows;
  }).catch((err) => {
      throw new Error(err);
  });
}

async function runQuery(tableName, attributes) {
  return await withOracleDB(async (connection) => {
    let attributeList = "";
    attributes.forEach((attr) => {
      attributeList = attributeList.concat(` ${attr},`); 
    });
    attributeList = attributeList.slice(0, -1);
    const query = `SELECT${attributeList} FROM ${tableName}`;
    const result = await connection.execute(
      query,
      [],
      { autoCommit: true }
    );
    return result.rows;
  }).catch((err) => {
      throw new Error(err);
  });
}

module.exports = {
  getAllTables,
  getTableAttributes,
  runQuery
}
