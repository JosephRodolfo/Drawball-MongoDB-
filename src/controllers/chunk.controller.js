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

    if (!chunk || chunk.length === 0) {
      return res.status(404).send();
    }
    res.status(201).send(chunk);
  } catch (e) {
    res.status(500).send(e);
  }
};

const updateChunk = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["state"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid update!" });
  }

  try {
    const chunk = await Chunk.findOne({
      _id: req.params.id,
    });

    if (!chunk) {
      return res.status(404).send();
    }
    updates.forEach((update) => (chunk[update] = req.body[update]));

    await chunk.save();

    res.send(chunk);
  } catch (e) {
    res.status(400).send(e);
  }
};

const colorChunk = async (req, res) => {
  try {
    const chunk = await Chunk.findOne({ position: req.body.position });

    if (!chunk) {
      return res.status(404).send();
    }
    // console.log(req.body.state.x, req.body.state.y, req.body.color);
    chunk.state[req.body.state.x][req.body.state.y] = req.body.color;
    let newState = chunk.state;

    let newChunk = await Chunk.findOneAndUpdate(
      { position: req.body.position },
      { state: newState },
      { new: true }
    );
    // await chunk.save();
    res.send(newChunk);
  } catch (e) {
    res.status(400).send(e);
  }
};
module.exports = {
  createChunk,
  getChunkByPosition,
  updateChunk,
  colorChunk,
};
