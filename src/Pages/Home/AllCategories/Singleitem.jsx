// static Data Slider
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation, Scrollbar, Keyboard } from "swiper/modules";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import silder1 from "../../../assets/Images/Slider1.webp";
import { FaRegHeart } from "react-icons/fa";
import Avatar from "@mui/material/Avatar";
import NewRequest from "../../../../utils/NewRequest";
import { useLocation, useNavigate } from "react-router-dom";
import PinDropIcon from "@mui/icons-material/PinDrop";
import { toast } from "react-toastify";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import DescriptionWithToggle from "../MoreinKids/DescriptionWithToggle";
import { useQuery } from "react-query";

const Singleitem = () => {

  const location = useLocation();
  const navigate=useNavigate()
  const cardData = location.state;
  const [Userdataget, setUserdataget] = useState('')
  const [moreproductData, setmoreproductData] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [data, setdata] = useState('')
  const [imageuser, setimageuser] = useState('')

const fetchData = async () => {
  setIsLoading(true);
  try {
    const response = await NewRequest.get(`/product/${cardData.cardData._id}`);
    const datas = response.data;

    try {
      const responsesingle = await NewRequest.get(
        `/product/getProductsByCategory/${datas.Category._id}`
      );
      const activeProducts = responsesingle?.data.filter(
        (product) => product.status.toLowerCase() === "active"
      );
      setmoreproductData(activeProducts || []);
    } catch (err) {
      console.log(err);
    }

    setUserdataget(datas);
    setdata(datas);

    try {
      const responsdata = await NewRequest.get(`/users/${datas.User._id}`);
     setimageuser(responsdata.data || "");
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
  }
};




  useEffect(() => {
    fetchData();
  }, []);
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

    async function fetchproductData() {
      const response = await NewRequest.get("/product/getcategoryproduct");
      const categoriesWithCounts = response?.data.map((item) => ({
        name: item.category.name, // Category name
        count: item.products.length, // Number of products in this category
      }));

      return categoriesWithCounts;
    }

    // Use the data in your component
    const { data: productsdata } = useQuery(
      "getcategoryproductget",
      fetchproductData
    );

      const viewmore = (product) => {
        console.log("product", product);
        const subResponseString = JSON.stringify(product);
        sessionStorage.setItem("productmore", subResponseString);
        navigate(`/moreproduct/${product.category.name}`);
      };

        const charfunction = (Product) => {
          console.log(Product.User);
          const subResponsechat = JSON.stringify(Product.User);
          sessionStorage.setItem("chardata", subResponsechat);
          navigate("/Chat");
        };

  return (
    <div className="lg:px-10 mt-5 lg:mt-40 sm:mt-2  mx-auto w-full lg:w-[90%] sm:w-full">
      <div className="my-5">
        <span
          className="cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </span>{" "}
        |{" "}
        <span className="cursor-pointer">
          {" "}
          {cardData?.cardData?.name || ""}
        </span>
      </div>
      <div className="flex gap-6   flex-col sm:flex-row">
        <div className="w-full lg:w-[35%] sm:w-full ">
          <div className="border rounded shadow py-6 px-4">
            <p className="text-primary">Listed by private user</p>
            {isLoading ? (
              <div className="flex">
                <Skeleton height={50} width={50} circle={true} />{" "}
                <Skeleton height={50} width={50} circle={true} />{" "}
              </div> // Skeleton for user avatar
            ) : (
              <div className="flex my-auto mt-5 justify-between">
                <div className="flex">
                  <Avatar className="my-auto" src={imageuser?.image || ""} />
                  <div className="ml-5">
                    <p className="text-secondary">
                      {Userdataget?.User?.username || ""}
                    </p>
                    <p>{Userdataget?.User?.email || ""}</p>
                    <p>{Userdataget?.User?.phone || ""}</p>
                  </div>
                </div>
                <div>
                  <button
                    className="text-green-500 border border-green-500 px-4 rounded mt-4"
                    onClick={() => charfunction(Userdataget)}
                  >
                    Chat
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="border rounded shadow py-6 px-4 mt-5">
            <p className="text-primary">Location</p>
            <div className="flex my-auto mt-5">
              <div className=" flex">
                <p className="text-secondary">
                  {isLoading ? (
                    <Skeleton height={30} width={150} /> // Skeleton for location
                  ) : (
                    <div className="flex my-auto mt-5">
                      <PinDropIcon />
                      <p className="text-secondary ml-2">
                        {data?.location || "location"}
                      </p>
                    </div>
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="border rounded shadow py-6 px-4 mt-5">
            <div className="mb-4">
              <h2 className="font-bold text-lg mb-2">Product Categories</h2>
              <ul>
                {productsdata &&
                  productsdata.length > 0 &&
                  productsdata.map((category, index) => (
                    <li key={index} className="mb-2">
                      <p>
                        {category?.name || ""} ({category?.count || "0"})
                      </p>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="relative h-auto w-full lg:w-[65%] sm:w-full bg-white border-b mb-20 ">
          <div className="relative  w-full">
            {isLoading ? (
              <Skeleton height={200} /> // Skeleton for the image slider
            ) : (
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                  delay: 4500,
                  disableOnInteraction: false,
                }}
                navigation={{
                  nextEl: "#swiper-button-next",
                  prevEl: "#swiper-button-prev",
                }}
                pagination={{
                  clickable: true,
                }}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
              >
                {/* <SwiperSlide> */}
                <div className="relative w-100">
                  {data?.images?.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className="relative w-100">
                        <img
                          src={image}
                          className="w-full h-64  object-cover"
                          alt={`Slide ${index}`}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </div>
                {/* </SwiperSlide> */}
              </Swiper>
            )}
            <div
              id="swiper-button-prev"
              className="absolute bottom-0 z-20 -translate-y-1/2 transform right-20"
            >
              <IoIosArrowDropleftCircle className="cursor-pointer rounded-full text-5xl text-white opacity-80 hover:opacity-100" />
            </div>
            <div
              id="swiper-button-next"
              className="absolute bottom-0 z-20 -translate-y-1/2 transform right-6"
            >
              <IoIosArrowDroprightCircle className="cursor-pointer rounded-full text-5xl text-white opacity-80 hover:opacity-100" />
            </div>
          </div>
          <div className="border rounded shadow mt-10">
            <div className="w-full mb-5 p-4">
              {isLoading ? (
                <Skeleton height={30} width={150} /> // Skeleton for the price
              ) : (
                <>
                  <div className="flex justify-between">
                    <h3 className="font-bold text-lg mb-2">
                      Rs {data?.price || ""}
                    </h3>
                    <FaRegHeart
                      className="cursor-pointer"
                      //   onClick={() => postcard(item._id)}
                    />
                  </div>
                  <p className="text-gray-700 mb-5">{data?.name || ""}</p>
                  <div className=" flex text-gray-500 text-sm">
                    <PinDropIcon />
                    <p className=" ml-5">{data?.location || "location"}</p>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="border rounded shadow mt-10">
            <div className="w-full mb-5 p-4">
              <p className="text-primary mb-5">Description</p>
              {isLoading ? (
                <Skeleton count={3} /> // Skeleton for the description
              ) : (
                <p className="text-gray-700 mb-5">{data?.description || ""}</p>
              )}
            </div>
          </div>
          {/* Related ads */}
          <div className="mt-5">
            <p className="text-primary mb-5 font-sans font-bold text-2xl">
              Related ads
            </p>
            <Swiper
              slidesPerView={3}
              spaceBetween={15}
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
                  slidesPerView: 3,
                  slidesPerGroup: 3,
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
              <div className="w-full">
                {/* <SwiperSlide> */}
                {isLoading ? (
                  <Skeleton height={250} count={3} /> // Skeleton for related ads
                ) : (
                  moreproductData.map((card) => (
                    <SwiperSlide>
                      <div
                        key={card.id}
                        className="h-auto w-full py-1  border my-3 border-gray-300 rounded-md shadow-lg"
                        // onClick={() => singproductitem(card)}
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
                              <p className="text-headingcolor sm:text-lg text-base">
                                Rs {card.price}
                              </p>
                              <FaRegHeart
                                className="cursor-pointer"
                                onClick={() => postcard(card)}
                              />
                            </div>
                            <p className="px-3 mt-3 font-normal">
                              <DescriptionWithToggle description={card.name} />
                            </p>

                            <p className="px-3 mt-3 text-headingcolor font-normal">
                              {card.location}
                            </p>
                            {/* <span className="px-3 text-loactioncolor font-light mb-7 text-sm">
                      {card.daysAgo}
                    </span> */}
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))
                )}
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Singleitem;
