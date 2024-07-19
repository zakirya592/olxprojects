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
      <div className={`h-10 mb-6 bg-[#c8f8f6] sm:ml-72`}>
        <div className={`flex justify-between items-center flex-row`}>
          <div className="flex items-center">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 ml-3 text-sm text-white rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
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
                  className="text-white font-sans mr-5 hover:text-primary"
                  onClick={() => handleItemClickGs1website("/")}
                  onContextMenu={(event) => handleContextMenu(event, "/")}
                >
                  OLX Website
                </p>
              </span>
            </div>
            <img
              // onClick={() => navigate("/member/member-profile")}
              src={profile}
              className="h-7 w-7 bg-white rounded-full transition transform hover:scale-125"
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
        <div className="h-full px-3 py-2 overflow-y-auto bg-[#c8f8f6]">
          <div
            className="flex justify-center items-center mb-3 cursor-pointer"
            // onClick={() => navigate("/track")}
            onClick={handleLogoClick}
          >
            {/* <img
              src={gs1logowhite}
              className="h-auto w-44 rounded-md "
              alt=""
            /> */}
          </div>
          <hr />

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
                <FaChevronUp />
              ) : (
                // <i className="fas fa-solid fa-chevron-down text-black"></i>
                <FaChevronDown />
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
                <FaChevronUp />
              ) : (
                // <i className="fas fa-solid fa-chevron-down text-black"></i>
                <FaChevronDown />
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
                  selectedItem === "/Admin/types" ? "selected-item" : ""
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
            className={`flex justify-between w-[95%] px-2 absolute bottom-0 bg-[#c8f8f6] flex-row`}
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
