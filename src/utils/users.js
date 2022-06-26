const users = [];

//addUser, removeUser, getUser, getUsers

const addUser = ({ id, userId, room }) => {

  //validate data
  if (!userId || !room) {
    return {
      error: "UserId and room are required!",
    };
  }

  //check for existing user
  const existingUser = users.find((user) => {
    return user.room === room && user.userId === userId;
  });

  //validate username
  if (existingUser) {
    let newId= existingUser.id
    removeUser(newId)
  }
 


  const user = { id, userId, room };
  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {

   const user = users.splice(index, 1);
   return user;
  }

};

const getUser = (id) => {
      const index=   users.findIndex((user) => user.id === id);
         return {user: users[index], index: index}
};

const getUsersInRoom = (room) => {
  return users.filter((user) => user.room === room);
};

const switchRooms = ({id, userId, room})=>{
   const indexObject = getUser(id);

   const index = indexObject.index


    if (index ===-1) {
        return {
          error: "no room!",
        };
      }
      // users[index].room = room;
      const user = users[index];
    return { user, room }

}




module.exports = {
    getUser,
    getUsersInRoom,
    removeUser,
    addUser,
    switchRooms
}