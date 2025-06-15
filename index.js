import express from "express";
import http from "http";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { config } from "dotenv";
import morgan from "morgan"
import router from "./routes/index.js"
import { Server } from "socket.io";



config();
const app = express();

const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('dev'));


app.use("/api",router);

const server = http.createServer(app)
// const db = mongoose.connect(process.env.DB_URL).then(()=>{
//     console.log("Database connected sucessfully")
// }).catch((err) => console.error('Database connection error:', err));

app.get("/",(req,res)=>{
    res.json({"message":"Server is running on github actions workflows wow","status":200})
})

const io = new Server(server, {
    cors: {
      origin: "*", // Adjust the CORS policy as per your client setup
      methods: ["GET", "POST"],
    },
  });

  io.on("connection",(socket)=>{
    console.log(`New client connected: ${socket.id}`);

    socket.on("send message",(data)=>{
        console.log("message recived", data)
        io.emit("recived message",data)
    })

        socket.on("disconnect",()=>{
            console.log(`client disconnected: ${socket.id}`);
        })
    })

server.listen(port,()=>{console.log("server working fine") });

