const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      enum: ["true", "false"],
      default: false,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// model(class)
const Contacts = mongoose.model("contacts", schema);
module.exports = { Contacts };
