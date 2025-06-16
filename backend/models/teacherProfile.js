const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teacherProfileSchema = new Schema(
  {
    teacher: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    bio: String,
    subjects: [String],
    photo: String
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TeacherProfile", teacherProfileSchema);
