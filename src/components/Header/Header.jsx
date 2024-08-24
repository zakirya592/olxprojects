import React, { useState, useEffect, useRef } from "react";
import { FaCarAlt, FaSearch, FaCommentDots, FaBell } from "react-icons/fa";
import { MdOutlineHomeWork } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import log from "../../assets/Images/logo1.png";
import Firstloginsinup from "../../Pages/Admin/Login/Firstloginsinup";
import PropTypes from "prop-types";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton as BaseMenuButton } from "@mui/base/MenuButton";
import { MenuItem as BaseMenuItem, menuItemClasses } from "@mui/base/MenuItem";
import { styled } from "@mui/system";
import Avatar from "@mui/material/Avatar";
import { Stack } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
function Header() {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isCreatePopupVisible, setCreatePopupVisibility] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const authToken = sessionStorage.getItem("authToken");
    setIsUserLoggedIn(!!authToken);
  }, [isCreatePopupVisible]); // Add isCreatePopupVisible to the dependency array

    const storedUserResponseString = sessionStorage.getItem("userResponse");
    const storedUserResponse = JSON.parse(storedUserResponseString);
    const loginuserdata = storedUserResponse?.data || "";
    

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    navigate('/')
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

  function MenuSection({ children, label }) {
    return (
      <MenuSectionRoot role="group">
        <MenuSectionLabel>{label}</MenuSectionLabel>
        <ul>{children}</ul>
      </MenuSectionRoot>
    );
  }

  MenuSection.propTypes = {
    children: PropTypes.node,
    label: PropTypes.string.isRequired,
  };

  return (
    <>
      <div className="bg-[#7B6C9C] px-0 smm:px-0 lg:px-12 text-white lg:fixed top-0 left-0 right-0 z-50">
        <div className="py-2 mx-3">
          <div className="topdev flex my-auto container gap-1 lg:gap-5 smm:gap-1 w-full flex-col lg:flex-row sm:flex-col">
            <div className="flex gap-1 lg:gap-5 smm:gap-1">
              <div className="logo">
                <img
                  src={log}
                  alt="Logo"
                  className="h-14 w-auto cursor-pointer bg-transparent filter brightness-0 invert"
                  onClick={() => navigate("/")}
                />
              </div>
              <div className="flex mx-5 lg:mx-5 sm:mx-1 smm:mx-0 cursor-pointer text-white hover:text-secondary my-auto">
                <div className="customgradient h-10 w-10 flex justify-center items-center rounded-full">
                  <FaCarAlt size={24} />
                </div>
                <h6 className="text-xl ms-2 lg:ms-2 sm:ms-1 smm:ms-0 font-bold my-auto">
                  Motors
                </h6>
              </div>
              <div className="flex mx-5 lg:mx-5 sm:mx-2 smm-mx-0 cursor-pointer text-white hover:text-secondary my-auto">
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
                    className="text-white cursor-pointer lg:hidden"
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
                      className="text-white cursor-pointer hidden lg:block"
                      size={25}
                      onClick={() => navigate("/Chat")}
                    />
                    <FaBell
                      className="text-white cursor-pointer hidden lg:block"
                      size={25}
                    />
                    {/* <button
                      onClick={handleLogout}
                      className="text-white text-xl border-b-4 border-[#2D6A3C] cursor-pointer"
                    >
                      Logout
                    </button> */}
                    <Dropdown>
                      <MenuButton>
                        <Stack style={{borderRadius:'12px',display:'flex',flexDirection:'row'}}>
                          <Avatar
                            src={loginuserdata?.user?.image || "broken-image.jpg"} 
                          /> 
                          <ArrowDropDownIcon className="my-auto"/>
                        </Stack>
                      </MenuButton>
                      <Menu
                        slots={{ listbox: Listbox }}
                        style={{ zIndex: "200" }}
                      >
                        <MenuSection>
                          <MenuItem onClick={() => navigate("/Myfavorites")}>
                            Favourites & Saved searches
                          </MenuItem>

                          <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </MenuSection>
                      </Menu>
                    </Dropdown>
                  </>
                )}
              </div>

              {!isUserLoggedIn && (
                <h6
                  className="text-white text-xl border-b-4 border-[#2D6A3C] cursor-pointer"
                  onClick={handleShowCreatePopup}
                >
                  Login
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



const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#99CCF3",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E6",
  700: "#0059B3",
  800: "#004C99",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Listbox = styled("ul")(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  box-shadow: 0px 4px 6px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.50)" : "rgba(0,0,0, 0.05)"
  };
  z-index: 200;
  position: relative;
  `
);


const MenuItem = styled(BaseMenuItem)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &:focus {
    outline: 3px solid ${theme.palette.mode === "dark" ? blue[600] : blue[200]};
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  }
  `
);

const MenuButton = styled(BaseMenuButton)(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;

  &:hover {
    background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
  }

  &:active {
    background: ${theme.palette.mode === "dark" ? grey[700] : grey[100]};
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === "dark" ? blue[300] : blue[200]
    };
    outline: none;
  }
`
);

const MenuSectionRoot = styled("li")`
  list-style: none;

  & > ul {
    padding-left: 1em;
  }
`;

const MenuSectionLabel = styled("span")`
  display: block;
  padding: 10px 0 5px 10px;
  font-size: 0.75em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  color: ${grey[600]};
`;