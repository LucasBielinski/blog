const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");
const actAuth = require("../../utils/actauth");
// create post
router.post("/", withAuth, async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      body: req.body.body,
      user_id: req.session.user_id,
    });
    if (!post) {
      res.status(404).json({ message: "can not create" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});
// update post
router.put("/:id", withAuth, async (req, res) => {
  try {
    const post = await Post.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!post) {
      res.status(404).json({ message: "no id found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
}),
  // delete post
  router.delete("/:id", withAuth, async (req, res) => {
    try {
      const post = await Post.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
      if (!post) {
        res.status(404).json({ message: "no id found" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  });

module.exports = router;
