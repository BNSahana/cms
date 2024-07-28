// models/Other/marks.model.js
const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema({
  enrollmentNo: { type: String, required: true, unique: true },
  internal: { type: Object, default: {} },
  external: { type: Object, default: {} },
});

module.exports = mongoose.model("Marks", marksSchema);
