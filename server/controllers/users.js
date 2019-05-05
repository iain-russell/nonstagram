const JWT = require("jsonwebtoken");
const User = require("../models/user");
const FakerSeed = require("../helpers/fakerSeed");

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
      const user = await User.findById(req.user.id).populate({
        path: "galleries",
        populate: {
          path: "images comments user",
          select: "-password",
          populate: {
            path: "user"
          }
        }
      });
      const galleries = user.galleries;
      res.status(200).json(galleries);
    } catch (err) {
      next(err);
    }
  },
  getUser: async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.status(200).json(user);
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
    FakerSeed.seedUserGalleries(newUser);
    const token = signToken(newUser);
    res.status(200).json({ token });
  },

  signIn: async (req, res, next) => {
    try {
      // Generate token
      const token = signToken(req.user);
      res.status(200).json({ token });
    } catch (err) {
      next(err);
    }
  }
};
