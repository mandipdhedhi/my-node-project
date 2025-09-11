const mongoose=require("mongoose");
const { type } = require("os");
const Schema=mongoose.Schema

const userSchema= new Schema({
       name:{
        type:String
       },
     
       password:{
        type:String
       },
       
       email:{
        type:String,
        unique:true
       },

        phone: {
    type: String,
    default: ""
  },

  dob: {
    type: Date,
    default: null
  },

  address: {
    type: String,
    default: ""
  },

  city: {
    type: String,
    default: ""
  },

  state: {
    type: String,
    default: ""
  },
  profilePhoto: {
  type: String,  
  default: ""
},
testimonials: {
      title: { type: String },
      subtitle: { type: String},
      review:{type:Number}
    },
    otp: {
      type:String
    }

}, { timestamps: true })



module.exports = mongoose.model("User", userSchema); 