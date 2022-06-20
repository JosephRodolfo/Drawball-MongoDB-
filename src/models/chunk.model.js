const mongoose = require("mongoose");

const chunkSchema = new mongoose.Schema(
  {

    position: {
      type: Array,
      required: true,
      default: [0, 0]

    },
    state: {
      type: Array,
      default: [...Array(100)].map(e => Array(100)),
      required: true,

    },
  },
  { timestamps: true }
);

const Chunk = mongoose.model("Chunk", chunkSchema);

module.exports = Chunk;
