import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { toast } from "react-toastify";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Keyboard, Scrollbar } from "swiper/modules";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, IconButton, Rating } from "@mui/material";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrLike } from "react-icons/gr";
import { GridCloseIcon } from "@mui/x-data-grid";
import NewRequest from "../../../../utils/NewRequest";
import DescriptionWithToggle from "./DescriptionWithToggle";
import imageLiveUrl from "../../../../utils/urlConverter/imageLiveUrl";

const Hadersilder = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [productRatings, setProductRatings] = useState({});

  // Fetch product data with caching
  const {
    isLoading,
    error,
    data: productsData,
  } = useQuery("productgetcategoryproduct", fetchProductData, {
    staleTime: 5 * 60 * 1000, // Data remains fresh for 5 minutes
    cacheTime: 10 * 60 * 1000, // Data stays in cache for 10 minutes
  });

  // Fetch product data and ratings
  async function fetchProductData() {
    const response = await NewRequest.get("/product/getcategoryproduct");
    const categories = response.data || [];

    // Filter active products
    const activeProducts = categories.flatMap((category) =>
      category.products.filter(
        (product) => product.status.toLowerCase() === "active"
      )
    );

    // Fetch ratings for all active products
    await fetchProductRatings(activeProducts);

    return { categories, products: activeProducts };
  }

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
        ratings[product._id] = totalRatings / productRatings.length || 0;
      });

      await Promise.all(ratingPromises); // Fetch all ratings in parallel
      setProductRatings(ratings);
    } catch (error) {
      console.error("Error fetching product ratings:", error);
    }
  }

  // Dialog handlers
  const openImagePreview = (image) => {
    setSelectedImage(image);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  // Wishlist handler
  const addToWishlist = (product) => {
    try {
      const userResponse = JSON.parse(localStorage.getItem("userResponse"));
      const userId = userResponse?.data?.user?._id || "";

      NewRequest.post(`/wishlist/${userId}`, { productId: product._id });
      toast.success(`Product added to wishlist successfully!`, {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("Failed to add product to wishlist.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  // Navigation handlers
  const viewMore = (category) => {
    sessionStorage.setItem("productmore", JSON.stringify(category));
    navigate(`/moreproduct/${category.category.name}`);
  };

  const viewSingleProduct = (product) => {
    localStorage.setItem("singleproduct", JSON.stringify(product));
    navigate(`/Singleitem/${product._id}`);
  };

    const [isMobile, setIsMobile] = useState(false);

    // Check screen size
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 425); // Mobile screen if width is less than 768px
      };

      handleResize(); // Check on initial render
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Failed to load products. Please try again later.</p>;



  
  return (
    <div className="relative h-auto w-full bg-white border-b mt-10 mb-20">
      {productsData.categories.map((category, index) => {
        const activeProducts = category.products.filter(
          (product) => product.status.toLowerCase() === "active"
        );

        if (activeProducts.length === 0) return null;

        return (
          <div key={index} className="mt-5">
            <div className="flex justify-between">
              <h6 className="text-maincolor text-3xl font-bold my-7">
                {category?.category?.name}
              </h6>
              <div
                className="text-viewmorebutton text-xl flex cursor-pointer"
                onClick={() => viewMore(category)}
              >
                <span>View more</span>
                <MdOutlineNavigateNext size={30} />
              </div>
            </div>

            <div className="relative w-full bg-fourthcolor lg:p-3 p-1">
              <Swiper
                slidesPerView={2}
                spaceBetween={5}
                keyboard={{ enabled: true }}
                breakpoints={{
                  640: { slidesPerView: 2, spaceBetween: 10 },
                  768: { slidesPerView: 4, spaceBetween: 20 },
                  1024: { slidesPerView: 5, spaceBetween: 30 },
                }}
                scrollbar={{ draggable: true }}
                navigation
                // pagination={{ clickable: true }}
                pagination={isMobile ? false : { clickable: true }}
                modules={[Pagination, Navigation, Keyboard, Scrollbar]}
                className="mySwiper py-6"
              >
                {activeProducts.map((product, index) => (
                  <SwiperSlide key={index}>
                    <div className="h-[320px] relative bg-white border rounded-md shadow-lg hover:shadow-xl">
                      <img
                        src={imageLiveUrl(product.images[0])}
                        alt={product.name}
                        className="w-full h-44 object-cover cursor-pointer"
                        onClick={() => viewSingleProduct(product)}
                      />
                      <div className="p-3">
                        <DescriptionWithToggle description={product.name} />
                        <div className="flex justify-between items-center mt-2">
                          <Rating
                            value={productRatings[product._id] || 0}
                            precision={0.5}
                            readOnly
                          />
                          <GrLike
                            className="text-maincolor cursor-pointer"
                            onClick={() => addToWishlist(product)}
                          />
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        );
      })}

      {/* Dialog for image preview */}
      <Dialog open={isDialogOpen} onClose={closeDialog} maxWidth="md">
        <DialogContent>
          <div className="relative">
            <IconButton
              onClick={closeDialog}
              sx={{
                position: "absolute",
                right: 1,
                top: 1,
                color: "white",
              }}
            >
              <GridCloseIcon />
            </IconButton>
            <img
              src={selectedImage}
              alt="Preview"
              className="w-full h-80 object-cover"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Hadersilder;
