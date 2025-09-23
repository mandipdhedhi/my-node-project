const mongoose = require("mongoose");
const { type } = require("os");
const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    socialMedia: {
      facebook: { type: String },
      twitter: { type: String },
      instagram: { type: String },
      linkedin: { type: String },
      youtube: { type: String },
    },
    logo:{
      type: String
    }
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
