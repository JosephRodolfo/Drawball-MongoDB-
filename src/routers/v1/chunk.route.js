const express = require('express');
const chunkController = require('../../controllers/chunk.controller')


const router = express.Router();

router.post('/', chunkController.createChunk)
router.post('/getchunk', chunkController.getChunkByPosition)
router.patch('/:id', chunkController.updateChunk)




    module.exports = router