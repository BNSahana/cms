import React, { useState } from "react";
import toast from "react-hot-toast";
import Heading from "../../components/Heading";
import axios from "axios";
import { baseApiURL } from "../../baseUrl";
import { FiSearch } from "react-icons/fi";

const Student = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState({
    enrollmentNo: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    semester: "",
    branch: "",
    gender: "",
    profile: "",
  });
  const [id, setId] = useState();

  const searchStudentHandler = (e) => {
    e.preventDefault();
    setId("");
    setData({
      enrollmentNo: "",
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      semester: "",
      branch: "",
      gender: "",
      profile: "",
    });
    toast.loading("Getting Student");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/student/details/getDetails`,
        { enrollmentNo: search },
        { headers }
      )
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          if (response.data.user.length === 0) {
            toast.error("No Student Found!");
          } else {
            toast.success(response.data.message);
            setData({
              enrollmentNo: response.data.user[0].enrollmentNo,
              firstName: response.data.user[0].firstName,
              middleName: response.data.user[0].middleName,
              lastName: response.data.user[0].lastName,
              email: response.data.user[0].email,
              phoneNumber: response.data.user[0].phoneNumber,
              semester: response.data.user[0].semester,
              branch: response.data.user[0].branch,
              gender: response.data.user[0].gender,
              profile: response.data.user[0].profile,
            });
            setId(response.data.user[0]._id);
          }
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.error(error);
      });
  };

  return (
    <div className="w-full mx-auto mt-12 flex flex-col items-center">
      <Heading title="Student Details" className="mb-6" />
      <form
        className="flex items-center border border-gray-300 rounded-lg bg-white shadow-lg p-4 mb-8 w-full max-w-md"
        onSubmit={searchStudentHandler}
      >
        <div className="relative flex-1">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter Enrollment No."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800 transition"
          >
            <FiSearch size={20} />
          </button>
        </div>
      </form>
      {id && (
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg border border-gray-300">
          <div className="flex items-center space-x-6">
            <img
              src={process.env.REACT_APP_MEDIA_LINK + "/" + data.profile}
              alt="student profile"
              className="h-40 w-40 object-cover rounded-full shadow-md"
            />
            <div>
              <p className="text-3xl font-bold mb-2">
                {data.firstName} {data.middleName} {data.lastName}
              </p>
              <p className="text-lg font-medium mb-1">
                Enrollment No:{" "}
                <span className="font-normal">{data.enrollmentNo}</span>
              </p>
              <p className="text-lg font-medium mb-1">
                Phone Number:{" "}
                <span className="font-normal">+91 {data.phoneNumber}</span>
              </p>
              <p className="text-lg font-medium mb-1">
                Email Address: <span className="font-normal">{data.email}</span>
              </p>
              <p className="text-lg font-medium mb-1">
                Branch: <span className="font-normal">{data.branch}</span>
              </p>
              <p className="text-lg font-medium mb-1">
                Semester: <span className="font-normal">{data.semester}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Student;
