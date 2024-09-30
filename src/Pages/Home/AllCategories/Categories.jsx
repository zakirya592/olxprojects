import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import NewRequest from "../../../../utils/NewRequest";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import imageLiveUrl from "../../../../utils/urlConverter/imageLiveUrl";

function Categories() {

  const navigate = useNavigate();
  const {
    isLoading,
    error,
    data: eventsData,
  } = useQuery("category", fetchUpcomingEventsData);
  const navigator = useNavigate()
  async function fetchUpcomingEventsData() {
    const response = await NewRequest.get("/category");
    return response?.data.filter((item) => item.status === 1) || [];
  }

  async function fetchproductData() {
    const response = await NewRequest.get("/product/getcategoryproduct");
    const mobilesCategory = response?.data
    return mobilesCategory;
  }

  const { data: productsdata } = useQuery("productgetcategoryss", fetchproductData);

  const viewmore = (product) => {
    const selectedCategoryProducts = productsdata.find(
      (item) => item.category.name === product.name
    );

    const subResponseString = JSON.stringify(selectedCategoryProducts);
    sessionStorage.setItem("productmore", subResponseString);
    navigate(`/moreproduct/${selectedCategoryProducts?.category?.name}`);
  };


  return (
    <div className="py-10">
      {/* Slider for Small Screens */}
      <div className="lg:hidden">
        <Swiper spaceBetween={50} slidesPerView={3}>
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            ""
          ) : (
            eventsData.map((item) => (
              <SwiperSlide key={item.id}>
                <div
                  onClick={() => viewmore(item)}
                  className="font-semibold text-white sm:text-lg text-base hover:text-primary mt-3 cursor-pointer"
                >
                  <div className="flex flex-col items-center w-full justify-center">
                    {item?.icon ? (
                      <img
                        src={imageLiveUrl(item.icon)}
                        alt="icon"
                        className="w-14 h-14 object-contain"
                      />
                    ) : (
                      <div className="w-14 h-14 mt-1 flex justify-center items-center">
                        <div className="w-10 h-10 border border-gray-300 rounded-full"></div>
                      </div>
                    )}
                    <div className="w-full mt-3 text-center">
                      <p className="text-black">{item.name}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>

      {/* Grid for Large Screens */}
      <div className="hidden lg:grid 2xl:grid-cols-4 xl:grid-cols-4 gap-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 sm:px-2 px-2 w-full mx-auto mb-3">
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          ""
        ) : (
          eventsData.map((item) => (
            <div key={item.id} className="w-full py-4 bg-[#303030] rounded-lg">
              <div
                onClick={() => viewmore(item)}
                className="font-semibold text-white sm:text-lg text-base hover:text-primary mt-3 cursor-pointer"
              >
                <div className="flex flex-col items-center w-full justify-center">
                  {item?.icon ? (
                    <img
                      src={imageLiveUrl(item.icon)}
                      alt="icon"
                      className="w-14 h-14 object-contain"
                    />
                  ) : (
                    <div className="w-14 h-14 mt-1 flex justify-center items-center">
                      <div className="w-10 h-10 border border-gray-300 rounded-full"></div>
                    </div>
                  )}
                  <div className="w-full mt-3 text-center">
                    <p className="">{item.name}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Categories;
