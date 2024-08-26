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
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Firstsinguppop = ({ isVisiblesinuppage, setVisibilitysinuppage }) => {
  const [isCreatePopupVisiblepop, setCreatePopupVisibilitypop] = useState(false);
  const [isCreatePopupVisible, setCreatePopupVisibility] = useState(false);
  const navigate=useNavigate()
  const handleCloseCreatePopup = () => {
    setVisibilitysinuppage(false);
    setCreatePopupVisibilitypop(false);
    setCreatePopupVisibility(false);
  };
  const handleShowCreatePopuppop = () => {
    setCreatePopupVisibilitypop(true);
    setCreatePopupVisibility(false)
  };
  const handleShowCreatePopup = () => {
    setCreatePopupVisibility(true);
    setCreatePopupVisibilitypop(false)
  };

  const handleGoogleSignup = () => {
    window.location.href = "https://talhaolx.vercel.app/users/signup_with_google";
  };

  useEffect(() => {
    const handleRedirect = () => {
      // This is just an example. You would need to integrate with actual success status or auth context
      const signupSuccess = false; // Replace with actual check
      const response = {
        success: false,
        redirectUrl: "login", // Example response
      };
      if (response.success) {
        navigate(`/`);
      } else {
        // Handle case where signup failed or response is unsuccessful
        console.error("Signup failed. Redirect URL:", response.redirectUrl);
        // Optionally show an error message or handle failure
      }
      if (signupSuccess) {
        // window.location.href = "/home";
        navigate("/");
        toast.success(`Sign Up has been successfully".`, {
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

    handleRedirect();
  }, []);

  return (
    <div>
      {/* create the post api popup */}
      {isVisiblesinuppage && (
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
                  Create a new account
                </h2>

                <div className="flex w-full justify-center items-center text-center my-10">
                  <div
                    className="border flex border-[#002f34] hover:shadow-lg justify-center cursor-pointer items-center text-center rounded-md hover:border-3 my-auto"
                    onClick={handleShowCreatePopuppop}
                  >
                    <MdOutlineMailOutline size={24} className="my-auto ms-10" />
                    <p className="text-[#002f34] p-3 my-auto text-lg me-10">
                      Join with Email
                    </p>
                  </div>
                </div>

                <div className="flex w-full justify-center items-center text-center my-10">
                  <div
                    className="border flex border-[#002f34] hover:shadow-lg justify-center cursor-pointer items-center text-center rounded-md hover:border-3 my-auto"
                    onClick={handleGoogleSignup}
                  >
                    <FaGoogle size={24} className="my-auto ms-9" />
                    <p className="text-[#002f34] p-3 my-auto text-lg me-9">
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
