const authServer = require("./auth");

authServer.listen(
  authServer.PORT,
  console.log(`Server listening on port ${authServer.PORT}`)
);
