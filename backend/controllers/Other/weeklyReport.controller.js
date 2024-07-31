const WeeklyReport = require('../../models/Other/weeklyReport.model');
const FacultyDetail = require('../../models/Faculty/details.model'); // Import the Faculty Detail model

exports.createReport = async (req, res) => {
  try {
    const {
      employeeId,
      course,
      title,
      hoursAllotted,
      hoursTaken,
      percentagePlanned,
      percentageCovered,
      totalPercentageCovered,
      totalPercentageRemaining,
      challenges,
      goals,
    } = req.body;

    // Validate that the employeeId exists in the FacultyDetail collection
    const facultyDetail = await FacultyDetail.findOne({ employeeId });
    if (!facultyDetail) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Calculate total covered percentage
    const previousReports = await WeeklyReport.find({ employeeId, course });
    const totalCovered = previousReports.reduce(
      (acc, report) => acc + report.percentageCovered,
      0
    ) + percentageCovered;

    const report = new WeeklyReport({
      employeeId,
      course,
      title,
      hoursAllotted,
      hoursTaken,
      percentagePlanned,
      percentageCovered,
      totalPercentageCovered: totalPercentageCovered || totalCovered,
      totalPercentageRemaining: totalPercentageRemaining || (100 - totalCovered),
      challenges,
      goals,
    });

    await report.save();
    res.status(201).json(report);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllReports = async (req, res) => {
  try {
    const reports = await WeeklyReport.find();
    res.status(200).json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ message: 'Error fetching reports.' });
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
      totalPercentageCovered,
      totalPercentageRemaining,
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

    // Update the total covered percentage and remaining percentage
    if (percentageCovered !== undefined) {
      const previousCovered = report.percentageCovered;
      report.percentageCovered = percentageCovered;
      report.totalPercentageCovered = totalPercentageCovered || (report.totalPercentageCovered - previousCovered + percentageCovered);
      report.totalPercentageRemaining = totalPercentageRemaining || (100 - report.totalPercentageCovered);
    }

    report.challenges = challenges || report.challenges;
    report.goals = goals || report.goals;

    await report.save();
    res.status(200).json(report);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

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
