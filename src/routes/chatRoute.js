const chatController=require('../controllers/chatController')
const route=require("express").Router();

route.get("/:senderId/:receiverId",chatController.personalChatGet)

module.exports=route;