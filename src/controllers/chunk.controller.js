const Chunk = require("../models/chunk.model");
const Ship = require("../models/ship.model")
const { createHashIdFromCoords } = require("../utils/createHashFromId")

//creates chunks the default sessionId is random.
const createChunk = async (req, res) => {
  const chunk = new Chunk({
    ...req.body,
    sessionId: createHashIdFromCoords(req.body.chunkX, req.body.chunkY)

  });

  try {
    await chunk.save();
 
    res.status(201).send(chunk);
  } catch (e) {
    res.status(400).send(e);
  }
};
//finds list of all documents in Chunk collection corresponding to chunkX, chunkY. 
const getChunkByPosition = async (req, res) => {
  try {
    const chunk = await Chunk.find({ chunkX: req.query.chunkX, chunkY: req.query.chunkY });
//if not found, sends empty array, triggers creation of new sessionId, chunk position with next place color
    if (!chunk || chunk.length === 0) {
      return res.send([]);
    }

 //sends array of values
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

  const ship = await Ship.testFindById(req.body.id);


  if (ship.inkLevel <=0){
    return res.status(400).send();
  }
  const newSessionId = createHashIdFromCoords(req.body.chunkX, req.body.chunkY)
  try {
    const chunk = await Chunk.findOneAndUpdate(
      {  chunkX: req.body.chunkX, chunkY: req.body.chunkY, x: req.body.x, y: req.body.y, sessionId: newSessionId},
      { $set: {color: req.body.color} },
      { returnDocument: 'after',  upsert: true, returnNewDocument: true },
    );

    const inkLevel = ship.changeInkLevel(-1)
    
    res.send({chunk, inkLevel});
  } catch(e){
    console.log(e)

    res.status(400).send(e);
  }}

module.exports = {
  createChunk,
  getChunkByPosition,
  updateChunk,
  colorChunk,
};
