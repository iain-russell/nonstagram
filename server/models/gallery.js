const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gallerySchema = new Schema({
  name: String,
  text: String,
  created_at: Date,
  visible: {
    type: Boolean,
    default: true
  },
  deleteVisible: {
    type: Boolean,
    default: false
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  images: [{
    type: Schema.Types.ObjectId,
    ref: 'image'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }],
});

const Gallery = mongoose.model('gallery', gallerySchema);
module.exports = Gallery;
