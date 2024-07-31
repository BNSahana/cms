import React, { useState } from "react";
import Heading from "../../components/Heading";
import EditFaculty from "./Faculty/EditFaculty";
import AddFaculty from "./Faculty/AddFaculty";

const Faculty = () => {
  const [selected, setSelected] = useState("add");

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <Heading
          title="Faculty Details"
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
            Add Faculty
          </button>
          <button
            className={`px-5 py-2 rounded-lg font-medium transition-all duration-300 ${
              selected === "edit"
                ? "bg-yellow-600 text-white border-b-2 border-yellow-800 hover:bg-yellow-700"
                : "bg-yellow-200 text-yellow-800 hover:bg-yellow-300"
            }`}
            onClick={() => setSelected("edit")}
          >
            Edit Faculty
          </button>
        </div>
      </div>
      {selected === "add" && <AddFaculty />}
      {selected === "edit" && <EditFaculty />}
    </div>
  );
};

export default Faculty;
