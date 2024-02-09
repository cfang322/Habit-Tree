const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const passport = require("passport");
const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations/login");
const { loginUser, restoreUser } = require("../../config/passport");
const { isProduction } = require("../../config/keys");


router.get("/", function (req, res, next) {
  res.json({
    message: "GET /api/users",
  });
});

router.post("/profile-picture", async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);


    user.profilePicture.data = req.body.profilePictureData; 
    user.profilePicture.contentType = req.body.contentType;

    await user.save();
    res.status(200).json({ message: "Profile picture updated successfully" });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/register", validateRegisterInput, async (req, res, next) => {
  const email = req.body.email.toLowerCase();
  const user = await User.findOne({
    $or: [{ email }, { username: req.body.username }],
  });

  if (user) {

    const err = new Error("Validation Error");
    err.statusCode = 400;
    const errors = {};
    if (user.email === req.body.email) {
      errors.email = "A user has already registered with this email";
    }
    if (user.username === req.body.username) {
      errors.username = "A user has already registered with this username";
    }
    err.errors = errors;
    return next(err);
  }


  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try {
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        return res.json(await loginUser(user));
      } catch (err) {
        next(err);
      }
    });
  });
});


router.post("/login", validateLoginInput, async (req, res, next) => {
  const email = req.body.email.toLowerCase();
  passport.authenticate("local", async function (err, user) {
    if (err) return next(err);
    if (!user) {
      const err = new Error("Invalid credentials");
      err.statusCode = 400;
      err.errors = { email: "Invalid credentials" };
      return next(err);
    }
    return res.json(await loginUser(user));
  })(req, res, next);
});

router.get("/current", restoreUser, (req, res) => {
  if (!isProduction) {
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  if (!req.user) return res.json(null);
  res.json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
  });
});

module.exports = router;
