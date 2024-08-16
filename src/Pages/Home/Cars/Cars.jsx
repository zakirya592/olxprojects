import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
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
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import imagecard from "../../../assets/Images/cars.webp";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineNavigateNext } from "react-icons/md";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SlSpeedometer } from "react-icons/sl";
import NewRequest from "../../../../utils/NewRequest";
import { useQuery } from "react-query";


const Cars = () => {
  const isSmallScreen = useMediaQuery("(max-width: 425px)");

    // Fetch data and filter based on status and category
  async function fetchproductData() {
    const response = await NewRequest.get("/product/getcategoryproduct");

    // Find the "Mobiles" category and filter products with status === 1
    const mobilesCategory = response?.data.find(
      (item) => item.category.name === "Vichels"
    );

return mobilesCategory;
    
  }

  // Use the data in your component
  const { isLoading, error, data: productsdataVichels } = useQuery("productgetcategoryproductVichels", fetchproductData);
console.log(productsdataVichels);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;

  const cards = [
    {
      id: 1,
      price: "Rs,2400000",
      description: "Honda Civic VTi Oriel Prosmatec 2009",
      speed: "212000 . 2022",
      location: "Gulberg 3, Peshware kpk Pakistan",
      daysAgo: "5 Week ago",
      link: "#",
      image: imagecard,
    },
    {
      id: 2,
      price: "Rs,350",
      description:
        "Sony xperia5 Mark 2 5Mark 3 XZ3 Fujitsu F52 F51 Balmuda LG velvet",
      speed: "212000 . 2022",
      location: "Gulberg 3, Lahore",
      daysAgo: "5 day ago",
      link: "#",
      image: imagecard,
    },
    {
      id: 3,
      price: "Rs,350",
      description:
        "Sony xperia5 Mark 2 5Mark 3 XZ3 Fujitsu F52 F51 Balmuda LG velvet",
      speed: "212000 . 2022",
      location: "Gulberg 3, Lahore",
      daysAgo: "5 day ago",
      link: "#",
      image: imagecard,
    },
    {
      id: 4,
      price: "Rs,350",
      description:
        "Sony xperia5 Mark 2 5Mark 3 XZ3 Fujitsu F52 F51 Balmuda LG velvet",
      location: "Gulberg 3, Lahore",
      speed: "212000 . 2022",
      daysAgo: "5 day ago",
      link: "#",
      image: imagecard,
    },
    // Add more card objects as needed
  ];

  return (
    <div className="relative h-auto w-full bg-white border-b mt-10 mb-20">
      <div className="flex justify-between my-auto">
        <h6 className="text-headingcolor text-3xl font-bold overflow-hidden">
          Cars
        </h6>
        <div className="text-viewmorebutton text-xl flex cursor-pointer my-auto">
          <span>View more</span> <MdOutlineNavigateNext size={30} />
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
            {cards.map((card) => (
              <SwiperSlide key={card.id}>
                <div className="h-auto w-full py-1 border border-gray-300 rounded-md shadow-lg transition-transform transform hover:scale-110">
                  <Link
                    to={card.link}
                    className="font-semibold text-secondary sm:text-lg text-base hover:text-primary mt-3"
                  >
                    <img
                      src={card.image}
                      alt=""
                      className="w-full h-44 object-cover"
                    />
                    <div className="w-full">
                      <div className="px-3 flex flex-row mt-5 justify-between gap-2">
                        <p className="text-secondary sm:text-lg text-base">
                          {card.price}
                        </p>
                        <FaRegHeart />
                      </div>
                      <p className="px-3 mt-3 text-headingcolor font-normal">
                        {card.description}
                      </p>
                      <div className="px-3 pt-1 text-loactioncolor font-normal flex my-auto">
                        <SlSpeedometer />{" "}
                        <span className="my-auto ms-3"> {card.speed} </span>
                      </div>
                      <p className="px-3 mt-3 text-loactioncolor font-normal">
                        {card.location}
                      </p>
                      <span className="px-3 text-headingcolor font-light mb-7 text-sm">
                        {card.daysAgo}
                      </span>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="grid 2xl:grid-cols-4 xl:grid-cols-4 gap-7 lg:grid-cols-3 md:grid-cols-3 grid-cols-1 sm:px-2 px-2 mb-3">
            {cards.map((card) => (
              <div
                key={card.id}
                className="h-auto w-full py-1 border border-gray-300 my-3 rounded-md shadow-lg transition-transform transform hover:scale-110"
              >
                <Link
                  to={card.link}
                  className="font-semibold text-secondary sm:text-lg text-base hover:text-primary mt-3"
                >
                  <img
                    src={card.image}
                    alt=""
                    className="w-full h-44 object-cover"
                  />
                  <div className="w-full">
                    <div className="px-3 flex flex-row mt-5 justify-between gap-2">
                      <p className="text-secondary sm:text-lg text-base">
                        {card.price}
                      </p>
                      <FaRegHeart />
                    </div>
                    <p className="px-3 mt-3 text-detailscolor font-normal">
                      {card.description}
                    </p>
                    <div className="px-3 pt-1 text-loactioncolor font-normal flex my-auto">
                      <SlSpeedometer />{" "}
                      <span className="my-auto ms-3"> {card.speed} </span>
                    </div>
                    <p className="px-3 mt-3 text-loactioncolor font-normal">
                      {card.location}
                    </p>
                    <span className="px-3 text-loactioncolor font-light mb-7 text-sm">
                      {card.daysAgo}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cars;
