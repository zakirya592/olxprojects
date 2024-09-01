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
        console.log("Menu", response.data);
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
        console.log(userdata, "productId");
        
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

const viewmorefooter = (product) => {
  console.log(product.productId.name);
  NewRequest.post("/product/searchProduct", {
    query: product.productId.name || "",
  })
    .then((response) => {
      // Handle the response here
      console.log("Search Results:", response.data);
      navigate("/search-results", { state: { searchResults: response.data } });
      // You can also navigate to another page or update the state with the response data
    })
    .catch((error) => {
      console.error("Error searching product:", error);
    });
};



  return (
    <div>
      <div className="py-4 gap-2 sm:px-16 px-8 3xl::h-[300px] 2xl:h-[300px] xl:h-[300px] lg:h-[300px] h-auto w-full bg-[#111111] text-[#F0FFFF] relative">
        <div className="w-full grid 2xl:grid-cols-3 lg:grid-cols-3 grid-cols-1">
          <div className={`h-auto w-full flex flex-col gap-8 relative `}>
            <h2 className="text-xl uppercase font-semibold text-start relativ e">
              POPULAR CATEGORIES
            </h2>
            <div className={`text-white flex flex-col gap-1 `}>
              {data?.map((section, index) => (
                <p
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
                    key={item._id} // Assuming each item has a unique _id
                    className="text-white duration-300 hover:text-white cursor-pointer"
                    onClick={() => viewmorefooter(item)}
                  >
                    {item?.productId?.name || " "}
                  </p>
                ))}
            </div>
          </div>

          {/* <div className={`h-auto w-full flex flex-col gap-8 relative `}>
            <h2 className="text-xl uppercase font-semibold text-start relative">
              ABOUT US
            </h2>
            <div className={`text-white flex flex-col gap-1 `}>
              <a
                // href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white duration-300 hover:text-white cursor-pointer"
              >
                {" "}
                About Dubizzle Group
              </a>
              <a
                // href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white duration-300 hover:text-white cursor-pointer"
              >
                OLX Blog
              </a>
              <a
                // href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white duration-300 hover:text-white cursor-pointer"
              >
                {" "}
                Contact Us
              </a>
              <a
                // href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white duration-300 hover:text-white cursor-pointer"
              >
                {" "}
                OLX for Businesses
              </a>
            </div>
          </div> */}

          <div className={`h-auto w-full flex flex-col gap-8 relative `}>
            <h2 className="text-xl uppercase font-semibold text-start relative">
              FOLLOW US
            </h2>
            <div className={`text-[#F0FFFF] flex flex-col gap-1 `}>
              <div className="flex flex-row">
                <TiSocialTwitterCircular
                  size={40}
                  style={{ color: "#F0FFFF" }}
                />
                <CiFacebook
                  size={35}
                  style={{ color: "#F0FFFF", marginLeft: "10px" }}
                />
                <FaRegCirclePlay
                  size={34}
                  style={{ color: "#F0FFFF", marginLeft: "12px" }}
                />
                <FiInstagram
                  size={32}
                  style={{ color: "#F0FFFF", marginLeft: "12px" }}
                />
              </div>
              <div className="flex flex-row w-full justify-between mt-4">
                <img
                  src={Googleplay}
                  alt="Google Play"
                  className="w-1/3 h-30 object-contain mx-0 lg:mx-2 sm:mx-0"
                />
                <img
                  src={appstore}
                  alt="App Store"
                  className="w-1/3 h-30 object-contain  mx-0 lg:mx-2 sm:mx-0"
                />
                <img
                  src={Appgallery}
                  alt="App Gallery"
                  className="w-1/3 h-30 object-contain  mx-0 lg:mx-2 sm:mx-0"
                />
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
