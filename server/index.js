const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const {Server} = require('socket.io');

app.use(cors());
const server = http.createServer(app);

const io= new Server(server,{
    cors: {
        origin : 'http://localhost:3000',
        methods : ['GET', 'POST'],
    },
})

io.on("connection",(socket) => {
    console.log(`User Connected ${socket.id}`);

    socket.on("send_message",(data) => {
        console.log(data);
        socket.to(data.roomnumber).emit("receive_message",data);
    })

    socket.on("joinRoom",(data)=>{
        socket.join(data.roomnumber)
        console.log(`user with the id ${socket.id} joined the room id of ${data}`);
    })
    socket.on("disconnect",() => {
        console.log("user disconnected",socket.id);
    })
})

const Port  =3001;
server.listen(Port,()=>{
    console.log(`Server is running on port number ${Port}`);
})
