import React from 'react'
import log from "../../../assets/Images/logo1.png";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

function Headerpost() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-100">
        <div
          className="cursor-pointer flex my-auto"
          onClick={() => navigate(-1)}
        >
          <IoMdArrowBack size={24} className="my-auto" />
          {/* <p className="text-lg font-bold text-center ms-3 my-auto">OLX</p> */}
          <div className="logo my-auto">
            <img src={log} alt="Logo" className="h-10 w-auto cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Headerpost