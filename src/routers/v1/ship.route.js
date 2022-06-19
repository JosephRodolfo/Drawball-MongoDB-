const express = require('express');
const auth = require('../../middleware/auth')
const shipController = require('../../controllers/ship.controller')


const router = express.Router();

router.post('/', auth, shipController.createShip)
router.get('/:id', auth, shipController.getShipById)
router.delete('/:id', auth, shipController.deleteShip)
router.patch('/:id', auth, shipController.updateShip)





module.exports = router