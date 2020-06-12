const debug = require('debug')('blog-api:postController');
const createError = require('http-errors');
const Post = require('../models/post');
const joi = require('@hapi/joi');

// GET a list of all posts (AUTH)
exports.getAllPosts = (req, res) => {
  res.json({ message: 'GET /posts NOT IMPLEMENTED' });
};

// GET a list of published posts
exports.getPublishedPosts = async (req, res, next) => {
  try {
    const publishedPosts = await Post.find(
      { isPublished: true },
      'title date text -_id'
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
exports.getPostById = (req, res) => {
  res.json({ message: 'GET /posts/:postID NOT IMPLEMENTED' });
};

// PUT an updated post in DB (AUTH)
exports.updatePostById = (req, res) => {
  res.json({ message: 'PUT /posts/:postID NOT IMPLEMENTED' });
};

// DELETE a specific post (AUTH)
exports.deletePostById = (req, res) => {
  res.json({ message: 'DELETE /posts/:postID NOT IMPLEMENTED' });
};
