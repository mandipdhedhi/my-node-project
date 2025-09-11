const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gallerySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: "",
    },
    images:{ 
      url: {
          type: String, 
          // required: true,
        }
    },
    banner:{
      type:String,
      
    }
    

  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", gallerySchema);
