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
    const chunk = await Chunk.findOne({ position: req.body.position });

    if (!chunk || chunk.length === 0) {
      return res.status(404).send();
    }

    const nullRemoved = chunk.state.filter(function (e) {
      return e;
    });
    chunk.state = nullRemoved;
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
    const updatesObject = req.body.state;

    if (!chunk) {
      return res.status(404).send();
    }

    if (req.body.preexisting) {
      const indexOfMatch = chunk.state.findIndex((element) => {
        return element.coords.x === req.body.state.coords.x && element.coords.y === req.body.state.coords.y;
      });

      chunk.state.splice(indexOfMatch, 1, updatesObject);
    } else {
      
      chunk.state.unshift(updatesObject);
      chunk.state.pop();
    }
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
