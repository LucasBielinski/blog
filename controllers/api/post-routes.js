const router = require("express").Router();
const { Post } = require("../../models/");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      body: req.body.body,
    });
    if (!post) {
      res.status(404).json({ message: "can not create" });
    }
    res.status(200).res.json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  try {
    const post = Post.update(req.body, {
      where: {
        id: req.params.id,
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
  router.delete("/:id", withAuth, async (req, res) => {
    try {
      const post = Post.destroy(req.body, {
        where: {
          id: req.params.id,
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
