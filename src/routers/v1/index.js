const express = require('express');
const chunkRoute = require('./chunk.route');
const router = express.Router();

const defaultRoutes = [
  {
    path: '/chunk',
    route: chunkRoute,
  },
  

];





defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});


module.exports = router;