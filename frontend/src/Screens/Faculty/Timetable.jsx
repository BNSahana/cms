import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import Heading from "../../components/Heading";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import { baseApiURL } from "../../baseUrl";

const Timetable = () => {
  const [addselected, setAddSelected] = useState({
    branch: "",
    semester: "",
  });
  const [file, setFile] = useState();
  const [branch, setBranch] = useState([]);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    getBranchData();
  }, []);

  const getBranchData = () => {
    axios
      .get(`${baseApiURL()}/branch/getBranch`, {
        headers: { "Content-Type": "application/json" },
      })
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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const imageUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(imageUrl);
  };

  const addTimetableHandler = () => {
    toast.loading("Adding Timetable...");
    const formData = new FormData();
    formData.append("branch", addselected.branch);
    formData.append("semester", addselected.semester);
    formData.append("type", "timetable");
    formData.append("timetable", file);

    axios
      .post(`${baseApiURL()}/timetable/addTimetable`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          setAddSelected({ branch: "", semester: "" });
          setFile(null);
          setPreviewUrl("");
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <Heading title="Upload Timetable" />
      </div>
      <div className="flex flex-col items-center">
        <p className="text-xl font-medium mb-4">Add Timetable</p>
        <div className="w-full flex flex-col gap-4 mb-8">
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
              value={addselected.branch}
              onChange={(e) =>
                setAddSelected({ ...addselected, branch: e.target.value })
              }
            >
              <option value="">-- Select Branch --</option>
              {branch.map((b) => (
                <option value={b.name} key={b.name}>
                  {b.name}
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
              value={addselected.semester}
              onChange={(e) =>
                setAddSelected({ ...addselected, semester: e.target.value })
              }
            >
              <option value="">-- Select Semester --</option>
              {[...Array(8)].map((_, i) => (
                <option value={i + 1} key={i + 1}>
                  {i + 1}st Semester
                </option>
              ))}
            </select>
          </div>

          <label
            htmlFor="upload"
            className={`flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg border border-gray-300 shadow-sm cursor-pointer transition ${
              file ? "bg-blue-100" : "hover:bg-gray-200"
            }`}
          >
            <span className="text-base">
              {file ? "Selected Timetable" : "Select Timetable"}
            </span>
            <FiUpload className="text-xl" />
          </label>

          {previewUrl && (
            <p
              className="flex items-center justify-between px-4 py-2 bg-red-50 border border-red-300 rounded-lg text-red-500 cursor-pointer transition hover:bg-red-100"
              onClick={() => {
                setFile(null);
                setPreviewUrl("");
              }}
            >
              Remove Selected Timetable
              <AiOutlineClose className="text-xl" />
            </p>
          )}

          <input
            type="file"
            id="upload"
            accept="application/pdf"
            hidden
            onChange={handleFileChange}
          />
        </div>

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          onClick={addTimetableHandler}
        >
          Add Timetable
        </button>

        {previewUrl && (
          <img
            className="mt-6 max-w-full h-auto rounded-lg shadow-sm"
            src={previewUrl}
            alt="Preview"
          />
        )}
      </div>
    </div>
  );
};

export default Timetable;
