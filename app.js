const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors")
const app=express();
app.use(express.json())
app.use(cors())

const http = require("http");
const { Server } = require("socket.io");

const Message = require("./src/models/Chat");
// Map to store userId -> socket.id
const users = new Map();

// app.get('/',(req,res)=>{
//     res.json({
//         name:"mandip"
//     })
// })
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));

 const userroute=require("./src/routes/UserRoute")
 app.use(userroute); 

 const translationRoutes = require("./src/routes/TranslationRoute");
app.use("/api/translations", translationRoutes);
 
const galleryRoutes = require("./src/routes/productRoute");
app.use(galleryRoutes);

const adminRoutes = require("./src/routes/adminRoute");
app.use(adminRoutes);

mongoose.connect("mongodb://localhost:27017/node").then(
    ()=>{console.log("Database Connected successfuly..")}
)

//  Use HTTP server instead of app.listen
const server = http.createServer(app);

// Attach Socket.io server
const io = new Server(server, {
  cors: {
    origin: "*", // Or your frontend URL like "http://localhost:5173"
    methods: ["GET", "POST"],
  },
});

// ✅ Socket.io connection handler
io.on("connection", (socket) => {
  console.log("🔗 A user connected:", socket.id);

   // When user joins, save their socket
  socket.on("register", (userId) => {
    users.set(userId, socket.id);
    console.log(`✅ User ${userId} registered with socket ${socket.id}`);
  });

 
  
// Send message to a specific user
  socket.on("private-message", async (data) => {
    const { senderId, receiverId, messages } = data;
     
      if (!data.messages || !data.senderId || !data.receiverId) {
    console.error("❌ Missing required fields!");
    return;
  }
    try{
       const newMessage = new Message({
      senderId: data.senderId,
      receiverId: data.receiverId,
      messages: data.messages,
    });
    await newMessage.save();

     // Send to receiver if online
    const receiverSocket = users.get(receiverId);
    if (receiverSocket) {
      io.to(receiverSocket).emit("private-message", newMessage);
    }
      socket.emit("private-message", newMessage);
    }catch(err){
        console.error("❌ Error saving message:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
    for (const [userId, sockId] of users.entries()) {
      if (sockId === socket.id) users.delete(userId);
    }
  });
 
});

//  const PORT=3001;
//             app.listen(PORT,()=>{
//     console.log("server started successfully PORT...",PORT);
// })   
const PORT = 3001;
server.listen(PORT, () => {  // ✅ USE server.listen()
  console.log("🚀 Server running on PORT:", PORT);
});






