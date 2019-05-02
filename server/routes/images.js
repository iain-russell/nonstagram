const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../passport');

const { validateBody, schemas } = require('../helpers/validationHelper');
const upload = require('../helpers/uploadHelper');

const singleUpload = upload.single('image');

const ImagesController = require('../controllers/images');

const passportSignIn =  passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/').get(passportJWT, ImagesController.index);

router.route("/:imageId").get( ImagesController.getImage);


module.exports = router
