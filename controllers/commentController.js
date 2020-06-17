const debug = require('debug')('blog-api:commentController');
const createError = require('http-errors');
const Comment = require('../models/comment');
const Post = require('../models/post');
const joi = require('@hapi/joi');

const commentIDValidationSchema = joi.object({
  commentID: joi.string().required().alphanum().max(24)
});

const postIDValidationSchema = joi.object({
  postID: joi.string().required().alphanum().max(24)
});

const newCommentValidationSchema = joi.object({
  username: joi.string().required().trim().min(1).max(15),
  date: joi.date().default(new Date()),
  text: joi.string().required().trim().max(300)
});

// GET a list of comments for a specific post
exports.getCommentsByPostId = async (req, res, next) => {
  try {
    const { error, value } = await postIDValidationSchema.validate(req.params);

    if (error) {
      debug(error);
      next(createError(400));
    } else {
      const comments = await Comment.find({ post: value.postID });

      res.json(comments);
    }
  } catch (err) {
    debug(err);
    next(createError(403));
  }
};

// POST a new comment for a specific post in DB
exports.postNewCommentByPostId = async (req, res, next) => {
  try {
    const {
      error: idError,
      value: idValue
    } = await postIDValidationSchema.validate(req.params);

    const { error, value } = await newCommentValidationSchema.validate(
      req.body
    );

    if (
      (idError || error) &&
      (await Post.countDocuments({ _id: idValue.postID })) <= 0
    ) {
      debug(error);
      next(createError(400));
    } else {
      const comment = new Comment({ ...value, post: idValue.postID });
      await comment.save();

      res.status(201);
      res.send();
    }
  } catch (err) {
    debug(err);
    next(createError(403));
  }
};

// DELETE a comment from a specific post (AUTH)
exports.deleteCommentByCommentId = async (req, res, next) => {
  try {
    const { error: postIDError } = await postIDValidationSchema.validate({
      postID: req.params.postID
    });

    const {
      error: commentIDError,
      value: commentIDValue
    } = await commentIDValidationSchema.validate({
      commentID: req.params.commentID
    });

    if (postIDError || commentIDError) {
      debug(postIDError || commentIDError);
      next(createError(401));
    } else {
      await Comment.findByIdAndDelete(commentIDValue.commentID);

      res.status(204);
      res.send();
    }
  } catch (err) {
    debug(err);
    next(createError(403));
  }
};
