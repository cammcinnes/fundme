const { withOracleDB } = require('../appService');

async function createPost(username, content, imageUrl, projectId) {
  console.log(username, content, imageUrl, projectId);
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `INSERT INTO Organization_creates_Post (OUsername, ProjectName, Content, ImageUrl) VALUES (:username, :projectId, :content, :imageUrl)`,
      [username, projectId, content, imageUrl],
      { autoCommit: true }
    );
    // TODO: this is kinda terrible
    if (result.rowsAffected !== 1) {
        throw new Error("rows affected is not 1");
    }
  }).catch((err) => {
      throw new Error(err);
  });
}

async function getPosts(projectId) {
  return await withOracleDB(async (connection) => {
    // need to use a left join here because there may not be any comments
    const result = await connection.execute(
      `SELECT * FROM Organization_creates_Post ocp LEFT JOIN Account_writes_Comment_on_Post awc ON ocp.PostID = awc.PostID WHERE ocp.ProjectName = :projectId`,
      [projectId],
      { autoCommit: true }
    );
    return result.rows;
  }).catch((err) => {
      throw new Error(err);
  });
}

async function deletePost(postId) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `DELETE FROM Organization_creates_Post WHERE PostId = :postId`,
      [postId],
      { autoCommit: true }
    );
    return result.rowsAffected;
  }).catch((err) => {
      throw new Error(err);
  });
}

async function createComment(username, postId, content) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `INSERT INTO Account_writes_Comment_on_Post (Username, PostID, Content) VALUES (:username, :postId, :content)`,
      [username, postId, content],
      { autoCommit: true }
    );
    return result.rowsAffected;
  }).catch((err) => {
      throw new Error(err);
  });
}

module.exports = {
  createPost,
  getPosts,
  deletePost,
  createComment
}
