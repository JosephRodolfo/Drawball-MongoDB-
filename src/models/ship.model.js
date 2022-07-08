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
      max: 500,
      min: 0,
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

shipSchema.methods.changeInkLevel = function(number){
    if (this.inkLevel <= 0){
      return;
    }
    this.inkLevel = this.inkLevel + number;
    this.save();
    return this.inkLevel;
 };

 shipSchema.statics.testFindById = async (_id) => {
  const ship = await Ship.findById(_id);

  if (!ship) {
    throw new Error("Unable to find ship");
  }
  return ship;
};

const Ship = mongoose.model("Ship", shipSchema);

module.exports = Ship;
