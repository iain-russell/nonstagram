const Image = require("../models/image");
const upload = require("../helpers/uploadHelper");

const singleUpload = upload.single("image");
const multipleUpload = upload.array("image");

module.exports = {
  index: async (req, res, next) => {
    try {
      const images = await Image.find({});
      res.status(200).json(images);
    } catch(err) {
      next(err);
    }
  },
  getImage: async (req, res, next) => {
    try {
      const image = await Image.findById(req.params.imageId);
      res.status(200).json(image);
    } catch(err) {
      next(err);
    }
  },
  upload: (req, res, next) => {
    try {
      singleUpload(req, res, err => {
        const newImage = new Image({
          key: req.file.key,
          name: req.file.originalname
        });
        console.log(req.file);
        console.log(newImage);
        const image = newImage.save();

        return res.json({ imageUrl: req.file.location, info: req.file });
      });
    } catch (err) {
      next(err);
    }
  },

  uploadMultiple: (req, res, next) => {
    try {
      multipleUpload(req, res, err => {
        const fileArray = req.files;
        fileArray.forEach(file => {
          const newImage = new Image({
            key: file.transforms[0].key,
            name: file.originalname
          });
          const image = newImage.save();
        });
        return res.json({ body: req.files });
      });
    } catch (err) {
      next(err);
    }
  }
};
