const upload = require("../helpers/uploadHelper");

const Gallery = require("../models/gallery");
const User = require("../models/user");
const Image = require("../models/image");
const Comment = require("../models/comment");

const singleUpload = upload.single("image");
const multipleUpload = upload.array("image");

module.exports = {
  index: async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).populate("galleries");
      const galleries = user.galleries;
      res.status(200).json(galleries);
    } catch (err) {
      next(err);
    }
  },
  newGallery: async (req, res, next) => {
    try {
      const user = await User.findById(req.user);
      const newGallery = new Gallery({
        name: req.body.name,
        user: req.user,
        created_at: Date.now()
      });
      await newGallery.save();
      user.galleries.push(newGallery);
      await user.save();

      res.status(200).json(newGallery);
    } catch (err) {
      next(err);
    }
  },
  getGallery: async (req, res, next) => {
    try {
      console.log(req.params);
      const gallery = await Gallery.findById(req.params.galleryId);
      res.status(200).json(gallery);
    } catch (err) {
      next(err);
    }
  },
  deleteGallery: async (req, res, next) => {
    try {
      const { galleryId } = req.params;
      const gallery = await Gallery.findById(galleryId);
      const userId = gallery.user;
      const user = await User.findById(userId);
      await gallery.remove();
      user.galleries.pull(gallery);
      await user.save();
      res.status(200).json({ success: true });
    } catch (err) {
      next(err);
    }
  },
  newGalleryImages: async (req, res, next) => {
    try {
      const gallery = await Gallery.findById(req.params.galleryId);
      multipleUpload(req, res, err => {
        const fileArray = req.files;
        const imageId = [];
        fileArray.forEach(file => {
          const newImage = new Image({
            gallery: gallery,
            key: file.transforms[0].key,
            name: file.originalname
          });
          console.log(newImage);
          const image = newImage.save();
          gallery.images.push(newImage);
          imageId.push(newImage._id);
        });
        gallery.save();
        console.log(req.files);

        return res.json({ body: req.files, imageId: imageId });
      });
    } catch (err) {
      next(err);
    }
  },
  newComment: async (req, res, next) => {
    try {
      const gallery = await Gallery.findById(req.params.galleryId);
      const newComment = new Comment({
        content: req.body.content,
        gallery: gallery,
        user: gallery.user,
        created_at: Date.now()
      });
      await Gallery.findOneAndUpdate(
        { _id: req.params.galleryId },
        { $push: { comments: newComment } }
      );
      await newComment.save();
      const commentFullData = await Comment.findById(newComment._id).populate({
        path: "user", select: '-password'
      });
      return res.status(200).json({ commentFullData });
    } catch (err) {
      next(err);
    }
  },
  deleteComment: async (req, res, next) => {
    try {
      const comment = await Comment.findByIdAndDelete(req.body.comment)
    } catch (err) {
      next(err);
    }
  }
};
