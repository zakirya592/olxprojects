import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { FaCommentDots, FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Firstloginsinup from "../../Pages/Admin/Login/Firstloginsinup";
import PropTypes from "prop-types";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton as BaseMenuButton } from "@mui/base/MenuButton";
import { MenuItem as BaseMenuItem, menuItemClasses } from "@mui/base/MenuItem";
import { styled } from "@mui/system";
import Avatar from "@mui/material/Avatar";
import { Stack, Drawer, IconButton, Divider } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useMutation } from "react-query";
import NewRequest from "../../../utils/NewRequest";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import imageLiveUrl from "../../../utils/urlConverter/imageLiveUrl";
import "./Header.css";
import NotificationComponent from "../../Pages/Notification/NotificationComponent";
import MottaCategoryNavDropdown from "./MottaCategoryNavDropdown";
import SearchAllCategoriesModal from "./SearchAllCategoriesModal";
import { PAKARDAI_LOGO_SRC } from "../../constants/brandLogo";

function MottaLogoMark({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="motta-logo-mark border-0 bg-transparent p-0 cursor-pointer"
      aria-label="Home"
    >
      <img
        src={PAKARDAI_LOGO_SRC}
        alt=""
      
        style={{ height: "70px", width: "auto", objectFit: "contain" }}
      />
    </button>
  );
}

function MottaSimpleDropdown({ label, children }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        className="motta-nav-link flex items-center gap-0.5 text-white"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {label}
        <KeyboardArrowDownIcon sx={{ fontSize: 18 }} />
      </button>
      {open && (
        <div className="motta-simple-pop">{children(() => setOpen(false))}</div>
      )}
    </div>
  );
}

MottaSimpleDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
};

async function fetchCategoryList() {
  const response = await NewRequest.get("/category");
  return response?.data?.filter((item) => item.status === 1) || [];
}

