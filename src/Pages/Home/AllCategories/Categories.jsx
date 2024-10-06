import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import NewRequest from "../../../../utils/NewRequest";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import imageLiveUrl from "../../../../utils/urlConverter/imageLiveUrl";

import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton as BaseMenuButton } from "@mui/base/MenuButton";
import { MenuItem as BaseMenuItem, menuItemClasses } from "@mui/base/MenuItem";
import { styled } from "@mui/system";
import Avatar from "@mui/material/Avatar";
import { Stack } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PropTypes from "prop-types";
import { FaRegUser } from "react-icons/fa";
import { useMutation } from "react-query";
import { IoMdMenu } from "react-icons/io";
function Categories() {

  const navigate = useNavigate();
  const {
    isLoading,
    error,
    data: eventsData,
  } = useQuery("category", fetchUpcomingEventsData);
  async function fetchUpcomingEventsData() {
    const response = await NewRequest.get("/category");
    return response?.data.filter((item) => item.status === 1) || [];
  }

  async function fetchproductData() {
    const response = await NewRequest.get("/product/getcategoryproduct");
    const mobilesCategory = response?.data
    return mobilesCategory;
  }

  const { data: productsdata } = useQuery("productgetcategoryss", fetchproductData);

  const viewmore = (product) => {
    const selectedCategoryProducts = productsdata.find(
      (item) => item.category.name === product.name
    );

    const subResponseString = JSON.stringify(selectedCategoryProducts);
    sessionStorage.setItem("productmore", subResponseString);
    navigate(`/moreproduct/${selectedCategoryProducts?.category?.name}`);
  };

  function MenuSection({ children, label }) {
    return (
      <MenuSectionRoot role="group">
        {/* <MenuSectionLabel className="text-maincolor text-lg font-sans font-bold">All categories</MenuSectionLabel> */}
        <ul className="px-10">{children}</ul>
      </MenuSectionRoot>
    );
  }

  MenuSection.propTypes = {
    children: PropTypes.node,
    label: PropTypes.string.isRequired,
  };
  return (
    <div className="w-full">
      <Dropdown>
        <MenuButton>
          <Stack
            style={{
              borderRadius: "12px",
              display: "flex",
              flexDirection: "row",
              color: "black",
              alignItems: "start",
              width: "120px",
            }}
          >
            <IoMdMenu className=" hover:text-black text-maincolor my-auto" />
            <span className="ml-2 text-maincolor font-semibold my-auto">
              All categories
            </span>
          </Stack>
        </MenuButton>

        <Menu
          slots={{ listbox: Listbox }}
          style={{ zIndex: "200" }}
          className="w-full ms-auto rounded-sm"
        >
          <MenuSection>
            <MenuItem className="bg-[#F5F5F5]">
              <h2 className="text-maincolor text-lg font-sans font-bold px-2 my-5">
                All categories
              </h2>
              <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 gap-4 lg:grid-cols-4 md:grid-cols-4 grid-cols-2 sm:h-[300px] lg:h-full h-[300px] overflow-y-scroll sm:px-2 px-2 w-full mx-auto mb-3 ">
                {isLoading ? (
                  <div>Loading...</div>
                ) : error ? (
                  ""
                ) : (
                  eventsData.map((item) => (
                    <div
                      key={item.id}
                      className="w-full py-4 rounded-lg bg-white shadow-md"
                    >
                      <div
                        onClick={() => viewmore(item)}
                        className="font-semibold text-maincolor sm:text-lg text-base mt-3 cursor-pointer"
                      >
                        <div className="flex flex-col items-center w-full justify-center">
                          {item?.icon ? (
                            <img
                              src={imageLiveUrl(item.icon)}
                              alt="icon"
                              className="w-14 h-14 object-contain"
                            />
                          ) : (
                            <div className="w-14 h-14 mt-1 flex justify-center items-center">
                              <div className="w-10 h-10 border border-maincolor rounded-full"></div>
                            </div>
                          )}
                          <div className="w-full mt-3 text-center">
                            <p className="">{item.name}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </MenuItem>
          </MenuSection>
        </Menu>
      </Dropdown>
      {/* Grid for Large Screens */}
      {/* <div className="grid 2xl:grid-cols-4 xl:grid-cols-4 gap-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 sm:px-2 px-2 w-full mx-auto mb-3">
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          ""
        ) : (
          eventsData.map((item) => (
            <div key={item.id} className="w-full py-4 bg-[#303030] rounded-lg">
              <div
                onClick={() => viewmore(item)}
                className="font-semibold text-white sm:text-lg text-base hover:text-primary mt-3 cursor-pointer"
              >
                <div className="flex flex-col items-center w-full justify-center">
                  {item?.icon ? (
                    <img
                      src={imageLiveUrl(item.icon)}
                      alt="icon"
                      className="w-14 h-14 object-contain"
                    />
                  ) : (
                    <div className="w-14 h-14 mt-1 flex justify-center items-center">
                      <div className="w-10 h-10 border border-gray-300 rounded-full"></div>
                    </div>
                  )}
                  <div className="w-full mt-3 text-center">
                    <p className="">{item.name}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div> */}
    </div>
  );
}

export default Categories;


const Listbox = styled("ul")(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  z-index: 200;
  `
);

const MenuItem = styled(BaseMenuItem)(
  ({ theme }) => `
  list-style: none;
  border-radius: 8px;
  cursor: default;
  user-select: none;
  padding:12px;
  &:last-of-type {
    border-bottom: none;
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
  transition: all 150ms ease;
  cursor: pointer;
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
`;
