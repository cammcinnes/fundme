const express = require('express');
const router = express.Router();
const { authorizeOrganization, authorizeAccount } = require('../middleware/authorizeJwt');
const postQuery = require('../queries/posts');

router.post('/', authorizeOrganization, async (req, res) => {
  try {
    const username = req.username;
    // make sure username owns project?
    console.log(`${username} is attempting to create a post`);
    const { content, imageUrl, projectId } = req.body;
    if (!content || !projectId) {
      return res.status(400).json({success: false, error: "Content and project are required!"});
    }
    await postQuery.createPost(username, content, imageUrl ?? null, projectId)
    return res.json({ success: true, result: { message: "successfully created post!" } });
  } catch (error) {
    return res.status(500).json({success: false, error: error.message});
  }
})

// router.get('/:projectId', authorizeAccount, async (req, res) => {
//   try {
//     const username = req.username;
//     const { projectId } = req.params;
//     console.log('Getting posts for project: ', projectId);
//     const result = await postQuery.getPosts(projectId);
//     return res.json({ success: true, result: { posts: result } });
//   } catch (error) {
//     return res.status(500).json({success: false, error: error.message});
//   }
// })

// router.put('/:project', async (req, res) => {})

router.delete('/:postId', authorizeOrganization, async (req, res) => {
  try {
    const username = req.username;
    const { postId } = req.params;
    console.log('Deleting post: ', postId);
    const result = await postQuery.deletePost(postId, username);
    if (result > 0) {
      return res.json({ success: true, result: { message: 'Successfully deleted post and associated comments' } });
    }
    return res.status(400).json({ success: false, error: 'Cannot delete a post that you did not create.' });
  } catch (error) {
    return res.status(500).json({success: false, error: error.message});
  }
})

router.get('/comment/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    console.log('Getting comments for post: ', postId);
    const result = await postQuery.getComments(postId);
    return res.json({ success: true, result: { comments: result } });
  } catch (error) {
    return res.status(500).json({success: false, error: error.message});
  }
})

router.post('/comment/:postId', authorizeAccount, async (req, res) => {
  try {
    const username = req.username;
    const { postId } = req.params;
    const { content } = req.body;
    await postQuery.createComment(username, postId, content);
    return res.json({ success: true, result: { message: "Successfully added comment." } });
  } catch (error) {
    return res.status(500).json({success: false, error: error.message});
  }
})

// router.delete('/comment/:commentId', async (req, res) => {})

module.exports = router;
