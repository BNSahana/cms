const WeeklyReport = require('../../models/Other/weeklyReport.model');

exports.createReport = async (req, res) => {
  try {
    const {
      facultyId,
      course,
      title,
      hoursAllotted,
      hoursTaken,
      percentagePlanned,
      percentageCovered,
      challenges,
      goals,
    } = req.body;

    const previousReports = await WeeklyReport.find({ facultyId, course });

    const totalCovered = previousReports.reduce(
      (acc, report) => acc + report.percentageCovered,
      0
    ) + percentageCovered;

    const report = new WeeklyReport({
      facultyId,
      course,
      title,
      hoursAllotted,
      hoursTaken,
      percentagePlanned,
      percentageCovered,
      totalPercentageCovered: totalCovered,
      totalPercentageRemaining: 100 - totalCovered,
      challenges,
      goals,
    });

    await report.save();
    res.status(201).json(report);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getReports = async (req, res) => {
  try {
    const reports = await WeeklyReport.find().populate('facultyId', 'name');
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      course,
      title,
      hoursAllotted,
      hoursTaken,
      percentagePlanned,
      percentageCovered,
      challenges,
      goals,
    } = req.body;

    const report = await WeeklyReport.findById(id);
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }

    report.course = course || report.course;
    report.title = title || report.title;
    report.hoursAllotted = hoursAllotted || report.hoursAllotted;
    report.hoursTaken = hoursTaken || report.hoursTaken;
    report.percentagePlanned = percentagePlanned || report.percentagePlanned;
    report.percentageCovered = percentageCovered || report.percentageCovered;
    report.totalPercentageCovered = report.totalPercentageCovered - report.percentageCovered + percentageCovered;
    report.totalPercentageRemaining = 100 - report.totalPercentageCovered;
    report.challenges = challenges || report.challenges;
    report.goals = goals || report.goals;

    await report.save();
    res.status(200).json(report);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Report
exports.deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await WeeklyReport.findByIdAndDelete(id);

    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }

    res.status(200).json({ message: 'Report deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};