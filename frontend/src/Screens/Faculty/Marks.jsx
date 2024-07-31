import axios from "axios";
import React, { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { baseApiURL } from "../../baseUrl";

const Marks = () => {
  const [subject, setSubject] = useState([]);
  const [branch, setBranch] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [selected, setSelected] = useState({
    branch: "",
    semester: "",
    subject: "",
    examType: "",
  });

  const loadStudentDetails = () => {
    if (!selected.branch || !selected.semester) {
      toast.error("Please select branch and semester");
      return;
    }
    axios
      .post(`${baseApiURL()}/student/details/getDetails`, {
        branch: selected.branch,
        semester: selected.semester,
      })
      .then((response) => {
        if (response.data.success) {
          setStudentData(response.data.user);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  };

  const submitMarksHandler = () => {
    let container = document.getElementById("markContainer");
    container.childNodes.forEach((enroll) => {
      setStudentMarksHandler(
        enroll.id,
        document.getElementById(enroll.id + "marks").value
      );
    });
  };

  const setStudentMarksHandler = (enrollment, value) => {
    axios
      .post(`${baseApiURL()}/marks/addMarks`, {
        enrollmentNo: enrollment,
        [selected.examType]: {
          [selected.subject]: value,
        },
      })
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  };

  const getBranchData = () => {
    axios
      .get(`${baseApiURL()}/branch/getBranch`)
      .then((response) => {
        if (response.data.success) {
          setBranch(response.data.branches);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  };

  const getSubjectData = () => {
    axios
      .get(`${baseApiURL()}/subject/getSubject`)
      .then((response) => {
        if (response.data.success) {
          setSubject(response.data.subject);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  };

  useEffect(() => {
    getBranchData();
    getSubjectData();
  }, []);

  const resetValueHandler = () => {
    setStudentData([]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200">
      <div className="relative flex justify-between items-center mb-6">
        <Heading title="Upload Marks" />
        {studentData.length > 0 && (
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center bg-red-100 text-red-500 border border-red-300 px-4 py-2 rounded-lg shadow-sm hover:bg-red-200 transition-colors"
            onClick={resetValueHandler}
          >
            <BiArrowBack className="text-lg mr-2" />
            Close
          </button>
        )}
      </div>
      {studentData.length === 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
              <label
                htmlFor="branch"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select Branch
              </label>
              <select
                id="branch"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition"
                value={selected.branch}
                onChange={(e) =>
                  setSelected({ ...selected, branch: e.target.value })
                }
              >
                <option value="">-- Select --</option>
                {branch.map((branch) => (
                  <option value={branch.name} key={branch.name}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
              <label
                htmlFor="semester"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select Semester
              </label>
              <select
                id="semester"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition"
                value={selected.semester}
                onChange={(e) =>
                  setSelected({ ...selected, semester: e.target.value })
                }
              >
                <option value="">-- Select --</option>
                {[...Array(8)].map((_, i) => (
                  <option value={i + 1} key={i + 1}>
                    {i + 1}th Semester
                  </option>
                ))}
              </select>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select Subject
              </label>
              <select
                id="subject"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition"
                value={selected.subject}
                onChange={(e) =>
                  setSelected({ ...selected, subject: e.target.value })
                }
              >
                <option value="">-- Select --</option>
                {subject.map((subject) => (
                  <option value={subject.name} key={subject.name}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
              <label
                htmlFor="examType"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select Exam Type
              </label>
              <select
                id="examType"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition"
                value={selected.examType}
                onChange={(e) =>
                  setSelected({ ...selected, examType: e.target.value })
                }
              >
                <option value="">-- Select --</option>
                <option value="internal">Internal</option>
                <option value="external">External</option>
              </select>
            </div>
          </div>
          <button
            className="block mx-auto bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
            onClick={loadStudentDetails}
          >
            Load Student Data
          </button>
        </>
      ) : (
        <>
          <p className="text-lg text-gray-700 mb-6">
            Upload {selected.examType} Marks for {selected.branch} Semester{" "}
            {selected.semester} of {selected.subject}
          </p>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            id="markContainer"
          >
            {studentData.map((student) => (
              <div
                key={student.enrollmentNo}
                className="bg-white border border-gray-300 rounded-lg shadow-sm p-4 flex items-center justify-between"
                id={student.enrollmentNo}
              >
                <p className="text-sm font-medium text-gray-700">
                  {student.enrollmentNo}
                </p>
                <input
                  type="number"
                  className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition"
                  placeholder="Enter Marks"
                  id={`${student.enrollmentNo}marks`}
                />
              </div>
            ))}
          </div>
          <button
            className="block mx-auto bg-blue-600 text-white px-6 py-3 mt-8 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
            onClick={submitMarksHandler}
          >
            Upload Student Marks
          </button>
        </>
      )}
    </div>
  );
};

export default Marks;
