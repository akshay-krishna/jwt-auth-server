const { connect } = require("mongoose");

const connectDb = async () => {
  try {
    await connect("mongodb://localhost/test", {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = connectDb;
