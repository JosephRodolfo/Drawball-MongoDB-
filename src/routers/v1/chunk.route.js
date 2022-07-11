const express = require('express');
const auth = require('../../middleware/auth')
const chunkController = require('../../controllers/chunk.controller')


const router = express.Router();

router.post('/', auth, chunkController.createChunk)
router.post('/getchunk', auth, chunkController.getChunkByPosition)
router.patch('/:id', auth, chunkController.updateChunk)
router.patch('/', auth, chunkController.colorChunk)




    module.exports = router