/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import Heading from "../../components/Heading";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { baseApiURL } from "../../baseUrl";

const Material = () => {
  const { fullname } = useSelector((state) => state.userData);
  const [subject, setSubject] = useState([]);
  const [file, setFile] = useState(null);
  const [selected, setSelected] = useState({
    title: "",
    subject: "",
    faculty: `${fullname.split(" ")[0]} ${fullname.split(" ")[2]}`,
    link: "",
  });

  useEffect(() => {
    toast.loading("Loading Subjects...");
    axios
      .get(`${baseApiURL()}/subject/getSubject`)
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          setSubject(response.data.subject);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.message);
      });
  }, []);

  const addMaterialHandler = () => {
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    toast.loading("Adding Material...");
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    const formData = new FormData();
    formData.append("title", selected.title);
    formData.append("subject", selected.subject);
    formData.append("faculty", selected.faculty);
    formData.append("type", "material");
    formData.append("material", file);

    axios
      .post(`${baseApiURL()}/material/addMaterial`, formData, {
        headers: headers,
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          setSelected({
            title: "",
            subject: "",
            faculty: `${fullname.split(" ")[0]} ${fullname.split(" ")[2]}`,
            link: "",
          });
          setFile(null);
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
    <div className="w-full mx-auto mt-10 flex flex-col items-center max-w-lg px-4 py-6 bg-white rounded-lg shadow-md border border-gray-200">
      <Heading
        title="Upload Material"
        className="text-xl font-semibold mb-6 text-gray-800"
      />

      <div className="w-full flex flex-col space-y-6">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="title"
              className="text-base font-medium text-gray-700"
            >
              Material Title
            </label>
            <input
              type="text"
              id="title"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              value={selected.title}
              onChange={(e) =>
                setSelected({ ...selected, title: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label
              htmlFor="subject"
              className="text-base font-medium text-gray-700"
            >
              Material Subject
            </label>
            <select
              value={selected.subject}
              name="subject"
              id="subject"
              onChange={(e) =>
                setSelected({ ...selected, subject: e.target.value })
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                -- Select Subject --
              </option>
              {subject.map((item) => (
                <option value={item.name} key={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            {!selected.link ? (
              <>
                <label
                  htmlFor="upload"
                  className="flex items-center justify-center bg-blue-500 text-white border border-blue-600 rounded-lg py-2 px-4 cursor-pointer hover:bg-blue-600 transition duration-150"
                >
                  Upload Material
                  <span className="ml-2">
                    <FiUpload />
                  </span>
                </label>
                <input
                  type="file"
                  name="upload"
                  id="upload"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </>
            ) : (
              <p
                className="flex items-center justify-center bg-red-500 text-white border border-red-600 rounded-lg py-2 px-4 cursor-pointer hover:bg-red-600 transition duration-150"
                onClick={() => setSelected({ ...selected, link: "" })}
              >
                Remove Selected Material
                <span className="ml-2">
                  <AiOutlineClose />
                </span>
              </p>
            )}
          </div>

          <button
            className="bg-green-500 text-white rounded-lg py-2 px-4 mt-4 hover:bg-green-600 transition duration-150 focus:outline-none focus:ring-1 focus:ring-green-500"
            onClick={addMaterialHandler}
          >
            Add Material
          </button>
        </div>
      </div>
    </div>
  );
};

export default Material;
