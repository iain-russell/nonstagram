const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gallerySchema = new Schema({
  name: String,
  created_at: Date,
  visible: {
    type: Boolean,
    default: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  images: [
    {
      type: Schema.Types.ObjectId,
      ref: "image"
    }
  ]
});

const Gallery = mongoose.model("gallery", gallerySchema);
module.exports = Gallery;
