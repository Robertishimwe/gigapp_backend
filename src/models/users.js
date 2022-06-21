import mongoose from "mongoose";
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  firstName: {
    type: "string",
    required: true,
    min: 4,
    max: 15,
  },
  lastName: {
    type: "string",
    required: true,
    min: 4,
    max: 15,
  },
  userName: {
    type: "string",
    unique: true,
    required: true,
    min: 4,
    max: 15,
  },
  userEmail: {
    type: "string",
    unique: true,
    required: true,
    min: 50,
    max: 300,
  },
  userPassword: {
    type: "string",
    required: true,
    min: 6,
    max: 12,
  },
  userRole: {
    type: "string",
    enum: ["employer", "employee", "admin"],
  },
  blocked: {
    type: "boolean",
    default: false,
  },
  gigies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Gig",
    },
  ],
  badges: {
    type: "array",
    default: [],
  },
  CreatedDate: {
    type: "date",
    default: Date.now(),
  },
  UpdatedDate: {
    type: "date",
    default: Date.now(),
  },
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.userPassword = await bcrypt.hash(this.userPassword, salt);
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
