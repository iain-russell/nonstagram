const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: String,
  created_at: Date,
  visible: {
    type: Boolean,
    default: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  gallery: {
    type: Schema.Types.ObjectId,
    ref: "gallery"
  }
});

const Comment = mongoose.model("comment", commentSchema);
module.exports = Comment;
