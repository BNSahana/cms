import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdLink } from "react-icons/io";
import { HiOutlineCalendar } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { IoAddOutline } from "react-icons/io5";
import { MdDeleteOutline, MdEditNote } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import toast from "react-hot-toast";
import { baseApiURL } from "../baseUrl";
import Heading from "./Heading";

const Notice = () => {
  const router = useLocation();
  const [notice, setNotice] = useState([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");
  const [data, setData] = useState({
    title: "",
    description: "",
    type: "student",
    link: "",
  });

  useEffect(() => {
    fetchNotices();
  }, [router.pathname]);

  const fetchNotices = () => {
    const type =
      router.pathname === "/student"
        ? ["student", "both"]
        : ["student", "both", "faculty"];
    axios
      .get(`${baseApiURL()}/notice/getNotice`, {
        params: { type },
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.data.success) {
          setNotice(response.data.notice);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };

  const addNoticeHandler = (e) => {
    e.preventDefault();
    toast.loading("Adding Notice...");
    axios
      .post(`${baseApiURL()}/notice/addNotice`, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          fetchNotices();
          setOpen(false);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };

  const deleteNoticeHandler = (id) => {
    toast.loading("Deleting Notice...");
    axios
      .delete(`${baseApiURL()}/notice/deleteNotice/${id}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          fetchNotices();
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };

  const updateNoticeHandler = (e) => {
    e.preventDefault();
    axios
      .put(`${baseApiURL()}/notice/updateNotice/${id}`, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          fetchNotices();
          setOpen(false);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };

  const setOpenEditSectionHandler = (index) => {
    setEdit(true);
    setOpen(true);
    setData({
      title: notice[index].title,
      description: notice[index].description,
      type: notice[index].type,
      link: notice[index].link,
    });
    setId(notice[index]._id);
  };

  const openHandler = () => {
    setOpen(!open);
    setEdit(false);
    setData({ title: "", description: "", type: "student", link: "" });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <div className="relative flex justify-between items-center mb-6">
        <Heading title="Notices" />
        {(router.pathname === "/faculty" || router.pathname === "/admin") && (
          <button
            className={`absolute right-2 flex items-center border-2 border-blue-500 px-4 py-2 rounded-lg transition-colors ${
              open
                ? "border-red-500 text-red-500 hover:bg-red-50"
                : "border-blue-500 text-blue-500 hover:bg-blue-50"
            }`}
            onClick={openHandler}
          >
            {open ? (
              <>
                <BiArrowBack className="text-xl mr-2" />
                Close
              </>
            ) : (
              <>
                Add Notice
                <IoAddOutline className="text-xl ml-2" />
              </>
            )}
          </button>
        )}
      </div>

      {!open && (
        <div className="space-y-4">
          {notice.map((item, index) => (
            <div
              key={item._id}
              className="relative p-4 bg-gray-50 border border-blue-500 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              {(router.pathname === "/faculty" ||
                router.pathname === "/admin") && (
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    className="text-red-500 hover:text-red-700 transition"
                    onClick={() => deleteNoticeHandler(item._id)}
                  >
                    <MdDeleteOutline className="text-2xl" />
                  </button>
                  <button
                    className="text-blue-500 hover:text-blue-700 transition"
                    onClick={() => setOpenEditSectionHandler(index)}
                  >
                    <MdEditNote className="text-2xl" />
                  </button>
                </div>
              )}
              <p
                className={`text-lg font-semibold mb-2 cursor-pointer ${
                  item.link ? "hover:text-blue-600" : ""
                }`}
                onClick={() => item.link && window.open(item.link)}
              >
                {item.title}
                {item.link && <IoMdLink className="inline ml-1 text-xl" />}
              </p>
              <p className="text-base mb-2">{item.description}</p>
              <p className="text-sm text-gray-500 flex items-center space-x-1">
                <HiOutlineCalendar className="text-base" />
                <span>
                  {new Date(item.createdAt).toLocaleDateString()}{" "}
                  {new Date(item.createdAt).toLocaleTimeString()}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}

      {open && (
        <form
          className="space-y-4 mt-8"
          onSubmit={edit ? updateNoticeHandler : addNoticeHandler}
        >
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Notice Title
            </label>
            <input
              type="text"
              id="title"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Notice Description
            </label>
            <textarea
              id="description"
              cols="30"
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 resize-none"
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="link"
              className="block text-sm font-medium text-gray-700"
            >
              Notice Link (If any else leave blank)
            </label>
            <input
              type="text"
              id="link"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              value={data.link}
              onChange={(e) => setData({ ...data, link: e.target.value })}
            />
          </div>
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Type Of Notice
            </label>
            <select
              id="type"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              value={data.type}
              onChange={(e) => setData({ ...data, type: e.target.value })}
            >
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="both">Both</option>
            </select>
          </div>
          <button
            type="submit"
            className="mt-4 w-full px-6 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-colors"
          >
            {edit ? "Update Notice" : "Add Notice"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Notice;
