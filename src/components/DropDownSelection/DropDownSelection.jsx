import React, { useEffect, useState } from "react";
import "./DropDownSelection.css";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import NewRequest from "../../../utils/NewRequest";
// import { useTranslation } from "react-i18next";

const DropDownSelection = () => {
  const [megaMenu, setMegaMenu] = useState([]);
  
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const { t, i18n } = useTranslation();
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const { isLoading, data, error } = useQuery("fetchAllMegaMenus", async () => {
    try {
      const response = await NewRequest.get("/category");
      console.log("Menu", response.data);
      return response?.data || [];
    } catch (error) {
      console.log(error);
      throw error;
    }
  });


      async function fetchproductData() {
    const response = await NewRequest.get("/product/getcategoryproduct");
    const mobilesCategory = response?.data

return mobilesCategory;
    
  }

  // Use the data in your component
  const { data: productsdata } = useQuery("productgetcategoryss", fetchproductData);

    const viewmore = (product) => {
      //  console.log(product);

      // const selectedCategory = productsdata.find((item) => item.category.name);
      const selectedCategoryProducts = productsdata.find(
        (item) => item.category.name === product.name
      );

      console.log(selectedCategoryProducts.category._id);
      const subResponseString = JSON.stringify(selectedCategoryProducts);
      sessionStorage.setItem("productmore", subResponseString);
      navigate(`/moreproduct/${selectedCategoryProducts?.category?.name}`);
    };

  return (
    <header className="header">
      <div className="container menu-container">
        <div className="row v-center">
          {/* Logo */}
          {/* <div className="header-item item-left">
          <div className="logo">
            <a href="#">My Store</a>
          </div>
        </div> */}

          {/* Menu Start */}
          <div className="header-item item-center">
            <div className="menu-overlay" onClick={toggleMobileMenu}></div>
            <nav
              className={`menu ${isMobileMenuOpen ? "active" : ""}`}
              style={{ backgroundColor: "white" }}
            >
              <div className="mobile-menu-head">
                <div className="go-back">
                  <i
                    className="fa fa-angle-left"
                    onClick={toggleMobileMenu}
                  ></i>
                </div>
                <div className="current-menu-title"></div>
                <div className="mobile-menu-close" onClick={toggleMobileMenu}>
                  &times;
                </div>
              </div>
              <ul
                className={`menu-main flex-row 2xl:flex xl:flex lg:flex 3xl:flex 3xl:justify-center 3xl:items-center 2xl:justify-center xl:justify-center lg:justify-center 2xl:items-center xl:items-center lg:items-center sm:gap-10`}
              >
                {/* {data?.map((section, index) => (
                  <li key={index} className="menu-item-has-children">
                    <div
                      // to="javascript:void(0)"
                      onClick={() => viewmore(section)}
                      style={{ textDecoration: "none" }}
                      className="text-lg font-bold cursor-pointer"
                    >
                      <p>{section?.name}</p>
                      &nbsp;
                      <i className="fa fa-angle-down"></i>
                    </div> */}
                {/* <div
                      className={`sub-menu mega-menu mega-menu-column-4 text-secondary `}
                    >
                      {section.mega_menu_categories.map(
                        (category, catIndex) => (
                          <div
                            key={catIndex}
                            className="list-item"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                          >
                            <img
                              src={category?.image}
                              alt={category.category_name_en}
                              className="category-icon"
                            />
                            <div className="w-full">
                              <Link
                                to={`/${category.url}`}
                                style={{
                                  textDecoration: "none",
                                  marginTop: "5px",
                                  fontWeight: "600",
                                }}
                              >
                                {category.category_name_en}
                                <p
                                  style={{
                                    fontWeight: "400",
                                    marginTop: "-22px",
                                    color: "#021F69",
                                    fontSize: "14px",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {category?.caption}
                                </p>
                              </Link>
                              <ul>
                                {category.footer_menus.map(
                                  (subcategory, subIndex) => (
                                    <li key={subIndex}>
                                      <Link
                                        to={`/${subcategory.url}`}
                                        style={{ textDecoration: "none" }}
                                      >
                                        {subcategory?.category_name_en}
                                      </Link>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        )
                      )}
                    </div> */}
                {/* </li>
                ))} */}
                <li className="menu-item-has-children">
                  <div
                    // to="javascript:void(0)"
                    // onClick={() => viewmore(section)}
                    style={{ textDecoration: "none" }}
                    className="text-lg font-bold cursor-pointer"
                  >
                    <p>gemstone</p>
                  </div>
                </li>
                <li className="menu-item-has-children">
                  <div
                    // to="javascript:void(0)"
                    // onClick={() => viewmore(section)}
                    style={{ textDecoration: "none" }}
                    className="text-lg font-bold cursor-pointer"
                  >
                    <p>handmade </p>
                  </div>
                </li>
                <li className="menu-item-has-children">
                  <div
                    // to="javascript:void(0)"
                    // onClick={() => viewmore(section)}
                    style={{ textDecoration: "none" }}
                    className="text-lg font-bold cursor-pointer"
                  >
                    <p>carpets rawala</p>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
          <div className="mobile-menu-trigger" onClick={toggleMobileMenu}>
            <span></span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DropDownSelection;
