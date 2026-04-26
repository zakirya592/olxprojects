import React, { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { toast } from "react-toastify";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Keyboard } from "swiper/modules";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import { MdOutlineNavigateNext } from "react-icons/md";
import NewRequest from "../../../../utils/NewRequest";
import ProductCarouselCard from "../components/ProductCarouselCard";
import CarouselThinChevron from "../components/CarouselThinChevron";
import "./HomeCategoryCarousel.css";

// Function to fetch products with dynamic limit
async function fetchProductData(limit = 2) {
  const response = await NewRequest.get(`/product/homeproduct?page=1&limit=${limit}`);
  const responseData = response.data;
  
  // Extract categories from data array if present, otherwise use responseData as the categories
  const categories = Array.isArray(responseData.data) ? responseData.data : 
                    (Array.isArray(responseData) ? responseData : []);
  
  // Extract pagination information
  const pagination = responseData.pagination || null;
  
  const activeProducts = categories.flatMap((category) =>
    category.products.filter(
      (product) => product.status.toLowerCase() === "active"
    )
  );
  
  return { categories, products: activeProducts, pagination };
}

// Function to fetch ratings + review counts
async function fetchProductRatings(products) {
  const ratings = {};
  try {
    const ratingPromises = products.map(async (product) => {
      const { data } = await NewRequest.get(`/comment/replay/${product._id}`);
      const productRatings = data?.comments || [];
      const totalRatings = productRatings.reduce(
        (acc, comment) => acc + (comment.rating || 0),
        0
      );
      ratings[product._id] = {
        average: productRatings.length
          ? totalRatings / productRatings.length
          : 0,
        count: productRatings.length,
      };
    });

    await Promise.all(ratingPromises);
    return ratings;
  } catch (error) {
    console.error("Error fetching product ratings:", error);
    return {};
  }
}

