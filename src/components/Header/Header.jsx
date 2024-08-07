import React, { useState,useEffect, useRef } from "react";
import { FaCarAlt, FaSearch, FaCommentDots, FaBell, FaMapMarkerAlt, FaLocationArrow } from "react-icons/fa";
import { MdOutlineHomeWork } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import log from "../../assets/Images/logo1.png";
import Login from '../../Pages/Admin/Login/Login';
import Firstloginsinup from '../../Pages/Admin/Login/Firstloginsinup';

function Header() {
  const navigator = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState("");

 const [isCreatePopupVisible, setCreatePopupVisibility] = useState(false);
   const handleShowCreatePopup = () => {
     setCreatePopupVisibility(true);
   };
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



   const inputRef = useRef(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    const loadScript = (url, callback) => {
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.onload = callback;
      document.head.appendChild(script);
    };

    const handleScriptLoad = () => {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['geocode'],
        componentRestrictions: { country: 'pk' }, // Restrict to Pakistan
      });

      autocompleteRef.current.addListener('place_changed', handlePlaceSelect);
    };

    const handlePlaceSelect = () => {
      const place = autocompleteRef.current.getPlace();
      console.log(place);
    };
      // const apiKey = process.env.REACT_APP_API_KEY;

    if (!window.google) {
      loadScript(`https://maps.googleapis.com/maps/api/js?key=AIzaSyBG8etTblNJ8UdyC_Z-M28InEGeVvPD72o=places`, handleScriptLoad);
    } else {
      handleScriptLoad();
    }
  }, []);

  return (
    <>
      <div className="bg-slate-50 px-0 smm:px-0 lg:px-12 lg:fixed top-0 left-0 right-0 z-50">
        <div className="py-2 mx-3">
          <div className="topdev flex my-auto container gap-1 lg:gap-5 smm:gap-1 w-full flex-col lg:flex-row sm:flex-col">
            <div className="flex gap-1 lg:gap-5 smm:gap-1">
              <div className="logo">
                <img
                  src={log}
                  alt="Logo"
                  className="h-14 w-auto cursor-pointer"
                />
              </div>
              <div className="flex mx-5 lg:mx-5 sm:mx-1 smm:mx-0 cursor-pointer text-black hover:text-secondary my-auto">
                <div className="customgradient h-10 w-10 flex justify-center items-center rounded-full">
                  <FaCarAlt size={24} />
                </div>
                <h6 className="text-xl ms-2 lg:ms-2 sm:ms-1 smm:ms-0 font-bold my-auto">
                  Motors
                </h6>
              </div>
              <div className="flex mx-5 lg:mx-5 sm:mx-2 smm-mx-0 cursor-pointer text-black hover:text-secondary my-auto">
                <div className="customgradient h-10 w-10 flex justify-center items-center rounded-full">
                  <MdOutlineHomeWork size={24} />
                </div>
                <h6 className="text-xl ms-2 font-bold my-auto">Property</h6>
              </div>
            </div>
            {/* <h6
              className="text-xl ms-2 font-bold my-auto cursor-pointer"
              onClick={() => navigator("/Admin/Category")}
            >
              Admin
            </h6> */}
          </div>
          <header className="flex py-2 w-full flex-col sm:flex-row justify-between">
            <div className="flex items-center w-full flex-col sm:flex-row">
              <div className="flex items-center w-full px-2">
      <input ref={inputRef} id="location" type="text"   className="outline-none text-gray-700 py-2 px-3 border rounded-md bg-white w-full" placeholder="Enter a location" />
   
                {/* <select
                  className="outline-none text-gray-700 py-2 border rounded-md bg-white w-full"
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
                </select> */}
                <span className="ml-2 border-l border-gray-300"></span>
                <FaBell
                  className="text-gray-500 cursor-pointer lg:hidden"
                  size={25}
                />
              </div>
              <div className="flex w-full mt-2 lg:mt-0 sm:mt-2 px-2">
                <input
                  type="text"
                  placeholder="Find Cars, Mobile Phones and more..."
                  className="ml-0 lg:ml-2 sm:ml-0 py-2 px-2 border rounded-l-md flex-grow outline-none"
                />
                <span className="flex items-center border border-detailscolor px-4 bg-detailscolor rounded-r-md">
                  <FaSearch className="text-white" />
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4 w-1/2 justify-center lg:justify-end sm:justify-start smm:justify-normal mt-2 lg:mt-0 sm:mt-2">
              <div className="flex items-center space-x-4">
                <FaCommentDots
                  className="text-gray-500 cursor-pointer hidden " //lg:block
                  size={25}
                />
                <FaBell
                  className="text-gray-500 cursor-pointer hidden " //lg:block
                  size={25}
                />
                <img
                  src="https://via.placeholder.com/40" // Replace with the actual profile image URL
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover cursor-pointer hidden " //lg:block
                />
              </div>
              <h6
                // className="text-xl ms-2 font-bold my-auto cursor-pointer"
                className="text-blue-500 text-xl border-b border-blue-500 cursor-pointer"
                // onClick={() => navigator("/Admin/Category")}
                onClick={handleShowCreatePopup}
              >
                Staff Login
              </h6>
              <div
                className="gradient-border p-1 rounded-full hidden lg:block mt-2 sm:mt-0"
                onClick={() => navigator("/Post")}
              >
                <button className="text-gray-800 border-none bg-white px-4 py-2 rounded-full">
                  + SELL
                </button>
              </div>
            </div>
          </header>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="fixed justify-center text-center w-fit items-center z-50 bottom-0 bg-white sm:hidden">
          <div className="flex justify-center gradient-border border rounded-full p-1">
            <button
              className=" p-2 rounded-full bg-white text-gray-800 border-none"
              onClick={() => navigator("/Post")}
            >
              + SELL
            </button>
          </div>
        </div>
      </div>

      {isCreatePopupVisible && (
        <Firstloginsinup
          isVisible={isCreatePopupVisible}
          setVisibility={setCreatePopupVisibility}
          // refreshBrandData={fetchData}
        />
      )}
    </>
  );
}

export default Header;
