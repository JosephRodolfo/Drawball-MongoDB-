const express = require('express');
const userController = require('../../controllers/user.controller')
const auth = require('../../middleware/auth')


const router = express.Router();

router.post('/', userController.createUser)
router.post('/login', userController.login)
router.post('/logout', auth, userController.logout)
router.get('/', userController.returnSelf)
router.delete('/', userController.deleteUser)
router.post('/logoutall', userController.logoutAll)
router.patch('/', userController.updateUser)





    module.exports = router