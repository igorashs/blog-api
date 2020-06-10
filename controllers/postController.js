// GET a list of all posts (AUTH)
exports.getAllPosts = (req, res) => {
  res.json({ message: 'GET /posts NOT IMPLEMENTED' });
};

// GET a list of published posts
exports.getPublishedPosts = (req, res) => {
  res.json({ message: 'GET /posts/published NOT IMPLEMENTED' });
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
