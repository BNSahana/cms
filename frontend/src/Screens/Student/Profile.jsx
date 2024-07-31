import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setUserData } from "../../redux/actions";
import { baseApiURL } from "../../baseUrl";
import toast from "react-hot-toast";

const Profile = () => {
  const [showPass, setShowPass] = useState(false);
  const router = useLocation();
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const [password, setPassword] = useState({
    new: "",
    current: "",
  });

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/${router.state.type}/details/getDetails`,
        { enrollmentNo: router.state.loginid },
        { headers: headers }
      )
      .then((response) => {
        if (response.data.success) {
          setData(response.data.user[0]);
          dispatch(
            setUserData({
              fullname: `${response.data.user[0].firstName} ${response.data.user[0].middleName} ${response.data.user[0].lastName}`,
              semester: response.data.user[0].semester,
              enrollmentNo: response.data.user[0].enrollmentNo,
              branch: response.data.user[0].branch,
            })
          );
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch, router.state.loginid, router.state.type]);

  const checkPasswordHandler = (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/student/auth/login`,
        { loginid: router.state.loginid, password: password.current },
        { headers: headers }
      )
      .then((response) => {
        if (response.data.success) {
          changePasswordHandler(response.data.id);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.error(error);
      });
  };

  const changePasswordHandler = (id) => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .put(
        `${baseApiURL()}/student/auth/update/${id}`,
        { loginid: router.state.loginid, password: password.new },
        { headers: headers }
      )
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          setPassword({ new: "", current: "" });
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
    <div className="w-full max-w-4xl mx-auto my-8 p-8 bg-gradient-to-r from-blue-50 via-green-50 to-yellow-50 shadow-lg rounded-lg border border-gray-300">
      {data && (
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
            <img
              src={process.env.REACT_APP_MEDIA_LINK + "/" + data.profile}
              alt="student profile"
              className="h-48 w-48 object-cover rounded-full border-4 border-gradient-to-r from-blue-400 via-green-400 to-yellow-400 shadow-md"
            />
          </div>
          <div className="md:w-2/3">
            <p className="text-4xl font-bold mb-4 text-gray-800">
              Hello {data.firstName} {data.middleName} {data.lastName} 👋
            </p>
            <div className="text-lg text-gray-700 mb-4 space-y-2">
              <p>
                <strong className="text-gray-900">Enrollment No:</strong>{" "}
                {data.enrollmentNo}
              </p>
              <p>
                <strong className="text-gray-900">Branch:</strong> {data.branch}
              </p>
              <p>
                <strong className="text-gray-900">Semester:</strong>{" "}
                {data.semester}
              </p>
              <p>
                <strong className="text-gray-900">Phone Number:</strong> +91{" "}
                {data.phoneNumber}
              </p>
              <p>
                <strong className="text-gray-900">Email Address:</strong>{" "}
                {data.email}
              </p>
            </div>
            <button
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                showPass
                  ? "bg-red-300 text-red-700"
                  : "bg-gradient-to-r from-blue-500 to-teal-500 text-white"
              } hover:opacity-80`}
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? "Close Change Password" : "Change Password"}
            </button>
            {showPass && (
              <form
                className="mt-6 border-t-2 border-blue-400 pt-4 flex flex-col gap-4"
                onSubmit={checkPasswordHandler}
              >
                <input
                  type="password"
                  value={password.current}
                  onChange={(e) =>
                    setPassword({ ...password, current: e.target.value })
                  }
                  placeholder="Current Password"
                  className="px-4 py-2 border-2 border-blue-400 outline-none rounded-lg transition-colors duration-300 focus:border-blue-600"
                />
                <input
                  type="password"
                  value={password.new}
                  onChange={(e) =>
                    setPassword({ ...password, new: e.target.value })
                  }
                  placeholder="New Password"
                  className="px-4 py-2 border-2 border-blue-400 outline-none rounded-lg transition-colors duration-300 focus:border-blue-600"
                />
                <button
                  className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:bg-blue-700"
                  type="submit"
                >
                  Change Password
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
