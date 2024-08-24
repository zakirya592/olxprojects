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
    <div className="bg-[#111111] py-10">
      {/* <div className="flex justify-between my-auto">
        <h6 className="text-headingcolor text-3xl font-bold overflow-hidden">
          All categories
        </h6>
      </div> */}
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
                  <div className="text-center mt-2 text-white">{item.name}</div>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>

      {/* Grid for Large Screens */}
      <div className="hidden lg:grid 2xl:grid-cols-4 xl:grid-cols-4 gap-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 sm:px-2 px-2 w-[90%] sm:w-full lg:w-[90%] mx-auto mb-3">
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          ""
        ) : (
          eventsData.map((item) => (
            // <div key={item.id} className="w-full mx-auto flex flex-col justify-center bg-[#303030] rounded-xl py-5">
            //   <div
            //     onClick={() => viewmore(item)}
            //     className="font-semibold text-white text-center sm:text-lg text-base hover:text-primary mt-3 cursor-pointer"
            //   >
            //     {/* <div className="flex w-full items-center"> */}
            //       {item?.icon ? (
            //         <img
            //           src={item.icon}
            //           alt="icon"
            //           className="w-14 h-14 object-contain ml-3"
            //         />
            //       ) : (
            //         <div className="w-14 h-14 flex justify-center items-center">
            //           <div className="w-10 h-10 border border-gray-300 rounded-full"></div>
            //         </div>
            //       )}
            //       <div className="w-full my-auto pl-3">
            //         {" "}
            //         {/* Add padding to the left here */}
            //         <div className="flex gap-2">{item.name}</div>
            //       {/* </div> */}
            //     </div>
            //   </div>
            // </div>
            <div key={item.id} className="w-full py-4 bg-[#303030]">
              <div
                onClick={() => viewmore(item)}
                className="font-semibold text-white sm:text-lg text-base hover:text-primary mt-3 cursor-pointer"
              >
                <div className="flex flex-col items-center w-full justify-center">
                  {item?.icon ? (
                    <img
                      src={item.icon}
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
      </div>
    </div>
  );
}

export default Categories;
