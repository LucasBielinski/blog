const router = require("express").Router();
const { User } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const userInfo = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userInfo.id;
      req.session.logged_in = true;
      res.status(200).json(userInfo);
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userInfo = await User.findOne({
      where: { username: req.body.username },
    });
    console.log(userInfo);

    if (!userInfo) {
      res.status(400).json({ message: "incorrect email or password" });
      return;
    }

    const password = userInfo.checkPassword(req.body.password);
    console.log(password);

    if (!password) {
      res.status(400).json({ message: "incorrect email or password" });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userInfo.id;
      req.session.logged_in = true;
      res.json({ user: userInfo, message: "you are now logged in" });
    });
  } catch (error) {
    res.status(400).json({ message: "something went wrong" });
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
