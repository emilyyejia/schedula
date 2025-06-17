const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
  {
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    student: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    teacher: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: { type: String, enum: ['booked', 'blocked'] },
    description: {type: String},
    title: {type:String}
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
