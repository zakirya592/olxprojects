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
import Commentproduct from "../../Commentproduct/Commentproduct";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { GrLike } from "react-icons/gr";
import { Dialog, DialogContent, IconButton, Rating } from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";

const Singleitem = () => {

  const location = useLocation();
  const navigate = useNavigate()
  const cardData = location.state;
  const [Userdataget, setUserdataget] = useState('')
  const [moreproductData, setmoreproductData] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [data, setdata] = useState('')
  const [ratings, setratings] = useState(0)
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
        // setmoreproductData(activeProducts || []);

        if (activeProducts && activeProducts.length > 0) {
          const productsWithComments = await Promise.all(
            activeProducts.map(async (product) => {

              try {
                // Fetch comments for each product
                const response = await NewRequest.get(
                  `/comment/replay/${product._id}`
                );
                const comments = response?.data?.comments || [];
                let averageRating = 0;

                if (Array.isArray(comments)) {
                  const totalRatings = comments.reduce((acc, comment) => acc + (comment.rating || 0), 0);
                  averageRating = comments ? totalRatings / comments.length : 0;
                }
                return {
                  ...product,
                  comments,
                  averageRating,
                };
              } catch (err) {
                return { ...product, comments: [], averageRating: 0 };
              }
            })
          );
          setmoreproductData(productsWithComments || []);
        } else {
          setmoreproductData([]);
        }
      } catch (err) {
        console.log(err);
      }
      setUserdataget(datas);
      setdata(datas);

      NewRequest.get(`/comment/replay/${datas._id}`).then((response) => {
        const comments = response?.data?.comments || [];
        if (Array.isArray(comments)) {
          const totalRatings = comments.reduce(
            (acc, comment) => acc + (comment.rating || 0),
            0
          );
          const averageRating = comments.length
            ? totalRatings / comments.length
            : 0;
          setratings(averageRating);
        } else {
          console.error(comments);
        }
      }).catch((err) => {
        console.log(err);
      });

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
  const storedUserResponseString = localStorage.getItem("userResponse");
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

  const loginuserdata = storedUserResponse?.data?.user || "";
  let senderId = loginuserdata?._id || "";
  if (!senderId) {
    senderId = localStorage.getItem("userdata") || "";
  }

  const charfunction = (Product) => {

     if (!senderId) {
       navigate("/LoginForm");
     }
    const subResponsechat = JSON.stringify(Product.User);
    sessionStorage.setItem("chardata", subResponsechat);
    navigate("/Chat");
  };

  const productlist = (product) => {
    const subResponseString = JSON.stringify(product);
    sessionStorage.setItem("productlist", subResponseString);
    navigate(`/Productlist/${product._id}`);
  };

   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const [selectedImage, setSelectedImage] = useState(null);
   const openImagePreview = (image) => {
     setSelectedImage(image);
     setIsDialogOpen(true);
   };

   const closeDialog = () => {
     setIsDialogOpen(false);
   };


  return (
    <div className="lg:px-10 mt-3 lg:mt-28 sm:mt-2  mx-auto w-full lg:w-[90%] sm:w-full">
      <div className="my-5 bg-maincolor text-white rounded-full py-2 shadow-md px-3">
        <span
          className="cursor-pointer ms-4"
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
      <div className="flex flex-col-reverse sm:flex-col-reverse md:flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-[35%] sm:w-full ">
          <div className="border rounded shadow py-6 px-4 bg-maincolor">
            <p className="text-white font-sans text-center text-lg">
              Listed by private user
            </p>
            {isLoading ? (
              <div className="flex">
                <Skeleton height={50} width={50} circle={true} />{" "}
                <Skeleton height={50} width={50} circle={true} />{" "}
              </div> // Skeleton for user avatar
            ) : (
              <div className="flex my-auto mt-5 justify-between">
                <div className="flex lg:flex-row sm:flex-col flex-col w-full">
                  <div className="flex sm:justify-center lg:justify-start justify-center items-center">
                    <Avatar
                      className="my-auto cursor-pointer"
                      src={imageuser || ""}
                      onClick={() => productlist(Userdataget)}
                    />
                  </div>
                  <div className="lg:ml-5 sm:ml-1 ml-1  w-full">
                    <div className="flex justify-between  my-auto w-full">
                      <div className="my-auto">
                        <p className="text-white font-sans ">
                          {Userdataget?.User?.username || ""}
                        </p>
                      </div>
                      <div className="my-auto">
                        <button
                          className="text-maincolor border bg-white rounded-full text-lg font-sans font-bold px-4 "
                          onClick={() => charfunction(Userdataget)}
                        >
                          Chat
                        </button>
                      </div>
                    </div>

                    <div className="flex my-3 w-full lg:flex-row sm:flex-col flex-col justify-center items-center sm:justify-center lg:justify-start">
                      <MdEmail className="text-white w-7 h-7" />
                      <a
                        href={`mailto:${Userdataget?.User?.email || ""}`}
                        className="text-white font-sans  hover:underline lg:ms-5 sm:ms-1 ms-1  my-auto mt-3 sm:mt-3 lg:mt-0"
                      >
                        {Userdataget?.User?.email || ""}
                      </a>
                    </div>
                    <div className="flex mt-3 lg:flex-row sm:flex-col flex-col justify-center items-center sm:justify-center lg:justify-start">
                      <FaPhoneAlt className="text-white w-6 h-6" />
                      <a
                        href={`tel:${Userdataget?.User?.phone || ""}`}
                        className="text-white font-sans  hover:underline lg:ms-5 sm:ms-1 mt-3 sm:mt-3 lg:mt-0 ms-1  my-auto"
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
            <p className="text-maincolor text-lg font-sans font-semibold">
              Location
            </p>
            <div className="flex my-auto mt-5">
              <div className=" flex">
                <div className="text-secondary">
                  {isLoading ? (
                    <Skeleton height={30} width={150} />
                  ) : (
                    <div className="flex my-auto">
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
              <h2 className=" text-maincolor font-sans font-bold text-lg mb-2">
                Product Categories
              </h2>
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
        <div className="relative h-auto w-full lg:w-[65%] sm:w-full bg-white border-b lg:mb-20 sm:mb-5 mb-5 ">
          <div className="relative h-[150px] lg:h-[250px] sm:h-[150px] w-full">
            {isLoading ? (
              <Skeleton height={200} />
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
                className="mySwiper "
              >
                {/* <SwiperSlide> */}
                <div className="relative w-full">
                  {data?.images?.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className="relative w-full h-[150px] lg:h-[250px] sm:h-[150px]">
                        <img
                          src={imageLiveUrl(image)}
                          className="w-full h-full object-contain"
                          alt={`Slide ${index}`}
                          onClick={() => openImagePreview(imageLiveUrl(image))}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </div>
                {/* </SwiperSlide> */}
              </Swiper>
            )}
          </div>
          <div className="border rounded bg-cardbg shadow mt-20">
            <div className="w-full mb-1 p-4 ">
              {isLoading ? (
                <Skeleton height={30} width={150} />
              ) : (
                <>
                  <div className="flex justify-between">
                    <h3 className="font-bold text-2xl mb-2 ">
                      {data?.currency || "Rs"}
                      <span className="text-maincolor ms-1">
                        {data?.price || ""}
                      </span>
                    </h3>
                    <GrLike
                      className=" text-maincolor cursor-pointer mb-4 font-bold w-6 h-6"
                      onClick={() => postcard(data)}
                    />
                  </div>
                  <p className="text-gray-700 text-lg ">{data?.name || ""}</p>
                  <div className="mt-4">
                    <Rating
                      name="half-rating"
                      precision={0.5}
                      value={ratings}
                      sx={{
                        color: "#4C005A",
                      }}
                      readOnly
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="border rounded shadow mt-5 bg-cardbg w-full">
            <div className="w-full mb-5 p-4">
              <p className="text-maincolor text-lg font-sans font-semibold mb-5">
                Description
              </p>
              {isLoading ? (
                <Skeleton count={3} />
              ) : (
                <p className="text-productdesc mb-5 w-full">
                  {data?.description || ""}
                </p>
              )}
            </div>
          </div>
          {/* Related ads */}
        </div>
      </div>
      <div className="w-full mt-2">
        <p className="text-maincolor mb-5 font-sans font-bold text-2xl">
          Related ads
        </p>
        <div className=" w-full bg-fourthcolor lg:p-3 p-1  sm:p-1 rounded-sm">
          <Swiper
            slidesPerView={2}
            spaceBetween={10}
            centeredSlides={false}
            slidesPerGroupSkip={1}
            grabCursor={true}
            keyboard={{
              enabled: true,
            }}
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
            pagination={{
              clickable: true,
            }}
            modules={[Keyboard, Scrollbar, Navigation, Pagination]}
            className="mySwiper py-6"
          >
            <div className="w-full ">
              {/* <SwiperSlide> */}
              {isLoading ? (
                <Skeleton height={250} count={3} />
              ) : (
                moreproductData.map((card, index) => (
                  <SwiperSlide key={index}>
                    <div className="h-[300px] lg:h-[340px] sm:h-[300px]  relative w-full py-1  border my-3 border-gray-300 bg-white rounded-md shadow-lg">
                      <div className="font-semibold text-secondary sm:text-lg text-base hover:text-maincolor mt-3">
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
                          <div className="px-3 flex flex-row mt-5 justify-between gap-2 lg:absolute lg:bottom-1">
                            <Rating
                              name="half-rating"
                              precision={0.5}
                              value={card?.averageRating}
                              sx={{
                                color: "#4C005A",
                              }}
                              readOnly
                            />
                            <GrLike
                              className=" text-maincolor cursor-pointer mb-4"
                              onClick={() => postcard(card)}
                            />
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
      <Commentproduct productdata={cardData} />
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
              className="w-full lg:h-[500px] sm:h-80 h-80 object-cover"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Singleitem;
