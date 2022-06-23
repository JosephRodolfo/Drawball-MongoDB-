const mongoose = require("mongoose");

const chunkSchema = new mongoose.Schema(
  {

    position: {
      type: Object,
      required: true,
      default: {x: 0, y: 0}

    },
    state: {
      type: Array,
      default: new Array(10000),
      required: true,

    },
  },
  { timestamps: true }
);

const Chunk = mongoose.model("Chunk", chunkSchema);

module.exports = Chunk;
