const router = require("express").Router();
const { Comment } = require("../../models/");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      description: req.body.body,
    });
    if (!commentData) {
      res.status(404).res({ message: "could not create" });
    }
    res.status(200).res.json(commentData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
