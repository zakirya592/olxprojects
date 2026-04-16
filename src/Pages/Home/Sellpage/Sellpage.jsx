import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { GrNext } from "react-icons/gr";
import NewRequest from "../../../../utils/NewRequest";
import { useQuery } from "react-query";
import "./Sellpage.css";
import Headerpost from "../Headeepost/Headerpost";
import imageLiveUrl from "../../../../utils/urlConverter/imageLiveUrl";
import { toast } from "react-toastify";
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

  const handleClick = (footer) => {
    sessionStorage.setItem("footer", JSON.stringify(footer));
    navigate("/Post/Attributes");
  };

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedfooter, setselectedfooter] = useState(null);

   const storedUserResponseString = localStorage.getItem("userResponse");
   const storedUserResponse = JSON.parse(storedUserResponseString);
   let loginuserdata = storedUserResponse?.data.user || "";

   if (!loginuserdata) {
     loginuserdata = localStorage.getItem("userdata") || "";
   }

  const handleCategoryClick = (category) => {

     if ( (category.name === "Gemstone" && !loginuserdata.isGemstone) ||
       (category.name === "wholesale B2B" && !loginuserdata.isGemstone) ||
       (category.name === "Carpets Rawala" && !loginuserdata.isGemstone)) {
       toast.error(`You are not a ${category.name} user!`, {
         position: "top-right",
         autoClose: 2000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
       });
     } else {
       setSelectedCategory(category);
       const userResponseString = JSON.stringify(category);
       sessionStorage.setItem("category", userResponseString);
       setselectedfooter(null);
     }

  };

  const handlefooterCategoryClick = (sub) => {
    const subResponseString = JSON.stringify(sub);
    sessionStorage.setItem("subCategories", subResponseString);

    if (!sub.footerCategories || sub.footerCategories.length === 0) {
      navigate("/Post/Attributes");
    } else {
      setselectedfooter(sub);
    }
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="sell-page-root">
      <Headerpost />

      <div className="sell-container">
        {!selectedCategory ? (
          <div className="sell-pick-shell">
            <h1 className="sell-hero-title">Post Your Ad</h1>

            {isLoading ? (
              <div className="sell-loading">Loading categories…</div>
            ) : error ? null : (
              <div className="sell-card-grid">
                {(eventsData || []).map((category) => (
                  <button
                    key={category._id}
                    type="button"
                    className="sell-card"
                    onClick={() => handleCategoryClick(category)}
                  >
                    <div className="sell-card-inner">
                      {category.icon ? (
                        <img
                          src={imageLiveUrl(category.icon)}
                          alt=""
                          className="sell-card-thumb"
                        />
                      ) : (
                        <div className="sell-card-thumb sell-card-thumb--placeholder" />
                      )}
                      <span className="sell-card-label">{category.name}</span>
                    </div>
                    <GrNext size={18} className="sell-card-chevron" aria-hidden />
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="sell-flow">
            <div className="sell-flow-head">
              <button
                type="button"
                className="sell-back"
                onClick={handleBackClick}
              >
                <IoMdArrowBack size={18} />
                <span>Back</span>
              </button>
              <h2 className="sell-heading">Choose a category</h2>
            </div>

            <div className="sell-choose-card">
              <div className="sell-cols">
                <div className="sell-col sell-col--left">
                  {(eventsData || []).map((category) => (
                    <button
                      key={category._id}
                      type="button"
                      className={
                        category._id === selectedCategory._id
                          ? "sell-list-item sell-list-item--active"
                          : "sell-list-item"
                      }
                      onClick={() => handleCategoryClick(category)}
                    >
                      <div className="sell-item-left">
                        {category.icon ? (
                          <img
                            src={imageLiveUrl(category.icon)}
                            alt=""
                            className="sell-icon"
                          />
                        ) : (
                          <div className="sell-icon sell-icon--placeholder" />
                        )}
                        <span className="sell-item-text">{category.name}</span>
                      </div>
                      <GrNext size={18} className="sell-item-next" />
                    </button>
                  ))}
                </div>

                <div className="sell-col sell-col--middle">
                  {selectedCategory.subCategories &&
                  selectedCategory.subCategories.length > 0 ? (
                    selectedCategory.subCategories.map((sub, index) => (
                      <button
                        key={index}
                        type="button"
                        className={
                          selectedfooter && selectedfooter._id === sub._id
                            ? "sell-list-item sell-list-item--active"
                            : "sell-list-item"
                        }
                        onClick={() => handlefooterCategoryClick(sub)}
                      >
                        <span className="sell-item-text sell-item-text--single">
                          {sub.name}
                        </span>
                        {sub.footerCategories &&
                        sub.footerCategories.length > 0 ? (
                          <GrNext size={18} className="sell-item-next" />
                        ) : null}
                      </button>
                    ))
                  ) : (
                    <div className="sell-empty">No subcategories available.</div>
                  )}
                </div>

                <div className="sell-col sell-col--right">
                  {selectedfooter &&
                  selectedfooter.footerCategories &&
                  selectedfooter.footerCategories.length > 0 ? (
                    selectedfooter.footerCategories.map((footer, index) => (
                      <button
                        key={index}
                        type="button"
                        className="sell-list-item"
                        onClick={() => handleClick(footer)}
                      >
                        <span className="sell-item-text sell-item-text--single">
                          {footer.name}
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="sell-empty">Select a subcategory</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sellpage;
