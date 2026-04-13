import React, { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import NewRequest from "../../../../utils/NewRequest";
import ProductCarouselCard from "../components/ProductCarouselCard";
import CarouselThinChevron from "../components/CarouselThinChevron";
import "./YouMightAlsoLike.css";

async function fetchHomeProducts(limit = 24) {
  const response = await NewRequest.get(
    `/product/homeproduct?page=1&limit=${limit}`
  );
  const responseData = response.data;
  const categories = Array.isArray(responseData.data)
    ? responseData.data
    : Array.isArray(responseData)
      ? responseData
      : [];
  return { categories };
}

function flattenUniqueProducts(categories, max = 12) {
  const seen = new Set();
  const out = [];
  for (const block of categories || []) {
    const products = block?.products || [];
    for (const p of products) {
      if (!p?._id || (p.status && String(p.status).toLowerCase() !== "active")) {
        continue;
      }
      if (seen.has(p._id)) continue;
      seen.add(p._id);
      out.push(p);
      if (out.length >= max) return out;
    }
  }
  return out;
}

async function fetchReviewsMeta(productIds) {
  const meta = {};
  await Promise.all(
    productIds.map(async (id) => {
      try {
        const { data } = await NewRequest.get(`/comment/replay/${id}`);
        const comments = data?.comments || [];
        const total = comments.reduce((acc, c) => acc + (c.rating || 0), 0);
        meta[id] = {
          count: comments.length,
          average: comments.length ? total / comments.length : 0,
        };
      } catch {
        meta[id] = { count: 0, average: 0 };
      }
    })
  );
  return meta;
}

function YouMightAlsoLike() {
  const navigate = useNavigate();
  const [reviewsMeta, setReviewsMeta] = useState({});

  const { isLoading, error, data } = useQuery(
    ["homeproduct-ymal", 24],
    () => fetchHomeProducts(24),
    { staleTime: 60 * 1000 }
  );

  const products = useMemo(
    () => flattenUniqueProducts(data?.categories, 12),
    [data?.categories]
  );

  useEffect(() => {
    if (!products.length) return;
    let cancelled = false;
    (async () => {
      const ids = products.map((p) => p._id);
      const meta = await fetchReviewsMeta(ids);
      if (!cancelled) setReviewsMeta(meta);
    })();
    return () => {
      cancelled = true;
    };
  }, [products]);

  const openProduct = (product) => {
    localStorage.setItem("singleproduct", JSON.stringify(product));
    navigate(`/Singleitem/${product._id}`);
  };

  const seeAll = () => {
    const el = document.getElementById("more-products");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (isLoading) {
    return (
      <section className="ymal" aria-label="You might also like">
        <div className="flex min-h-[200px] items-center justify-center">
          <CircularProgress sx={{ color: "#004747" }} size={36} />
        </div>
      </section>
    );
  }

  if (error || !products.length) {
    return null;
  }

  return (
    <section className="ymal" aria-labelledby="ymal-heading">
      <div className="ymal__header">
        <h2 id="ymal-heading" className="ymal__title">
          You Might Also Like
        </h2>
        <button type="button" className="ymal__see-all" onClick={seeAll}>
          See All Products
        </button>
      </div>

      <div className="ymal__swiper-wrap">
        <button
          type="button"
          className="ymal__nav ymal__nav--prev ymal-swiper-prev"
          aria-label="Previous products"
        >
          <CarouselThinChevron direction="left" className="ymal__chevron" />
        </button>
        <button
          type="button"
          className="ymal__nav ymal__nav--next ymal-swiper-next"
          aria-label="Next products"
        >
          <CarouselThinChevron direction="right" className="ymal__chevron" />
        </button>

        <Swiper
          modules={[Navigation]}
          watchOverflow
          spaceBetween={20}
          slidesPerView={2}
          navigation={{
            prevEl: ".ymal-swiper-prev",
            nextEl: ".ymal-swiper-next",
          }}
          breakpoints={{
            480: { slidesPerView: 2, spaceBetween: 20 },
            640: { slidesPerView: 3, spaceBetween: 22 },
            1024: { slidesPerView: 4, spaceBetween: 24 },
            1280: { slidesPerView: 5, spaceBetween: 28 },
          }}
          className="ymal-swiper !pb-1"
        >
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <ProductCarouselCard
                product={product}
                ratingAverage={reviewsMeta[product._id]?.average ?? 0}
                reviewCount={reviewsMeta[product._id]?.count ?? 0}
                onClick={() => openProduct(product)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default YouMightAlsoLike;
