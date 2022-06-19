const Chunk = require("../models/chunk.model");

const createChunk = async (req, res) => {
  const chunk = new Chunk({
    ...req.body,
  });

  try {
    await chunk.save();
    res.status(201).send(chunk);
  } catch (e) {
    res.status(400).send(e);
  }
};

const getChunkByPosition = async (req, res) => {
  try {
    const chunk = await Chunk.find({ position: req.body.position });

    if (!chunk || chunk.length ===0) {
      return res.status(404).send();
    }
    res.status(201).send(chunk);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {
  createChunk,
  getChunkByPosition,
};
