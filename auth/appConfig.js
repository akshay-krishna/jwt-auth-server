const express = require("express");

const generateApp = () => {
  const app = express();
  app.use(express.json());
  app.PORT = process.env.PORT;
  return app;
};

module.exports = generateApp();
