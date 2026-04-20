import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useQuery } from "react-query";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import NewRequest from "../../../../utils/NewRequest";
import imageLiveUrl from "../../../../utils/urlConverter/imageLiveUrl";
import { getMainSlideCopy } from "./heroContent";
import "./Hadersilder.css";

function pickRandomItems(list, count) {
  if (!Array.isArray(list) || list.length === 0 || count <= 0) return [];
  const shuffled = [...list];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

function productStatusIsActive(product) {
  const status = product?.status;
  if (typeof status === "number") return status === 1;
  if (typeof status === "string") return status.toLowerCase() === "active";
  return true;
}

function stripHtmlTags(text) {
  if (typeof text !== "string") return "";
  return text.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function cleanDescription(text) {
  const plain = stripHtmlTags(text);
  return plain
    .replace(/^\*?\s*product\s*name\s*\*?\s*:\s*/i, "")
    .replace(/^\s*product\s*name\s*:\s*/i, "")
    .trim();
}

const Hadersilder = () => {
  const navigate = useNavigate();
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

  const { data: sideProductsRaw = [] } = useQuery(
    "heroRandomSideProducts",
    async () => {
      const response = await NewRequest.get("/product/getcategoryproduct");
      const grouped = Array.isArray(response?.data) ? response.data : [];

      const flattened = grouped.flatMap((group) => {
        const categoryName = group?.category?.name || "";
        const products = Array.isArray(group?.products) ? group.products : [];

        return products
          .filter((product) => productStatusIsActive(product))
          .map((product) => ({
            ...product,
            __categoryName: categoryName,
          }));
      });

      return flattened.filter((product) => Array.isArray(product?.images) && product.images[0]);
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

  const mainSlides = slidersData;

  const sideProducts = useMemo(
    () => pickRandomItems(sideProductsRaw, 2),
    [sideProductsRaw]
  );

  const showSideColumn = sideProducts.length > 0;

  const sidePromoItems = useMemo(() => {
    return sideProducts.map((product) => ({
      type: "product",
      id: product?._id,
      image: product?.images?.[0],
      category: product?.__categoryName || "Featured",
      title: product?.name || "Featured Product",
      description: cleanDescription(
        product?.description ||
          product?.shortDescription ||
          "Explore this product and discover more details."
      ),
      product,
    }));
  }, [sideProducts]);

  const onSidePromoClick = (promo) => {
    if (promo?.type === "product" && promo?.product?._id) {
      localStorage.setItem("singleproduct", JSON.stringify(promo.product));
      navigate(`/Singleitem/${promo.product._id}`);
      return;
    }
    openLink(promo?.slider?.url);
  };

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
          {sidePromoItems.map((item) => {
            return (
              <button
                key={item.id}
                type="button"
                className="hero-motta-side-card text-left"
                onClick={() => onSidePromoClick(item)}
              >
                <div className="hero-motta-side-card__text">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">
                    {item.category}
                  </span>
                  <span className="mt-1 block text-lg font-bold leading-snug text-gray-900">
                    {item.title}
                  </span>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-600">
                    {item.description}
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
