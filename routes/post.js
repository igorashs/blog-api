const router = require('express').Router();
const app = require('express');
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');

router.use(app.urlencoded({ extended: true }));
router.use(app.json());

// GET a list of all posts (AUTH)
router.get('/', userController.verifyToken, postController.getAllPosts);

// GET a list of published posts
router.get('/published', postController.getPublishedPosts);

// PUT a new post in DB (AUTH)
router.post('/new', userController.verifyToken, postController.postNewPost);

// GET a specific post (AUTH?)
router.get('/:postID', postController.getPostById);

// PUT an updated post in DB (AUTH)
router.put(
  '/:postID',
  userController.verifyToken,
  postController.updatePostById
);

// DELETE a specific post (AUTH)
router.delete(
  '/:postID',
  userController.verifyToken,
  postController.deletePostById
);

module.exports = router;
