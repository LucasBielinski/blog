const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");
const actAuth = require("../../utils/actauth");

router.post("/", withAuth, async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      body: req.body.body,
    });
    if (!post) {
      res.status(404).json({ message: "can not create" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", withAuth, actAuth, async (req, res) => {
  try {
    const post = await Post.update(req.body, {
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
  router.delete("/:id", withAuth, actAuth, async (req, res) => {
    try {
      const post = await Post.destroy({
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
