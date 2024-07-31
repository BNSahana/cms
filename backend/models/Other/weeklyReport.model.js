const mongoose = require("mongoose");

const WeeklyReportSchema = new mongoose.Schema(
  {
    employeeId: {
      type: Number,
      required: true,
      ref: "Faculty Detail"
    },
    title: {
      type: String,
      required: true
    },
    course: {
      type: String,
      required: true
    },
    hoursAllotted: {
      type: Number,
      required: true
    },
    hoursTaken: {
      type: Number,
      required: true
    },
    percentagePlanned: {
      type: Number,
      required: true
    },
    percentageCovered: {
      type: Number,
      required: true
    },
    totalPercentageCovered: {
      type: Number,
      required: true,
      default: 0
    },
    totalPercentageRemaining: {
      type: Number,
      required: true,
      default: 100
    },
    challenges: {
      type: [String],
      default: []
    },
    goals: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("WeeklyReport", WeeklyReportSchema);
