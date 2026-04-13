import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useQuery } from "react-query";
import { CircularProgress } from "@mui/material";
import NewRequest from "../../../../utils/NewRequest";
import imageLiveUrl from "../../../../utils/urlConverter/imageLiveUrl";

const Hadersilder = () => {
  const { isLoading, error, data: slidersData = [] } = useQuery(
    "fetchAllSliders",
    async () => {
      const response = await NewRequest.get("/slider");
      return response?.data.filter((item) => item.status === 1) || [];
    },
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  );

  const nextpage = (url) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  const sideA = slidersData[1];
  const sideB = slidersData[2];

  return (
    <section className="mb-6 rounded-xl bg-[#eceff1] p-2 sm:p-3 lg:mb-8">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-4 lg:items-stretch">
        <div className="relative min-h-[200px] overflow-hidden rounded-lg bg-white shadow-sm lg:col-span-2 lg:min-h-[280px]">
          {isLoading ? (
            <div className="flex h-[200px] items-center justify-center lg:h-[320px]">
              <CircularProgress sx={{ color: "#004747" }} />
            </div>
          ) : error ? (
            <div className="flex h-[200px] items-center justify-center text-red-500 lg:h-[320px]">
              Error loading sliders
            </div>
          ) : slidersData.length === 0 ? (
            <div className="flex h-[200px] items-center justify-center text-gray-500 lg:h-[320px]">
              No banners yet
            </div>
          ) : (
            <>
              <Swiper
                spaceBetween={0}
                loop={slidersData.length > 1}
                autoplay={{
                  delay: 4500,
                  disableOnInteraction: false,
                }}
                navigation={{
                  nextEl: "#hero-next",
                  prevEl: "#hero-prev",
                }}
                pagination={{ clickable: true }}
                modules={[Autoplay, Pagination, Navigation]}
                className="hero-swiper h-full"
              >
                {slidersData.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative h-[200px] w-full lg:h-[320px]">
                      <img
                        src={imageLiveUrl(item?.image)}
                        className="h-full w-full cursor-pointer object-cover"
                        alt=""
                        onClick={() => nextpage(item?.url)}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <button
                type="button"
                id="hero-prev"
                className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#004747] shadow-md hover:bg-white"
                aria-label="Previous slide"
              >
                ‹
              </button>
              <button
                type="button"
                id="hero-next"
                className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#004747] shadow-md hover:bg-white"
                aria-label="Next slide"
              >
                ›
              </button>
            </>
          )}
        </div>

        <div className="flex flex-col gap-3 lg:min-h-[280px]">
          {sideA ? (
            <button
              type="button"
              className="relative flex-1 overflow-hidden rounded-lg bg-white shadow-sm"
              onClick={() => nextpage(sideA.url)}
            >
              <img
                src={imageLiveUrl(sideA.image)}
                alt=""
                className="h-full max-h-[140px] w-full object-cover lg:max-h-none lg:min-h-[136px]"
              />
            </button>
          ) : (
            !isLoading &&
            slidersData.length > 0 && (
              <div className="hidden flex-1 rounded-lg bg-white/60 lg:block" />
            )
          )}
          {sideB ? (
            <button
              type="button"
              className="relative flex-1 overflow-hidden rounded-lg bg-white shadow-sm"
              onClick={() => nextpage(sideB.url)}
            >
              <img
                src={imageLiveUrl(sideB.image)}
                alt=""
                className="h-full max-h-[140px] w-full object-cover lg:max-h-none lg:min-h-[136px]"
              />
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Hadersilder;
