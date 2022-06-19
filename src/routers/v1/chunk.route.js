const express = require('express');
const chunkController = require('../../controllers/chunk.controller')


const router = express.Router();

router.post('/', chunkController.createChunk)
router.get('/', chunkController.getChunkByPosition)




    module.exports = router