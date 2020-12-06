const { verifyToken } = require("./token");

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.sendStatus(401);
  }
  try {
    const decoded = await verifyToken(authorization);
    req.uid = decoded.sub;
    next();
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
};

module.exports = auth;
