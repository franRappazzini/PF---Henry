const { createHash } = require("crypto");

export function hash(pass) {
  return createHash("sha256").update(pass).digest("hex");
}
