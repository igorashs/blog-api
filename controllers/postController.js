const debug = require('debug')('blog-api:postController');
const createError = require('http-errors');
const Post = require('../models/post');
const joi = require('@hapi/joi');

const postIDValidationSchema = joi.object({
  postID: joi.string().required().alphanum().max(24)
});

// GET a list of all posts (AUTH)
exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({}, 'title date text');

    res.json(posts);
  } catch (err) {
    debug(err);
    next(createError(401));
  }
};

// GET a list of published posts
exports.getPublishedPosts = async (req, res, next) => {
  try {
    const publishedPosts = await Post.find(
      { isPublished: true },
      'title date text'
    );

    res.json(publishedPosts);
  } catch (err) {
    debug(err);
    next(createError(401));
  }
};

// PUT a new post in DB (AUTH)
exports.postNewPost = (req, res) => {
  res.json({ message: 'POST /posts/new NOT IMPLEMENTED' });
};

// GET a specific post (AUTH?)
exports.getPostById = async (req, res, next) => {
  try {
    const { error, value } = await postIDValidationSchema.validate(req.params);

    if (error) {
      debug(error);
      next(createError(400));
    } else {
      const post = await Post.findById(value.postID, 'title date text');
      res.json(post);
    }
  } catch (err) {
    debug(err);
    next(createError(403));
  }
};

// PUT an updated post in DB (AUTH)
exports.updatePostById = (req, res) => {
  res.json({ message: 'PUT /posts/:postID NOT IMPLEMENTED' });
};

// DELETE a specific post (AUTH)
exports.deletePostById = async (req, res, next) => {
  try {
    const { error, value } = await postIDValidationSchema.validate(req.params);

    if (error) {
      debug(error);
      next(createError(400));
    } else {
      await Post.findByIdAndDelete(value.postID);

      res.status(204);
      res.send();
    }
  } catch (err) {
    debug(err);
    next(createError(403));
  }
};
