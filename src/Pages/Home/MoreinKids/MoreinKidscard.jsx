import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { toast } from "react-toastify";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation, Keyboard, Scrollbar } from "swiper/modules";
import Button from "@mui/material/Button";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useQuery } from "react-query";
import { Link, useNavigate, } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import imagecard from "../../../assets/Images/imagecard.webp";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineNavigateNext } from "react-icons/md";
import useMediaQuery from "@mui/material/useMediaQuery";
import NewRequest from "../../../../utils/NewRequest";

const Hadersilder = () => {
  const isSmallScreen = useMediaQuery("(max-width: 425px)");

  const navigate = useNavigate();
  // Fetch data and filter based on status and category
 async function fetchproductData() {
   const response = await NewRequest.get("/product/getcategoryproduct");

   // Find the "Mobiles" category and filter products with status === "active"
   const mobilesCategory = response?.data.find(
     (item) => item.category.name === "Mobiles"
   );

   if (mobilesCategory) {
     // Filter products that are active
     const activeProducts = mobilesCategory.products.filter(
       (product) => product.status.toLowerCase() === "active"
     );
     return { ...mobilesCategory, products: activeProducts };
   }

   return null; // Return null if "Mobiles" category is not found
 }


  // Use the data in your component
  const { isLoading, error, data: productsdata } = useQuery("productgetcategoryproduct", fetchproductData);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;

  const storedUserResponseString = sessionStorage.getItem("userResponse");
  const storedUserResponse = JSON.parse(storedUserResponseString);

  const loginuserid = storedUserResponse?.data?.user?._id || "";
  const postcard = (Product) => {
    console.log(Product._id);

    try {
      const response = NewRequest.post(`/wishlist/${loginuserid}`, {
        productId: Product._id,
      });
      toast.success(`Product has been added successfully".`, {
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

  const viewmore = (product) => {
    console.log("product", product);
    const subResponseString = JSON.stringify(product);
    sessionStorage.setItem("productmore", subResponseString);
    navigate(`/moreproduct/${product.category.name}`);
  }
  const singproductitem = (card) => {
    console.log(card._id);
    //  const cardId = card.id;
    navigate(`/Singleitem/${card._id}`, { state: { cardData: card } });
  }

  
  const limitedProducts = productsdata.products.slice(0, 4);

  return (
    <div className="relative h-auto w-full bg-white border-b mt-10 mb-20">
      <div className="flex justify-between my-auto">
        <h6 className="text-headingcolor text-3xl font-bold overflow-hidden">
          Mobile Phones
        </h6>
        <div className="text-viewmorebutton text-xl flex cursor-pointer my-auto">
          <span onClick={() => viewmore(productsdata)}>View more</span>{" "}
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
            keyboard={{
              enabled: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                slidesPerGroup: 1,
              },
              768: {
                slidesPerView: 2,
                slidesPerGroup: 2,
              },
            }}
            scrollbar={{ draggable: true }}
            navigation={true}
            pagination={{
              clickable: true,
            }}
            modules={[Keyboard, Scrollbar, Navigation, Pagination]}
            className="mySwiper"
          >
            {productsdata.products.map((card) => (
              <SwiperSlide key={card.id}>
                <div className="h-auto w-full py-1 border border-gray-300 rounded-md shadow-lg transition-transform transform hover:scale-110">
                  <div
                    // to={card.link}
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
                      {/* <span className="px-3 text-loactioncolor font-light mb-7 text-sm">
                        {card.daysAgo}
                      </span> */}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="grid 2xl:grid-cols-4 xl:grid-cols-4 gap-7 lg:grid-cols-3 md:grid-cols-3 grid-cols-1 sm:px-2 px-2 mb-3">
            {limitedProducts.map((card) => (
              <div
                key={card.id}
                className="h-auto w-full py-1 border my-3 border-gray-300 rounded-md shadow-lg transition-transform transform hover:scale-110"
                onClick={() => singproductitem(card)}
              >
                <div
                  // to={card.link}
                  className="font-semibold text-secondary sm:text-lg text-base hover:text-primary mt-3"
                >
                  <img
                    src={card.images[0]}
                    alt=""
                    className="w-full h-44 object-cover"
                  />
                  <div className="w-full">
                    <div className="px-3 flex flex-row mt-5 justify-between gap-2">
                      {/* <p className="text-headingcolor sm:text-lg text-base">
                        {card.name}
                      </p> */}
                      <p className="text-[#002147] sm:text-lg text-base">
                        Rs {card.price}
                      </p>
                      <FaRegHeart
                        className="cursor-pointer"
                        onClick={() => postcard(card)}
                      />
                    </div>
                    <p className="px-3 mt-3 text-detailscolor font-normal">
                      {card.description}
                    </p>
                    <p className="px-3 mt-3 text-[#002147] font-normal">
                      {card.location}
                    </p>
                    {/* <span className="px-3 text-loactioncolor font-light mb-7 text-sm">
                      {card.daysAgo}
                    </span> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hadersilder;
