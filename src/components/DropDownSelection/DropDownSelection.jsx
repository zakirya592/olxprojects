import React, { useEffect, useState } from "react";
import "./DropDownSelection.css";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import NewRequest from "../../../utils/NewRequest";
import { toast } from "react-toastify";

const DropDownSelection = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const storedUserResponseString = localStorage.getItem("userResponse");
  const storedUserResponse = JSON.parse(storedUserResponseString);
  let loginuserdata = storedUserResponse?.data.user || "";

  if (!loginuserdata) {
    loginuserdata = localStorage.getItem("userdata") || "";
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  async function fetchproductData() {
    const response = await NewRequest.get("/product/getcategoryproduct");
    return response?.data;
  }

  const { data: productsdata } = useQuery(
    "productgetcategoryss",
    fetchproductData
  );

  const handleGemstoneClick = (item) => {
    if (loginuserdata?.isGemstone === true) {
      const selectedCategoryProducts = productsdata.find(
        (product) => product.category.name === item // Use the item directly here
      );

      if (selectedCategoryProducts) {
        const subResponseString = JSON.stringify(selectedCategoryProducts);
        sessionStorage.setItem("productmore", subResponseString);
        navigate(`/moreproduct/${selectedCategoryProducts.category.name}`);
      }
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

  return (
    <header className="header text-maincolor ">
      <div className="menu-container">
        <div className="row v-center">
          <div className="header-item item-center">
            <div className="menu-overlay" onClick={toggleMobileMenu}></div>
            <nav
              className={`menu ${
                isMobileMenuOpen ? "active" : ""
              } lg:rounded-full sm:rounded-none rounded-none py-1 `}
              style={{ backgroundColor: "white" }}
            >
              <div className="mobile-menu-head">
                <div className="go-back">
                  <i
                    className="fa fa-angle-left text-white"
                    onClick={toggleMobileMenu}
                  ></i>
                </div>
                <div className="current-menu-title"></div>
                <div
                  className="mobile-menu-close text-white"
                  onClick={toggleMobileMenu}
                >
                  &times;
                </div>
              </div>
              <ul
                className={`menu-main flex-row ml-10 lg:ml-0 sm:ml:10 lg:rounded-full sm:rounded-none rounded-none 2xl:flex xl:flex lg:flex 3xl:flex 3xl:justify-start 3xl:items-start 2xl:justify-start xl:justify-start lg:justify-start 2xl:items-start xl:items-start lg:items-start sm:gap-5`}
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
                    onClick={() => handleGemstoneClick("wholesale B2B")}
                    style={{ textDecoration: "none" }}
                    className="text-lg font-bold cursor-pointer"
                  >
                    <p>wholesale B2B</p>
                  </div>
                </li>
                {/* <li className="menu-item-has-children">
                  <div
                    onClick={() => handleGemstoneClick("Carpets Rawala")}
                    style={{ textDecoration: "none" }}
                    className="text-lg font-bold cursor-pointer"
                  >
                    <p>Carpets Rawala</p>
                  </div>
                </li> */}
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
