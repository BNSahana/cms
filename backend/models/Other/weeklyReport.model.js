// models/WeeklyReport.js
const mongoose = require('mongoose');

const WeeklyReportSchema = new mongoose.Schema({
  title: String,
  course: String,
  hoursAllotted: Number,
  hoursTaken: Number,
  percentagePlanned: Number,
  percentageCovered: Number,
  totalPercentageCovered: Number,
  totalPercentageRemaining: Number,
  challenges: [String],
  goals: [String],
}, { timestamps: true });

module.exports = mongoose.model('WeeklyReport', WeeklyReportSchema);
