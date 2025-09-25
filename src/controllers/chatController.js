const { error } = require('console');
const chatModel=require('../models/Chat')

const personalChatGet=async(req,res)=>{
    const { senderId, receiverId } = req.params;
    try{
        const messages = await chatModel.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ timestamp: 1 }); // oldest first
    res.json(messages);
    }catch(err){
        console.log(err)
        res.status(500).json({
            error:err
        })
    }
}

module.exports={personalChatGet}