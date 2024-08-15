import React, { useState, useEffect, useRef } from "react";
import { FaCarAlt, FaSearch, FaCommentDots, FaBell } from "react-icons/fa";
import { MdOutlineHomeWork } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import log from "../../assets/Images/logo1.png";
import Firstloginsinup from "../../Pages/Admin/Login/Firstloginsinup";

function Header() {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isCreatePopupVisible, setCreatePopupVisibility] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const authToken = sessionStorage.getItem("authToken");
    setIsUserLoggedIn(!!authToken);
  }, [isCreatePopupVisible]); // Add isCreatePopupVisible to the dependency array

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    setIsUserLoggedIn(false); // Set user as logged out
  };

  const handleShowCreatePopup = () => {
    setCreatePopupVisibility(true);
  };

  const handleLocationChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "current_location") {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setSelectedLocation(`Current Location (${latitude}, ${longitude})`);
      });
    } else {
      setSelectedLocation(selectedValue);
    }
  };

  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    const loadScript = (url, callback) => {
      let script = document.createElement("script");
      script.type = "text/javascript";
      script.src = url;
      script.onload = callback;
      document.head.appendChild(script);
    };

    const handleScriptLoad = () => {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ["geocode"],
          componentRestrictions: { country: "pk" },
        }
      );

      autocompleteRef.current.addListener("place_changed", handlePlaceSelect);
    };

    const handlePlaceSelect = () => {
      const place = autocompleteRef.current.getPlace();
      console.log(place);
    };

    if (!window.google) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`,
        handleScriptLoad
      );
    } else {
      handleScriptLoad();
    }
  }, []);

   const handleSellButtonClick = () => {
     if (isUserLoggedIn) {
       navigate("/Post");
     } else {
       handleShowCreatePopup();
     }
   };

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
                  onClick={() => navigate("/")}
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
          </div>
          <header className="flex py-2 w-full flex-col sm:flex-row justify-between">
            <div className="flex items-center w-full flex-col sm:flex-row">
              <div className="flex items-center w-full px-2">
                <input
                  ref={inputRef}
                  id="location"
                  type="text"
                  className="outline-none text-gray-700 py-2 px-3 border rounded-md bg-white w-full"
                  placeholder="Enter a location"
                />
                <span className="ml-2 border-l border-gray-300"></span>
                {isUserLoggedIn && (
                  <FaBell
                    className="text-gray-500 cursor-pointer lg:hidden"
                    size={25}
                  />
                )}
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
                {isUserLoggedIn && (
                  <>
                    <FaCommentDots
                      className="text-gray-500 cursor-pointer hidden lg:block"
                      size={25}
                    />
                    <FaBell
                      className="text-gray-500 cursor-pointer hidden lg:block"
                      size={25}
                    />
                    <button
                      onClick={handleLogout}
                      className="text-blue-500 text-xl border-b border-blue-500 cursor-pointer"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>

              {!isUserLoggedIn && (
                <h6
                  className="text-blue-500 text-xl border-b border-blue-500 cursor-pointer"
                  onClick={handleShowCreatePopup}
                >
                  Staff Login
                </h6>
              )}
              <div
                className="gradient-border p-1 rounded-full hidden lg:block mt-2 sm:mt-0"
                onClick={handleSellButtonClick}
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
              onClick={handleSellButtonClick}
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
        />
      )}
    </>
  );
}

export default Header;
