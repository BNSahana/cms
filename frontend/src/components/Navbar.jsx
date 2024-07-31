import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";

const Navbar = () => {
  const router = useLocation();
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md px-4 py-3 border-b border-gray-200">
      <div className="max-w-6xl flex justify-between items-center mx-auto">
        <p
          className="text-2xl font-semibold text-gray-800 flex items-center cursor-pointer transition-colors hover:text-blue-600"
          onClick={() => navigate("/")}
        >
          <span className="mr-2 text-blue-600">
            <RxDashboard />
          </span>{" "}
          {router.state && router.state.type} Dashboard
        </p>
        <button
          className="flex items-center text-red-600 font-medium px-4 py-2 rounded-lg transition-colors hover:bg-red-50"
          onClick={() => navigate("/")}
        >
          Logout
          <span className="ml-2 text-lg">
            <FiLogOut />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
