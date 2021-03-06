const app = require("./appConfig");
const connectDb = require("./db");
const { generateToken } = require("./token");
const UserModel = require("./UserModel");
const auth = require("./auth");
connectDb();

app.get("/", (req, res) => {
  res.json({ msg: "The server is fine ya doofus!! check your fucking code " });
});

app.post("/", async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = new UserModel({
      name,
      password,
    });

    const savedUser = await user.save();
    const token = await generateToken({
      iat: Date.now(),
      name: savedUser.name,
      sub: savedUser.id,
    });
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

app.post("/auth", async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await UserModel.findOne({ name });
    if (!user) {
      return res.sendStatus(404);
    }
    const isValid = await user.isValidPassword(password);
    if (!isValid) {
      return res.sendStatus(401);
    }
    const token = await generateToken({
      iat: Date.now(),
      name: user.name,
      sub: user.id,
    });
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

app.get("/dashboard", auth, async (req, res) => {
  const { uid } = req;
  try {
    const user = await UserModel.findById(uid, "-password");
    if (!user) {
      return res.sendStatus(404);
    }
    res.json({ user });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});
module.exports = app;
