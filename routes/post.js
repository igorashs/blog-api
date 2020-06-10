const router = require('express').Router();
const postController = require('../controllers/postController');

// GET a list of all posts (AUTH)
router.get('/', postController.getAllPosts);

// GET a list of published posts
router.get('/published', postController.getPublishedPosts);

// PUT a new post in DB (AUTH)
router.post('/new', postController.postNewPost);

// GET a specific post (AUTH?)
router.get('/:postID', postController.getPostById);

// PUT an updated post in DB (AUTH)
router.put('/:postID', postController.updatePostById);

// DELETE a specific post (AUTH)
router.delete('/:postID', postController.deletePostById);

module.exports = router;
