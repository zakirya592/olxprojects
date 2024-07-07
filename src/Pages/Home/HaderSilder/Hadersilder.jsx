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
            <div className="relative  w-100 ">
              <img
                // src={imageLiveUrl(item?.image)}
                src={silder1}
                className="w-full h-full object-contain"
                alt="Slide 1"
              />
              {/* <h2 className="sm:text-5xl text-lg font-sans font-bold text-center text-secondary">
                title
              </h2> */}
              {/* <div
                className={`absolute sm:top-1/4 top-2.5 sm:left-10 left-3 text-white max-w-6xl`}
              >
                {/* <h2 className="sm:text-5xl text-3xl font-sans font-bold mb-4">
                  title
                </h2>
                <p className="sm:text-2xl text-xl font-thin">
                  {/* {item?.description} */}
              {/* description_ar */}
              {/* </p> */}

              {/* <Link
                    // to={`/${item?.link}`}
                    >
                      <Button
                        variant="contained"
                        // type="submit"
                        style={{
                          backgroundColor: "#1F0567",
                          color: "#ffffff",
                          marginTop: "2rem",
                        }}
                        className="bg-[#B6BAD6]"
                        endIcon={<ArrowRightAltIcon />}
                      >
                        {/* {item?.caption} */}
              {/* caption */}
              {/* </Button>
                    </Link> */}
              {/* </div> */}
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative  w-100">
              <img
                // src={imageLiveUrl(item?.image)}
                src={silder1}
                className="w-full h-full object-contain"
                alt="Slide 1"
              />
              {/* <h2 className="sm:text-5xl text-lg font-sans font-bold text-center text-secondary">
                title
              </h2> */}
              {/* <div
                className={`absolute sm:top-1/4 top-2.5 sm:left-10 left-3 text-white max-w-6xl`}
              >
                {/* <h2 className="sm:text-5xl text-3xl font-sans font-bold mb-4">
                  title
                </h2>
                <p className="sm:text-2xl text-xl font-thin">
                  {/* {item?.description} */}
              {/* description_ar */}
              {/* </p> */}

              {/* <Link
                    // to={`/${item?.link}`}
                    >
                      <Button
                        variant="contained"
                        // type="submit"
                        style={{
                          backgroundColor: "#1F0567",
                          color: "#ffffff",
                          marginTop: "2rem",
                        }}
                        className="bg-[#B6BAD6]"
                        endIcon={<ArrowRightAltIcon />}
                      >
                        {/* {item?.caption} */}
              {/* caption */}
              {/* </Button>
                    </Link> */}
              {/* </div> */}
            </div>
          </SwiperSlide>
          {/* )) */}
          {/* //   )} */}
        </Swiper>
        {/* <div
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
        </div> */}
      </div>
    </div>
  );
};

export default Hadersilder;
