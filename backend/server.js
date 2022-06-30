const mongo = require('./dbConnection')
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();

app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = 3050 || process.env.PORT;

const db = mongo.Connect()
async function getAllMessages () {
  try {
    return db.find().toArray();   

} catch (error) {
    console.log(e);
}
}

let allUsers = [];

io.on("connection", async (socket) => {
  let allMessages;
  
  
  socket.on('connected', (data) => {
    console.log(data)
    allUsers.push(data)
    console.log(allUsers)
    socket.emit('user joined', allUsers)
  })
  console.log(socket.id, 'connected')
  allMessages = await getAllMessages();
  socket.emit('init', allMessages)
  socket.on("sendMessage", (message) => {
    console.log(message)
    const messageBody = {
        nickname: message.nickname,
        message: message.message,
        messageTime: Date.now(),
    };
    console.log(messageBody)
    db.insertOne(messageBody)
    console.log(socket.id, 'message sended')
    io.emit('messageAdded', messageBody)
  });
});

server.listen(PORT, () => console.log(`Server is running on ${PORT}`));
