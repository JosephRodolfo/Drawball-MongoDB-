const express = require("express");
require("./db/mongoose");
const app = express();
require("dotenv").config();
app.use(express.json({limit: '50mb'}));

app.use(express.urlencoded({limit: '50mb', extended: true}));
// app.use(express.urlencoded({extended: true}));

const cors = require("cors");
const corsOptions = {
  origin: process.env.DOMAIN,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

//route grouping
const router = require("./routers/v1");
app.use("/v1", router);

//socket.io


module.exports = {app};
