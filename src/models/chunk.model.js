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













// const chunkSchema = new mongoose.Schema(
//   {
//     position: {
//       type: Object,
//       required: true,
//       default: { x: 0, y: 0 },
//     },
//     state: [
//       {
//         coords: {
//           type: Object,
//           required: true,
//         },
//         color: {
//           type: String,
//           required: true,
//         },
//       },
//     ],
//   },
//   { timestamps: true }
// );


















// var chunkSchema = new mongoose.Schema({
//      position: {
//   type: Object,
//   required: true,
//   default: {x: 0, y: 0}

// },
//   state: [
//       {
//           type: Schema.Types.ObjectId,
//           ref: 'pixel'
//       }
//   ]
// });

// const pixelSchema = new mongoose.Schema({
//        coords: Object,
      // color: string
// });

// // models
// const Chunk  = mongoose.model('Chunk', chunkSchema);
// const Pixel = mongoose.model('Pixel', pixelSchema);

module.exports = Chunk;
