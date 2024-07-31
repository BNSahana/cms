import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseApiURL } from "../../baseUrl";
import Heading from "../../components/Heading";

const WeeklyReport = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get(`${baseApiURL()}/weeklyReport`);
      if (response.data) {
        setReports(response.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">
        Error fetching reports: {error}
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-white-50 rounded-lg shadow-lg border border-gray-200">
      {/* Use the Heading component here */}
      <Heading title="Weekly Reports" />

      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md border border-gray-300">
          <thead>
            <tr className="bg-blue-400 text-white">
              <th className="py-3 px-4 text-left">Employee ID</th>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Course</th>
              <th className="py-3 px-4 text-left">Hours Allotted</th>
              <th className="py-3 px-4 text-left">Hours Taken</th>
              <th className="py-3 px-4 text-left">Planned %</th>
              <th className="py-3 px-4 text-left">Covered %</th>
              <th className="py-3 px-4 text-left">Total Covered %</th>
              <th className="py-3 px-4 text-left">Remaining %</th>
              <th className="py-3 px-4 text-left">Challenges</th>
              <th className="py-3 px-4 text-left">Goals</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-700">{report.employeeId}</td>
                <td className="py-3 px-4 text-gray-700">{report.title}</td>
                <td className="py-3 px-4 text-gray-700">{report.course}</td>
                <td className="py-3 px-4 text-gray-700">
                  {report.hoursAllotted}
                </td>
                <td className="py-3 px-4 text-gray-700">{report.hoursTaken}</td>
                <td className="py-3 px-4 text-gray-700">
                  {report.percentagePlanned}
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {report.percentageCovered}
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {report.totalPercentageCovered}
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {report.totalPercentageRemaining}
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {report.challenges.join(", ")}
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {report.goals.join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeeklyReport;
