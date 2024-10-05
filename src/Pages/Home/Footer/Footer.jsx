import React, { useEffect, useState } from "react";
import { TiSocialTwitterCircular } from "react-icons/ti";
import { CiFacebook } from "react-icons/ci";
import { FaRegCirclePlay } from "react-icons/fa6";
import { FiInstagram } from "react-icons/fi";
import Appgallery from "../../../assets/Images/Appgallery.svg"
import appstore from "../../../assets/Images/appstore.svg"
import Googleplay from "../../../assets/Images/Googleplay.svg";
import { Link, useNavigate } from "react-router-dom";
import NewRequest from "../../../../utils/NewRequest";
import { useQuery } from "react-query";

const Footer = () => {


  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const { t, i18n } = useTranslation();
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const { isLoading, data, error } = useQuery(
    "fetchAllMegaMenusfooter",
    async () => {
      try {
        const response = await NewRequest.get("/category");
        return response?.data || [];
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  );

  async function fetchproductData() {
    const response = await NewRequest.get("/product/getcategoryproduct");
    const mobilesCategory = response?.data;

    return mobilesCategory;
  }

  // Use the data in your component
  const { data: productsdata } = useQuery(
    "productgetcategorysfooter",
    fetchproductData
  );

  const [getTrendingProducts, setgetTrendingProducts] = useState('')
  useEffect(() => {
    NewRequest.get(`/product/getTrendingProducts`)
      .then((response) => {
        const userdata = response.data;
        setgetTrendingProducts(userdata);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const viewmore = (product) => {
    // const selectedCategory = productsdata.find((item) => item.category.name);
    const selectedCategoryProducts = productsdata.find(
      (item) => item.category.name === product.name
    );

    const subResponseString = JSON.stringify(selectedCategoryProducts);
    sessionStorage.setItem("productmore", subResponseString);
    navigate(`/moreproduct/${selectedCategoryProducts?.category?.name}`);
  };

const viewmorefooter = (product) => {
  NewRequest.post("/product/searchProduct", {
    query: product.productId.name || "",
  })
    .then((response) => {
      navigate("/search-results", { state: { searchResults: response.data } });
    })
    .catch((error) => {
      console.error("Error searching product:", error);
    });
};



  return (
    <div>
      <div className="py-4 gap-2 sm:px-16 px-8 h-auto w-full bg-[#4C005A] text-[#F0FFFF] relative">
        <div className="w-full grid 2xl:grid-cols-3 lg:grid-cols-3 grid-cols-1">
          <div className={`h-auto w-full flex flex-col gap-8 relative `}>
            <h2 className="text-xl uppercase font-semibold text-start relativ e">
              POPULAR CATEGORIES
            </h2>
            <div className={`text-white flex flex-col gap-1 `}>
              {data?.map((section, index) => (
                <p
                  key={index}
                  onClick={() => viewmore(section)}
                  style={{ textDecoration: "none" }}
                  className="text-white duration-300 hover:text-white cursor-pointer"
                >
                  <p>{section?.name}</p>
                </p>
              ))}
            </div>
          </div>

          <div className={`h-auto w-full flex flex-col gap-8 relative `}>
            <h2 className="text-xl uppercase font-semibold text-start relative">
              TRENDING SEARCHES
            </h2>
            <div className={`text-white flex flex-col gap-1`}>
              {getTrendingProducts &&
                getTrendingProducts.map((item) => (
                  <p
                    key={item._id}
                    className="text-white duration-300 hover:text-white cursor-pointer"
                    onClick={() => viewmorefooter(item)}
                  >
                    {item?.productId?.name || " "}
                  </p>
                ))}
            </div>
          </div>

          <div className={`h-auto w-full flex flex-col gap-8 relative `}>
            <h2 className="text-xl uppercase font-semibold text-start relative">
              FOLLOW US
            </h2>
            <div className={`text-[#F0FFFF] flex flex-col gap-1 `}>
              <div className="flex flex-row">
                <Link
                  to="https://www.facebook.com/profile.php?id=61565875032026"
                  className="cursor-pointer "
                  target="_black"
                >
                  <CiFacebook
                    size={35}
                    style={{ color: "#F0FFFF", marginLeft: "10px" }}
                  />
                </Link>

                <Link
                  to="https://www.instagram.com/pakardicom"
                  className="cursor-pointer "
                  target="_black"
                >
                  <FiInstagram
                    size={32}
                    style={{ color: "#F0FFFF", marginLeft: "12px" }}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`bg-[#2D6A3C] text-white`}>
        <div className="p-4">
          <Link
            to={`https://g.co/kgs/MQLeL3q`}
            target="_blank"
            className="text-end font-normal sm:font-semibold"
          >
            Power by Social IT solutions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
