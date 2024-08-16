import React, { useContext, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { GrNext } from "react-icons/gr";
import NewRequest from "../../../../utils/NewRequest";
import { useQuery } from "react-query";
import log from "../../../assets/Images/logo1.png"
import Headerpost from "../Headeepost/Headerpost";
import { Selectioncardcontext } from "../../../Contextapi/Selectioncardcontext";
function Sellpage() {
  const navigate = useNavigate();

  const {
    isLoading,
    error,
    data: eventsData,
  } = useQuery("footerCategory/megamenu", fetchUpcomingEventsData);

  async function fetchUpcomingEventsData() {
    const response = await NewRequest.get("/footerCategory/megamenu");
    return response?.data.filter((item) => item.status === 1) || [];
  }

  const { setDataSelectionModel } = useContext(Selectioncardcontext);

  const handleClick = (footer) => {
    //  setDataSelectionModel((prev) => [...prev, footer]);
    sessionStorage.setItem("footer", JSON.stringify(footer));
    navigate("/Post/Attributes");
  };

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedfooter, setselectedfooter] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    const userResponseString = JSON.stringify(category);
    sessionStorage.setItem("category", userResponseString);
    setselectedfooter(null);
  };


  const handlefooterCategoryClick = (sub) => {
    setselectedfooter(sub);
    const subResponseString = JSON.stringify(sub);
    sessionStorage.setItem("subCategories", subResponseString);
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
  };



  return (
    <div>
      <Headerpost />
      <div className="bg-white">
        <div className="mx-10">
          <h1 className="text-3xl font-bold mb-10 text-center">Post Your Ad</h1>
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            ""
          ) : (
            <div>
              {selectedCategory ? (
                <div>
                  <button
                    className="mb-4 flex items-center text-lg font-semibold text-gray-600"
                    onClick={handleBackClick}
                  >
                    <IoMdArrowBack size={20} className="mr-2" />
                    Back
                  </button>
                  <h2 className="text-2xl font-bold mb-4">Choose a category</h2>

                  <div className="w-full border rounded-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
                      <div className="border-r">
                        {eventsData.map((category) => (
                          <div
                            key={category._id}
                            className={`flex border-b py-1 justify-between my-auto cursor-pointer ${selectedCategory._id === category._id
                                ? "bg-headingcolor text-white"
                                : "bg-transparent hover:bg-[#406367]  active:bg-[#406367] text-headingcolor hover:text-white active:text-white"
                              }`}
                            onClick={() => handleCategoryClick(category)}
                          >
                            <div className="flex my-auto">
                              {category.icon ? (
                                <img
                                  src={category.icon}
                                  alt="icon"
                                  className="h-10 mt-1 mx-2"
                                />
                              ) : (
                                <div className="mt-1 flex justify-center items-center mx-2">
                                  <div className="w-10 h-10 border border-gray-300 rounded-full"></div>
                                </div>
                              )}
                              <div className="w-full my-auto">
                                <p className="text-lg font-semibold ">
                                  {category.name}
                                </p>
                              </div>
                            </div>
                            <GrNext size={24} className="my-auto" />
                          </div>
                        ))}
                      </div>
                      <div className="border-r">
                        {selectedCategory.subCategories &&
                          selectedCategory.subCategories.length > 0 ? (
                          selectedCategory.subCategories.map((sub, index) => (
                            <div
                              key={index}
                              // onClick={() => handlefooterCategoryClick(sub)}
                              onClick={() => {
                                if (
                                  sub.footerCategories &&
                                  sub.footerCategories.length > 0
                                ) {
                                  handlefooterCategoryClick(sub);
                                } else {
                                  handleClick(sub);
                                }
                              }}
                            >
                              <p
                                className={`p-3 border-b py-4 justify-between cursor-pointer flex my-auto ${selectedfooter &&
                                    selectedfooter._id === sub._id
                                    ? "bg-headingcolor text-white"
                                    : "bg-transparent hover:bg-[#406367]  active:bg-[#406367] text-headingcolor hover:text-white active:text-white"
                                  }`}
                              >
                                {sub.name}
                                {sub.footerCategories &&
                                  sub.footerCategories.length > 0 && (
                                    <GrNext size={24} className="my-auto" />
                                  )}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p>No subcategories available.</p>
                        )}
                      </div>
                      <div className="border-r">
                        {selectedfooter &&
                          selectedfooter.footerCategories &&
                          selectedfooter.footerCategories.length > 0 ? (
                          selectedfooter.footerCategories.map(
                            (footer, index) => (
                              <div
                                key={index}
                              // className="flex border-b py-3 justify-between my-auto bg-transparent hover:bg-[#406367] cursor-pointer"
                              >
                                <div className="flex my-auto">
                                  <div className="w-full my-auto">
                                    <p
                                      className="p-3 border-b py-4 justify-between  cursor-pointer flex my-auto bg-transparent text-headingcolor hover:text-white hover:bg-headingcolor active:bg-headingcolor"
                                      onClick={() => handleClick(footer)}
                                    >
                                      {footer.name}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )
                          )
                        ) : (
                          <p></p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                  {eventsData.map((category) => (
                    <div
                      key={category._id}
                      className="flex border border-black rounded-lg py-3 justify-between my-auto text-[#406367] hover:text-white bg-transparent hover:bg-[#406367]  cursor-pointer"
                      onClick={() => handleCategoryClick(category)}
                    >
                      <div className="flex my-auto">
                        {category.icon ? (
                          <img
                            src={category.icon}
                            alt="icon"
                            className="h-10 mt-1 mx-2"
                          />
                        ) : (
                          <div className="mt-1 flex justify-center items-center mx-2">
                            <div className="w-8 h-8 border border-gray-300 rounded-full"></div>
                          </div>
                        )}
                        <div className="w-full my-auto">
                          <p className="text-lg font-semibold ">
                            {category.name}
                          </p>
                        </div>
                      </div>
                      <GrNext size={24} className="my-auto" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sellpage;
