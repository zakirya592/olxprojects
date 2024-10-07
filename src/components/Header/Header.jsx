import React, { useState, useEffect, useRef } from "react";
import {  FaSearch, FaCommentDots, FaBell, FaCartPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import log from "../../assets/Images/pakardilogo.png";
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
import "./Header.css"
import DropDownSelection from "../DropDownSelection/DropDownSelection";
import { CiMenuBurger } from "react-icons/ci";
import { IoMdMenu } from "react-icons/io";
import Categories from "../../Pages/Home/AllCategories/Categories";

function Header() {
  const navigate = useNavigate();
  const [isCreatePopupVisible, setCreatePopupVisibility] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userprofileimage, setuserprofileimage] = useState("")
  
  const [isCategoriesPopupVisible, setCategoriesPopupVisibility] = useState(false);
   const handleShowUpdatePopup = (row) => {
     setCategoriesPopupVisibility(true);
   };

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
  }, [isCreatePopupVisible]);

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
  const handlemessageButtonClick = () => {
    if (isUserLoggedIn) {
      navigate("/Chat");
    } else {
      navigate("/LoginForm");
    }
  };

  const handlenotificationButtonClick = () => {
    if (isUserLoggedIn) {
      // navigate("/Chat");
      console.log("Notifiaction section");
    } else {
      navigate("/LoginForm");
    }
  };

  const handlecardButtonClick = () => {
    if (isUserLoggedIn) {
      // navigate("/Chat");
      console.log("Card section");
    } else {
      navigate("/LoginForm");
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

  const searchMutation = useMutation({
    mutationFn: async (query) => {
      const response = await NewRequest.post("/product/searchProduct", {
        query,
      });
      return response.data;
    },

    onSuccess: (data) => {
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
     if (query.trim() === "") {
       toast.warn("Please enter a search term", { position: "top-right" });
       return;
     }
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
      <div className="bg-maincolor text-white shadow-md px-0 smm:px-0 lg:px-12 lg:fixed top-0 left-0 right-0 z-50">
        <div className="pt-2 mx-3">
          <header className="flex pt-2 w-full flex-col sm:flex-row justify-between">
            <div className="flex  lg:w-1/4 sm:w-full w-full justify-center lg:justify-start sm:justify-center smm:justify-center">
              <div
                onClick={() => navigate("/")}
                className="cursor-pointer  mr-5" //lg:-rotate-12
              >
                <img
                  src={log}
                  alt="logo"
                  className="h-14 lg:h-24 sm:h-14 w-full object-contain"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="flex items-center space-x-4 w-full flex-col sm:flex-row  justify-center lg:justify-end sm:justify-center smm:justify-center mt-2 lg:mt-0 sm:mt-2">
                <div className="flex items-center w-full sm:px-0 px-0 lg:px-2">
                  <div className="flex w-full mt-2 lg:mt-0 sm:px-0 px-0 lg:px-2">
                    <div className="bg-white flex items-center rounded-full w-full shadow-lg">
                      <div className="text-maincolor text-lg font-bold py-2 pl-4 rounded focus:outline-none  ">
                        <Categories />
                      </div>
                      <div className="relative w-full">
                        <input
                          type="text"
                          className="lg:ml-2 sm:ml-0 ml-0 px-2 py-1 rounded-full text-maincolor border w-full focus:outline-none"
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          onKeyDown={handleKeyDown}
                        />
                        <span className="absolute inset-y-0 right-2 flex items-center">
                          <FaSearch
                            className="text-maincolor"
                            onClick={handleSearch}
                          />
                        </span>
                      </div>
                      <div className="p-2"></div>
                      {/* Search Button */}
                      {/* <button
                        onClick={handleSearch}
                        className="bg-maincolor text-white p-2 rounded-full hover:bg-cyan-600 transition ml-1 sm:hidden lg:block hidden"
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
                      </button> */}
                    </div>
                  </div>

                  <span className="ml-2 border-l border-gray-300"></span>
                </div>
                <div className="hidden mt-2 gap-2 lg:mt-0 sm:mt-2 lg:flex md:flex sm:hidden">
                  <div
                    className="p-1 lg:block my-auto mx-3"
                    onClick={handleSellButtonClick}
                  >
                    <button className="bg-white flex justify-center items-center text-maincolor hover:text-white font-semibold  px-2 rounded-full cursor-pointer shadow-[0_2px_2px_rgba(57,31,91,0.24),0_8px_12px_rgba(179,132,201,0.4)] transition-all duration-200 hover:bg-gradient-to-b from-[#B384C9] to-[#391F5B] md:text-[21px] md:px-[20px]">
                      SELL
                    </button>
                  </div>
                  <div className="flex items-center space-x-4 my-auto">
                    <FaCommentDots
                      className="text-white cursor-pointer lg:block"
                      size={25}
                      onClick={handlemessageButtonClick}
                    />
                    <FaBell
                      className="text-white cursor-pointer  lg:block"
                      size={25}
                      onClick={handlenotificationButtonClick}
                    />
                    {/* <FaCartPlus
                      className="text-white cursor-pointer  lg:block"
                      size={25}
                      onClick={handlecardButtonClick}
                    /> */}
                    {isUserLoggedIn && (
                      <>
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
                              <ArrowDropDownIcon className="my-auto text-white hover:text-black" />
                            </Stack>
                          </MenuButton>
                          <Menu
                            slots={{ listbox: Listbox }}
                            style={{ zIndex: "200" }}
                          >
                            <MenuSection>
                              <MenuItem
                                onClick={() => navigate("/ProfilePage")}
                              >
                                profile
                              </MenuItem>
                              <MenuItem onClick={() => navigate("/MyProduct")}>
                                My Product
                              </MenuItem>
                              <MenuItem
                                onClick={() => navigate("/Myfavorites")}
                              >
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
                      className="text-white flexcursor-pointer flex mx-4 cursor-pointer"
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
                </div>
                <div className="fixed bottom-0 -left-4 w-full bg-maincolor text-white flex justify-around items-center py-2 sm:hidden">
                  {/* Chat Icon */}
                  <button className="text-white">
                    <FaCommentDots
                      size={24}
                      onClick={handlemessageButtonClick}
                    />
                  </button>

                  {/* Notification Icon */}
                  <button className="text-white">
                    <FaBell size={24} onClick={handlenotificationButtonClick} />
                  </button>

                  {/* Sell Button */}
                  <button
                    className="bg-white text-purple-800 font-bold py-1 px-4 rounded-full"
                    onClick={handleSellButtonClick}
                  >
                    SELL
                  </button>

                  {/* Cart Icon */}
                  <button className="text-white">
                    <FaCartPlus size={24} />
                  </button>

                  {isUserLoggedIn && (
                    <>
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
                            <ArrowDropDownIcon className="my-auto text-white hover:text-black" />
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
                  {!isUserLoggedIn && (
                    <h6
                      className="text-white flexcursor-pointer flex mx-4 cursor-pointer"
                      onClick={handleShowCreatePopup}
                    >
                      <div className="my-auto">
                        <FaRegUser size={24} />
                      </div>
                    </h6>
                  )}
                </div>
              </div>
              <DropDownSelection />
            </div>
          </header>
        </div>
      </div>

      {isCreatePopupVisible && (
        <Firstloginsinup
          isVisible={isCreatePopupVisible}
          setVisibility={setCreatePopupVisibility}
        />
      )}

      {isCategoriesPopupVisible && (
        <Firstloginsinup
          isVisible={isCategoriesPopupVisible}
          setVisibility={setCategoriesPopupVisibility}
          refreshBrandData={fetchData}
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