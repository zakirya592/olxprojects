import { useState } from "react";
import { toast } from "react-toastify";
import NewRequest from "../../../../utils/NewRequest";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import icons
import "./Login.css";
import { RxCross2 } from "react-icons/rx";

const Login = ({ isVisiblepop, setVisibilitypop }) => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State for password visibility

    const handleCloseCreatePopup = () => {
        setVisibilitypop(false);
    };

    const handleAddCompany = async () => {
        try {
            const response = await NewRequest.post("/users/login", {
                email: email,
                password: password,
            });
            console.log(response);
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
                <form className="w-full">
                  <h2
                    className={`text-loactioncolor font-sans font-semibold text-2xl`}
                  >
                    Log in with Email
                  </h2>
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
                      <label
                        htmlFor="password"
                        className={`text-loactioncolor`}
                      >
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
