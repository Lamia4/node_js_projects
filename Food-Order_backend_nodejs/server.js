import dotenv from "dotenv";
import express from "express";
import database from "./lib/database.js";
import cookieParser from "cookie-parser";
import userRouter from "./router/userRouter.js";
import authenticateRouter from "./router/authenticateRouter.js";
import cors from "cors";
import fileUpload from "express-fileupload";
import categoryRouter from "./router/categoryRouter.js";
import uploadRouter from "./router/uploadRouter.js";
import productRouter from "./router/productRouter.js";
import orderRouter from "./router/orderRouter.js";



dotenv.config();

database.init();


const server = express();

server.listen(process.env.PORT, () => {

    console.log("server is listening");
});

// server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(cookieParser());
server.use(fileUpload({
    useTempFiles:true
}));

server.use("/user", userRouter);
server.use("/user", authenticateRouter);
server.use("/api", categoryRouter);
server.use("/api", uploadRouter);
server.use("/api", productRouter);
server.use("/api", orderRouter);

server.use(express.static("./app/")); 
// server.use((req, res) => res.sendFile("./index.html")); 