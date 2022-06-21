import mongoose from "mongoose";
const Schema = mongoose.Schema;

const GigySchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: "string",
    required: true,
    min: 6,
    max: 30,
  },
  description: {
    type: "string",
    required: true,
    min: 30,
    max: 300,
  },
  category: {
    type: "string",
    required: true,
    min: 4,
    max: 15,
  },
  price: {
    type: "number",
    required: true,
    min: 300,
    max: 100000,
  },
  status: {
    type: "string",
    enum: ["posted", "assigned", "started", "completed"],
    default: "posted",
  },

  bidders: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  CreatedDate: {
    type: "date",
    default: Date.now(),
  },
  UpdatedDate: {
    type: "date",
    default: Date.now(),
  },
});

const Gig = mongoose.model("Gig", GigySchema);

module.exports = Gig;
