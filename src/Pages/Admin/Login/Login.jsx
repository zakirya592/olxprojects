import { useState } from "react";
import { toast } from "react-toastify";
import NewRequest from "../../../../utils/NewRequest";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import icons
import "./Login.css";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/Images/logo1.png";

const Login = ({ isVisiblepop, setVisibilitypop, setParentVisibility }) => {
  const navigator = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleCloseCreatePopup = () => {
    setVisibilitypop(false);
  };

  const handleAddCompany = async () => {
    try {
      const response = await NewRequest.post("/users/login", {
        email: email,
        password: password,
      });

      const userstatus = response.data.user.status;
      if (userstatus === 1) {
        navigator("/");

        console.log(response.data);
        sessionStorage.setItem("authToken", response.data.token);
        // Correct way to store an object in sessionStorage
        localStorage.setItem("userdata", response.data);
        // Convert the object to a JSON string
        const userResponseString = JSON.stringify(response);
        // Store the JSON string in sessionStorage
        sessionStorage.setItem("userResponse", userResponseString);
        
        toast.success(`Login has been successful.`, {
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
        setParentVisibility(false);
      } else {
        toast.error("Your account is not Active.", {
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
      localStorage.setItem("authToken", response.data.token);
    } catch (error) {
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
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      {isVisiblepop && (
        <div className="popup-overlay z-50">
          <div className="popup-container bg-gray-100 h-auto sm:w-[45%] justify-center w-full">
            <div
              className="popup-form w-full"
              style={{ maxHeight: "90vh", overflowY: "auto" }}
            >
              <div className="flex justify-end items-end text-end  w-full">
                <RxCross2
                  size={24}
                  onClick={handleCloseCreatePopup}
                  className="cursor-pointer"
                />
              </div>
              <div className="flex flex-col justify-center items-center">
                <img src={logo} alt="" className="h-24 w-auto cursor-pointer" />
                <h2
                  className={`text-loactioncolor font-sans font-semibold mt-5 text-2xl`}
                >
                  Log in with Email
                </h2>
              </div>
              <form className="w-full">
                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                  {/* Email */}
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="email" className={`text-loactioncolor`}>
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      required
                      onChange={(e) => setemail(e.target.value)}
                      placeholder={`Enter your Email address`}
                      className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3`}
                    />
                  </div>
                  {/* Password */}
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="password" className={`text-loactioncolor`}>
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        placeholder={`Enter password`}
                        className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3 pr-10`}
                      />
                      <div
                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                        onClick={toggleShowPassword}
                      >
                        {showPassword ? (
                          <AiOutlineEye />
                        ) : (
                          <AiOutlineEyeInvisible />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full flex justify-center items-center gap-8 mt-5">
                  <button
                    type="button"
                    onClick={handleAddCompany}
                    className="px-5 py-2 rounded-sm w-[70%] bg-loactioncolor text-white font-body text-sm ml-2"
                  >
                    Log in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
