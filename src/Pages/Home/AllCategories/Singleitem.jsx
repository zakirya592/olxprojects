// static Data Slider
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation, Scrollbar, Keyboard } from "swiper/modules";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import Avatar from "@mui/material/Avatar";
import NewRequest from "../../../../utils/NewRequest";
import { useLocation, useNavigate } from "react-router-dom";
import PinDropIcon from "@mui/icons-material/PinDrop";
import { toast } from "react-toastify";
import Skeleton from "@mui/material/Skeleton";
import DescriptionWithToggle from "../MoreinKids/DescriptionWithToggle";
import { useQuery } from "react-query";
import imageLiveUrl from "../../../../utils/urlConverter/imageLiveUrl";
import phoneicon from "../../../assets/Images/phoneicon.png"
import emailicon from "../../../assets/Images/emailicon.jpg";
import likeicon from "../../../assets/Images/like.jpg";

const Singleitem = () => {

  const location = useLocation();
  const navigate = useNavigate()
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
        const imageUrl = responsdata.data?.image || "";
        const finalUrl = imageUrl && imageUrl.startsWith("https") ? imageUrl : imageLiveUrl(imageUrl);
        setimageuser(finalUrl || "");
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
      name: item.category.name,
      count: item.products.length,
      id: item,
    }));

    return categoriesWithCounts;
  }

  // Use the data in your component
  const { data: productsdata } = useQuery(
    "getcategoryproductget",
    fetchproductData
  );

  const viewmore = (product) => {
    const subResponseString = JSON.stringify(product.id);
    sessionStorage.setItem("productmore", subResponseString);
    navigate(`/moreproduct/${product.name}`);
  };

  const charfunction = (Product) => {
    const subResponsechat = JSON.stringify(Product.User);
    sessionStorage.setItem("chardata", subResponsechat);
    navigate("/Chat");
  };

  const productlist = (product) => {
    const subResponseString = JSON.stringify(product);
    sessionStorage.setItem("productlist", subResponseString);
    navigate(`/Productlist/${product._id}`);
  };


  return (
    <div className="lg:px-10 mt-3 lg:mt-28 sm:mt-2  mx-auto w-full lg:w-[90%] sm:w-full">
      <div className="my-5 bg-fourthcolor py-2 shadow-md px-3">
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
      <div className="flex gap-6 flex-col sm:flex-row">
        <div className="w-full lg:w-[35%] sm:w-full ">
          <div className="border rounded shadow py-6 px-4 bg-cardbg">
            <p className="text-primary">Listed by private user</p>
            {isLoading ? (
              <div className="flex">
                <Skeleton height={50} width={50} circle={true} />{" "}
                <Skeleton height={50} width={50} circle={true} />{" "}
              </div> // Skeleton for user avatar
            ) : (
              <div className="flex my-auto mt-5 justify-between">
                <div className="flex w-full">
                  <Avatar
                    className="my-auto cursor-pointer"
                    src={imageuser || ""}
                    onClick={() => productlist(Userdataget)}
                  />
                  <div className="ml-5 w-full">
                    <div className="flex justify-between  my-auto w-full">
                      <div className="my-auto">
                        <p className="text-secondary">
                          {Userdataget?.User?.username || ""}
                        </p>
                      </div>
                      <div className="my-auto">
                        <button
                          className="text-[#30D5C8] border border-[#30D5C8] px-4 rounded "
                          onClick={() => charfunction(Userdataget)}
                        >
                          Chat
                        </button>
                      </div>
                    </div>

                    <div className="flex my-3 w-full">
                      <img
                        src={emailicon}
                        alt=""
                        className="w-7 h-5 object-contain"
                      />
                      <a
                        href={`mailto:${Userdataget?.User?.email || ""}`}
                        className="text-blue-500 hover:underline ms-5 my-auto"
                      >
                        {Userdataget?.User?.email || ""}
                      </a>
                    </div>
                    <div className="flex ">
                      <img
                        src={phoneicon}
                        alt=""
                        className="w-7 h-7 object-contain"
                      />
                      <a
                        href={`tel:${Userdataget?.User?.phone || ""}`}
                        className="text-blue-500 hover:underline ms-5 my-auto"
                      >
                        {Userdataget?.User?.phone || ""}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="border rounded shadow py-6 px-4 mt-5 bg-cardbg">
            <p className="text-primary">Location</p>
            <div className="flex my-auto mt-5">
              <div className=" flex">
                <div className="text-secondary">
                  {isLoading ? (
                    <Skeleton height={30} width={150} /> // Skeleton for location
                  ) : (
                    <div className="flex my-auto mt-5">
                      <PinDropIcon className="text-[#757575]" />
                      <p className="text-secondary ml-2">
                        {data?.location || "location"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded shadow py-6 px-4 mt-5 bg-cardbg">
            <div className="mb-4">
              <h2 className="font-bold text-lg mb-2">Product Categories</h2>
              <ul>
                {productsdata &&
                  productsdata.length > 0 &&
                  productsdata.map((category, index) => (
                    <li key={index} className="mb-2 text-gray-500">
                      <p
                        onClick={() => viewmore(category)}
                        className="cursor-pointer"
                      >
                        {category?.name || ""} ({category?.count || "0"})
                      </p>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="relative h-auto w-full lg:w-[65%] sm:w-full bg-white border-b mb-20 ">
          <div className="relative h-[300px] w-full">
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
                      <div className="relative w-full h-[300px]">
                        <img
                          src={imageLiveUrl(image)}
                          className="w-full h-full  object-cover"
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
              <IoIosArrowDropleftCircle className="cursor-pointer rounded-full text-5xl text-black opacity-80 hover:opacity-100" />
            </div>
            <div
              id="swiper-button-next"
              className="absolute bottom-0 z-20 -translate-y-1/2 transform right-6"
            >
              <IoIosArrowDroprightCircle className="cursor-pointer rounded-full text-5xl text-black opacity-80 hover:opacity-100" />
            </div>
          </div>
          <div className="border rounded bg-cardbg shadow mt-10">
            <div className="w-full mb-5 p-4">
              {isLoading ? (
                <Skeleton height={30} width={150} />
              ) : (
                <>
                  <div className="flex justify-between">
                    <h3 className="font-bold text-2xl mb-2 ">
                      {data?.currency || "Rs"}
                      <span className="text-rscolor ms-1">
                        {data?.price || ""}
                      </span>
                    </h3>
                    {/* <button
                      className="bg-black text-yellow-50 px-5 py-2 rounded-full hover:bg-white hover:text-black hover:border border-black"
                      onClick={() => postcard(item._id)}
                    >
                      Add To Cart
                    </button> */}
                  </div>
                  <p className="text-gray-700 text-lg mb-5">
                    {data?.name || ""}
                  </p>
                  <div className=" flex text-gray-500 text-sm">
                    <PinDropIcon className="text-[#757575]" />
                    <p className=" ml-5">{data?.location || "location"}</p>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="border rounded shadow mt-10 bg-cardbg">
            <div className="w-full mb-5 p-4">
              <p className="text-primary mb-5">Description</p>
              {isLoading ? (
                <Skeleton count={3} /> // Skeleton for the description
              ) : (
                <p className="text-productdesc mb-5 ">
                  {data?.description || ""}
                </p>
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
                325: {
                  slidesPerView: 1,
                  slidesPerGroup: 1,
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
                  moreproductData.map((card, index) => (
                    <SwiperSlide>
                      <div
                        key={index}
                        className="h-full w-full py-1  border my-3 border-gray-300 rounded-md shadow-lg"
                        // onClick={() => singproductitem(card)}
                      >
                        <div
                          // to={card.link}
                          className="font-semibold text-secondary sm:text-lg text-base hover:text-primary mt-3"
                        >
                          <center>
                            <img
                              src={imageLiveUrl(card.images[0])}
                              alt=""
                              className="w-52 h-44 object-cover cursor-pointer"
                            />
                          </center>
                          <div className="w-full">
                            <p className="px-3 mt-3 font-normal">
                              <DescriptionWithToggle description={card.name} />
                            </p>
                            <div className="px-3 flex flex-row mt-5 justify-between gap-2">
                              <h1 className="sm:text-lg text-base">
                                {card?.currency || "Rs"}
                                <span className="text-rscolor ms-1">
                                  {" "}
                                  {card.price}
                                </span>
                              </h1>
                            </div>
                            <div className="w-full flex justify-center items-end mt-auto py-3">
                              {/* <button
                                className="bg-black text-yellow-50 px-5 py-2 rounded-full"
                                onClick={() => postcard(card)}
                              >
                                Add To Cart
                              </button> */}
                              <img
                                src={likeicon}
                                className=" text-black cursor-pointer h-7 w-7"
                                onClick={() => postcard(card)}
                              ></img>
                            </div>
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
