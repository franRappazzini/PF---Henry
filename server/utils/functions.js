const { createHash } = require("crypto");

function hash(pass) {
  return createHash("sha256").update(pass).digest("hex");
}

module.exports = { hash };
