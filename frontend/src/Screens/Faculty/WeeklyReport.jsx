import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseApiURL } from "../../baseUrl";
import toast from "react-hot-toast";

const WeeklyReport = () => {
  const [data, setData] = useState({
    employeeId: "",
    title: "",
    course: "",
    hoursAllotted: "",
    hoursTaken: "",
    percentagePlanned: "",
    percentageCovered: "",
    totalPercentageCovered: "",
    totalPercentageRemaining: "",
    challenges: "",
    goals: "",
  });

  const [reports, setReports] = useState([]);
  const [editingReportId, setEditingReportId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const apiUrl = `${baseApiURL()}/weeklyReport`;
      const response = await axios.get(apiUrl);
      setReports(response.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
      toast.error("Error fetching reports.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.employeeId || !data.title || !data.course) {
      toast.error("Please fill in all required fields.");
      return;
    }

    toast.loading("Submitting report...");
    try {
      const apiUrl = `${baseApiURL()}/weeklyReport${
        editingReportId ? `/${editingReportId}` : "/createweeklyReport"
      }`;
      const method = editingReportId ? "put" : "post";

      const response = await axios[method](apiUrl, data);
      toast.dismiss();

      if (response.status === editingReportId ? 200 : 201) {
        toast.success(
          `Report ${editingReportId ? "updated" : "submitted"} successfully!`
        );
        fetchReports();
        setData({
          employeeId: "",
          title: "",
          course: "",
          hoursAllotted: "",
          hoursTaken: "",
          percentagePlanned: "",
          percentageCovered: "",
          totalPercentageCovered: "",
          totalPercentageRemaining: "",
          challenges: "",
          goals: "",
        });
        setEditingReportId(null);
        setIsFormVisible(false);
      } else {
        toast.error("Unexpected response from the server.");
      }
    } catch (error) {
      toast.dismiss();
      console.error("Error:", error);
      toast.error("Error submitting report.");
    }
  };

  const handleEdit = (report) => {
    setData(report);
    setEditingReportId(report._id);
    setIsFormVisible(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      try {
        const apiUrl = `${baseApiURL()}/weeklyReport/${id}`;
        await axios.delete(apiUrl);
        toast.success("Report deleted successfully!");
        fetchReports();
      } catch (error) {
        console.error("Error deleting report:", error);
        toast.error("Error deleting report.");
      }
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <button
        onClick={() => {
          setData({
            employeeId: "",
            title: "",
            course: "",
            hoursAllotted: "",
            hoursTaken: "",
            percentagePlanned: "",
            percentageCovered: "",
            totalPercentageCovered: "",
            totalPercentageRemaining: "",
            challenges: "",
            goals: "",
          });
          setEditingReportId(null);
          setIsFormVisible(true);
        }}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md"
      >
        Add Weekly Report
      </button>

      {isFormVisible && (
        <form
          onSubmit={handleSubmit}
          className="mt-10 bg-white p-6 rounded-lg shadow-md border border-gray-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "employeeId",
              "title",
              "course",
              "hoursAllotted",
              "hoursTaken",
              "percentagePlanned",
              "percentageCovered",
              "totalPercentageCovered",
              "totalPercentageRemaining",
            ].map((field) => (
              <div className="flex flex-col" key={field}>
                <label
                  htmlFor={field}
                  className="text-sm font-semibold text-gray-700 mb-1"
                >
                  {field.replace(/([A-Z])/g, " $1").trim()}
                </label>
                <input
                  type={
                    field.includes("hours") ||
                    field.includes("percentage") ||
                    field === "employeeId"
                      ? "number"
                      : "text"
                  }
                  id={field}
                  value={data[field]}
                  onChange={(e) =>
                    setData({ ...data, [field]: e.target.value })
                  }
                  border-gray-200
                />
              </div>
            ))}
            <div className="col-span-2 flex flex-col">
              <label
                htmlFor="challenges"
                className="text-sm font-semibold text-gray-700 mb-1"
              >
                Challenges
              </label>
              <textarea
                id="challenges"
                value={data.challenges}
                onChange={(e) =>
                  setData({ ...data, challenges: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
            </div>
            <div className="col-span-2 flex flex-col">
              <label
                htmlFor="goals"
                className="text-sm font-semibold text-gray-700 mb-1"
              >
                Goals
              </label>
              <textarea
                id="goals"
                value={data.goals}
                onChange={(e) => setData({ ...data, goals: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md mt-6"
          >
            {editingReportId ? "Update Weekly Report" : "Submit Weekly Report"}
          </button>
        </form>
      )}

      {reports.length > 0 && (
        <div className="mt-10 overflow-x-auto max-h-[500px]">
          <table className="w-full bg-white border-collapse border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-700 border-b border-gray-300">
                <th className="py-3 px-4 text-left font-semibold border-r border-gray-300">
                  Employee ID
                </th>
                <th className="py-3 px-4 text-left font-semibold border-r border-gray-300">
                  Title
                </th>
                <th className="py-3 px-4 text-left font-semibold border-r border-gray-300">
                  Course
                </th>
                <th className="py-3 px-4 text-left font-semibold border-r border-gray-300">
                  Hours Allotted
                </th>
                <th className="py-3 px-4 text-left font-semibold border-r border-gray-300">
                  Hours Taken
                </th>
                <th className="py-3 px-4 text-left font-semibold border-r border-gray-300">
                  Percentage Planned
                </th>
                <th className="py-3 px-4 text-left font-semibold border-r border-gray-300">
                  Percentage Covered
                </th>
                <th className="py-3 px-4 text-left font-semibold border-r border-gray-300">
                  Total Percentage Covered
                </th>
                <th className="py-3 px-4 text-left font-semibold border-r border-gray-300">
                  Total Percentage Remaining
                </th>
                <th className="py-3 px-4 text-left font-semibold border-r border-gray-300">
                  Challenges
                </th>
                <th className="py-3 px-4 text-left font-semibold border-r border-gray-300">
                  Goals
                </th>
                <th className="py-3 px-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr
                  key={report._id}
                  className="hover:bg-gray-50 transition-colors border-b border-gray-300"
                >
                  <td className="py-3 px-4 border-r border-gray-300">
                    {report.employeeId}
                  </td>
                  <td className="py-3 px-4 border-r border-gray-300">
                    {report.title}
                  </td>
                  <td className="py-3 px-4 border-r border-gray-300">
                    {report.course}
                  </td>
                  <td className="py-3 px-4 border-r border-gray-300">
                    {report.hoursAllotted}
                  </td>
                  <td className="py-3 px-4 border-r border-gray-300">
                    {report.hoursTaken}
                  </td>
                  <td className="py-3 px-4 border-r border-gray-300">
                    {report.percentagePlanned}
                  </td>
                  <td className="py-3 px-4 border-r border-gray-300">
                    {report.percentageCovered}
                  </td>
                  <td className="py-3 px-4 border-r border-gray-300">
                    {report.totalPercentageCovered}
                  </td>
                  <td className="py-3 px-4 border-r border-gray-300">
                    {report.totalPercentageRemaining}
                  </td>
                  <td className="py-3 px-4 border-r border-gray-300">
                    {report.challenges}
                  </td>
                  <td className="py-3 px-4 border-r border-gray-300">
                    {report.goals}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleEdit(report)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-md mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(report._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WeeklyReport;
