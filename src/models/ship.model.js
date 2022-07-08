const mongoose = require("mongoose");

const shipSchema = new mongoose.Schema(
  {
    position: {
      type: Object,
      required: true,
      default: {x: 0, y: 0}

    },
    chunkX: {
      type: Number,
      required: true,
      min: -100000,
      max: 100000,
      default: 0
    },
    chunkY: {
      type: Number,
      required: true,
      min: -100000,
      max: 100000,
      default: 0
    }, 
    currentChunk: {
      type: Array,
      required: true,

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

shipSchema.methods.mongoTest = function updateShipColor (color) {
    this.color = "orange";
    this.save();
    console.log('TESSSSSSSSSSSSSSTTTTE');
    alert("TEEEST")
  return this.model('Ship');
};

const Ship = mongoose.model("Ship", shipSchema);

module.exports = Ship;
