import React, { useState, useEffect, useRef } from "react";
import { FaCarAlt, FaSearch, FaCommentDots, FaBell } from "react-icons/fa";
import { MdOutlineHomeWork } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import log from "../../assets/Images/logo2.jpeg";
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
import { FaRegUser } from "react-icons/fa";
import { useMutation } from "react-query";
import NewRequest from "../../../utils/NewRequest";
import { toast } from "react-toastify";
import { useQuery } from "react-query";

import imageLiveUrl from "../../../utils/urlConverter/imageLiveUrl";

// import { FaSearch } from "react-icons/fa";
function Header() {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isCreatePopupVisible, setCreatePopupVisibility] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    useEffect(() => {
         const handleGoogleRedirect = () => {
           const urlParams = new URLSearchParams(window.location.search);
           const token = urlParams.get("token");
           const userId = urlParams.get("userId");

           console.log("URLSearchParams: ", urlParams.toString()); // To print the full query string
           console.log("Token: ", token);
           console.log("UserId: ", userId);

           if (token && userId) {
             sessionStorage.setItem("authToken", token);
             localStorage.setItem("userdata", userId);
             // navigator("/"); // Uncomment to navigate to the dashboard
           }
         };

         handleGoogleRedirect();
       }, []);

  useEffect(() => {
    const authToken = sessionStorage.getItem("authToken");
    setIsUserLoggedIn(!!authToken);
  }, [isCreatePopupVisible]); // Add isCreatePopupVisible to the dependency array

    const storedUserResponseString = sessionStorage.getItem("userResponse");
    const storedUserResponse = JSON.parse(storedUserResponseString);
    const loginuserdata = storedUserResponse?.data || "";
    
       const imageUrl = loginuserdata?.user?.image || "";
    const finalUrl = imageUrl && imageUrl.startsWith("https") 
      ? imageUrl  // Use the direct URL if it's already an https link
      : imageLiveUrl(imageUrl); 

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
     sessionStorage.removeItem("productmore");
     sessionStorage.removeItem("userResponse");
      sessionStorage.clear();
      localStorage.clear();
    navigate('/')
    setIsUserLoggedIn(false); // Set user as logged out
  };

  const handleShowCreatePopup = () => {
    // setCreatePopupVisibility(true);
    navigate("/LoginForm");
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



    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const searchMutation = useMutation({
      mutationFn: async (query) => {
        const response = await NewRequest.post("/product/searchProduct", {
          query,
        });
        return response.data;
      },
      
      onSuccess: (data) => {
        setSearchResults(data);
         navigate("/search-results", { state: { searchResults: data } });
      },
      onError: (error) => {
        console.log(error,'errpr');
        toast.error(error?.response?.data?.error || "Search failed", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      },
    });

    const handleSearch = (e) => {
      e.preventDefault();
      searchMutation.mutate(query);
    };


      const {
        isLoading,
        error,
        data: productsdata,
      } = useQuery("productgetcategory", fetchproductData);

      async function fetchproductData() {
        const response = await NewRequest.get("/product/getcategoryproduct");

        // Filter products that are active across all categories
        const activeProducts = response?.data.flatMap((category) =>
          category.products.filter(
            (product) => product.status.toLowerCase() === "active"
          )
        );

        return { categories: response.data, products: activeProducts };
      }

      if (isLoading) return <p>Loading...</p>;
      if (error) return <p>Error loading products</p>;

     

 const categories = productsdata.categories;
  return (
    <>
      <div className="bg-[#7B6C9C] text-white shadow-md px-0 smm:px-0 lg:px-12 lg:fixed top-0 left-0 right-0 z-50">
        <div className="py-2 mx-3">
          <div className="topdev flex my-auto container gap-1 lg:gap-5 smm:gap-1 w-full flex-col lg:flex-row sm:flex-col">
            <div className="flex gap-1 lg:gap-5 smm:gap-1">
              {/* <div className="logo">
                <img
                  src={log}
                  alt="Logo"
                  className="h-14 w-auto cursor-pointer bg-transparent filter brightness-0 invert"
                  onClick={() => navigate("/")}
                />
              </div> */}
              {/* <div className="flex mx-5 lg:mx-5 sm:mx-1 smm:mx-0 cursor-pointer text-white hover:text-secondary my-auto">
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
              </div> */}
            </div>
          </div>
          <header className="flex py-2 w-full flex-col sm:flex-row justify-between">
            <div className="flex items-center w-full flex-col sm:flex-row">
              {/* <div className="logo"> */}
              {/* <img
                src={log}
                alt="Logo"
                className="h-14 w-14 cursor-pointer bg-transparent filter brightness-0 invert me-5"
                // className="h-14 w-14 cursor-pointer   me-5"
                onClick={() => navigate("/")}
              /> */}
              {/* <img
                src={log}
                alt="Logo"
                className="h-14 w-28 object-cover cursor-pointer me-5"
                // className="h-14 w-14 cursor-pointer   me-5"
                onClick={() => navigate("/")}
              /> */}
              <div
                onClick={() => navigate("/")}
                className="cursor-pointer lg:-rotate-12 mr-5"
              >
                <p className="text-2xl">Pakardi</p>
                <p className="text-sm">Pakardi.com</p>
              </div>
              {/* </div> */}
              <div className="flex items-center w-full px-2">
                {/* <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaSearch className="text-gray-500" />
                  </div>
                  <input
                    ref={inputRef}
                    id="location"
                    type="text"
                    className="outline-none text-gray-700 py-2 px-10 border rounded-md w-full"
                    placeholder="Enter a location"
                  />
                </div> */}
                <div className="flex w-auto sm:w-auto lg:w-full mt-2 lg:mt-0 sm:mt-2 px-2">
                  <div className="bg-white flex items-center rounded-full w-full max-w-2xl shadow-lg">
                    {/* Category Dropdown */}
                    <select
                      className="bg-white text-gray-600 py-2 px-4 rounded-l-full focus:outline-none w-full"
                      // value={category}
                      // onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="All Categories">All Categories</option>
                      {categories.map((category) => {
                        category.products.filter(
                          (product) => product.status.toLowerCase() === "active"
                        );
                        return (
                          <option value={category?.category?.name}>
                            {category?.category?.name}
                          </option>
                        );
                      })}
                    </select>

                    {/* Search Input */}
                    <input
                      type="text"
                      placeholder="Search for products ..."
                      className="ml-0 lg:ml-2 sm:ml-0 py-2 px-2 border rounded-l-md flex-grow focus:outline-none text-black w-full"
                      // className="outline-none text-black py-2 px-10 border rounded-l-md w-full"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />

                    {/* Search Button */}
                    <button
                      onClick={handleSearch}
                      className="bg-cyan-500 text-white p-2 rounded-full hover:bg-cyan-600 transition mx-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-4.35-4.35M16.65 11a6.65 6.65 0 11-13.3 0 6.65 6.65 0 0113.3 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <span className="ml-2 border-l border-gray-300"></span>
                {/* {isUserLoggedIn && (
                  <FaBell
                    className="text-white cursor-pointer lg:hidden"
                    size={25}
                  />
                )} */}
              </div>
              {/* <div className="flex w-full mt-2 lg:mt-0 sm:mt-2 px-2">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="ml-0 lg:ml-2 sm:ml-0 py-2 px-2 border rounded-l-md flex-grow outline-none text-black"
                />
                <span
                  className="flex items-center border border-detailscolor px-4 bg-detailscolor rounded-r-md cursor-pointer"
                  onClick={handleSearch}
                >
                  <FaSearch className="text-white" />
                </span>
              </div> */}
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
                        <Stack
                          style={{
                            borderRadius: "12px",
                            display: "flex",
                            flexDirection: "row",
                            color: "black",
                          }}
                        >
                          <Avatar src={finalUrl || "broken-image.jpg"} />
                          <ArrowDropDownIcon className="my-auto" />
                        </Stack>
                      </MenuButton>
                      <Menu
                        slots={{ listbox: Listbox }}
                        style={{ zIndex: "200" }}
                      >
                        <MenuSection>
                          <MenuItem onClick={() => navigate("/ProfilePage")}>
                            profile
                          </MenuItem>
                          <MenuItem onClick={() => navigate("/MyProduct")}>
                            My Product
                          </MenuItem>
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
                  className="text-white flexcursor-pointer flex mx-4 cursor-pointer hover:text-black"
                  onClick={handleShowCreatePopup}
                >
                  <div className="my-auto">
                    <FaRegUser size={24} />
                  </div>
                  <div className="ms-3 my-auto flex flex-col">
                    <span className="text-sm">Login</span>
                    <span className="text-md">Account</span>
                  </div>
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