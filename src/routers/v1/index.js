const express = require('express');
const chunkRoute = require('./chunk.route');
const userRoute = require('./user.route')
const router = express.Router();

const defaultRoutes = [
  {
    path: '/chunk',
    route: chunkRoute,
  },{
    path: '/user',
    route: userRoute,
  },
  

];





defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});


module.exports = router;