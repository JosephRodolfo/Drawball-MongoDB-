const mongoose = require("mongoose");

const shipSchema = new mongoose.Schema(
  {
    position: {
      type: Object,
      required: true,
      default: {x: 0, y: 0}

    },
    currentChunk: {
      type: Object,
      default: {
        position: [0, 0],
        state: [...Array(100)].map(e => Array(100)),
        original_id: '095d9a68-7ebd-4d95-9b97-1d51b32c7718'
      },
      required: true
    },
    color:{
        type: String,
        required: true,
        default: "blue"
    },
    inkLevel: {
      type: Number,
      default: 100,
      required: true
    },
    size: {
      type: Object,
      default: {h: 10, w: 10},
      required: true
    },
    
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
  },
  { timestamps: true }
);

const Ship = mongoose.model("Ship", shipSchema);

module.exports = Ship;
