const mongoose = require("mongoose");

const hackathonSchema = new mongoose.Schema({
  contestName: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  organizationType: { type: String, required: true },
  organizationName: { type: String, required: true },
  tagLine: { type: String },
  description: { type: String },
  registrationDeadline: { type: Date, required: true },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Hackathon", hackathonSchema);
