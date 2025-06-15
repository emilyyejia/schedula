const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionSchema = new Schema(
 {
    teacher: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
 
    blockedTimeSlots: [
      {
        date: { type: Date, required: true },
        startTime: { type: String },  
      }
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Session", sessionSchema);
