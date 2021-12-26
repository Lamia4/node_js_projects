const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");
const database = require("./lib/database.js");
const errorHandling = require("./middleware/errorHandling.js");
const eventsRouter = require("./router/events.js");
const authRouter = require("./router/auth.js");

dotenv.config();

database.init();

const server = express();
server.listen(process.env.PORT, () => console.log(`server listening on port ${process.env.PORT}`));

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

server.use("/api/events", eventsRouter);
server.use("/api/auth", authRouter);
server.use("/api", (req, res) => res.status(404).send());

server.use(errorHandling);
