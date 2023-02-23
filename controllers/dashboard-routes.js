const router = require("express").Router();
const { Post, User } = require("../models/");
const withAuth = require("../utils/auth");
// gets all posts where user_id mathes the session user_id
router.get("/", withAuth, async (req, res) => {
  try {
    console.log(req.session);
    const postData = await Post.findAll({
      include: [User],
      where: {
        user_id: req.session.user_id,
      },
    });
    // maps the post and gets them in plain text
    const posts = postData.map((post) => post.get({ plain: true }));
    // renders all posts admin with the layout of dashboard
    res.render("all-posts-admin", {
      layout: "dashboard",
      posts,
    });
  } catch (err) {
    console.log(err);
    res.redirect("login");
  }
});
// renders new post template
router.get("/new", withAuth, (req, res) => {
  res.render("new-post", {
    layout: "dashboard",
  });
});
// loads edit-post
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const post = postData.get({ plain: true });

      res.render("edit-post", {
        layout: "dashboard",
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect("login");
  }
});

module.exports = router;
