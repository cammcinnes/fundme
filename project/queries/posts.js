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

// async function getPosts(projectId) {
//   return await withOracleDB(async (connection) => {
//     const result = await connection.execute(
//       `SELECT * FROM Organization_creates_Post ocp WHERE ocp.ProjectName = :projectId ORDER BY Timestamp DESC`,
//       [projectId],
//       { autoCommit: true }
//     );
//     return result.rows;
//   }).catch((err) => {
//       throw new Error(err);
//   });
// }

// RUBRIC: delete on cascade (deletes all comments linked to post)
async function deletePost(postId, username) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `DELETE FROM Organization_creates_Post WHERE PostId = :postId AND OUsername = :username`,
      [postId, username],
      { autoCommit: true }
    );
    return result.rowsAffected;
  }).catch((err) => {
      throw new Error(err);
  });
}

async function getComments(postId) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `SELECT CommentID, Username, Content, Timestamp FROM Account_writes_Comment_on_Post awc WHERE awc.PostID = :postId ORDER BY Timestamp DESC`,
      [postId],
      { autoCommit: true }
    );
    return result.rows;
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
  // getPosts,
  deletePost,
  getComments,
  createComment
}
