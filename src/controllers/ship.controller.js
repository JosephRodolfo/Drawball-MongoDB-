const Ship = require("../models/ship.model");

const createShip = async (req, res) => {
  const ship = new Ship({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await ship.save();
    res.status(201).send(ship);
  } catch (e) {
    res.status(400).send(e);
  }
};

const deleteShip = async (req, res) => {
  try {
    const ship = await Ship.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!ship) {
      return res.status(404).send();
    }

    res.send(ship);
  } catch (e) {
    res.status(500).send();
  }
};
const getShipById = async (req, res) => {
  const _id = req.params.id;

  try {
    const ship = await Ship.findOne({
      _id,
      owner: req.user._id,
    });

    if (!post) {
      return res.status(404).send();
    }

    res.status(201).send(ship);
  } catch (e) {
    res.status(500).send(e);
  }
};

const updateShip = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["inkLevel", "currentChunk", "position", "color"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid update!" });
  }

  try {
    const ship = await Ship.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!ship) {
      return res.status(404).send();
    }
    updates.forEach((update) => (ship[update] = req.body[update]));

    await ship.save();

    res.send(ship);
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = {
  createShip,
  updateShip,
  getShipById,
  deleteShip,
};
