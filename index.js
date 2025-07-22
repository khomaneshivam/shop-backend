import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';

import { route } from './Routes/route.js';
import 'dotenv/config'
import connectDB from './Db/index.js';


const server = express();
const PORT = process.env.PORT || 8000;
const allowedOrigins = [
  "https://shop-frontend-gilt.vercel.app"
];

server.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));


server.use(cookieParser());
server.use(express.json({limit: "16kb"}));
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
