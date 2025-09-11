const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const translationSchema = new Schema({
  language: { type: String, required: true }, // "en", "es", "fr"
  translations: {
    // title: String,
    // login: String,
    // logout: String,
    // hello: String,
    // message: String,
    type: Map, // ✅ allows dynamic keys
    of: String, // values must be String
    default: {}
  },
});

module.exports = mongoose.model("Translation", translationSchema);
