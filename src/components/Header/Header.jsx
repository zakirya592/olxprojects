import React, { useState } from 'react';
import { FaCarAlt } from "react-icons/fa";
import { MdOutlineHomeWork } from "react-icons/md";
import { FaSearch, FaCommentDots, FaBell, FaMapMarkerAlt, FaLocationArrow } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigator =useNavigate()
    const [selectedLocation, setSelectedLocation] = useState("");
    const handleLocationChange = (event) => {
        const selectedValue = event.target.value;
        if (selectedValue === "current_location") {
            // Implement logic to get current location and set it
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setSelectedLocation(`Current Location (${latitude}, ${longitude})`);
            });
        } else {
            setSelectedLocation(selectedValue);
        }
    };

      const selectCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          const currentLocation = `Current Location (${latitude}, ${longitude})`;
          setSelectedLocation(currentLocation);
        });
      };
    return (
      <>
        <div className=" bg-slate-50 px-0 smm:px-0 lg:px-12 ">
            <div className="py-5">
          <div className="topdev flex my-auto container gap-5  ">
            <h1>Logo</h1>
            <div className="flex mx-5 lg:mx-5 sm:mx-2 smm:mx-0 cursor-pointer text-black hover:text-secondary my-auto">
              <div className="customgradient h-10 w-10 flex justify-center items-center rounded-full">
                <FaCarAlt size={24} />
              </div>
              <h6 className="text-xl ms-2 font-bold my-auto">Motors</h6>
            </div>
            <div className="flex mx-5 lg:mx-5 sm:mx-2 smm-mx-0 cursor-pointer text-black hover:text-secondary my-auto">
              <div className="customgradient h-10 w-10 flex justify-center items-center rounded-full">
                <MdOutlineHomeWork size={24} />
              </div>
              <h6 className="text-xl ms-2 font-bold my-auto">Property</h6>
            </div>
          </div>
          <header className="flex py-2 w-full flex-col sm:flex-row justify-between">
            <div className="flex items-center w-full flex-col sm:flex-row ">
              <div className="flex items-center border rounded-md py-3 w-full bg-white">
                <select
                  className="outline-none text-gray-700 bg w-full"
                  onChange={handleLocationChange}
                >
                  <option value="Pakistan">
                    <FaMapMarkerAlt className="text-gray-500 inline-block align-middle" />{" "}
                    Pakistan
                  </option>
                  <option
                    value={selectedLocation}
                    onClick={selectCurrentLocation}
                  >
                    Current Location
                    <FaLocationArrow className="text-gray-500 inline-block align-middle" />
                  </option>
                  {/* Add other options here */}
                </select>
                <span className="ml-2 border-l border-gray-300"></span>
              </div>
              <div className="flex w-full mt-2 lg:mt-0 sm:mt-2">
                <input
                  type="text"
                  placeholder="Find Cars, Mobile Phones and more..."
                  className="ml-2 py-2 px-2 border rounded-l-md flex-grow outline-none"
                />
                <span className="flex items-center border border-detailscolor px-4 bg-detailscolor rounded-r-md">
                  <FaSearch className="text-white" />
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4 w-full justify-center lg:justify-end sm:justify-start smm:justify-normal mt-2 lg:mt-0 sm:mt-2">
              <FaCommentDots
                className="text-gray-500 cursor-pointer"
                size={25}
              />
              <FaBell className="text-gray-500 cursor-pointer" size={25} />
              <img
                src="https://via.placeholder.com/40" // Replace with the actual profile image URL
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover cursor-pointer"
              />
              <div className="gradient-border p-1 rounded-full" onClick={()=>navigator('/Post')}>
                <button className="text-gray-800 border-none bg-white px-4 py-2 rounded-full">
                  + SELL
                </button>
              </div>
            </div>
          </header>

            </div>
        </div>
      </>
    );
}

export default Header