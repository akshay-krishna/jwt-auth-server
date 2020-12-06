const { model, Schema } = require("mongoose");
const { compare, hash } = require("bcrypt");

const UserSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
});

UserSchema.pre("save", async function () {
  try {
    this.password = await hash(this.password, 10);
  } catch (err) {
    console.error(err.message);
  }
});

UserSchema.methods.isValidPassword = async function (plainText) {
  try {
    return await compare(plainText, this.password);
  } catch (err) {
    console.error(err.message);
  }
};
module.exports = model("users", UserSchema);
