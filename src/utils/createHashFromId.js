const Hashids = require('hashids/cjs')
const hashids = new Hashids("drawball");

 function createHashIdFromCoords(x, y) {
  function cantorPairSigned(x, y) {
    function cantorPair(x, y) {
      return 0.5 * (x + y) * (x + y + 1) + y;
    }
    const a = x >= 0.0 ? 2.0 * x : -2.0 * x - 1.0;
    const b = y >= 0.0 ? 2.0 * y : -2.0 * y - 1.0;
    return cantorPair(a, b);
  }

  const cantorId = cantorPairSigned(x, y);
  return hashids.encode(cantorId);
}

module.exports = { createHashIdFromCoords };
