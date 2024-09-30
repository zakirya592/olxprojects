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
import { Autocomplete, Stack, TextField } from "@mui/material";
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
  const [userprofileimage, setuserprofileimage] = useState("")


  useEffect(() => {
    const handleGoogleRedirect = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      const userId = urlParams.get("userId");

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
  let loginuserdata = storedUserResponse?.data.user._id || "";

  if (!loginuserdata) {
    loginuserdata = localStorage.getItem("userdata") || "";
  }



  useEffect(() => {
    NewRequest.get(`/users/${loginuserdata || ""}`)
      .then((response) => {
        const userdata = response.data;
        const imageUrl = userdata?.image || "";
        const finalUrl = imageUrl && imageUrl.startsWith("https") ? imageUrl : imageLiveUrl(imageUrl);
        setuserprofileimage(finalUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchMutation.mutate(query);
    }
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

  const [productdata, setproductdata] = useState([])
  const fetchData = async () => {
    try {
      const response = await NewRequest.get("/product/getallproductbyadmin");

      const Activeproduct = response?.data.filter(product => product.status.toLowerCase() == "active");
      setproductdata(Activeproduct || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData()
  }, [])


  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;



  const categories = productsdata.categories;
  return (
    <>
      <div className="bg-[#7B6C9C] text-white shadow-md px-0 smm:px-0 lg:px-12 lg:fixed top-0 left-0 right-0 z-50">
        <div className="py-2 mx-3">
          <div className="topdev flex my-auto container gap-1 lg:gap-5 smm:gap-1 w-full flex-col lg:flex-row sm:flex-col">
            <div className="flex gap-1 lg:gap-5 smm:gap-1"></div>
          </div>
          <header className="flex py-2 w-full flex-col sm:flex-row justify-between">
            <div className="flex items-center w-full flex-col sm:flex-row">
              <div
                onClick={() => navigate("/")}
                className="cursor-pointer lg:-rotate-12 mr-5"
              >
                <p className="text-2xl">Pakardi</p>
                <p className="text-sm">Pakardi.com</p>
              </div>
              {/* </div> */}
              <div className="flex items-center w-full sm:px-0 px-0 lg:px-2">
                <div className="flex w-full mt-2 lg:mt-0 sm:px-0 px-0 lg:px-2">
                  <div className="bg-white flex items-center rounded-md w-full shadow-lg">
                    {/* Category Dropdown */}
                    <select
                      className="text-gray-600 py-2 px-4 rounded focus:outline-none  "
                      // value={category}
                      // onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="All Categories">All Categories</option>
                      {categories.map((category, index) => {
                        category.products.filter(
                          (product) => product.status.toLowerCase() === "active"
                        );
                        return (
                          <option value={category?.category?.name} key={index}>
                            {category?.category?.name}
                          </option>
                        );
                      })}
                    </select>

                    {/* Autocomplete Input */}
                    <Autocomplete
                      id="test"
                      options={productdata}
                      // value={query}
                      value={
                        productdata.find((product) => product.name === query) ||
                        null
                      } // Keep selected value in Autocomplete
                      getOptionLabel={(option) => option?.name || ""}
                      onChange={(event, value) => {
                        setQuery(value?.name || "");
                        searchMutation.mutate(value?.name || "");
                      }}
                      onInputChange={(event, value) => {
                        if (!value) {
                          console.log("Input cleared");
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          InputProps={{
                            ...params.InputProps,
                            className: "text-black",
                          }}
                          InputLabelProps={{
                            ...params.InputLabelProps,
                            style: { color: "black" },
                          }}
                          className="ml-2 px-2 py-1 border border-black rounded-l-md w-full focus:outline-none"
                          placeholder="Search for products ..."
                          sx={{
                            "& .MuiOutlinedInput-root .MuiAutocomplete-input": {
                              padding: "2.5px 4px 2.5px 5px",
                            },
                          }}
                          onKeyDown={handleKeyDown} // Trigger search on "Enter"
                        />
                      )}
                      sx={{
                        flexGrow: 1, // Ensures the Autocomplete grows to fill available space
                        "& .MuiAutocomplete-endAdornment": {
                          color: "black",
                        },
                      }}
                    />

                    {/* Search Button */}
                    <button
                      onClick={handleSearch}
                      className="bg-[#7B6C9C] text-white p-2 rounded-full hover:bg-cyan-600 transition ml-1 sm:hidden lg:block hidden"
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
                {/* Notification Icon (Hidden for larger screens) */}
                {/* {isUserLoggedIn && (
    <FaBell
      className="text-white cursor-pointer lg:hidden"
      size={25}
    />
  )} */}
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
                          <Avatar
                            src={userprofileimage || "broken-image.jpg"}
                          />
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
        <div className="fixed justify-center text-center w-fit items-center z-50 bottom-0 sm:hidden">
          <div className="flex justify-center rounded-full p-1">
            <button
              className=" p-2 rounded-full text-2xl gra font-bold text-blue-700 border-blue-700 border-4"
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
  box-shadow: 0px 4px 6px ${theme.palette.mode === "dark" ? "rgba(0,0,0, 0.50)" : "rgba(0,0,0, 0.05)"
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