import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiLogIn } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { baseApiURL } from "../baseUrl";

const Login = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Student");
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    if (data.loginid !== "" && data.password !== "") {
      const headers = {
        "Content-Type": "application/json",
      };
      axios
        .post(`${baseApiURL()}/${selected.toLowerCase()}/auth/login`, data, {
          headers: headers,
        })
        .then((response) => {
          navigate(`/${selected.toLowerCase()}`, {
            state: { type: selected, loginid: response.data.loginid },
          });
        })
        .catch((error) => {
          toast.dismiss();
          console.error(error);
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please fill in all fields.");
    }
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg p-8 rounded-lg border-transparent bg-clip-border border-2 border-gradient-to-r from-yellow-400 via-pink-500 to-purple-600">
        <div className="text-center mb-6">
          <p className="text-3xl font-bold text-gray-800 mb-4">
            {selected} Login
          </p>
        </div>
        <form
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label
              className="block text-gray-800 mb-2 font-medium"
              htmlFor="loginid"
            >
              {selected} Login ID
            </label>
            <input
              type="text"
              id="loginid"
              required
              className="w-full border border-gray-300 rounded-lg py-3 px-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-transform duration-300 ease-in-out transform hover:scale-105"
              placeholder="Enter your ID"
              {...register("loginid")}
            />
          </div>
          <div>
            <label
              className="block text-gray-800 mb-2 font-medium"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className="w-full border border-gray-300 rounded-lg py-3 px-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-transform duration-300 ease-in-out transform hover:scale-105"
              placeholder="Enter your password"
              {...register("password")}
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-400 to-pink-500 text-white py-3 px-6 rounded-lg shadow-md hover:from-yellow-500 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-transform duration-300 transform hover:scale-105 flex items-center justify-center"
          >
            Login
            <span className="ml-2">
              <FiLogIn />
            </span>
          </button>
        </form>
      </div>
      <div className="absolute top-4 right-4 flex space-x-4">
        {["Student", "Faculty", "Admin"].map((role) => (
          <button
            key={role}
            className={`text-white-900 font-semibold text-lg hover:text-gray-600 transition-all duration-300 ${
              selected === role && "border-b-2 border-yellow-500"
            }`}
            onClick={() => setSelected(role)}
          >
            {role}
          </button>
        ))}
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Login;
