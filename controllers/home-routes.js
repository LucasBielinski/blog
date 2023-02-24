const router = require("express").Router();
const { Post, Comment, User } = require("../models/");

// gets all home page posts
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [User],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);
    // sends posts and log in credentials
    res.render("all-posts", { posts, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get single post
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        // includes comments
        {
          model: Comment,
          include: [User],
        },
      ],
    });
    console.log(postData);
    if (postData) {
      const post = postData.get({ plain: true });
      console.log(post);
      res.render("single-post", {
        post,
        logged_in: req.session.logged_in,
        user_id: req.session.user_id,
        canEdit: req.session.user_id === post.user_id
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// renders login page
router.get("/login", (req, res) => {
  console.log("Viewing login");
  console.log(req.session);
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});
// renders signup page
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

module.exports = router;
