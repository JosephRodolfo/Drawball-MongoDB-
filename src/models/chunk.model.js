const { randomUUID } = require("crypto");
const { Schema, model } = require("mongoose");

const chunkSchema = new Schema(
  {
    sessionId: {
      type: String,
      required: true,
      index: true,
      default: ()=>randomUUID()
    },
    color: {
      type: String,
      required: true,
    },
    chunkX: {
      type: Number,
      required: true,
      min: -100000,
      max: 100000,
    },
    chunkY: {
      type: Number,
      required: true,
      min: -100000,
      max: 100000,
    },
    x: {
      type: Number,
      required: true,
      min: 0,
      max: 99,
    },
    y: {
      type: Number,
      required: true,
      min: 0,
      max: 99,
    },
  },
  { timestamps: true }
);

// chunkSchema.index({ sessionId: 1, x: 1, y: 1 }, { unique: true });

const Chunk = model("chunk", chunkSchema);

module.exports = Chunk;
