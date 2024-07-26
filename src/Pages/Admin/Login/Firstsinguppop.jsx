import { useState, useEffect } from "react";
import "react-phone-input-2/lib/style.css";
import "./Login.css";
import Login from "./Login";
import { MdOutlineMailOutline } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import Singup from "./Singup";
import { FaGoogle } from "react-icons/fa6";
import Firstloginsinup from "./Firstloginsinup";
import logo from "../../../assets/Images/logo1.png"

const Firstsinguppop = ({ isVisiblesinuppage, setVisibilitysinuppage }) => {
  const handleCloseCreatePopup = () => {
    setVisibilitysinuppage(false);
  };

  const [isCreatePopupVisiblepop, setCreatePopupVisibilitypop] =
    useState(false);
  const handleShowCreatePopuppop = () => {
    setCreatePopupVisibilitypop(true);
  };

   const [isCreatePopupVisible, setCreatePopupVisibility] = useState(false);
   const handleShowCreatePopup = () => {
     setCreatePopupVisibility(true);
   };

  return (
    <div>
      {/* create the post api popup */}
      {isVisiblesinuppage && (
        <div className="popup-overlay z-50 text-center justify-center">
          <div className="popup-container bg-gray-100  h-auto sm:w-[40%] justify-center w-full">
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
                <img src={logo} alt="" className="h-24 w-auto cursor-pointer" />
                </div>
                <h2
                  className={`text-loactioncolor font-sans font-semibold text-2xl`}
                >
                  Create a new account
                </h2>

                <div className="flex w-full justify-center items-center text-center my-10">
                  <div
                    className="border flex border-[#002f34] hover:shadow-lg justify-center cursor-pointer items-center text-center w-full rounded-md hover:border-3 my-auto"
                    onClick={handleShowCreatePopuppop}
                  >
                    <MdOutlineMailOutline size={24} className="my-auto" />
                    <p className="text-[#002f34] p-3 my-auto text-lg">
                      Join with Email
                    </p>
                  </div>
                </div>

                <div className="flex w-full justify-center items-center text-center my-10">
                  <div
                    className="border flex border-[#002f34] hover:shadow-lg justify-center cursor-pointer items-center text-center w-full rounded-md hover:border-3 my-auto"
                    // onClick={handleShowCreatePopuppoplogin}
                  >
                    <FaGoogle size={24} className="my-auto" />
                    <p className="text-[#002f34] p-3 my-auto text-lg">
                      Join with Goolge
                    </p>
                  </div>
                </div>

                <p
                  className="cursor-pointer text-indigo-500 "
                  onClick={handleShowCreatePopup}
                >
                  Already have an account? Log in
                </p>
              </form>
            </div>
          </div>
        </div>
      )}

      {isCreatePopupVisiblepop && (
        <Singup
          isVisiblepop={isCreatePopupVisiblepop}
          setVisibilitypop={setCreatePopupVisibilitypop}
          // refreshBrandData={fetchData}
        />
      )}

      {isCreatePopupVisible && (
        <Firstloginsinup
          isVisible={isCreatePopupVisible}
          setVisibility={setCreatePopupVisibility}
          // refreshBrandData={fetchData}
        />
      )}
    </div>
  );
};

export default Firstsinguppop;
