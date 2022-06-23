const express = require("express");
require("./db/mongoose");
const app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
const cors = require("cors");
const corsOptions = {
  origin: 'http://localhost:3000',
  // credentials: true,
};
app.use(cors(corsOptions));
const router = require("./routers/v1");
app.use("/v1", router);


// const io = require("socket.io")(server);

// io.on("connection", function (socket) {
//   console.log("a user connected");
// });

module.exports = {app};
