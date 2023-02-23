const router = require("express").Router();
const { Comment } = require("../../models/");
const withAuth = require("../../utils/auth");
// posts a comment
router.post("/", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      description: req.body.body,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    });
    if (!commentData) {
      res.status(404).json({ message: "could not create" });
    }
    res.status(200).json(commentData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
