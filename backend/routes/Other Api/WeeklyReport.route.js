const express = require('express');
const { createReport, getReports, updateReport, deleteReport} = require('../../controllers/Other/weeklyReport.controller');

const router = express.Router();

router.post('/createweeklyReport', createReport);
router.get('/getweeklyReports', getReports);
router.put('updateweeklyReport/:id',updateReport);
router.delete('deleteweeklyReport/:id', deleteReport);

module.exports = router;
