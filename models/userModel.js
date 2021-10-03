const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    minlength: [8, "password must contain at least 8 characters"],
  },
  passwordConfirm: {
    type: String,
    validate: {
      validator: function (el) {
        return el == this.password;
      },
      message: "passwords are not the same",
    },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

const user = mongoose.model("User", userSchema);

module.exports = user;
