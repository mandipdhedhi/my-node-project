const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  message: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    default: false
  },
}, { timestamps: true });
  
module.exports = mongoose.model("Chat", chatSchema);




