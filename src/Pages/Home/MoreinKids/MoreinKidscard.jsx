import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { toast } from "react-toastify";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  Autoplay,
  Pagination,
  Navigation,
  Keyboard,
  Scrollbar,
} from "swiper/modules";
import Button from "@mui/material/Button";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import imagecard from "../../../assets/Images/imagecard.webp";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineNavigateNext } from "react-icons/md";
import useMediaQuery from "@mui/material/useMediaQuery";
import NewRequest from "../../../../utils/NewRequest";
import DescriptionWithToggle from "./DescriptionWithToggle";

const Hadersilder = () => {
  const isSmallScreen = useMediaQuery("(max-width: 425px)");
  const navigate = useNavigate();

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

    return { categories: response.data, products: activeProducts };
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;

  const storedUserResponseString = sessionStorage.getItem("userResponse");
  const storedUserResponse = JSON.parse(storedUserResponseString);
  const loginuserid = storedUserResponse?.data?.user?._id || "";

  const postcard = (Product) => {
    console.log(Product._id);
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
      console.log(error);
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
    console.log(category.category.name);

    sessionStorage.setItem("productmore", JSON.stringify(category));
    navigate(`/moreproduct/${category.category.name}`);
  };

  const singproductitem = (card) => {
    navigate(`/Singleitem/${card._id}`, { state: { cardData: card } });
  };

  // Extract categories from productsdata
  const categories = productsdata.categories;

  return (
    <div className="relative h-auto w-full bg-white border-b mt-10 mb-20">
      {categories.map((category) => {
        const activeProducts = category.products.filter(
          (product) => product.status.toLowerCase() === "active"
        );

        if (activeProducts.length === 0) {
          // Skip rendering this category if there are no active products
          return null;
        }

        return (
          <div key={category._id}>
            <div className="flex justify-between my-auto">
              <h6 className="text-headingcolor text-3xl font-bold overflow-hidden">
                {category?.category?.name}
              </h6>
              <div className="text-viewmorebutton text-xl flex cursor-pointer my-auto">
                <span onClick={() => viewmore(category)}>View more</span>{" "}
                <MdOutlineNavigateNext size={30} />
              </div>
            </div>
            <div className="relative w-full mt-10">
              {isSmallScreen ? (
                <Swiper
                  slidesPerView={1}
                  centeredSlides={false}
                  slidesPerGroupSkip={1}
                  grabCursor={true}
                  keyboard={{ enabled: true }}
                  breakpoints={{
                    640: { slidesPerView: 1, slidesPerGroup: 1 },
                    768: { slidesPerView: 2, slidesPerGroup: 2 },
                  }}
                  scrollbar={{ draggable: true }}
                  navigation={true}
                  pagination={{ clickable: true }}
                  modules={[Keyboard, Scrollbar, Navigation, Pagination]}
                  className="mySwiper"
                >
                  {activeProducts.map((card) => (
                    <SwiperSlide key={card.id}>
                      <div className="h-auto w-full py-1 border border-gray-300 rounded-md shadow-lg transition-transform transform hover:scale-110">
                        <div
                          onClick={() => singproductitem(card)}
                          className="font-semibold text-secondary sm:text-lg text-base hover:text-primary mt-3"
                        >
                          <img
                            src={card.images[0]}
                            alt=""
                            className="w-full h-44 object-cover"
                          />
                          <div className="w-full">
                            <div className="px-3 flex flex-row mt-5 justify-between gap-2">
                              <p className="text-secondary sm:text-lg text-base">
                                Rs {card.price}
                              </p>
                              <FaRegHeart onClick={() => postcard(card)} />
                            </div>
                            <p className="px-3 mt-3 text-detailscolor font-normal">
                              {card.description}
                            </p>
                            <p className="px-3 mt-3 text-loactioncolor font-normal">
                              {card.location}
                            </p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="grid 2xl:grid-cols-5 xl:grid-cols-5 gap-7 lg:grid-cols-4 md:grid-cols-4 grid-cols-1 sm:px-2 px-2 mb-3">
                  {activeProducts.slice(0, 4).map((card) => (
                    <div
                      key={card.id}
                      className="h-auto w-full py-1 border my-3 border-gray-300 rounded-md shadow-lg transition-transform transform hover:scale-110"
                    >
                      <div className="font-semibold text-secondary sm:text-lg text-base hover:text-primary mt-3">
                        <img
                          src={card.images[0]}
                          alt=""
                          className="w-full h-44 object-cover"
                          onClick={() => singproductitem(card)}
                        />
                        <div className="w-full mt-3">
                          <div className="flex text-[#17BCDC] ">
                            <p className="mt-3">Title</p>
                            <div className="my-auto ms-2">
                              <DescriptionWithToggle description={card.name} />
                            </div>
                          </div>
                          <div className="px-3 flex flex-row mt-5 justify-between gap-2">
                            <p className="text-[#002147] sm:text-lg text-base">
                              Rs {card.price}
                            </p>
                            <FaRegHeart
                              className="cursor-pointer"
                              onClick={() => postcard(card)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Hadersilder;
