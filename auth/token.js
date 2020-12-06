const { sign, verify } = require("jsonwebtoken");

const generateToken = async (payload) => {
  try {
    return await sign(payload, "super secret key");
  } catch (err) {
    console.error(err.message);
    throw Error("Failed to generate a token");
  }
};

const verifyToken = async (token) => {
  try {
    return await verify(token, "super secret key");
  } catch (err) {
    console.error(err.message);
    throw Error("Failed to verify the token");
  }
};

module.exports = { generateToken, verifyToken };
