import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Scrollbar, Keyboard } from "swiper/modules";
import Avatar from "@mui/material/Avatar";
import NewRequest from "../../../../utils/NewRequest";
import { Link, useNavigate, useParams } from "react-router-dom";
import PinDropIcon from "@mui/icons-material/PinDrop";
import { toast } from "react-toastify";
import Skeleton from "@mui/material/Skeleton";
import DescriptionWithToggle from "../MoreinKids/DescriptionWithToggle";
import { useQuery, useQueryClient } from "react-query";
import imageLiveUrl from "../../../../utils/urlConverter/imageLiveUrl";
import Commentproduct from "../../Commentproduct/Commentproduct";
import { GrLike } from "react-icons/gr";
import { Rating } from "@mui/material";
import PanZoom from "react-easy-panzoom";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  formatProductPriceDisplay,
  formatProductOldPriceDisplay,
  productHasSalePrice,
  parsePriceNumber,
  formatPriceAmount,
  getProductCurrencySymbol,
} from "../../../../utils/formatProductPrice";
import "./Singleitem.css";

const Singleitem = () => {
  const navigate = useNavigate();
  const cardData = useParams();
  const queryClient = useQueryClient();
  const [Userdataget, setUserdataget] = useState("");
  const [moreproductData, setmoreproductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setdata] = useState("");
  const [ratings, setratings] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [imageuser, setimageuser] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  const fetchData = async () => {
    setIsLoading(true);

    try {
      // Fetch main product data
      const response = await NewRequest.get(`/product/${cardData._id}`);
      const productData = response.data;

      // Fetch related products by category
      const relatedProducts = await fetchProductsByCategory(
        productData.Category._id
      );

      // Calculate ratings and fetch additional details
      const enrichedProducts = await enrichProductsWithComments(
        relatedProducts
      );

      // Update state with fetched data
      setUserdataget(productData);
      setdata(productData);
      setmoreproductData(enrichedProducts);

      const ratingData = await fetchProductRating(productData._id);
      setratings(ratingData.average);
      setReviewCount(ratingData.count);
      setActiveImageIndex(0);
      setQuantity(1);

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
      const response = await NewRequest.get(
        `/product/getProductsByCategory/${categoryId}`
      );
      return response?.data.filter(
        (product) => product.status.toLowerCase() === "active"
      );
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
          const response = await NewRequest.get(
            `/comment/replay/${product._id}`
          );
          const comments = response?.data?.comments || [];
          const totalRatings = comments.reduce(
            (acc, comment) => acc + (comment.rating || 0),
            0
          );
          const averageRating = comments.length
            ? totalRatings / comments.length
            : 0;

          return { ...product, comments, averageRating };
        } catch (error) {
          console.error(
            `Error fetching comments for product ${product._id}:`,
            error
          );
          return { ...product, comments: [], averageRating: 0 };
        }
      })
    );
  };

  // Helper function to fetch product ratings + review count
  const fetchProductRating = async (productId) => {
    try {
      const response = await NewRequest.get(`/comment/replay/${productId}`);
      const comments = response?.data?.comments || [];
      const totalRatings = comments.reduce(
        (acc, comment) => acc + (comment.rating || 0),
        0
      );
      const average = comments.length ? totalRatings / comments.length : 0;
      return { average, count: comments.length };
    } catch (error) {
      console.error(`Error fetching ratings for product ${productId}:`, error);
      return { average: 0, count: 0 };
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
  }, [cardData]);
  const getStoredUserData = () => {
    const storedUserResponseString = localStorage.getItem("userResponse");
    const storedUserResponse = JSON.parse(storedUserResponseString);
    return storedUserResponse?.data?.user || {};
  };

  const loginuserdata = getStoredUserData();
  const loginuserid =
    loginuserdata?._id || localStorage.getItem("userdata") || "";

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
      toast.error(
        error?.response?.data?.error || "Failed to add product to wishlist.",
        {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
        }
      );
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
  const { data: productsdata } = useQuery(
    "getcategoryproductget",
    fetchproductData
  );

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

  const toggleFullScreen = () => {
      const modalElement = document.getElementById("imageModal");
      if (!document.fullscreenElement) {
        modalElement.requestFullscreen().catch((err) => {
          console.log("Error attempting to enable fullscreen mode:", err);
        });
      } else {
        document.exitFullscreen();
      }
    };

     const panZoomRef = useRef(null);

     const handleDoubleClick = () => {
       if (panZoomRef.current) {
         // Check current zoom level and toggle zoom
         const currentZoom = panZoomRef.current.getTransform().scale;
         if (currentZoom === 1) {
           panZoomRef.current.zoomIn(1.5); // Zoom in to 1.5x
         } else {
           panZoomRef.current.reset(); // Reset to default zoom
         }
       }
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

  const goToCategoryFromBreadcrumb = () => {
    if (!data?.Category) return;
    const cat = productsdata?.find((c) => c.name === data.Category.name);
    if (cat) {
      viewmore(cat);
    } else {
      navigate(`/moreproduct/${encodeURIComponent(data.Category.name)}`);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    const title = data?.name || "Product";
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard");
      }
    } catch {
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard");
      } catch {
        toast.error("Could not share");
      }
    }
  };

  const handlePrint = () => window.print();

  const addToCompare = () => {
    if (!data?._id) return;
    try {
      const raw = localStorage.getItem("compareProducts") || "[]";
      const arr = JSON.parse(raw);
      if (!Array.isArray(arr)) {
        localStorage.setItem("compareProducts", JSON.stringify([data._id]));
        toast.success("Added to compare");
        return;
      }
      if (arr.includes(data._id)) {
        toast.info("Already in compare");
        return;
      }
      arr.push(data._id);
      localStorage.setItem("compareProducts", JSON.stringify(arr.slice(-4)));
      toast.success("Added to compare");
    } catch {
      toast.error("Could not add to compare");
    }
  };

  const saleActive = data && productHasSalePrice(data);
  const discountPct =
    saleActive && data
      ? (() => {
          const p = parsePriceNumber(data.price);
          const o = parsePriceNumber(data.originalPrice ?? data.oldPrice);
          if (Number.isNaN(p) || Number.isNaN(o) || o <= 0) return 0;
          return Math.max(1, Math.round((1 - p / o) * 100));
        })()
      : 0;
  const savingsAmount =
    saleActive && data
      ? (() => {
          const p = parsePriceNumber(data.price);
          const o = parsePriceNumber(data.originalPrice ?? data.oldPrice);
          if (Number.isNaN(p) || Number.isNaN(o)) return null;
          const diff = o - p;
          if (diff <= 0) return null;
          const sym = getProductCurrencySymbol(data);
          return `${sym} ${formatPriceAmount(String(Math.round(diff)))}`;
        })()
      : null;

  const inStock =
    data && String(data.status || "").toLowerCase() === "active";

  const images = data?.images?.length ? data.images : [];
  const safeImageIndex =
    images.length > 0
      ? Math.min(activeImageIndex, Math.max(0, images.length - 1))
      : 0;
  const mainImageSrc =
    images.length > 0 ? imageLiveUrl(images[safeImageIndex]) : "";

  return (
    <div className="pdp-page pdp-page--pt">
      <div className="pdp-topbar">
        <nav className="pdp-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span className="pdp-breadcrumbs__sep">/</span>
          {data?.Category?.name ? (
            <>
              <button
                type="button"
                className="pdp-breadcrumbs__current bg-transparent border-0 p-0 cursor-pointer text-left"
                style={{ color: "#6b7280", font: "inherit" }}
                onClick={goToCategoryFromBreadcrumb}
              >
                {data.Category.name}
              </button>
              <span className="pdp-breadcrumbs__sep">/</span>
            </>
          ) : null}
          <span className="pdp-breadcrumbs__current line-clamp-2">
            {isLoading ? "…" : data?.name || "Product"}
          </span>
        </nav>
        <div className="pdp-util">
          <button type="button" onClick={handleShare}>
            <ShareOutlinedIcon sx={{ fontSize: 18 }} />
            Share
          </button>
          <button type="button" onClick={handlePrint}>
            <PrintOutlinedIcon sx={{ fontSize: 18 }} />
            Print
          </button>
        </div>
      </div>

      <div className="pdp-grid">
        {/* Gallery */}
        <div className="pdp-gallery">
          <div className="pdp-gallery__main-wrap">
            {isLoading ? (
              <Skeleton variant="rectangular" width="100%" height={380} />
            ) : images.length ? (
              <>
                <img
                  src={mainImageSrc}
                  alt={data?.name || ""}
                  className="pdp-gallery__main-img"
                  onClick={() => openModal(safeImageIndex)}
                />
                <button
                  type="button"
                  className="pdp-gallery__expand"
                  aria-label="Expand image"
                  onClick={() => openModal(safeImageIndex)}
                >
                  <FullscreenIcon sx={{ fontSize: 22 }} />
                </button>
              </>
            ) : (
              <div className="text-gray-400 p-8">No image</div>
            )}
          </div>
          {!isLoading && images.length > 1 ? (
            <div className="pdp-thumbs" role="tablist" aria-label="Product images">
              {images.map((img, index) => (
                <button
                  key={index}
                  type="button"
                  className={`pdp-thumb ${
                    index === safeImageIndex ? "pdp-thumb--active" : ""
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                  aria-label={`Image ${index + 1}`}
                  aria-selected={index === safeImageIndex}
                >
                  <img src={imageLiveUrl(img)} alt="" />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {/* Product info */}
        <div className="pdp-info">
          {saleActive && discountPct ? (
            <span className="pdp-discount-badge">-{discountPct}%</span>
          ) : null}

          {isLoading ? (
            <Skeleton height={36} width="90%" />
          ) : (
            <h1 className="pdp-title">{data?.name || ""}</h1>
          )}

          <div className="pdp-meta">
            {data?.Category?.name ? (
              <span className="pdp-meta__cat">
                in{" "}
                <button type="button" onClick={goToCategoryFromBreadcrumb}>
                  {data.Category.name}
                </button>
              </span>
            ) : null}
            <span className="pdp-meta__reviews flex items-center gap-1">
              <Rating
                name="pdp-rating"
                precision={0.5}
                value={ratings}
                readOnly
                size="small"
                sx={{ color: "#facc15" }}
              />
              <span>
                ({reviewCount}{" "}
                {reviewCount === 1 ? "Review" : "Reviews"})
              </span>
            </span>
          </div>

          <div className="pdp-price-row">
            <div className="pdp-price-block">
              {isLoading ? (
                <Skeleton width={160} height={40} />
              ) : (
                <>
                  <span className="pdp-price-current">
                    {formatProductPriceDisplay(data)}
                  </span>
                  {saleActive ? (
                    <span className="pdp-price-old">
                      {formatProductOldPriceDisplay(data)}
                    </span>
                  ) : null}
                  {savingsAmount ? (
                    <span className="pdp-price-save">
                      Save: {savingsAmount}
                    </span>
                  ) : null}
                </>
              )}
            </div>
            <span
              className={`pdp-stock ${inStock ? "" : "pdp-stock--out"}`}
            >
              {inStock ? "Available in stock" : "Unavailable"}
            </span>
          </div>

          <div className="pdp-qty" aria-label="Quantity">
            <button
              type="button"
              disabled={quantity <= 1}
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              −
            </button>
            <span>{quantity}</span>
            <button
              type="button"
              disabled={quantity >= 99}
              onClick={() => setQuantity((q) => Math.min(99, q + 1))}
            >
              +
            </button>
          </div>

          <div className="pdp-actions">
            <button
              type="button"
              className="pdp-btn-cart"
              disabled={isLoading || !data}
              onClick={() => data && postcard(data)}
            >
              <ShoppingCartOutlinedIcon sx={{ fontSize: 20 }} />
              Add to cart
            </button>
            <button
              type="button"
              className="pdp-btn-buy"
              disabled={isLoading || !Userdataget}
              onClick={() => Userdataget && charfunction(Userdataget)}
            >
              Buy Now
            </button>
          </div>

          <div className="pdp-secondary-actions">
            <button
              type="button"
              disabled={isLoading || !data}
              onClick={addToCompare}
            >
              <SwapHorizIcon sx={{ fontSize: 20 }} />
              Add To Compare
            </button>
            <button
              type="button"
              disabled={isLoading || !data}
              onClick={() => data && postcard(data)}
            >
              <FavoriteBorderIcon sx={{ fontSize: 20 }} />
              Add To Wishlist
            </button>
          </div>

          {/* Seller card */}
          <div className="pdp-store-card">
            {isLoading ? (
              <Skeleton variant="circular" width={56} height={56} />
            ) : (
              <Avatar
                className="pdp-store-card__avatar"
                src={imageuser || ""}
                sx={{ width: 56, height: 56, cursor: "pointer" }}
                onClick={() => productlist(Userdataget)}
              />
            )}
            <div className="pdp-store-card__body">
              <div className="pdp-store-card__head">
                <p className="pdp-store-card__name">
                  {Userdataget?.User?.username || "Seller"}
                </p>
                <button
                  type="button"
                  className="pdp-store-card__chat"
                  onClick={() => charfunction(Userdataget)}
                >
                  Chat
                </button>
              </div>
              <div className="pdp-store-card__rating">
                <Rating
                  name="seller-rating"
                  precision={0.1}
                  value={ratings}
                  readOnly
                  size="small"
                  sx={{ color: "#facc15" }}
                />
                <span>
                  {ratings ? ratings.toFixed(2) : "—"} ({reviewCount}{" "}
                  {reviewCount === 1 ? "Review" : "Reviews"})
                </span>
              </div>
            </div>
          </div>

          <div className="pdp-ship-block">
            <div className="pdp-ship-row">
              <div className="pdp-ship-row__left">
                <LocalShippingOutlinedIcon className="pdp-ship-row__icon" />
                <div className="pdp-ship-row__text">
                  <strong>Free Shipping &amp; Returns</strong>
                  <span>On many items — check with the seller.</span>
                </div>
              </div>
              <button type="button" className="pdp-ship-row__link">
                See Details
              </button>
            </div>
            <div className="pdp-ship-row">
              <div className="pdp-ship-row__left">
                <LockOutlinedIcon className="pdp-ship-row__icon" />
                <div className="pdp-ship-row__text">
                  <strong>Delivery within 3–5 business days</strong>
                  <span>Estimated — varies by location.</span>
                </div>
              </div>
              <button type="button" className="pdp-ship-row__link">
                See Details
              </button>
            </div>
            <div className="pdp-ship-row">
              <div className="pdp-ship-row__left">
                <PinDropIcon className="pdp-ship-row__icon" />
                <div className="pdp-ship-row__text">
                  <strong>Location</strong>
                  <span>
                    {isLoading ? "…" : data?.location || "Not specified"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="sm:block lg:hidden mt-8">
            <Commentproduct productdata={cardData} />
          </div>
        </div>
      </div>

      <div className="pdp-section">
        <h2 className="pdp-section__title">Description</h2>
        <div className="pdp-description">
          {isLoading ? (
            <Skeleton variant="rounded" height={120} />
          ) : (
            <p className="text-productdesc mb-0 w-full">
              <span
                dangerouslySetInnerHTML={{
                  __html: data?.description || "",
                }}
              />
            </p>
          )}
        </div>
      </div>

      {productsdata && productsdata.length > 0 ? (
        <div className="pdp-categories-box hidden lg:block">
          <h3>Product Categories</h3>
          <ul>
            {productsdata.map((category, index) => (
              <li key={index}>
                <button type="button" onClick={() => viewmore(category)}>
                  {category?.name || ""} ({category?.count || "0"})
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="pdp-section w-full mt-2">
        <p className="pdp-related-title">Related ads</p>
        <div className="pdp-related-wrap w-full">
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
            // pagination={{
            //   clickable: true,
            // }}
            pagination={isMobile ? false : { clickable: true }}
            modules={[Keyboard, Scrollbar, Navigation, Pagination]}
            className="mySwiper py-6"
          >
            <div className="w-full ">
              {/* <SwiperSlide> */}
              {isLoading ? (
                <Skeleton variant="rounded" height={250} />
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
                                color: "#facc15",
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

      {isOpen && (
        <div
          id="imageModal"
          className="fixed z-50 left-0 top-0 w-full h-full overflow-auto bg-black bg-opacity-90 flex items-center justify-center"
        >
          <div className="absolute top-4 right-8 z-50 flex items-center gap-6 text-white text-4xl font-bold">
            <FullscreenIcon
              fontSize="large"
              className="me-10 my-auto cursor-pointer transition duration-300 hover:text-gray-400"
              onClick={toggleFullScreen} // Trigger fullscreen toggle
            />
            <span
              onClick={closeModal}
              className="my-auto cursor-pointer transition duration-300 hover:text-gray-400"
            >
              &times;
            </span>
          </div>

          <div className="relative w-full h-full mx-auto z-0 flex items-center justify-center">
            <Swiper
              initialSlide={selectedImage}
              modules={[Navigation, Pagination]}
              spaceBetween={30}
              centeredSlides={true}
              navigation={{
                nextEl: "#swiper-button-next",
                prevEl: "#swiper-button-prev",
              }}
              pagination={{
                clickable: true,
              }}
              // modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper w-full h-full"
            >
              {data?.images?.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="w-full h-full flex justify-center items-center">
                    {/* Apply PanZoom directly on the image */}
                    <PanZoom
                      minZoom={1}
                      maxZoom={3}
                      enablePan={true}
                      enableZoom={true}
                      onDoubleClick={handleDoubleClick} // Attach double-click handler
                      className="h-full w-full flex items-center justify-center"
                    >
                      <img
                        src={imageLiveUrl(image)}
                        className="object-contain max-w-full max-h-full mx-auto"
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
