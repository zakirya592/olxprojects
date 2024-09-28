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
import NewRequest from "../../../../utils/NewRequest";
import imageLiveUrl from "../../../../utils/urlConverter/imageLiveUrl";

const Hadersilder = () => {
  const {
    isLoading,
    error,
    data: slidersData,
  } = useQuery("fetchAllSliders", fetchFeaturesData);

  async function fetchFeaturesData() {
    const response = await NewRequest.get("/slider");
    return response?.data.filter((item) => item.status === 1) || [];
    
  }

  return (
    <div className="relative h-auto w-full bg-white border-b mb-10">
      <div className="relative  h-[150px] lg:h-[250px] sm:h-[150px]  w-full ">
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
          {isLoading ? (
            <div className="flex justify-center items-center  h-[150px] lg:h-[250px] sm:h-[150px] ">
              <CircularProgress />
            </div>
          ) : error ? (
            " "
          ) : (
            slidersData.map((item) => (
              <SwiperSlide>
                <div className="relative w-full  h-[150px] lg:h-[250px] sm:h-[150px] rounded">
                  <img
                    src={imageLiveUrl(item?.image)}
                    className="w-full h-full object-cover"
                    alt="Small Screen Slide"
                  />
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
        <div
          id="swiper-button-prev"
          className="absolute bottom-0 z-20 -translate-y-1/2 transform right-20"
        >
          <IoIosArrowDropleftCircle className="cursor-pointer rounded-full text-5xl text-white opacity-80 hover:opacity-100" />
        </div>
        <div
          id="swiper-button-next"
          className="absolute bottom-0 z-20 -translate-y-1/2 transform right-6"
        >
          <IoIosArrowDroprightCircle className="cursor-pointer rounded-full text-5xl text-white opacity-80 hover:opacity-100" />
        </div>
      </div>
    </div>
  );
};

export default Hadersilder;
