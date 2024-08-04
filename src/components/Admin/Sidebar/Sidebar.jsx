import React, { useEffect, useRef, useState } from "react";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
// import dashboard from "../../Images/dashboard.png";
// import internal from "../../Images/internal.png";
import logout from "../../../assets/Images/logout.png";
import Megamenu from "../../../assets/Images/Megamenu.png";
import Footericon from "../../../assets/Images/Footericon.png";
import categories from "../../../assets/Images/categories.png";
import profile from "../../../assets/Images/profile.png";
import { toast } from "react-toastify";
import frontend from "../../../assets/Images/frontend.png"
import catalog from "../../../assets/Images/catalog.png";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import masterdata from "../../../assets/Images/masterdata.png";
import Condition from "../../../assets/Images/Declaration.jpg"
import brand from "../../../assets/Images/brands.png"
import devicetype from "../../../assets/Images/devicetype2.png"
import typesicon from "../../../assets/Images/types.webp"
import makeicon from "../../../assets/Images/make.jpg"
import Bedroomicon from "../../../assets/Images/Bedroom.png"
import Furnishedicon from "../../../assets/Images/Furnished.jpg"
import usericon from "../../../assets/Images/usersicon.png"
import logonmm from "../../../assets/Images/logo1.png"
import Wifiicon from "../../../assets/Images/Wifi.png"
import BathRoom from "../../../assets/Images/Bath Room.png"
import Storeyicon from "../../../assets/Images/Storey.png"
import constructionicon from "../../../assets/Images/Construction State.png"
import Areauniticon from "../../../assets/Images/Area.png"
import Featureicon from "../../../assets/Images/Feature.png";
import HardDriveTypeicon from "../../../assets/Images/HardDrive.png";
import OperatingSystemicon from "../../../assets/Images/Operating System.jpg";
import FunctionTypeicon from "../../../assets/Images/Function.png";
import SensorSizeicon from "../../../assets/Images/sensor.png";

const SideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [selectedPath, setSelectedPath] = useState("");

  const [showfrontend, setshowfrontend] = useState(false);
  const [showmasterData, setshowmasterData] = useState(false);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const navigate = useNavigate();

  const handleItemClick = (path) => {
    setSelectedItem(path);
    navigate(path);
  };

  const handleItemClickGs1website = (path) => {
    setSelectedItem(path);
    window.open(path, "_blank");
  };

  const handleContextMenu = (event, path) => {
    event.preventDefault();
    const clickX = event.clientX;
    const clickY = event.clientY;
    setContextMenuPosition({ x: clickX, y: clickY });
    setSelectedPath(path);
    setShowContextMenu(true);
  };

  const handleContextMenuOptionClick = (option) => {
    if (option === "openNewTab") {
      window.open(selectedPath, "_blank");
    }
    setShowContextMenu(false);
  };

  const [selectedItem, setSelectedItem] = useState(null);
  const handleLogoClick = () => {
    setSelectedItem(null);
    navigate("/member/dashboard"); // Navigate to the "track" component
  };

  return (
    <div>
      <div className={`h-10 mb-6 bg-loactioncolor sm:ml-72`}>
        <div className={`flex justify-between items-center flex-row`}>
          <div className="flex items-center">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 ml-3 text-sm text-black rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              onClick={toggleSidebar}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
          </div>

          <div
            className={`flex justify-end items-center px-0 -mt-1 flex-row mr-4`}
          >
            <div className="flex justify-end items-center px-0 mr-4">
              <span>
                <p
                  className="text-white mt-2 font-sans mr-5 hover:text-primary"
                  onClick={() => handleItemClickGs1website("/")}
                  onContextMenu={(event) => handleContextMenu(event, "/")}
                >
                  Website
                </p>
              </span>
            </div>
            <img
              // onClick={() => navigate("/member/member-profile")}
              src={profile}
              className="h-7 w-7 mt-2 bg-white rounded-full transition transform hover:scale-125"
              alt=""
            />
          </div>
        </div>
      </div>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 z-40 w-64 sm:w-72 h-screen transition-transform left-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 `}
        aria-label="Sidebar"
        ref={sidebarRef}
      >
        <div className="h-full px-3 py-2 overflow-y-auto bg-loactioncolor">
          <div
            className="flex justify-center items-center mb-3 cursor-pointer"
            // onClick={() => navigate("/track")}
            onClick={handleLogoClick}
          >
            <img src={logonmm} className="h-auto w-32 rounded-md " alt="" />
          </div>
          <hr />

          <div
            className={`main-images-container ${
              selectedItem === "/Admin/user" ? "selected-item" : ""
            } flex-row justify-start`}
            onClick={() => handleItemClick("/Admin/user")}
            onContextMenu={(event) => handleContextMenu(event, "/Admin/user")}
          >
            <img
              src={usericon}
              className="main-inside-image bg-white rounded-full"
              alt=""
            />
            <p className="sidebar-text">User</p>
          </div>

          <div
            className={`main-images-container flex-row justify-start`}
            onClick={() => setshowfrontend(!showfrontend)}
          >
            <img
              src={frontend}
              className="main-inside-image bg-white rounded-full"
              alt=""
            />
            <p className="sidebar-text">Front End</p>
            <div className={`ml-auto mr-2`}>
              {showfrontend ? (
                // <i className="fas fa-solid fa-chevron-up text-black"></i>
                <FaChevronUp className="text-white" />
              ) : (
                // <i className="fas fa-solid fa-chevron-down text-black"></i>
                <FaChevronDown className="text-white" />
              )}
            </div>
          </div>

          {showfrontend && (
            <div>
              <div
                className={`main-images-container ${
                  selectedItem === "/Admin/Category" ? "selected-item" : ""
                } flex-row justify-start`}
                onClick={() => handleItemClick("/Admin/Category")}
                onContextMenu={(event) =>
                  handleContextMenu(event, "/Admin/Category")
                }
              >
                <img
                  src={categories}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">Category</p>
              </div>

              <div
                className={`main-images-container ${
                  selectedItem === "/Admin/subcategory" ? "selected-item" : ""
                } flex-row justify-start`}
                onClick={() => handleItemClick("/Admin/subcategory")}
                onContextMenu={(event) =>
                  handleContextMenu(event, "/Admin/subcategory")
                }
              >
                <img
                  src={Megamenu}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">Sub Category</p>
              </div>

              <div
                className={`main-images-container ${
                  selectedItem === "/Admin/footerCategory"
                    ? "selected-item"
                    : ""
                } flex-row justify-start`}
                onClick={() => handleItemClick("/Admin/footerCategory")}
                onContextMenu={(event) =>
                  handleContextMenu(event, "/Admin/footerCategory")
                }
              >
                <img
                  src={Footericon}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">Footer Category</p>
              </div>

              <div
                className={`main-images-container ${
                  selectedItem === "/Admin/Megamenu" ? "selected-item" : ""
                } flex-row justify-start`}
                onClick={() => handleItemClick("/Admin/Megamenu")}
                onContextMenu={(event) =>
                  handleContextMenu(event, "/Admin/Megamenu")
                }
              >
                <img
                  src={catalog}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">Mega Menu</p>
              </div>
            </div>
          )}

          <div
            className={`main-images-container flex-row justify-start`}
            onClick={() => setshowmasterData(!showmasterData)}
          >
            <img
              src={masterdata}
              className="main-inside-image bg-white rounded-full"
              alt=""
            />
            <p className="sidebar-text">Master Data</p>
            <div className={`ml-auto mr-2`}>
              {showmasterData ? (
                // <i className="fas fa-solid fa-chevron-up text-black"></i>
                <FaChevronUp className="text-white" />
              ) : (
                // <i className="fas fa-solid fa-chevron-down text-black"></i>
                <FaChevronDown className="text-white" />
              )}
            </div>
          </div>

          {showmasterData && (
            <div>
              <div
                className={`main-images-container ${
                  selectedItem === "/Admin/Brand" ? "selected-item" : ""
                } flex-row justify-start`}
                onClick={() => handleItemClick("/Admin/Brand")}
                onContextMenu={(event) =>
                  handleContextMenu(event, "/Admin/Brand")
                }
              >
                <img
                  src={brand}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">Brand</p>
              </div>

              <div
                className={`main-images-container ${
                  selectedItem === "/Admin/Condition" ? "selected-item" : ""
                } flex-row justify-start`}
                onClick={() => handleItemClick("/Admin/Condition")}
                onContextMenu={(event) =>
                  handleContextMenu(event, "/Admin/Condition")
                }
              >
                <img
                  src={Condition}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">Condition</p>
              </div>

              <div
                className={`main-images-container ${
                  selectedItem === "/Admin/DeviceType" ? "selected-item" : ""
                } flex-row justify-start`}
                onClick={() => handleItemClick("/Admin/DeviceType")}
                onContextMenu={(event) =>
                  handleContextMenu(event, "/Admin/DeviceType")
                }
              >
                <img
                  src={devicetype}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">Device Type</p>
              </div>

              <div
                className={`main-images-container ${
                  selectedItem === "/Admin/types" ? "selected-item" : ""
                } flex-row justify-start`}
                onClick={() => handleItemClick("/Admin/types")}
                onContextMenu={(event) =>
                  handleContextMenu(event, "/Admin/types")
                }
              >
                <img
                  src={typesicon}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">Type</p>
              </div>

              <div
                className={`main-images-container ${
                  selectedItem === "/Admin/make" ? "selected-item" : ""
                } flex-row justify-start`}
                onClick={() => handleItemClick("/Admin/make")}
                onContextMenu={(event) =>
                  handleContextMenu(event, "/Admin/make")
                }
              >
                <img
                  src={makeicon}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">Make</p>
              </div>

              <div
                className={`main-images-container ${
                  selectedItem === "/Admin/Furnished" ? "selected-item" : ""
                } flex-row justify-start`}
                onClick={() => handleItemClick("/Admin/Furnished")}
                onContextMenu={(event) =>
                  handleContextMenu(event, "/Admin/Furnished")
                }
              >
                <img
                  src={Furnishedicon}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">Furnished</p>
              </div>

              <div
                className={`main-images-container ${
                  selectedItem === "/Admin/Bedroom" ? "selected-item" : ""
                } flex-row justify-start`}
                onClick={() => handleItemClick("/Admin/Bedroom")}
                onContextMenu={(event) =>
                  handleContextMenu(event, "/Admin/Bedroom")
                }
              >
                <img
                  src={Bedroomicon}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">Bed Room</p>
              </div>

              <div
                className={`main-images-container ${
                  selectedItem === "/Admin/Bathroom" ? "selected-item" : ""
                } flex-row justify-start`}
                onClick={() => handleItemClick("/Admin/Bathroom")}
                onContextMenu={(event) =>
                  handleContextMenu(event, "/Admin/Bathroom")
                }
              >
                <img
                  src={BathRoom}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">Bath Room</p>
              </div>

              <div
                className={`main-images-container ${
                  selectedItem === "/Admin/Storey" ? "selected-item" : ""
                } flex-row justify-start`}
                onClick={() => handleItemClick("/Admin/Storey")}
                onContextMenu={(event) =>
                  handleContextMenu(event, "/Admin/Storey")
                }
              >
                <img
                  src={Storeyicon}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">Storey</p>
              </div>

              <div
                className={`main-images-container ${
                  selectedItem === "/Admin/construction" ? "selected-item" : ""
                } flex-row justify-start`}
                onClick={() => handleItemClick("/Admin/construction")}
                onContextMenu={(event) =>
                  handleContextMenu(event, "/Admin/construction")
                }
              >
                <img
                  src={constructionicon}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">construction</p>
              </div>

              <div
                className={`main-images-container ${
                  selectedItem === "/Admin/Feature" ? "selected-item" : ""
                } flex-row justify-start`}
                onClick={() => handleItemClick("/Admin/Feature")}
                onContextMenu={(event) =>
                  handleContextMenu(event, "/Admin/Feature")
                }
              >
                <img
                  src={Featureicon}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">Feature</p>
              </div>

              <div
                className={`main-images-container ${
                  selectedItem === "/Admin/Areaunit" ? "selected-item" : ""
                } flex-row justify-start`}
                onClick={() => handleItemClick("/Admin/Areaunit")}
                onContextMenu={(event) =>
                  handleContextMenu(event, "/Admin/Areaunit")
                }
              >
                <img
                  src={Areauniticon}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">Area unit</p>
              </div>

              <div
                className={`main-images-container ${
                  selectedItem === "/Admin/ConstructionState"
                    ? "selected-item"
                    : ""
                } flex-row justify-start`}
                onClick={() => handleItemClick("/Admin/ConstructionState")}
                onContextMenu={(event) =>
                  handleContextMenu(event, "/Admin/ConstructionState")
                }
              >
                <img
                  src={constructionicon}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">Construction State</p>
              </div>

              <div
                className={`main-images-container ${
                  selectedItem === "/Admin/OperatingSystem"
                    ? "selected-item"
                    : ""
                } flex-row justify-start`}
                onClick={() => handleItemClick("/Admin/OperatingSystem")}
                onContextMenu={(event) =>
                  handleContextMenu(event, "/Admin/OperatingSystem")
                }
              >
                <img
                  src={OperatingSystemicon}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">Operating System</p>
              </div>

              <div
                className={`main-images-container ${
                  selectedItem === "/Admin/HardDriveType" ? "selected-item" : ""
                } flex-row justify-start`}
                onClick={() => handleItemClick("/Admin/HardDriveType")}
                onContextMenu={(event) =>
                  handleContextMenu(event, "/Admin/HardDriveType")
                }
              >
                <img
                  src={HardDriveTypeicon}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">HardDrive Type</p>
              </div>

              <div
                className={`main-images-container ${
                  selectedItem === "/Admin/FunctionType" ? "selected-item" : ""
                } flex-row justify-start`}
                onClick={() => handleItemClick("/Admin/FunctionType")}
                onContextMenu={(event) =>
                  handleContextMenu(event, "/Admin/FunctionType")
                }
              >
                <img
                  src={FunctionTypeicon}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">FunctionType</p>
              </div>

              <div
                className={`main-images-container ${
                  selectedItem === "/Admin/SensorSize" ? "selected-item" : ""
                } flex-row justify-start`}
                onClick={() => handleItemClick("/Admin/SensorSize")}
                onContextMenu={(event) =>
                  handleContextMenu(event, "/Admin/SensorSize")
                }
              >
                <img
                  src={SensorSizeicon}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text">Sensor Size</p>
              </div>

              <div
                className={`main-images-container ${
                  selectedItem === "/Admin/Wifi" ? "selected-item" : ""
                } flex-row justify-start`}
                onClick={() => handleItemClick("/Admin/Wifi")}
                onContextMenu={(event) =>
                  handleContextMenu(event, "/Admin/Wifi")
                }
              >
                <img
                  src={Wifiicon}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text"> Wifi</p>
              </div>

              <div
                className={`main-images-container ${
                  selectedItem === "/Admin/Resolution" ? "selected-item" : ""
                } flex-row justify-start`}
                onClick={() => handleItemClick("/Admin/Resolution")}
                onContextMenu={(event) =>
                  handleContextMenu(event, "/Admin/Resolution")
                }
              >
                <img
                  src={Wifiicon}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text"> Resolution</p>
              </div>

              <div
                className={`main-images-container ${
                  selectedItem === "/Admin/EngineType" ? "selected-item" : ""
                } flex-row justify-start`}
                onClick={() => handleItemClick("/Admin/EngineType")}
                onContextMenu={(event) =>
                  handleContextMenu(event, "/Admin/EngineType")
                }
              >
                <img
                  src={Wifiicon}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text"> EngineType</p>
              </div>

              <div
                className={`main-images-container ${
                  selectedItem === "/Admin/EngineCapacity"
                    ? "selected-item"
                    : ""
                } flex-row justify-start`}
                onClick={() => handleItemClick("/Admin/EngineCapacity")}
                onContextMenu={(event) =>
                  handleContextMenu(event, "/Admin/EngineCapacity")
                }
              >
                <img
                  src={Wifiicon}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text"> EngineCapacity</p>
              </div>

              <div
                className={`main-images-container ${
                  selectedItem === "/Admin/ScreenSize" ? "selected-item" : ""
                } flex-row justify-start`}
                onClick={() => handleItemClick("/Admin/ScreenSize")}
                onContextMenu={(event) =>
                  handleContextMenu(event, "/Admin/ScreenSize")
                }
              >
                <img
                  src={Wifiicon}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text"> ScreenSize</p>
              </div>

              <div
                className={`main-images-container ${
                  selectedItem === "/Admin/MaxAperatureRange"
                    ? "selected-item"
                    : ""
                } flex-row justify-start`}
                onClick={() => handleItemClick("/Admin/MaxAperatureRange")}
                onContextMenu={(event) =>
                  handleContextMenu(event, "/Admin/MaxAperatureRange")
                }
              >
                <img
                  src={Wifiicon}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text"> MaxAperature Range</p>
              </div>

              <div
                className={`main-images-container ${
                  selectedItem === "/Admin/MinFocalLengthRange"
                    ? "selected-item"
                    : ""
                } flex-row justify-start`}
                onClick={() => handleItemClick("/Admin/MinFocalLengthRange")}
                onContextMenu={(event) =>
                  handleContextMenu(event, "/Admin/MinFocalLengthRange")
                }
              >
                <img
                  src={Wifiicon}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text"> MinFocal Length Range</p>
              </div>

              <div
                className={`main-images-container ${
                  selectedItem === "/Admin/MaxFocalLengthRange"
                    ? "selected-item"
                    : ""
                } flex-row justify-start`}
                onClick={() => handleItemClick("/Admin/MaxFocalLengthRange")}
                onContextMenu={(event) =>
                  handleContextMenu(event, "/Admin/MaxFocalLengthRange")
                }
              >
                <img
                  src={Wifiicon}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text"> MaxFocal Length Range</p>
              </div>

              <div
                className={`main-images-container ${
                  selectedItem === "/Admin/RegistrationCity"
                    ? "selected-item"
                    : ""
                } flex-row justify-start`}
                onClick={() => handleItemClick("/Admin/RegistrationCity")}
                onContextMenu={(event) =>
                  handleContextMenu(event, "/Admin/RegistrationCity")
                }
              >
                <img
                  src={Wifiicon}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text"> Registration City</p>
              </div>

              <div
                className={`main-images-container ${
                  selectedItem === "/Admin/HiringPerson" ? "selected-item" : ""
                } flex-row justify-start`}
                onClick={() => handleItemClick("/Admin/HiringPerson")}
                onContextMenu={(event) =>
                  handleContextMenu(event, "/Admin/HiringPerson")
                }
              >
                <img
                  src={Wifiicon}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text"> Hiring Person</p>
              </div>

              <div
                className={`main-images-container ${
                  selectedItem === "/Admin/CareerLevel" ? "selected-item" : ""
                } flex-row justify-start`}
                onClick={() => handleItemClick("/Admin/CareerLevel")}
                onContextMenu={(event) =>
                  handleContextMenu(event, "/Admin/CareerLevel")
                }
              >
                <img
                  src={Wifiicon}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text"> Career Level</p>
              </div>

              <div
                className={`main-images-container ${
                  selectedItem === "/Admin/PositionType" ? "selected-item" : ""
                } flex-row justify-start`}
                onClick={() => handleItemClick("/Admin/PositionType")}
                onContextMenu={(event) =>
                  handleContextMenu(event, "/Admin/PositionType")
                }
              >
                <img
                  src={Wifiicon}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text"> Position Type</p>
              </div>

              <div
                className={`main-images-container ${
                  selectedItem === "/Admin/TypeofAd" ? "selected-item" : ""
                } flex-row justify-start`}
                onClick={() => handleItemClick("/Admin/TypeofAd")}
                onContextMenu={(event) =>
                  handleContextMenu(event, "/Admin/TypeofAd")
                }
              >
                <img
                  src={Wifiicon}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text"> Type of Ad</p>
              </div>

              <div
                className={`main-images-container ${
                  selectedItem === "/Admin/Breed" ? "selected-item" : ""
                } flex-row justify-start`}
                onClick={() => handleItemClick("/Admin/Breed")}
                onContextMenu={(event) =>
                  handleContextMenu(event, "/Admin/Breed")
                }
              >
                <img
                  src={Wifiicon}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text"> Breed</p>
              </div>

              <div
                className={`main-images-container ${
                  selectedItem === "/Admin/Sex" ? "selected-item" : ""
                } flex-row justify-start`}
                onClick={() => handleItemClick("/Admin/Sex")}
                onContextMenu={(event) =>
                  handleContextMenu(event, "/Admin/Sex")
                }
              >
                <img
                  src={Wifiicon}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text"> Sex</p>
              </div>

              <div
                className={`main-images-container ${
                  selectedItem === "/Admin/Materialtype" ? "selected-item" : ""
                } flex-row justify-start`}
                onClick={() => handleItemClick("/Admin/Materialtype")}
                onContextMenu={(event) =>
                  handleContextMenu(event, "/Admin/Materialtype")
                }
              >
                <img
                  src={Wifiicon}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text"> Material Type</p>
              </div>

              <div
                className={`main-images-container ${
                  selectedItem === "/Admin/Handmade" ? "selected-item" : ""
                } flex-row justify-start`}
                onClick={() => handleItemClick("/Admin/Handmade")}
                onContextMenu={(event) =>
                  handleContextMenu(event, "/Admin/Handmade")
                }
              >
                <img
                  src={Wifiicon}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text"> Hand Made</p>
              </div>

              <div
                className={`main-images-container ${
                  selectedItem === "/Admin/Origin" ? "selected-item" : ""
                } flex-row justify-start`}
                onClick={() => handleItemClick("/Admin/Origin")}
                onContextMenu={(event) =>
                  handleContextMenu(event, "/Admin/Origin")
                }
              >
                <img
                  src={Wifiicon}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text"> Origin</p>
              </div>

              <div
                className={`main-images-container ${
                  selectedItem === "/Admin/Language" ? "selected-item" : ""
                } flex-row justify-start`}
                onClick={() => handleItemClick("/Admin/Language")}
                onContextMenu={(event) =>
                  handleContextMenu(event, "/Admin/Language")
                }
              >
                <img
                  src={Wifiicon}
                  className="main-inside-image bg-white rounded-full"
                  alt=""
                />
                <p className="sidebar-text"> Language</p>
              </div>
            </div>
          )}

          <div
            className={`main-images-container flex-row justify-start`}
            onClick={() => navigate("/")}
          >
            <img
              src={logout}
              className="main-inside-image bg-white rounded-full"
              alt=""
            />
            <p className="sidebar-text">Log-out</p>
          </div>

          {/* Implement Any Icon above the Hide Icons */}
          <div className="main-images-container-hide">
            {/* <img src={internal} className="main-inside-image" alt="" /> */}
            <p className="sidebar-text">Hide</p>
          </div>
        </div>

        {/* This two icons  */}
        <div>
          <div
            className={`flex justify-between w-[95%] px-2 absolute bottom-0 bg-loactioncolor flex-row`}
          >
            <div className="main-images-container">
              {/* <img src={isoicon} className="main-inside-image-gs1logo" alt="" /> */}
            </div>

            <div className="main-images-container">
              <a
                href="https://www.gs1.org.sa"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* <img
                  src={gs1logowhite}
                  className="main-inside-image-gs1logo"
                  alt=""
                /> */}
              </a>
            </div>
          </div>
        </div>

        {/* Context Menu */}
        {showContextMenu && (
          <div
            className="context-menu"
            style={{ top: contextMenuPosition.y, left: contextMenuPosition.x }}
          >
            <div
              className="context-menu-option"
              onClick={() => handleContextMenuOptionClick("openNewTab")}
            >
              Open in New Tab
            </div>
            <div
              className="context-menu-option"
              onClick={() => handleContextMenuOptionClick("someOption")}
            >
              Close
            </div>
            {/* ...other context menu options... */}
          </div>
        )}
      </aside>
    </div>
  );
};

export default SideBar;
