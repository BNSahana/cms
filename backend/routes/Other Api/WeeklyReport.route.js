const express = require('express');
const router = express.Router();
const weeklyReportController = require('../../controllers/Other/weeklyReport.controller');

router.post('/createweeklyReport', weeklyReportController.createReport);
router.get('/', weeklyReportController.getAllReports);
router.put('/:id', weeklyReportController.updateReport);
router.delete('/:id', weeklyReportController.deleteReport);

module.exports = router;
