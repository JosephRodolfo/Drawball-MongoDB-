const { app } = require("./app");
const port = process.env.PORT;
const {
  addUser,
  removeUser,
  getUser,
  switchRooms,
} = require("./utils/users");

const server = app.listen(port, () => {
  console.log("Server is up on port " + port);
});

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  socket.on("join", (options, callback) => {
    const { error, user } = addUser({ id: socket.id, ...options });

    if (error) {
      return callback(error);
    }

    socket.join(user.room);

    socket.emit("message", generateMessage("Welcome!"));

    callback();
  });

  socket.on("sendUpdate", (update, callback) => {
    const { user, error } = getUser(socket.id);

    if (error || !user) {
      return callback(error);
    }

    socket.emit(
      "message",
      generateMessage(`${user.id} is you, and you have painted in ${user.room}`)
    );

    socket.to(user.room)
      .emit(
        "message",
        generateMessage(`${user.id} has updated the board in room ${user.room}!`)
      );

      socket.broadcast
      .to(user.room)
      .emit(
        "transferCoords",
        generateUpdate(update)


      )

  });


  socket.on("switch", (options, callback) => {

    const { error, room, user } = switchRooms({ id: socket.id, ...options });
    if (error || !room) {
      return callback(error);

    
    }

    socket.leave(user.room)

      socket.join(room);

    user.room = room;
    socket.emit("message", generateMessage( `user swithced rooms from ${user.room}`));
    socket.to(user.room)
      .emit("message", generateMessage(`${user.userId} has joined!`));

    callback();
  });

  socket.on("leave", () => {
    const user = removeUser(socket.id);
    if (user) {
      socket.leave(user.room)
      io.to(user.room).emit(
        "message",
        generateMessage(`${user.userId} has left!`)
      );
    }
  });


  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      socket.leave(user.room)

      io.to(user.room).emit(
        "message",
        generateMessage(`${user.userId} has left!`)
      );
    }
  });
});

const generateMessage = (text) => {
  return {
    text,
  };
};
const generateUpdate = (coords) => {
  return coords
}
