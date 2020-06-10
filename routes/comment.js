const router = require('express').Router();
const commentController = require('../controllers/commentController');

// GET a list of comments for a specific post
router.get('/', commentController.getCommentsByPostId);

// POST a new comment for a specific post in DB
router.post('/new', commentController.postNewCommentByPostId);

// DELETE a comment from a specific post (AUTH)
router.delete('/:commentID', commentController.deleteCommentByCommentId);

module.exports = router;
