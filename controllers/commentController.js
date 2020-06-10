// GET a list of comments for a specific post
exports.getCommentsByPostId = (req, res) => {
  res.json({ message: 'GET /posts/:postID/comments NOT IMPLEMENTED' });
};

// POST a new comment for a specific post in DB
exports.postNewCommentByPostId = (req, res) => {
  res.json({ message: 'POST /posts/:postID/comments/new NOT IMPLEMENTED' });
};

// DELETE a comment from a specific post (AUTH)
exports.deleteCommentByCommentId = (req, res) => {
  res.json({
    message: 'DELETE /posts/:postID/comments/:commentID NOT IMPLEMENTED'
  });
};