function Header() {
  const navigate = useNavigate();
  const [isCreatePopupVisible, setCreatePopupVisibility] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userprofileimage, setuserprofileimage] = useState("");
  const [searchAllOpen, setSearchAllOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data: categoryList = [], isLoading: categoriesLoading } = useQuery(
    "category",
    fetchCategoryList
  );

  useEffect(() => {
    const handleGoogleRedirect = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      const userId = urlParams.get("userId");

      if (token && userId) {
        localStorage.setItem("authToken", token);
        localStorage.setItem("userdata", userId);
      }
    };

    handleGoogleRedirect();
  }, []);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setIsUserLoggedIn(!!authToken);
  }, [isCreatePopupVisible]);

  const storedUserResponseString = localStorage.getItem("userResponse");
  const storedUserResponse = JSON.parse(storedUserResponseString || "null");
  let loginuserdata = storedUserResponse?.data?.user?._id || "";

  if (!loginuserdata) {
    loginuserdata = localStorage.getItem("userdata") || "";
  }

  useEffect(() => {
    NewRequest.get(`/users/${loginuserdata || ""}`)
      .then((response) => {
        const userdata = response.data;
        const imageUrl = userdata?.image || "";
        const finalUrl =
          imageUrl && imageUrl.startsWith("https")
            ? imageUrl
            : imageLiveUrl(imageUrl);
        setuserprofileimage(finalUrl);
      })
      .catch(() => {});
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("productmore");
    sessionStorage.removeItem("userResponse");
    sessionStorage.clear();
    localStorage.clear();
    navigate("/");
    setIsUserLoggedIn(false);
  };

  const handleShowCreatePopup = () => {
    navigate("/LoginForm");
  };

  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    const loadScript = (url, callback) => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = url;
      script.onload = callback;
      document.head.appendChild(script);
    };

    const handleScriptLoad = () => {
      if (!inputRef.current || !window.google?.maps?.places) return;
      autocompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ["geocode"],
          componentRestrictions: { country: "pk" },
        }
      );
      autocompleteRef.current.addListener("place_changed", () => {
        autocompleteRef.current?.getPlace();
      });
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
    label: PropTypes.string,
  };

  const [query, setQuery] = useState("");

  const searchMutation = useMutation({
    mutationFn: async (q) => {
      const response = await NewRequest.post("/product/searchProduct", {
        query: q,
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
      });
    },
  });

  const handleSearch = (e) => {
    e?.preventDefault?.();
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

  const accountMenu = (
    <>
      {isUserLoggedIn && (
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
              <Avatar src={userprofileimage || "broken-image.jpg"} />
              <ArrowDropDownIcon className="my-auto text-white hover:text-black" />
            </Stack>
          </MenuButton>
          <Menu slots={{ listbox: Listbox }} style={{ zIndex: 200 }}>
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
      )}
    </>
  );

  return (
    <>
      <header className="motta-header text-white fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-2 px-4 py-2 sm:px-5 lg:flex-row lg:items-center lg:gap-4 lg:px-6 lg:py-2.5">
          <div className="flex min-h-[44px] items-center gap-2 lg:min-w-0 lg:flex-shrink-0">
            <IconButton
              className="motta-icon-btn lg:!hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              sx={{ color: "#fff" }}
            >
              <MenuIcon />
            </IconButton>

            <MottaLogoMark onClick={() => navigate("/")} />

            <nav className="ml-1 hidden items-center gap-1 lg:flex xl:gap-2">
              <MottaCategoryNavDropdown
                categories={categoryList}
                isLoading={categoriesLoading}
              />
              <MottaSimpleDropdown label="Deals">
                {(close) => (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        close();
                        navigate("/");
                      }}
                    >
                      Featured deals
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        close();
                        navigate("/");
                      }}
                    >
                      View homepage
                    </button>
                  </>
                )}
              </MottaSimpleDropdown>
              <MottaSimpleDropdown label="What's New">
                {(close) => (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        close();
                        navigate("/");
                      }}
                    >
                      New arrivals
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        close();
                        navigate("/Aboutus");
                      }}
                    >
                      About us
                    </button>
                  </>
                )}
              </MottaSimpleDropdown>
            </nav>
          </div>

          <form
            className="motta-search-wrap mx-auto w-full lg:mx-0 lg:max-w-xl xl:max-w-2xl"
            onSubmit={handleSearch}
          >
            <button
              type="button"
              className="motta-search-all"
              onClick={() => setSearchAllOpen(true)}
            >
              All
              <KeyboardArrowDownIcon sx={{ fontSize: 18, color: "#5f6368" }} />
            </button>
            <input
              ref={inputRef}
              type="search"
              className="motta-search-input"
              placeholder="Search for anything"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
            />
            <button
              type="submit"
              className="motta-search-submit"
              aria-label="Search"
            >
              <FaSearch className="text-white text-lg" />
            </button>
          </form>

          <div className="hidden items-center justify-end gap-1 lg:flex lg:flex-shrink-0 xl:gap-2">
            <button
              type="button"
              className="motta-signin"
              onClick={
                isUserLoggedIn ? () => navigate("/ProfilePage") : handleShowCreatePopup
              }
            >
              {isUserLoggedIn ? "Account" : "Sign in"}
            </button>
            <button
              type="button"
              className="motta-icon-btn"
              aria-label="Wishlist"
              onClick={() => navigate("/Myfavorites")}
            >
              <FavoriteBorderIcon sx={{ fontSize: 24 }} />
            </button>
            <button
              type="button"
              className="motta-icon-btn"
              aria-label="Shopping bag"
              onClick={() => navigate("/Myfavorites")}
            >
              <ShoppingBagOutlinedIcon sx={{ fontSize: 24 }} />
            </button>
            <button
              type="button"
              className="motta-icon-btn hidden xl:inline-flex"
              aria-label="Messages"
              onClick={handlemessageButtonClick}
            >
              <FaCommentDots size={22} />
            </button>
            <NotificationComponent />
            <div className="flex items-center pl-1">{accountMenu}</div>
            <button
              type="button"
              onClick={handleSellButtonClick}
              className="ml-1 rounded-full bg-white px-4 py-1.5 text-sm font-bold text-[#792998] shadow-sm hover:bg-gray-100"
            >
              SELL
            </button>
          </div>
        </div>

        <SearchAllCategoriesModal
          open={searchAllOpen}
          onClose={() => setSearchAllOpen(false)}
          categories={categoryList}
          isLoading={categoriesLoading}
        />

        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          PaperProps={{ sx: { width: 280, bgcolor: "#792998", color: "#fff" } }}
        >
          <div className="flex items-center justify-between p-3">
            <span className="font-bold text-lg">Menu</span>
            <IconButton onClick={() => setMobileOpen(false)} sx={{ color: "#fff" }}>
              <span className="text-2xl leading-none">&times;</span>
            </IconButton>
          </div>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />
          <div className="flex flex-col gap-2 p-3">
            <button
              type="button"
              className="text-left py-2"
              onClick={() => {
                setMobileOpen(false);
                navigate("/");
              }}
            >
              Home
            </button>
            <button
              type="button"
              className="text-left py-2"
              onClick={() => {
                setMobileOpen(false);
                setSearchAllOpen(true);
              }}
            >
              All categories
            </button>
            <button
              type="button"
              className="text-left py-2"
              onClick={() => {
                setMobileOpen(false);
                handlemessageButtonClick();
              }}
            >
              Messages
            </button>
            <button
              type="button"
              className="text-left py-2"
              onClick={() => {
                setMobileOpen(false);
                navigate("/contactus");
              }}
            >
              Contact us
            </button>
            <button
              type="button"
              className="text-left py-2"
              onClick={() => {
                setMobileOpen(false);
                navigate("/Aboutus");
              }}
            >
              About
            </button>
            <button
              type="button"
              className="mt-2 rounded-full bg-white py-2 font-bold text-[#792998]"
              onClick={() => {
                setMobileOpen(false);
                handleSellButtonClick();
              }}
            >
              SELL
            </button>
          </div>
        </Drawer>
      </header>

      <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-white/10 bg-[#792998] py-2 text-white lg:hidden">
        <button
          type="button"
          className="p-2"
          onClick={handlemessageButtonClick}
          aria-label="Messages"
        >
          <FaCommentDots size={24} />
        </button>
        <NotificationComponent />
        <button
          type="button"
          className="rounded-full bg-white px-4 py-1.5 text-sm font-bold text-[#792998]"
          onClick={handleSellButtonClick}
        >
          SELL
        </button>
        <button
          type="button"
          className="p-2"
          onClick={() => navigate("/Myfavorites")}
          aria-label="Wishlist"
        >
          <FavoriteBorderIcon sx={{ fontSize: 24 }} />
        </button>
        {isUserLoggedIn ? (
          <Dropdown>
            <MenuButton>
              <Avatar src={userprofileimage || "broken-image.jpg"} sx={{ width: 32, height: 32 }} />
            </MenuButton>
            <Menu slots={{ listbox: Listbox }} style={{ zIndex: 200 }}>
              <MenuSection>
                <MenuItem onClick={() => navigate("/ProfilePage")}>profile</MenuItem>
                <MenuItem onClick={() => navigate("/MyProduct")}>My Product</MenuItem>
                <MenuItem onClick={() => navigate("/Myfavorites")}>
                  Favourites & Saved searches
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuSection>
            </Menu>
          </Dropdown>
        ) : (
          <button type="button" className="p-2" onClick={handleShowCreatePopup}>
            <FaRegUser size={24} />
          </button>
        )}
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
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;
  background: transparent;

  &:hover {
    background: ${theme.palette.mode === "dark" ? grey[800] : "rgba(255,255,255,0.08)"};
  }

  &:active {
    background: ${theme.palette.mode === "dark" ? grey[700] : grey[100]};
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === "dark" ? blue[300] : blue[200]};
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
