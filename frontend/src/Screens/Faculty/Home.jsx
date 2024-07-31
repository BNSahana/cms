import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Notice from "../../components/Notice";
import Profile from "./Profile";
import Timetable from "./Timetable";
import Material from "./Material";
import Marks from "./Marks";
import Student from "./Student";
import WeeklyReport from "./WeeklyReport";
import { Toaster } from "react-hot-toast";
import { baseApiURL } from "../../baseUrl";

const Home = () => {
  const router = useLocation();
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("My Profile");
  const [load, setLoad] = useState(false);
  const [noticeTitles, setNoticeTitles] = useState([]);

  useEffect(() => {
    if (router.state === null) {
      navigate("/");
    }
    setLoad(true);
    fetchNoticeTitles(); 
  }, [navigate, router.state]);

  const fetchNoticeTitles = () => {
    axios
      .get(`${baseApiURL()}/notice/getNotice`, {
        params: { type: ["student", "both"] },
      })
      .then((response) => {
        if (response.data.success) {
          setNoticeTitles(response.data.notice.map((item) => item.title));
        } else {
          console.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
  };

  const handleTitleClick = () => {
    setSelectedMenu("Notice");
    setTimeout(() => {
      document
        .querySelector("#notice-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-300 to-pink-300">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 mt-10 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out">
        <div className="py-8">
          <h3 className="text-2xl font-extrabold text-gray-800 mb-8 text-center animate__animated animate__fadeIn animate__delay-1s">
            Latest Notices
          </h3>
          {noticeTitles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-6xl">
              {noticeTitles.map((title, index) => (
                <div
                  key={index}
                  className="p-6 bg-gradient-to-r from-teal-100 to-blue-100  rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer transform hover:scale-105 animate__animated animate__fadeIn"
                  onClick={handleTitleClick}
                  role="button"
                  tabIndex={0}
                >
                  <p className="text-xl font-semibold text-gray-800 hover:text-gray-900">
                    {title}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-lg text-gray-600 text-center animate__animated animate__fadeIn">
              No notices available.
            </p>
          )}
        </div>
      </div>

      <div className="pt-6 max-w-6xl mx-auto px-4">
        <div className="bg-white shadow-lg rounded-lg mt-6 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out">
          <ul className="flex justify-around items-center bg-white p-4 rounded-t-lg text-gray-800 font-semibold shadow-md">
            {[
              "My Profile",
              "Student Info",
              "Upload Marks",
              "Timetable",
              "Notice",
              "Material",
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
            {selectedMenu === "Timetable" && (
              <div className="transition-opacity duration-500 opacity-100 animate__animated animate__fadeIn">
                <Timetable />
              </div>
            )}
            {selectedMenu === "Upload Marks" && (
              <div className="transition-opacity duration-500 opacity-100 animate__animated animate__fadeIn">
                <Marks />
              </div>
            )}
            {selectedMenu === "Material" && (
              <div className="transition-opacity duration-500 opacity-100 animate__animated animate__fadeIn">
                <Material />
              </div>
            )}
            {selectedMenu === "Notice" && (
              <div
                id="notice-section"
                className="transition-opacity duration-500 opacity-100 animate__animated animate__fadeIn"
              >
                <Notice />
              </div>
            )}
            {selectedMenu === "My Profile" && (
              <div className="transition-opacity duration-500 opacity-100 animate__animated animate__fadeIn">
                <Profile />
              </div>
            )}
            {selectedMenu === "Student Info" && (
              <div className="transition-opacity duration-500 opacity-100 animate__animated animate__fadeIn">
                <Student />
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
  );
};

export default Home;