const Hadersilder = () => {
  const navigate = useNavigate();
  const [productRatings, setProductRatings] = useState({});
  const [limit, setLimit] = useState(8);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentData, setCurrentData] = useState(null);

  const {
    isLoading: queryLoading,
    error,
    data: productsData,
    refetch,
  } = useQuery(
    ["productgetcategoryproduct", limit],
    () => fetchProductData(limit),
    {
      staleTime: 30000,
      refetchOnWindowFocus: false, // Prevent automatic refetch on window focus
      keepPreviousData: true, // Keep showing previous data while loading new data
      onSuccess: (data) => {
        // Update current data when query succeeds
        setCurrentData(data);
      },
    }
  );

  const { data: categoryProductGroups } = useQuery(
    "getcategoryproduct-sellers",
    async () => {
      const response = await NewRequest.get("/product/getcategoryproduct");
      return response?.data || [];
    },
    { staleTime: 60 * 1000 }
  );

  const sellerByProductId = useMemo(() => {
    if (!Array.isArray(categoryProductGroups)) return {};
    const map = {};
    for (const row of categoryProductGroups) {
      const prods = row?.products;
      if (!Array.isArray(prods)) continue;
      for (const p of prods) {
        if (p?._id) map[p._id] = p;
      }
    }
    return map;
  }, [categoryProductGroups]);

  const mergeSellerFromCategoryPayload = (product) => {
    const paginatedUser = product.User ?? product.user;
    const hasPopulatedUser =
      paginatedUser &&
      typeof paginatedUser === "object" &&
      (paginatedUser.username || paginatedUser.name);
    if (hasPopulatedUser) return product;
    const fromCat = sellerByProductId[product._id];
    const mergedUser = fromCat?.User ?? fromCat?.user;
    if (mergedUser && typeof mergedUser === "object") {
      return { ...product, User: mergedUser };
    }
    return product;
  };

  // Handle "Load More" click
  const handleLoadMore = async () => {
    try {
      setIsLoadingMore(true);
      const newLimit = limit + 8;
      setLimit(newLimit);
      await refetch();
    } catch (error) {
      toast.error("Failed to load more products. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Refetch ratings when products data is available
  React.useEffect(() => {
    if (productsData) {
      const fetchRatings = async () => {
        const ratings = await fetchProductRatings(productsData.products);
        setProductRatings(ratings);
      };
      fetchRatings();
    }
  }, [productsData]);

  const viewMore = (category) => {
    sessionStorage.setItem("productmore", JSON.stringify(category));
    navigate(`/moreproduct/${category.category.name}`);
  };

  const viewSingleProduct = (product) => {
    localStorage.setItem("singleproduct", JSON.stringify(product));
    navigate(`/Singleitem/${product._id}`);
  };

  // Use currentData instead of productsData for rendering to prevent flickering
  const dataToRender = currentData || productsData;

  if (queryLoading && !dataToRender) return (
    <div className="flex justify-center items-center min-h-[200px]">
      <CircularProgress sx={{ color: "#4a0157" }} />
    </div>
  );
  
  if (error) return (
    <div className="text-center text-red-600 py-4">
      Failed to load products. Please try again later.
    </div>
  );

  return (
    <div
      id="more-products"
      className="relative mt-6 mb-16 h-auto w-full border-b border-gray-100 bg-white"
    >
      {dataToRender?.categories?.map((category, index) => {
        const activeProducts = category.products
          .filter((product) => product.status.toLowerCase() === "active")
          .map(mergeSellerFromCategoryPayload);

        if (activeProducts.length === 0) return null;

        return (
          <div key={index} className={index === 0 ? "mt-2" : "mt-10"}>
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
              <h6 className="my-0 text-2xl font-bold tracking-tight text-gray-900 sm:text-[1.6rem]">
                {category?.category?.name}
              </h6>
              <button
                type="button"
                className="border-0 bg-transparent text-sm font-medium text-gray-900 underline decoration-gray-900 underline-offset-[4px] transition hover:text-[#4a0157] hover:decoration-[#4a0157]"
                onClick={() => viewMore(category)}
              >
                View more
              </button>
            </div>

            <div className="w-full rounded-xl bg-[#fafafa] p-2 pt-3 lg:p-3">
              <div className="home-cat-swiper-wrap">
                <button
                  type="button"
                  className={`home-cat-nav home-cat-nav--prev swiper-home-cat-prev-${index}`}
                  aria-label="Previous products"
                >
                  <CarouselThinChevron
                    direction="left"
                    className="home-cat-chevron"
                  />
                </button>
                <button
                  type="button"
                  className={`home-cat-nav home-cat-nav--next swiper-home-cat-next-${index}`}
                  aria-label="Next products"
                >
                  <CarouselThinChevron
                    direction="right"
                    className="home-cat-chevron"
                  />
                </button>
                <Swiper
                  watchOverflow
                  slidesPerView={2}
                  spaceBetween={5}
                  keyboard={{ enabled: true }}
                  breakpoints={{
                    640: { slidesPerView: 2, spaceBetween: 10 },
                    768: { slidesPerView: 4, spaceBetween: 20 },
                    1024: { slidesPerView: 5, spaceBetween: 30 },
                  }}
                  navigation={{
                    prevEl: `.swiper-home-cat-prev-${index}`,
                    nextEl: `.swiper-home-cat-next-${index}`,
                  }}
                  pagination={{ clickable: true }}
                  modules={[Pagination, Navigation, Keyboard]}
                  className="home-cat-swiper py-2"
                >
                  {activeProducts.map((product) => (
                    <SwiperSlide key={product._id}>
                      <div className="rounded-lg bg-white p-2 pb-3 shadow-sm transition hover:shadow-md">
                        <ProductCarouselCard
                          product={product}
                          ratingAverage={
                            productRatings[product._id]?.average ?? 0
                          }
                          reviewCount={productRatings[product._id]?.count ?? 0}
                          onClick={() => viewSingleProduct(product)}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        );
      })}

      {/* Global Load More Button */}
      {dataToRender?.pagination && (
        <div className="flex justify-center mt-10 mb-6">
          <Button 
          
            variant="contained"
            onClick={handleLoadMore}
            disabled={isLoadingMore || queryLoading}
            sx={{ 
              bgcolor: '#4a0157',
              color: 'white',
              '&:hover': { 
                bgcolor: '#3b0146',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
              },
              padding: '12px 30px',
              fontSize: '16px',
              borderRadius: '25px',
              textTransform: 'none',
              transition: 'all 0.3s ease',
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              minWidth: '180px',
              position: 'relative',
              '&.Mui-disabled': {
                bgcolor: '#ff999999',
                color: 'white'
              }
            }}
          >
            {isLoadingMore ? (
              <div className="flex items-center justify-center">
                <CircularProgress 
                  size={20} 
                  sx={{ 
                    color: 'white',
                    marginRight: '8px'
                  }} 
                />
                <span>Loading...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full ">
                <span>Load More</span>
                <MdOutlineNavigateNext size={24} />
              </div>
            )}
          </Button>
        </div>
      )}

    </div>
  );
};

export default Hadersilder;
