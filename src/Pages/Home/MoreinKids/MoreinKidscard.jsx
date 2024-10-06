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
import imageLiveUrl from "../../../../utils/urlConverter/imageLiveUrl";
import { ThumbUpAlt } from "@mui/icons-material";
import likeicon from "../../../assets/Images/like.jpg";
import { GrLike } from "react-icons/gr";

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
          return null;
        }

        return (
          <div key={category._id} className="mt-5">
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
                slidesPerView={1}
                centeredSlides={false}
                slidesPerGroupSkip={1}
                grabCursor={true}
                keyboard={{ enabled: true }}
                spaceBetween={20}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 20,
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
                className="mySwiper"
              >
                {activeProducts.map((card) => (
                  <SwiperSlide key={card.id} className="">
                    <div className="h-auto lg:h-[330px] sm:h-auto w-full py-1 border border-gray-300 bg-white rounded-md shadow-lg px-5 hover:shadow-2xl hover:border-primary">
                      <div className="font-semibold text-secondary sm:text-lg text-base hover:text-primary mt-3">
                        <img
                          src={imageLiveUrl(card.images[0])}
                          alt=""
                          className="w-full h-44 object-cover cursor-pointer"
                          onClick={() => singproductitem(card)}
                        />
                        <div className="w-full">
                          <p className="px-3 mt-3 text-detailscolor font-normal">
                            <DescriptionWithToggle description={card.name} />
                          </p>
                          <div className="px-3 flex flex-row mt-5 justify-between gap-2">
                            <p className="text-secondary sm:text-lg text-base">
                              {card?.currency || "Rs"}
                              <span className="ms-2">{card.price}</span>
                            </p>
                            <GrLike
                              className=" text-maincolor cursor-pointer mb-4"
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
    </div>
  );
};

export default Hadersilder;
