import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import NewRequest from "../../../../utils/NewRequest";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./Login.css";
import Login from "./Login";
import { MdOutlineMailOutline } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import Singup from "./Singup";

const Firstloginsinup = ({ isVisible, setVisibility }) => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [address, setaddress] = useState("");
  const [aboutMe, setaboutMe] = useState("");
  const [companyLandLine, setCompanyLandLine] = useState("");

  const [companyLandlineError, setCompanyLandlineError] = useState("");

  const handleCloseCreatePopup = () => {
    setVisibility(false);
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageshow, setimageshow] = useState("");

  function handleChangeback(e) {
    setSelectedFile(e.target.files[0]);
    setimageshow(e.target.files[0]);
  }

  const handlecompanyLandLine = (value) => {
    // Reset error message
    setCompanyLandlineError("");

    // Check if the country code is for Saudi Arabia
    if (value.startsWith("966")) {
      // Check for mobile number (should start with '9665')
      // if (value.length > 1 && value[3] !== '5') {
      //     setCompanyLandlineError('Mobile number must start with 9665');
      // }

      // Check for maximum length (12 digits including country code)
      if (value.length > 12) {
        setCompanyLandlineError(
          `${t("Number must be a maximum of 12 digits")}`
        );
      }
    }

    // Set the mobile number
    setCompanyLandLine(value);
  };

  const handleAddCompany = async () => {
    const formData = new FormData();
    formData.append("username", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("dateOfBirth", dateOfBirth);
    formData.append("aboutMe", aboutMe);
    formData.append("phone", companyLandLine);
    formData.append("address", address);
    formData.append("image", imageshow);
    try {
      const response = await NewRequest.post("/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
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
      handleCloseCreatePopup();
    } catch (error) {
      console.log(error);
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
      // console.log(error);
    }
  };

   const [isCreatePopupVisiblepop, setCreatePopupVisibilitypop] = useState(false);
   const handleShowCreatePopuppop = () => {
     setCreatePopupVisibilitypop(true);
   };

      const [isCreatePopupVisiblepoplogin, setCreatePopupVisibilitypoplogin] = useState(false);
   const handleShowCreatePopuppoplogin = () => {
     setCreatePopupVisibilitypoplogin(true);
   };

  return (
    <div>
      {/* create the post api popup */}
      {isVisible && (
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
                <h2
                  className={`text-loactioncolor font-sans font-semibold text-2xl`}
                >
                  Login into your account
                </h2>

                <div className="flex w-full justify-center items-center text-center my-10">
                  <div
                    className="border flex border-[#002f34] hover:shadow-lg justify-center cursor-pointer items-center text-center w-full rounded-md hover:border-3 my-auto"
                    onClick={handleShowCreatePopuppoplogin}
                  >
                    <MdOutlineMailOutline size={24} className="my-auto" />
                    <p className="text-[#002f34] p-3 my-auto text-lg">
                      Login with Email
                    </p>
                  </div>
                </div>

                <p
                  className="cursor-pointer text-indigo-500 "
                  onClick={handleShowCreatePopuppop}
                >
                  Create an account
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
      {isCreatePopupVisiblepoplogin && (
        <Login
          isVisiblepop={isCreatePopupVisiblepoplogin}
          setVisibilitypop={setCreatePopupVisibilitypoplogin}
          // refreshBrandData={fetchData}
        />
      )}
    </div>
  );
};

export default Firstloginsinup;
