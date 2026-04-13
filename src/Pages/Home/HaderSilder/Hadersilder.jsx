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
import { getMainSlideCopy, getSidePromoCopy } from "./heroContent";
import "./Hadersilder.css";

/** Last 2 sliders = side promos; remaining = main carousel (avoids duplicate images). */
function partitionSliders(list) {
  const n = list.length;
  if (n === 0) return { main: [], side: [] };
  if (n === 1) return { main: list, side: [] };
  if (n === 2) return { main: [list[0]], side: [list[1]] };
  return {
    main: list.slice(0, n - 2),
    side: list.slice(n - 2),
  };
}

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

  const openLink = (url) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  const { main: mainSlides, side: sideSlides } = partitionSliders(slidersData);
  const showSideColumn = sideSlides.length > 0;

  return (
    <section className="hero-motta-wrap">
      <div
        className={`grid grid-cols-1 gap-4 lg:items-stretch lg:gap-5 ${
          showSideColumn ? "lg:grid-cols-12" : "lg:grid-cols-1"
        }`}
      >
        {/* Main hero — ~66% when side promos exist */}
        <div
          className={`relative min-h-[280px] ${
            showSideColumn ? "lg:col-span-8" : "lg:col-span-1"
          }`}
        >
          {isLoading ? (
            <div className="flex h-[300px] items-center justify-center rounded-xl bg-[#f5f6f7] lg:h-[380px]">
              <CircularProgress sx={{ color: "#004747" }} />
            </div>
          ) : error ? (
            <div className="flex h-[300px] items-center justify-center rounded-xl bg-[#f5f6f7] text-red-500 lg:h-[380px]">
              Error loading sliders
            </div>
          ) : slidersData.length === 0 ? (
            <div className="flex h-[300px] flex-col items-center justify-center rounded-xl bg-[#f5f6f7] px-6 text-center text-gray-500 lg:h-[380px]">
              <p>No banners yet</p>
              <p className="mt-2 text-sm">Add sliders in admin to match the Motta hero layout.</p>
            </div>
          ) : (
            <>
              <Swiper
                spaceBetween={0}
                loop={mainSlides.length > 1}
                autoplay={{
                  delay: 5500,
                  disableOnInteraction: false,
                }}
                navigation={{
                  nextEl: "#hero-motta-next",
                  prevEl: "#hero-motta-prev",
                }}
                pagination={{ clickable: true }}
                modules={[Autoplay, Pagination, Navigation]}
                className="hero-motta-swiper h-full min-h-[300px] lg:min-h-[380px]"
              >
                {mainSlides.map((item, index) => {
                  const copy = getMainSlideCopy(item, index);
                  return (
                    <SwiperSlide key={item._id || index}>
                      <div className="flex min-h-[300px] flex-col overflow-hidden rounded-xl bg-[#f5f6f7] lg:min-h-[380px] lg:flex-row lg:items-stretch">
                        <div className="order-2 flex flex-1 flex-col justify-center px-6 py-8 lg:order-1 lg:max-w-[52%] lg:px-10 lg:py-12">
                          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">
                            {copy.label}
                          </span>
                          <h2 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-gray-900 lg:text-[2.25rem] lg:leading-none">
                            {copy.title}
                          </h2>
                          <p className="mt-4 max-w-lg text-sm leading-relaxed text-gray-600 lg:text-[0.95rem]">
                            {copy.description}
                          </p>
                          <button
                            type="button"
                            className="mt-8 inline-flex w-fit rounded-full bg-[#004747] px-8 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#003838]"
                            onClick={() => openLink(item?.url)}
                          >
                            Shop Now
                          </button>
                        </div>
                        <div className="order-1 flex flex-1 items-center justify-center bg-[#eceff1] px-4 pt-8 lg:order-2 lg:pt-0 lg:pr-6">
                          <button
                            type="button"
                            className="relative flex h-48 w-full max-w-md items-center justify-center lg:h-72"
                            onClick={() => openLink(item?.url)}
                            aria-label="Open promotion"
                          >
                            <img
                              src={imageLiveUrl(item?.image)}
                              alt=""
                              className="max-h-full w-auto max-w-full object-contain object-center"
                            />
                          </button>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              <button
                type="button"
                id="hero-motta-prev"
                className="hero-motta-arrow hero-motta-arrow--prev"
                aria-label="Previous slide"
              >
                ‹
              </button>
              <button
                type="button"
                id="hero-motta-next"
                className="hero-motta-arrow hero-motta-arrow--next"
                aria-label="Next slide"
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Side promos — ~33% */}
        {showSideColumn && (
        <div className="flex flex-col gap-4 lg:col-span-4 lg:min-h-[380px]">
          {sideSlides.map((item, idx) => {
            const copy = getSidePromoCopy(item, idx);
            return (
              <button
                key={item._id || idx}
                type="button"
                className="hero-motta-side-card text-left"
                onClick={() => openLink(item.url)}
              >
                <div className="hero-motta-side-card__text">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">
                    {copy.badge}
                  </span>
                  <span className="mt-1 block text-lg font-bold leading-snug text-gray-900">
                    {copy.title}
                  </span>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-600">
                    {copy.description}
                  </p>
                  <span className="hero-motta-shop-link" role="presentation">
                    Shop Now
                  </span>
                </div>
                <div className="hero-motta-side-card__img">
                  <img src={imageLiveUrl(item.image)} alt="" />
                </div>
              </button>
            );
          })}
        </div>
        )}
      </div>
    </section>
  );
};

export default Hadersilder;
