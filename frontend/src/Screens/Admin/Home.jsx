/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import Notice from "../../components/Notice";
import Student from "./Student";
import Faculty from "./Faculty";
import Subjects from "./Subject";
import { baseApiURL } from "../../baseUrl";
import Admin from "./Admin";
import Profile from "./Profile";
import Branch from "./Branch";
import WeeklyReport from "./WeeklyReport";

const Home = () => {
  const router = useLocation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("Profile");
  const [dashboardData, setDashboardData] = useState({
    studentCount: "",
    facultyCount: "",
  });

  useEffect(() => {
    if (router.state === null) {
      navigate("/");
    }
    setLoad(true);
  }, [navigate, router.state]);

  useEffect(() => {
    getStudentCount();
    getFacultyCount();
  }, []);

  const getStudentCount = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${baseApiURL()}/student/details/count`, { headers })
      .then((response) => {
        if (response.data.success) {
          setDashboardData({
            ...dashboardData,
            studentCount: response.data.user,
          });
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getFacultyCount = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${baseApiURL()}/faculty/details/count`, { headers })
      .then((response) => {
        if (response.data.success) {
          setDashboardData({
            ...dashboardData,
            facultyCount: response.data.user,
          });
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {load && (
        <section className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-300 to-pink-300">
          <Navbar />
          <div className="pt-6 max-w-6xl mx-auto px-4">
            <div className="bg-white shadow-lg rounded-lg mt-6 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out">
              <ul className="flex justify-around items-center bg-white p-4 rounded-t-lg text-gray-800 font-semibold shadow-md">
                {[
                  "Profile",
                  "Student",
                  "Faculty",
                  "Branch",
                  "Notice",
                  "Subjects",
                  "Admin",
                  "Weekly Report",
                ].map((menu) => (
                  <li
                    key={menu}
                    className={`cursor-pointer py-2 px-4 rounded-lg transition-transform duration-300 ${
                      selectedMenu === menu
                        ? "bg-blue-600 text-white shadow-lg transform scale-105"
                        : "hover:bg-blue-500 hover:text-white hover:shadow-md transform transition-transform duration-200"
                    }`}
                    onClick={() => setSelectedMenu(menu)}
                  >
                    {menu}
                  </li>
                ))}
              </ul>
              <div className="p-6">
                {selectedMenu === "Profile" && (
                  <div className="transition-opacity duration-500 opacity-100 animate__animated animate__fadeIn">
                    <Profile />
                  </div>
                )}
                {selectedMenu === "Student" && (
                  <div className="transition-opacity duration-500 opacity-100 animate__animated animate__fadeIn">
                    <Student />
                  </div>
                )}
                {selectedMenu === "Faculty" && (
                  <div className="transition-opacity duration-500 opacity-100 animate__animated animate__fadeIn">
                    <Faculty />
                  </div>
                )}
                {selectedMenu === "Branch" && (
                  <div className="transition-opacity duration-500 opacity-100 animate__animated animate__fadeIn">
                    <Branch />
                  </div>
                )}
                {selectedMenu === "Notice" && (
                  <div className="transition-opacity duration-500 opacity-100 animate__animated animate__fadeIn">
                    <Notice />
                  </div>
                )}
                {selectedMenu === "Subjects" && (
                  <div className="transition-opacity duration-500 opacity-100 animate__animated animate__fadeIn">
                    <Subjects />
                  </div>
                )}
                {selectedMenu === "Admin" && (
                  <div className="transition-opacity duration-500 opacity-100 animate__animated animate__fadeIn">
                    <Admin />
                  </div>
                )}
                {selectedMenu === "Weekly Report" && (
                  <div className="transition-opacity duration-500 opacity-100 animate__animated animate__fadeIn">
                    <WeeklyReport />
                  </div>
                )}
              </div>
            </div>
          </div>
          <Toaster position="bottom-center" />
        </section>
      )}
    </>
  );
};

export default Home;
