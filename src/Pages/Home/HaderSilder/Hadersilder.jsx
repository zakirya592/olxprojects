// static Data Slider
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import Button from "@mui/material/Button";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import silder1 from "../../../assets/Images/Slider1.webp"

const Hadersilder = () => {
//   const {
//     isLoading,
//     error,
//     data: slidersData,
//   } = useQuery("fetchAllSliders", fetchFeaturesData);

//   async function fetchFeaturesData() {
//     // const response = await newRequest.get("/getAllsliders");
//     // return response?.data.filter((item) => item.status === 1) || [];
//   }

  return (
    <div className="relative h-auto w-full bg-white border-b mt-4 mb-20">
      <div className="relative  w-full">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: "#swiper-button-next",
            prevEl: "#swiper-button-prev",
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {/* {data.map((item) => ( */}
          {/* {isLoading ? (
            <div className="flex justify-center items-center h-[420px]">
              <CircularProgress />
            </div>
          ) : error ? (
            ""
          ) : ( */}
          {/* // slidersData.map((item) => ( */}
          <SwiperSlide>
            <div className="relative w-100">
              <img
                src="https://images.olx.com.pk/thumbnails/467455216-800x600.webp"
                className="w-full h-full object-contain block lg:hidden"
                alt="Small Screen Slide"
              />
              <img
                src={silder1}
                className="w-full h-full object-contain hidden lg:block"
                alt="Large Screen Slide"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-100">
              <img
                src="https://images.olx.com.pk/thumbnails/467455216-800x600.webp"
                className="w-full h-full object-contain block lg:hidden"
                alt="Small Screen Slide"
              />
              <img
                src={silder1}
                className="w-full h-full object-contain hidden lg:block"
                alt="Large Screen Slide"
              />
            </div>
          </SwiperSlide>
          {/* )) */}
          {/* //   )} */}
        </Swiper>
      </div>
    </div>
  );
};

export default Hadersilder;
