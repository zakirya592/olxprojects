import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Mobliceimg from "../../../assets/Images/mobiles.png";
import vehicles from "../../../assets/Images/vehicles.png";
import PropertyforSale from "../../../assets/Images/PropertyforSale.png";
import PropertyForRent from "../../../assets/Images/property-for-rent.png";
import electronicshome from "../../../assets/Images/electronics-home-appliances.png";
import Bikes from "../../../assets/Images/bikes.png";
import BusinessIndustrialAgriculture from "../../../assets/Images/business-industrial-agriculture.png";
import Services from "../../../assets/Images/services.png";
import Jobs from "../../../assets/Images/jobs.png";
import Animals from "../../../assets/Images/animals.png";
import FurnitureHomeDecor from "../../../assets/Images/furniture-home-decor.png";
import FashionBeauty from "../../../assets/Images/fashion-beauty.png";
import BooksSportsHobbies from "../../../assets/Images/books-sports-hobbies.png";
import Kids from "../../../assets/Images/kids.png";
import { useQuery } from "react-query";
import NewRequest from "../../../../utils/NewRequest";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdOutlineNavigateNext } from "react-icons/md";
import "swiper/css";

function Categories() {
  
  const navigate = useNavigate();
  const {
    isLoading,
    error,
    data: eventsData,
  } = useQuery("category", fetchUpcomingEventsData);
const navigator =useNavigate()
  async function fetchUpcomingEventsData() {
    const response = await NewRequest.get("/category");
    return response?.data.filter((item) => item.status === 1) || [];
  }



    async function fetchproductData() {
    const response = await NewRequest.get("/product/getcategoryproduct");
    const mobilesCategory = response?.data.find(
      (item) => item.category.name);

return mobilesCategory;
    
  }

  // Use the data in your component
  const { data: productsdata } = useQuery("productgetcategoryss", fetchproductData);

  const viewmore = (product) => {
    console.log(product);
    const subResponseString = JSON.stringify(product);
    sessionStorage.setItem("productmore", subResponseString);
    navigate(`/moreproduct/${product?.category?.name}`);
  };
  

  return (
    <div>
      <div className="flex justify-between my-auto">
        <h6 className="text-headingcolor text-3xl font-bold overflow-hidden">
          All categories
        </h6>
        {/* <div
          className="text-viewmorebutton text-xl flex cursor-pointer my-auto"
          onClick={() => navigator("/Post")}
        >
          <span>View more</span> <MdOutlineNavigateNext size={30} />
        </div> */}
      </div>
      {/* Slider for Small Screens */}
      <div className="lg:hidden">
        <Swiper spaceBetween={50} slidesPerView={3}>
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            ""
          ) : (
            eventsData.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="relative w-100">
                  {item?.icon ? (
                    <img
                      src={item.icon}
                      alt="icon"
                      className="w-full p-5 mt-1"
                    />
                  ) : (
                    <div className="w-full p-5 mt-1 flex justify-center items-center">
                      <div className="w-14 h-11 border border-gray-300 rounded-full"></div>
                    </div>
                  )}
                  <div className="text-center mt-2">{item.name}</div>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>

      {/* Grid for Large Screens */}
      <div className="hidden lg:grid 2xl:grid-cols-9 xl:grid-cols-9 gap-7 lg:grid-cols-7 md:grid-cols-4 grid-cols-2 sm:px-2 px-2 mb-3">
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          ""
        ) : (
          eventsData.map((item) => (
            <div key={item.id} className="h-auto w-full py-1">
              <p
                // to={`/${item?.link}`}
                onClick={() => viewmore(productsdata)}
                className="font-semibold text-secondary text-center sm:text-lg text-base hover:text-primary mt-3"
              >
                {item?.icon ? (
                  <img src={item.icon} alt="icon" className="w-full p-5 mt-1" />
                ) : (
                  <div className="w-full p-5 mt-1 flex justify-center items-center">
                    <div className="w-28 h-28 border border-gray-300 rounded-full"></div>
                  </div>
                )}
                <div className="w-full">
                  <div className="px-3 flex flex-col gap-2">{item.name}</div>
                </div>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Categories;
