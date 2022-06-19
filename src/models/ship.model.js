const mongoose = require("mongoose");

const shipSchema = new mongoose.Schema(
  {
    position: {
      type: Object,
      required: true,
    },
    currentChunk: {
      type: Object,
      default: false,
      required: true
    },
    color:{
        type: string,
        required: true
    },
    inkLevel: {
      type: Number,
      default: 100,
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
