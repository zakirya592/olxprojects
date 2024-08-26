import { useState, useEffect } from "react";
import "react-phone-input-2/lib/style.css";
import "./Login.css";
import Login from "./Login";
import { MdOutlineMailOutline } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import Singup from "./Singup";
import { FaGoogle } from "react-icons/fa6";
import Firstsinguppop from "./Firstsinguppop";
import logo from "../../../assets/Images/logo1.png";
import NewRequest from "../../../../utils/NewRequest";
import { baseUrl } from "../../../../utils/config";
import { useNavigate } from "react-router-dom";

const Firstloginsinup = ({ isVisible, setVisibility }) => {
   const navigate = useNavigate();
  const handleCloseCreatePopup = () => {
    setVisibility(false);
  };

   const [isCreatePopupVisiblepopfirstsinguppage, setisCreatePopupVisiblepopfirstsinguppage] = useState(false);
   const handleShowCreatePopuppopfirstsinguppage = () => {
     setisCreatePopupVisiblepopfirstsinguppage(true);
     setCreatePopupVisibilitypoplogin(false)
   };

      const [isCreatePopupVisiblepoplogin, setCreatePopupVisibilitypoplogin] = useState(false);
   const handleShowCreatePopuppoplogin = () => { 
     setCreatePopupVisibilitypoplogin(true);
   };

   const handleGoogleLoginSuccess = () => {
      window.location.href = `${baseUrl}/users/login_with_google`;
    };

     useEffect(() => {
       const handleRedirect = () => {
         const response = {
           success: true,
           redirectUrl: "login", // Example response
         };
         if (response.success) {
           navigate(`/`);
         } else {
           console.error("Signup failed. Redirect URL:", response.redirectUrl);
         }
       };

       handleRedirect();
     }, []);


  return (
    <div>
      {/* create the post api popup */}
      {isVisible && (
        <div className="popup-overlay z-50 text-center justify-center">
          <div className="popup-container bg-gray-100  h-auto sm:w-[30%] justify-center w-full">
            <div
              className="popup-form w-full "
              style={{ maxHeight: "90vh", overflowY: "auto" }}
            >
              <div className="flex justify-end items-end text-end  w-full">
                <RxCross2
                  size={24}
                  onClick={handleCloseCreatePopup}
                  className="cursor-pointer"
                />
              </div>
              <form className="w-full">
                <div className="flex justify-center items-center mb-10">
                  <img
                    src={logo}
                    alt=""
                    className="h-24 w-auto cursor-pointer"
                  />
                </div>
                <h2
                  className={`text-loactioncolor font-sans font-semibold text-2xl`}
                >
                  Login into your account
                </h2>

                <div className="flex w-full justify-center items-center text-center my-10">
                  <div
                    className="border flex border-[#002f34] hover:shadow-lg justify-center cursor-pointer items-center text-center rounded-md hover:border-3 my-auto"
                    onClick={handleShowCreatePopuppoplogin}
                  >
                    <MdOutlineMailOutline size={24} className="my-auto ms-10" />
                    <p className="text-[#002f34] p-3 my-auto text-lg me-10">
                      Login with Email
                    </p>
                  </div>
                </div>

                <div className="flex w-full justify-center items-center text-center my-10">
                  <div
                    className="border flex border-[#002f34] hover:shadow-lg justify-center cursor-pointer items-center text-center rounded-md hover:border-3 my-auto"
                    onClick={handleGoogleLoginSuccess}
                  >
                    <FaGoogle size={24} className="my-auto ms-9" />
                    <p className="text-[#002f34] p-3 my-auto text-lg me-9">
                      Login with Goolge
                    </p>
                  </div>
                </div>

                <p
                  className="cursor-pointer text-indigo-500 "
                  onClick={handleShowCreatePopuppopfirstsinguppage}
                >
                  Create an account
                </p>
              </form>
            </div>
          </div>
        </div>
      )}

      {isCreatePopupVisiblepopfirstsinguppage && (
        <Firstsinguppop
          isVisiblesinuppage={isCreatePopupVisiblepopfirstsinguppage}
          setVisibilitysinuppage={setisCreatePopupVisiblepopfirstsinguppage}
          // refreshBrandData={fetchData}
        />
      )}
      {isCreatePopupVisiblepoplogin && (
        <Login
          isVisiblepop={isCreatePopupVisiblepoplogin}
          setVisibilitypop={setCreatePopupVisibilitypoplogin}
          // refreshBrandData={fetchData}
          setParentVisibility={setVisibility}
        />
      )}
    </div>
  );
};

export default Firstloginsinup;
