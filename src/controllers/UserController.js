const { DesignServices } = require("@mui/icons-material");
const usermodel = require("../models/UserModel");
const mailUtil=require("../utils/MailUtil")
const mongoose = require("mongoose");
const getAllUser = async (req, res) => {
    const getalluser = await usermodel.find();

    res.json({
        message: "display all users",
        data: getalluser   
    })
}


const addUsers = async (req, res) => {
   
    try {

         const { email } = req.body;

        // check if user already exists
        const existingUser = await usermodel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already registered"
            });
        }
        
        const saveuser = await usermodel.create(req.body)
        
        res.status(201).json({
            message: "user created successfully....",
            data: saveuser
        })
    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "error",
            err: err.message
        })
    }
}

const getUserById = async (req, res) => {
    
    try {
        const userId = req.params.id;
     
        const user = await usermodel.findById(userId);
          
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching user",
        });
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await usermodel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "user not found"
            });
        }

        if (user.password !== password) {
            return res.status(400).json({
                message: "invalid password"
            });
        }

        res.status(200).json({
            message: "login successful...",
            data: user
        });
    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "error",
            err: err.message
        });
    }
}

const changePassword = async (req, res) => {
    try {
        const { email, currentPassword, newPassword } = req.body;
          
        // 1. Find user by email
        const user = await usermodel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // 2. Check current password
        if (user.password !== currentPassword) {
             
            return res.status(400).json({ message: "Current password is incorrect" });
        }

        // 3. Update to new password
        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: "Password changed successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error changing password", error: err.message });
    }
};

// const setTestimonials=async(req,res)=>{
//     try{
//          const{title,subtitle}=req.body;
//         const user = await usermodel.findOne({ email:req.body.email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//      user.testimonials = { title, subtitle };

//     await user.save();

//     res.status(200).json({
//       message: "Testimonials added successfully",
//       data: user
//     })
      
//     }catch(err){
//           console.error(err);
//     res.status(500).json({
//         message: "Error updating profile",
//         message: "Profile updated successfully",
//       error: err.message
//     });
//     }
// }

const setTestimonials = async (req, res) => {
  try {
    const { title, subtitle ,review} = req.body;
    const userId = req.params.id; // get id from params

    // Find user by ID
    const user = await usermodel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update testimonials field
    user.testimonials = { title, subtitle,review };

    await user.save();

    res.status(200).json({
      message: "Testimonials added successfully",
      data: user
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error updating testimonials",
      error: err.message
    });
  }
};

const setProfile = async (req, res) => {
  try {
    const { email, name, phone, dob, address, city, state } = req.body;
  
    // 1. Find user
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Update profile fields
    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.dob = dob || user.dob;
    user.address = address || user.address;
    user.city = city || user.city;
    user.state = state || user.state;

    if (req.file) {
      user.profilePhoto = req.file.path; // save file path in DB
    }

    // 3. Save updated user
    await user.save();

    res.status(200).json({
        data: user
    });
    
} catch (err) {
    console.error(err);
    res.status(500).json({
        message: "Error updating profile",
        message: "Profile updated successfully",
      error: err.message
    });
  }
};
  
const forgotpassword = async(req,res)=>{
    
    const email = req.body.email;
    let foundUserFromemail = await usermodel.findOne({ email: email });
        
    
    if(foundUserFromemail){
       
       const url = `http://localhost:5173/resetpassword/${foundUserFromemail._id.toString()}`;
       
       const mailContent =`<html>
                          <a href ="${url}">rest password</a>
                          </html>`;
       
      
         await mailUtil.sendingMail(foundUserFromemail.email,"reset password", mailContent)
       console.log("reset password link sent to mail.")
       res.json({
        message: "reset password link sent to mail.",
       })
       
    }else{
        res.status(404).json({
            message: "user not found register first..",
          });
    }    
}

const forgotpasswordSendOtp = async(req,res)=>{
    
    const email = req.body.email;
    let foundUserFromemail = await usermodel.findOne({ email: email });
        
    if(foundUserFromemail){
       
    //    const url = `http://localhost:5173/resetpassword/${foundUserFromemail._id.toString()}`;

    const otp = Math.floor(100000 + Math.random() * 900000); 

       foundUserFromemail.otp=otp
       await foundUserFromemail.save();
       const mailContent =`<html>
                          <p>${otp}</p>
                          </html>`;
       
      
         await mailUtil.sendingMail(foundUserFromemail.email,"reset password", mailContent)
       console.log("reset password link sent to mail.")
       res.json({
        message: "reset password OTP sent to mail.",
       })
       
    }else{
        res.status(404).json({
            message: "user not found register first..",
          });
    }    
}

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
   
    const user = await usermodel.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    

    // ✅ OTP valid
    user.otp = null; // clear OTP after verification
    await user.save();

    res.json({ message: "OTP verified successfully", 
        userId: user._id
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};


const resetpassword = async (req, res) => {
  try {
    const newPassword = req.body.password;
    const id = req.params.id;  

     if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const user=await usermodel.findOne({_id:id}) 
   if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedUser = await usermodel.findByIdAndUpdate(
      id,
      { password: newPassword },
      { new: true }     
    );

  
    res.json({
      message: "Password updated successfully",
      userId: updatedUser._id,   
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};


module.exports = {addUsers,getUserById,getAllUser,loginUser,changePassword,setProfile,setTestimonials,forgotpassword,resetpassword,forgotpasswordSendOtp,verifyOtp}


