/*
CRUD post + get all posts (for a specific project)

- require

Comments:

- create, delete + get all comments on a post
*/
const appService = require('../appService');
const express = require('express');
const router = express.Router();
const { authorizeIndividual, authorizeOrganization } = require('../middleware/authorizeJwt');

router.post('/', authorizeOrganization, async (req, res) => {
  try {
    const username = req.username;
    const { content, imageUrl, projectId } = req.body;
    if (!content || !projectId) {
      return res.status(400).json({success: false, error: "Content and project are required!"});
    }
    const result = await appService.createPost(username, content, imageUrl, projectId)

  } catch (error) {
    return res.status(500).json({success: false, error: error.message});
  }
})
router.get('/:project', authorizeOrganization, async (req, res) => {
  res.json("hello");
})
router.put('/:project', async (req, res) => {})

// RUBRIC: delete on cascade
router.delete('/:project', async (req, res) => {
  // check if project is owned by username
  // delete on cascade (delete all comments)
})

router.post('/comment:project', async (req, res) => {})
router.delete('/comment:project', async (req, res) => {})


// TALK ABOUT user notifications ??? need to notify on success + failure ???
module.exports = router;
