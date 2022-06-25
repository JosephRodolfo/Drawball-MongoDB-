const users = [];

//addUser, removeUser, getUser, getUsers

const addUser = ({ id, room }) => {


  //validate data
  if (!id || !room) {
    return {
      error: "Username and room are required!",
    };
  }

  //check for existing user
  const existingUser = users.find((user) => {
    return user.room === room && user.id === id;
  });

  //validate username
  if (existingUser) {
    return {
      error: "id is in use!",
    };
  }

  const user = { id, room };
  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {

    return users.splice(index, 1);
  }
};

const getUser = (id) => {
    return users.findIndex((user) => user.id === id);
};

const getUsersInRoom = (room) => {
  return users.filter((user) => user.room === room);
};

const switchRooms = ({id, room})=>{
   let index = getUser(id);
    users[index].room = room;

    if (index ===-1) {
        return {
          error: "no user with that id!",
        };
      }
    const user = users[index];
    return {user}

}




module.exports = {
    getUser,
    getUsersInRoom,
    removeUser,
    addUser,
    switchRooms
}