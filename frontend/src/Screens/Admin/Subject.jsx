import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Heading from "../../components/Heading";
import { MdOutlineDelete } from "react-icons/md";
import { baseApiURL } from "../../baseUrl";

const Subjects = () => {
  const [data, setData] = useState({ name: "", code: "" });
  const [selected, setSelected] = useState("add");
  const [subject, setSubject] = useState([]);

  useEffect(() => {
    getSubjectHandler();
  }, []);

  const getSubjectHandler = () => {
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
        toast.error(error.message);
      });
  };

  const addSubjectHandler = () => {
    toast.loading("Adding Subject...");
    const headers = { "Content-Type": "application/json" };
    axios
      .post(`${baseApiURL()}/subject/addSubject`, data, { headers })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          setData({ name: "", code: "" });
          getSubjectHandler();
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };

  const deleteSubjectHandler = (id) => {
    toast.loading("Deleting Subject...");
    const headers = { "Content-Type": "application/json" };
    axios
      .delete(`${baseApiURL()}/subject/deleteSubject/${id}`, { headers })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          getSubjectHandler();
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
    <div className="w-full max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <Heading
          title="Subject Management"
          className="text-3xl font-semibold text-gray-800 mb-4 md:mb-0"
        />
        <div className="flex space-x-4">
          <button
            className={`px-5 py-2 rounded-lg font-medium transition-all duration-300 ${
              selected === "add"
                ? "bg-green-600 text-white border-b-2 border-green-800 hover:bg-green-700"
                : "bg-green-200 text-green-800 hover:bg-green-300"
            }`}
            onClick={() => setSelected("add")}
          >
            Add Subject
          </button>
          <button
            className={`px-5 py-2 rounded-lg font-medium transition-all duration-300 ${
              selected === "view"
                ? "bg-yellow-600 text-white border-b-2 border-yellow-800 hover:bg-yellow-700"
                : "bg-yellow-200 text-yellow-800 hover:bg-yellow-300"
            }`}
            onClick={() => setSelected("view")}
          >
            View Subject
          </button>
        </div>
      </div>
      {selected === "add" && (
        <div className="flex flex-col items-center w-full mt-8 space-y-6">
          <div className="w-full md:w-1/2 lg:w-1/3 space-y-4">
            <div>
              <label
                htmlFor="code"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Enter Subject Code
              </label>
              <input
                type="number"
                id="code"
                value={data.code}
                onChange={(e) => setData({ ...data, code: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Enter Subject Name
              </label>
              <input
                type="text"
                id="name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-blue-700 transition-colors duration-300"
            onClick={addSubjectHandler}
          >
            Add Subject
          </button>
        </div>
      )}
      {selected === "view" && (
        <div className="mt-8">
          <ul className="space-y-4">
            {subject &&
              subject.map((item) => (
                <li
                  key={item.code}
                  className="bg-gray-100 py-3 px-6 mb-3 flex justify-between items-center rounded-lg shadow-sm hover:bg-gray-200 transition-colors duration-200"
                >
                  <div className="text-lg font-medium text-gray-800">
                    {item.code} - {item.name}
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700 transition-colors duration-200"
                    onClick={() => deleteSubjectHandler(item._id)}
                  >
                    <MdOutlineDelete className="text-2xl" />
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Subjects;
