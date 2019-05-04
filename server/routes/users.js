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
  .get(passportJWT, UsersController.index)
  .post(passportJWT, GalleriesController.newGallery);

router.route("/userInfo").get(passportJWT, UsersController.getUser);

router.route("/:galleryId").get(passportJWT, GalleriesController.getGallery);

router.route("/:galleryId/comment").post(GalleriesController.newComment);

router
  .route("/:galleryId/upload-images")
  .post(passportJWT, GalleriesController.newGalleryImages);

router.route("/:galleryId/comments").delete(GalleriesController.deleteComment);

router
  .route("/signup")
  .post(validateBody(schemas.authSchema), UsersController.signUp);

router
  .route("/signin")
  .post(
    validateBody(schemas.authSchema),
    passportSignIn,
    UsersController.signIn
  );

router.route("/image-upload").post(ImagesController.upload);

router.route("/image-upload-multiple").post(ImagesController.uploadMultiple);

module.exports = router;
