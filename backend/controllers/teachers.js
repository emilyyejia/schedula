const mongoose = require("mongoose");
const TeacherProfile = require('../models/teacherProfile');

module.exports = {
  getTeachers
};

async function getTeachers(req, res) {
  try {
    const teachers = await TeacherProfile.find({ })
    .populate("teacher");
    res.json(teachers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch teachers" });
  }
}
