import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';

import { route } from './Routes/route.js';
import 'dotenv/config'
import connectDB from './Db/index.js';


const server = express();
const PORT = process.env.PORT || 8000;

server.use(cors({
  origin: 'https://shop-frontend-gilt.vercel.app/', // <-- your deployed frontend
  credentials: true
}));
server.use(cookieParser());

server.use(express.urlencoded({ extended: true }));


// connect to db:
connectDB()
.then(()=>{
  // starting the server 
    server.listen(PORT , ()=>{
        console.log("Server is running at " + PORT);
    })
})
.catch(error=>{
    console.log("Error connecting::index.js",error);
})


server.use("/api", route)

server.get("/", (req, res) => {
  res.send("Hello to backend")
})

server.get('*', (req, res) => {
  res.send("404 NOT FOUND <a href='./'> Go To Home</a>")
})
