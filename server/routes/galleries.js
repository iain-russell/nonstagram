const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../passport");

const { validateBody, schemas } = require("../helpers/validationHelper");
const upload = require("../helpers/uploadHelper");

const singleUpload = upload.single("image");

const UsersController = require("../controllers/users");
const GalleriesController = require("../controllers/galleries");
const ImagesController = require("../controllers/images");

const passportSignIn = passport.authenticate("local", { session: false });
const passportJWT = passport.authenticate("jwt", { session: false });

router
  .route("/")
  .get(passportJWT, GalleriesController.index)
  .post(passportJWT, GalleriesController.newGallery);

router.route("/:galleryId").get(passportJWT, GalleriesController.getGallery);
router
  .route("/:galleryId/upload-images")
  .post(passportJWT, GalleriesController.newGalleryImages)
  .delete(passportJWT, GalleriesController.deleteGallery);

module.exports = router;
