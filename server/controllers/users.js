const JWT = require("jsonwebtoken");
const User = require("../models/user");
const Gallery = require("../models/gallery");
const Image = require("../models/image");
const Comment = require("../models/comment");
const { JWT_SECRET } = require("../configuration");

signToken = user => {
  return JWT.sign(
    {
      iss: "image-gallery",
      sub: user.id,
      iat: new Date().getTime()
      // exp: new Date().setDate(new Date().getDate() + 10)
    },
    JWT_SECRET
  );
};

module.exports = {
  index: async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id)
        .populate({
          path: "galleries",
          populate: { path: "images" }
        })
        .populate({
          path: "galleries",
          populate: { path: "comments" }
        })
        .populate({
          path: "galleries",
          populate: { path: "user" }
        });
      const galleries = user.galleries;
      res.status(200).json(galleries);
    } catch (err) {
      next(err);
    }
  },
  newGallery: async (req, res, next) => {
    try {
      const newGallery = new Gallery({
        name: req.body.name,
        user: req.user,
        created_at: Date.now()
      });
      const user = req.user;
      await newGallery.save();
      user.galleries.push(newGallery);
      await user.save();

      res.status(200).json(newGallery);
    } catch (err) {
      next(err);
    }
  },
  signUp: async (req, res, next) => {
    const { email, password } = req.value.body;
    // Check if there is a user with the same email
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(409).json({ error: "Email is already in use" });
    }
    // Create a new user
    const newUser = new User({
      email: email,
      password: password
    });
    // const newUser = new User({ email, password });
    await newUser.save();
    const token = signToken(newUser);
    res.status(200).json({ token });
  },

  signIn: async (req, res, next) => {
    try {
      // Generate token
      console.log(req.user);
      const token = signToken(req.user);
      res.status(200).json({ token });
    } catch (err) {
      next(err);
    }
  }
};
