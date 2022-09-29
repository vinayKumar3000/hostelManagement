const router = require("express").Router();

const Post = require("../models/Booking");
const User = require("../models/User");
const bcrypt = require("bcrypt");

//DELETE
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        if (user) {
          await Post.deleteMany({ username: user.username });
          await User.findByIdAndDelete(req.params.id);
          res.status(200).json("User has been deleted...");
        } else {
          res.status(400).json("cannot delete user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(400).json("You cannot delete account");
  }
});

//GET USER by username
router.get("/:id", async (req, res) => {
  console.log(req.params.username);
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    console.log(others);
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
