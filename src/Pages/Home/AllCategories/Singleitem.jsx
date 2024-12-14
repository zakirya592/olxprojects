import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation, Scrollbar, Keyboard } from "swiper/modules";
import Avatar from "@mui/material/Avatar";
import NewRequest from "../../../../utils/NewRequest";
import {  useNavigate } from "react-router-dom";
import PinDropIcon from "@mui/icons-material/PinDrop";
import { toast } from "react-toastify";
import Skeleton from "@mui/material/Skeleton";
import DescriptionWithToggle from "../MoreinKids/DescriptionWithToggle";
import { useQuery, useQueryClient } from "react-query";
import imageLiveUrl from "../../../../utils/urlConverter/imageLiveUrl";
import Commentproduct from "../../Commentproduct/Commentproduct";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { GrLike } from "react-icons/gr";
import { Dialog, DialogContent, IconButton, Rating } from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import PanZoom from "react-easy-panzoom";

const Singleitem = () => {
  const navigate = useNavigate()
  // const cardData = location.state;
  const cardDataitem = localStorage.getItem("singleproduct");
  const cardData = JSON.parse(cardDataitem);
  const queryClient = useQueryClient();
  const [Userdataget, setUserdataget] = useState('')
  const [moreproductData, setmoreproductData] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [data, setdata] = useState('')
  const [ratings, setratings] = useState(0)
  const [imageuser, setimageuser] = useState('')  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  

  const fetchData = async () => {
    setIsLoading(true);
  
    try {
      // Fetch main product data
      const response = await NewRequest.get(`/product/${cardData._id}`);
      const productData = response.data;
  
      // Fetch related products by category
      const relatedProducts = await fetchProductsByCategory(productData.Category._id);
  
      // Calculate ratings and fetch additional details
      const enrichedProducts = await enrichProductsWithComments(relatedProducts);
  
      // Update state with fetched data
      setUserdataget(productData);
      setdata(productData);
      setmoreproductData(enrichedProducts);
  
      // Fetch ratings for the current product
      const averageRating = await fetchProductRating(productData._id);
      setratings(averageRating);
  
      // Fetch user image for the product owner
      const userImage = await fetchUserImage(productData.User._id);
      setimageuser(userImage);
    } catch (error) {
      console.error("Error fetching product data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Helper function to fetch products by category
  const fetchProductsByCategory = async (categoryId) => {
    try {
      const response = await NewRequest.get(`/product/getProductsByCategory/${categoryId}`);
      return response?.data.filter((product) => product.status.toLowerCase() === "active");
    } catch (error) {
      console.error("Error fetching products by category:", error);
      return [];
    }
  };
  
  // Helper function to enrich products with comments and ratings
  const enrichProductsWithComments = async (products) => {
    return Promise.all(
      products.map(async (product) => {
        try {
          const response = await NewRequest.get(`/comment/replay/${product._id}`);
          const comments = response?.data?.comments || [];
          const totalRatings = comments.reduce((acc, comment) => acc + (comment.rating || 0), 0);
          const averageRating = comments.length ? totalRatings / comments.length : 0;
  
          return { ...product, comments, averageRating };
        } catch (error) {
          console.error(`Error fetching comments for product ${product._id}:`, error);
          return { ...product, comments: [], averageRating: 0 };
        }
      })
    );
  };
  
  // Helper function to fetch product ratings
  const fetchProductRating = async (productId) => {
    try {
      const response = await NewRequest.get(`/comment/replay/${productId}`);
      const comments = response?.data?.comments || [];
      const totalRatings = comments.reduce((acc, comment) => acc + (comment.rating || 0), 0);
      return comments.length ? totalRatings / comments.length : 0;
    } catch (error) {
      console.error(`Error fetching ratings for product ${productId}:`, error);
      return 0;
    }
  };
  
  // Helper function to fetch user image
  const fetchUserImage = async (userId) => {
    try {
      const response = await NewRequest.get(`/users/${userId}`);
      const imageUrl = response.data?.image || "";
      return imageUrl.startsWith("https") ? imageUrl : imageLiveUrl(imageUrl);
    } catch (error) {
      console.error(`Error fetching user image for user ${userId}:`, error);
      return "";
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);
  const getStoredUserData = () => {
    const storedUserResponseString = localStorage.getItem("userResponse");
    const storedUserResponse = JSON.parse(storedUserResponseString);
    return storedUserResponse?.data?.user || {};
  };
  
  const loginuserdata = getStoredUserData();
  const loginuserid = loginuserdata?._id || localStorage.getItem("userdata") || "";
  
  // Function: Add product to wishlist
  const postcard = async (Product) => {
    if (!loginuserid) {
      toast.error("You must be logged in to add to wishlist.", {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });
      return;
    }
  
    try {
      await NewRequest.post(`/wishlist/${loginuserid}`, {
        productId: Product._id,
      });
      toast.success("Product has been added successfully!", {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to add product to wishlist.", {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });
    }
  };
  
  // Function: Fetch product categories with counts
  const fetchproductData = async () => {
    try {
      const response = await NewRequest.get("/product/getcategoryproduct");
      return response?.data.map((item) => ({
        name: item.category.name,
        count: item.products.length,
        id: item,
      }));
    } catch (error) {
      console.error("Error fetching product categories:", error);
      return [];
    }
  };
  
  // React Query: Cache product category data
  const { data: productsdata } = useQuery("getcategoryproductget", fetchproductData);
  
  // Function: View more products by category
  const viewmore = (product) => {
    const subResponseString = JSON.stringify(product.id);
    sessionStorage.setItem("productmore", subResponseString);
    navigate(`/moreproduct/${product.name}`);
  };
  
  // Function: Open chat for product owner
  const charfunction = (Product) => {
    if (!loginuserid) {
      navigate("/LoginForm");
      return;
    }
  
    const subResponsechat = JSON.stringify(Product.User);
    sessionStorage.setItem("chardata", subResponsechat);
    navigate("/Chat");
  };
  
  // Function: Navigate to product list
  const productlist = (product) => {
    const subResponseString = JSON.stringify(product);
    sessionStorage.setItem("productlist", subResponseString);
    navigate(`/Productlist/${product._id}`);
  };
  
  // Modal functions
  const closeDialog = () => setIsDialogOpen(false);
  
  const openModal = (image) => {
    setIsOpen(true);
    setSelectedImage(image);
  };
  
  const closeModal = () => setIsOpen(false);
  
  // Function: Navigate to single product details
  const singleproduct = (card) => {
    localStorage.setItem("singleproduct", JSON.stringify(card));
    queryClient.invalidateQueries(["card", card]);
    navigate(`/Singleitem/${card._id}`);
    fetchData(); // Ensure data is fetched
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
        | <span className="cursor-pointer"> {cardData?.name || ""}</span>
      </div>
      <div className="flex flex-col-reverse sm:flex-col-reverse md:flex-col lg:flex-row gap-1 sm:gap-1 lg:gap-6 md:gap-6 ">
        <div className="w-full lg:w-[35%] sm:w-full flex md:flex-col lg:flex-col flex-col-reverse sm:flex-col-reverse">
          <div className="border rounded shadow py-6 px-4 bg-maincolor mt-2 md:mt-0 sm:mt-2">
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
          <div className="sm:block lg:hidden">
            <Commentproduct productdata={cardData} />
          </div>
          <div className="border rounded shadow py-6 px-4 mt-0 md:mt-5 lg:mt-5 sm:mt-0 bg-cardbg">
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

          <div className="border rounded shadow py-6 px-4 mt-5  hidden lg:block bg-cardbg">
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
          <div className="relative h-[250px] w-full">
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
                      <div className="relative w-full h-[250px]">
                        <img
                          src={imageLiveUrl(image)}
                          className="w-full h-full object-contain"
                          alt={`Slide ${index}`}
                          // onClick={() => imageLiveUrl(image)}
                          // onClick={() => openModal(imageLiveUrl(image))}
                          onClick={() => openModal(index)}
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
                      <div
                        className="font-semibold text-secondary sm:text-lg text-base hover:text-maincolor mt-3"
                        onClick={() => singleproduct(card)}
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
      <div className="hidden lg:block">
        <Commentproduct productdata={cardData} />
      </div>
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
            {data?.images?.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-[250px]">
                  <PanZoom
                    minZoom={1}
                    maxZoom={3}
                    enablePan={true}
                    enableZoom={true}
                    className="w-full h-full"
                  >
                    <img
                      src={imageLiveUrl(image)}
                      className="w-full h-full object-contain cursor-pointer"
                      alt={`Slide ${index}`}
                      onClick={() => openModal(index)} // Pass the image index
                    />
                  </PanZoom>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {isOpen && (
        <div
          id="imageModal"
          className="fixed z-50 left-0 top-0 w-full h-full overflow-auto bg-black bg-opacity-90 flex items-center justify-center"
        >
          <span
            className="absolute top-4 right-8 text-white text-4xl font-bold cursor-pointer transition duration-300 hover:text-gray-400"
            onClick={closeModal}
          >
            &times;
          </span>
          <div className="relative w-4/5 max-w-3xl mx-auto">
            <Swiper
              initialSlide={selectedImage} // Start from the clicked image index
              spaceBetween={30}
              navigation={true}
              pagination={{
                clickable: true,
              }}
              modules={[Navigation, Pagination]}
              className="swiper-container"
            >
              {data?.images?.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="w-full h-80 lg:h-[500px] flex justify-center items-center">
                    {/* Apply PanZoom directly on the image */}
                    <PanZoom
                      minZoom={1}
                      maxZoom={3}
                      enablePan={true}
                      enableZoom={true}
                      className=" h-full"
                    >
                      <img
                        src={imageLiveUrl(image)}
                        className="object-center w-full h-80 lg:h-[500px]"
                        alt={`Image ${index}`}
                      />
                    </PanZoom>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
};

export default Singleitem;
