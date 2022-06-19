const mongoose = require("mongoose");

const chunkSchema = new mongoose.Schema(
  {
    original_id: {
      type: String,
      trim: true,
      required: true,
    },
    position: {
      type: Array,
      required: true,
      unique: true

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
