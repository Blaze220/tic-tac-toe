let express = require('express');
let app = express();
let http = require('http');
let server = http.createServer(app);
let { Server } = require("socket.io");
let io = new Server(server);
const EventEmitter = require("events");
const emitter = new EventEmitter();


app.use(express.static("public"))
app.use(express.urlencoded())
app.use(express.json())

let flag = true;
const userID = []

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
  
let userIDObject = new Object()




io.on('connection', (socket) => {
  userID.push(socket.id)
  if(userID.length <=2){
    userIDObject[socket.id] = true
  }else{
    Object.keys(userIDObject).forEach(key => delete userIDObject[key]);
    userID.length = []
    userID.push(socket.id)
    userIDObject[socket.id] = true
    }
     

  socket.emit("new user", socket.id)
  console.log(userIDObject)



  socket.on("turn",(data)=>{
    console.log(data)
    let s = [data]
        if(flag == true){
          s.push("black")
          flag =false
        }else{
          s.push("red")
          flag = true
        }
   
    
      io.emit("turnRes",s)
      socket.broadcast.emit("Play","turn")
 
 

  })
      

});




      // socket.on("privateMessage",id =>{
      //   io.to(id).emit("messages","Пишу тебе")
      // })
    // console.log('a user connected');
    // socket.emit("message", {text: "Welcome", chatId: socket.id});
    // socket.on("chatMessage",(data)=>{
    //     console.log(data)
    //     messages.push(data)
    //     socket.emit("chat",messages)
    // })
    // io.emit("event","blaze")
    // socket.broadcast.emit("broadcast", socket.id);
    // socket.emit("broad", socket.id);
    // socket.emit("game",)
    // socket.to("room 1").emit("messages", "message");
  
 

 

  console.log(emitter.getMaxListeners())
  server.listen(3000, () => {
    console.log('listening on *:3000');
  });



