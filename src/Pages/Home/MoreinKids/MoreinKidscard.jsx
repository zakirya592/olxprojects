import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { toast } from "react-toastify";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  Pagination,
  Navigation,
  Keyboard,
  Scrollbar,
} from "swiper/modules";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, IconButton, Rating } from "@mui/material";
import { MdOutlineNavigateNext } from "react-icons/md";
import NewRequest from "../../../../utils/NewRequest";
import DescriptionWithToggle from "./DescriptionWithToggle";
import imageLiveUrl from "../../../../utils/urlConverter/imageLiveUrl";
import { GrLike } from "react-icons/gr";
import { GridCloseIcon } from "@mui/x-data-grid";

const Hadersilder = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const openImagePreview = (image) => {
    setSelectedImage(image);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const [productRatings, setProductRatings] = useState({});
  async function fetchProductRatings(products) {
    const ratings = {};

    // Loop through products and fetch ratings for each product
    for (const product of products) {
      try {
        const ratingResponse = await NewRequest.get(
          `/comment/replay/${product._id}`
        );

        const productRatings = ratingResponse?.data?.comments;
        const totalRatings = productRatings.reduce((acc, comment) => acc + (comment.rating || 0), 0);
        const averageRating = productRatings ? totalRatings / productRatings.length : 0;

        ratings[product._id] = averageRating || 0;
      } catch (error) {
        ratings[product._id] = 0;
      }
    }

    setProductRatings(ratings);
  }

  // Fetch data and filter based on status
  const {
    isLoading,
    error,
    data: productsdata,
  } = useQuery("productgetcategoryproduct", fetchproductData);

  async function fetchproductData() {
    const response = await NewRequest.get("/product/getcategoryproduct");

    // Filter products that are active across all categories
    const activeProducts = response?.data.flatMap((category) =>
      category.products.filter(
        (product) => product.status.toLowerCase() === "active"
      )
    );
    fetchProductRatings(activeProducts);

    return { categories: response.data, products: activeProducts };
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;

  const storedUserResponseString = localStorage.getItem("userResponse");
  const storedUserResponse = JSON.parse(storedUserResponseString);
  const loginuserid = storedUserResponse?.data?.user?._id || "";

  const postcard = (Product) => {
    try {
      NewRequest.post(`/wishlist/${loginuserid}`, { productId: Product._id });
      toast.success(`Product has been added successfully`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error?.response?.data?.error || "Error", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const viewmore = (category) => {
    sessionStorage.setItem("productmore", JSON.stringify(category));
    navigate(`/moreproduct/${category.category.name}`);
  };

  const singproductitem = (card) => {
    navigate(`/Singleitem/${card._id}`);
    localStorage.setItem("singleproduct", JSON.stringify(card));
  };

  // Extract categories from productsdata
  const categories = productsdata.categories;

  return (
    <div className="relative h-auto w-full bg-white border-b mt-10 mb-20">

      {categories.map((category, index) => {
        const activeProducts = category.products.filter(
          (product) => product.status.toLowerCase() === "active"
        );

        if (activeProducts.length === 0) {
          return null;
        }

        return (
          <div key={index} className="mt-5">
            <div className="flex justify-between my-auto">
              <h6 className="text-maincolor text-3xl font-bold overflow-hidden my-7">
                {category?.category?.name}
              </h6>
              <div className="text-viewmorebutton text-xl flex cursor-pointer my-auto">
                <span onClick={() => viewmore(category)}>View more</span>
                <MdOutlineNavigateNext size={30} />
              </div>
            </div>
            <div className="relative w-full bg-fourthcolor lg:p-3 p-1  sm:p-1">
              <Swiper
                slidesPerView={2}
                centeredSlides={false}
                slidesPerGroupSkip={1}
                grabCursor={true}
                keyboard={{ enabled: true }}
                spaceBetween={5}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 5,
                  },
                  768: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                    spaceBetween: 30,
                  },
                  1024: {
                    slidesPerView: 5,
                    slidesPerGroup: 5,
                    spaceBetween: 40,
                  },
                }}
                scrollbar={{ draggable: true }}
                navigation={true}
                pagination={{ clickable: true }}
                modules={[Keyboard, Scrollbar, Navigation, Pagination]}
                className="mySwiper py-6"
              >
                {activeProducts.map((card, index) => (
                  <SwiperSlide key={index}>
                    <div className="h-[300px] lg:h-[320px] sm:h-[300px] relative w-full py-1 border border-gray-300 bg-white rounded-md shadow-lg hover:shadow-2xl hover:border-primary">
                      <div className="font-semibold text-secondary sm:text-lg text-base hover:text-primary mt-3 w-full">
                        <img
                          src={imageLiveUrl(card.images[0])}
                          alt=""
                          className="w-full h-44 object-cover px-3 cursor-pointer"
                          onClick={() => singproductitem(card)}
                        // onClick={() =>
                        //   openImagePreview(imageLiveUrl(card.images[0]))
                        // }
                        />
                        <div className="w-full">
                          <div
                            className="px-3 mt-3 text-detailscolor font-normal cursor-pointer"
                            onClick={() => singproductitem(card)}
                          >
                            <DescriptionWithToggle description={card.name} />
                          </div>
                          <div className="flex flex-row mt-5 mb-2 justify-between w-full absolute bottom-1 lg:px-4 sm:px-2 px-2">
                            <Rating
                              name="half-rating"
                              precision={0.5}
                              // value={productRatings[card._id] || "No ratings"}
                              value={
                                productRatings[card._id]
                                  ? Number(productRatings[card._id])
                                  : 0
                              }
                              sx={{
                                color: "#4C005A",
                                fontSize: {
                                  xs: "15px",
                                  sm: "15px",
                                  md: "1rem",
                                  lg: "1.5rem",
                                },
                              }}
                              readOnly
                            />
                            <GrLike
                              className=" text-maincolor cursor-pointer"
                              onClick={() => postcard(card)}
                            />
                          </div>
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

      <Dialog open={isDialogOpen} onClose={closeDialog} maxWidth="md">
        <DialogContent>
          <div className="relative">
            {/* Close button */}
            <IconButton
              aria-label="close"
              onClick={closeDialog}
              sx={{
                position: "absolute",
                right: 1,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <GridCloseIcon className="text-white bg-black" />
            </IconButton>

            {/* Image */}
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
