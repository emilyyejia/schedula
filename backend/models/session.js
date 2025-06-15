const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionSchema = new Schema(
 {
    teacher: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    blockedDates: [
      {
        type: Date,
        required: true,
      }
    ],
    blockedTimeSlots: [
      {
        date: { type: Date, required: true },
        startTime: { type: String },  
        endTime: { type: String },   
      }
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Session", sessionSchema);
