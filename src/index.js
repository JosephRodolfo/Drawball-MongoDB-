const {app} = require('./app')
const port = process.env.PORT
const {addUser, removeUser, getUsersInRoom, switchRooms }= require('./utils/users')



const server = app.listen(port, () => {
  console.log("Server is up on port " + port);
});



const io = require("socket.io")(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});




io.on("connection", (socket) => {



  socket.on('join', (options, callback) => {
    const { error, user } = addUser({ id: socket.id, ...options })

    if (error) {
        return callback(error)
    }

    socket.join(user.room)

    socket.emit('message', generateMessage('Welcome!'))
    socket.broadcast.to(user.room).emit('message', generateMessage(`${user.id} has joined!`))

    callback()
})


socket.on("sendUpdate", (update, callback) => {
  socket.emit('message', generateMessage(`has painted this pixel done ${update}`))

  callback("Delivered!");



});



// socket.on('switch', ({id, room}) => {
//   console.log(id, room)
//    const user = switchRooms(id, room)
//   console.log(user, 'has switched rooms');
//   if (user) {
//       io.to(user.room).emit('message', generateMessage(`${user.id} has switched rooms!`))

//   }
// })



socket.on('switch', (options, callback) => {
  const { error, user } = switchRooms({ id: socket.id, ...options })

  if (error) {
      return callback(error)
  }


  socket.emit('message', generateMessage('user swithced rooms!'))
  socket.broadcast.to(user.room).emit('message', generateMessage(`${user.id} has joined!`))

  callback()
})


  socket.on('leave', (id) => {
    const user = removeUser(id)
    console.log(user + " has left");
    if (user) {
        io.to(user.room).emit('message', generateMessage(`${user.id} has left!`))

    }
  }
    
  )







  // console.log('client connected')
  // let connectCounter = io.engine.clientsCount;
  // socket.emit("message", generateMessage(connectCounter));
  // socket.broadcast.emit("message", generateMessage(connectCounter));
  // socket.on("disconnect", () => {
  //   let connectCounter = io.engine.clientsCount;
  //   socket.emit("message", generateMessage(connectCounter));
  //   socket.broadcast.emit("message", generateMessage(connectCounter));
  // });
});

const generateMessage = (text) => {
  return {
    text,
  };
};