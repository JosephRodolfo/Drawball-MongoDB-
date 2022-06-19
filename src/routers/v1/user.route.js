const express = require('express');
const userController = require('../../controllers/user.controller')
const auth = require('../../middleware/auth')


const router = express.Router();

router.post('/', userController.createUser)
router.post('/login', userController.login)
router.post('/logout', auth, userController.logout)
router.get('/', auth, userController.returnSelf)
router.delete('/', auth, userController.deleteUser)
router.post('/logoutall', auth. userController.logoutAll)
router.patch('/', auth, userController.updateUser)





    module.exports = router