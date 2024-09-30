import React, { useEffect, useState } from "react";
import "./DropDownSelection.css";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import NewRequest from "../../../utils/NewRequest";
import { toast } from "react-toastify";

const DropDownSelection = () => {

  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const storedUserResponseString = sessionStorage.getItem("userResponse");
    const storedUserResponse = JSON.parse(storedUserResponseString);
    let loginuserdata = storedUserResponse?.data.user || "";

    if (!loginuserdata) {
      loginuserdata = localStorage.getItem("userdata") || "";
    }

  const handleGemstoneClick = (item) => {
    if (loginuserdata?.isGemstone === true) {
         toast.success(`You are a ${item} user!`, {
           position: "top-right",
           autoClose: 2000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "light",
         });
      // navigate("/gemstonePage"); // Replace with the actual page
    } else {
     toast.error(`You are not a ${item} user!`, {
       position: "top-right",
       autoClose: 2000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       progress: undefined,
       theme: "light",
     });
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  async function fetchproductData() {
    const response = await NewRequest.get("/product/getcategoryproduct");
    const mobilesCategory = response?.data

    return mobilesCategory;

  }

  // Use the data in your component
  const { data: productsdata } = useQuery("productgetcategoryss", fetchproductData);

  const viewmore = (product) => {

    // const selectedCategory = productsdata.find((item) => item.category.name);
    const selectedCategoryProducts = productsdata.find(
      (item) => item.category.name === product.name
    );

    const subResponseString = JSON.stringify(selectedCategoryProducts);
    sessionStorage.setItem("productmore", subResponseString);
    navigate(`/moreproduct/${selectedCategoryProducts?.category?.name}`);
  };

  return (
    <header className="header">
      <div className="container menu-container">
        <div className="row v-center">
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
                <li className="menu-item-has-children">
                  <div
                    onClick={() => handleGemstoneClick("Gemstone")}
                    style={{ textDecoration: "none" }}
                    className="text-lg font-bold cursor-pointer"
                  >
                    <p>Gemstone</p>
                  </div>
                </li>
                <li className="menu-item-has-children">
                  <div
                    onClick={() => handleGemstoneClick("Handmade")}
                    style={{ textDecoration: "none" }}
                    className="text-lg font-bold cursor-pointer"
                  >
                    <p>Handmade </p>
                  </div>
                </li>
                <li className="menu-item-has-children">
                  <div
                    onClick={() => handleGemstoneClick("Carpets Rawala")}
                    style={{ textDecoration: "none" }}
                    className="text-lg font-bold cursor-pointer"
                  >
                    <p>Carpets Rawala</p>
                  </div>
                </li>
                <li className="menu-item-has-children">
                  <div
                    onClick={() => navigate("/contactus")}
                    style={{ textDecoration: "none" }}
                    className="text-lg font-bold cursor-pointer"
                  >
                    <p>Contact Us</p>
                  </div>
                </li>
                <li className="menu-item-has-children">
                  <div
                    onClick={() => navigate("/Aboutus")}
                    style={{ textDecoration: "none" }}
                    className="text-lg font-bold cursor-pointer"
                  >
                    <p>About</p>
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
