const mongoose = require("mongoose");
const schema = mongoose.Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [4, " min pwd length must be 4 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/[a-z0-9]+@[a-z0-9]+/, "user email is not valid"], //simple check
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: { type: String, default: "" },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required4444"],
    },
  },
  {
    versionKey: false,
    timestamps: true, //add create and update fields
  }
);
const Users = mongoose.model("users", schema);
module.exports = { Users };
