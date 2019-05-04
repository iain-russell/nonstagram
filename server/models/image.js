const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  key: String,
  name: String,
  created_at: Date,
  gallery: {
    type: Schema.Types.ObjectId,
    ref: 'gallery'
  }
});

const Image = mongoose.model('image', imageSchema);
module.exports = Image;
