const multer = require("multer");
// const multerS3 = require("multer-s3");
const multerS3resize = require("multer-s3-transform");
const aws = require("aws-sdk");
const sharp = require("sharp");
require("dotenv").config();

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: "eu-west-2"
});

const s3 = new aws.S3();

// multers3 with image resizing
const upload = multer({
  storage: multerS3resize({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: "public-read-write",
    shouldTransform: function (req, file, cb) {
       cb(null, /^image/i.test(file.mimetype))
     },
     transforms: [{
       id: 'original',
       metadata: function(req, file, cb) {
         cb(null, { fieldName: file.fieldname });
       },
       key: function(req, file, cb) {
         var fullPath = "image-gallery-site/" + Date.now();
         cb(null, fullPath);
       },
       transform: function (req, file, cb) {
         //Perform desired transformations
         cb(null, sharp().resize(null, 1024))
       }
     }]
  })
});

// multers3 without image resizing
// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.AWS_BUCKET_NAME,
//     acl: "public-read-write",
//     metadata: function(req, file, cb) {
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: function(req, file, cb) {
//       var fullPath = "image-gallery-site/" + Date.now();
//       cb(null, fullPath);
//     },
//   })
// });

module.exports = upload;
