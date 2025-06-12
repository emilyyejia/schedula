const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const availabilitySchema = new Schema(
  { 
    timeSlots: [
      {
        startTime: { type: Date, required: true }, 
        endTime: { type: Date, required: true }
      }
    ],
    teacher: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model('Availability', availabilitySchema);