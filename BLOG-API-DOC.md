# BLOG-API DOC

## Index

```bash
# GET Status
/
```

## Post

```bash
# GET a list of all posts (AUTH)
/posts/
```

```bash
# GET a list of published posts
/posts/published/
```

```bash
# PUT a new post in DB (AUTH)
/posts/new/
```

```bash
# GET a specific post (AUTH?)
/posts/:postID/
```

```bash
# PUT an updated post in DB (AUTH)
/posts/:postID/
```

```bash
# DELETE a specific post (AUTH)
/posts/:postID/
```

## User

```bash
# POST user authorization
/user/login/
```

## Comment

```bash
# GET a list of comments for a specific post
/posts/:postID/comments/
```

```bash
# POST a new comment for a specific post in DB
/posts/:postID/comments/new/
```

```bash
# DELETE a comment from a specific post (AUTH)
/posts/:postID/comments/:commentID/
```
