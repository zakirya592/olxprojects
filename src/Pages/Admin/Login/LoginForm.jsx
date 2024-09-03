import React, { useEffect, useState } from "react";
import logimage from "../../../assets/Images/loginimage.svg";
import Googleicon from "../../../assets/Images/googleicon.png"
import { toast } from "react-toastify";
import NewRequest from "../../../../utils/NewRequest";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { baseUrl } from "../../../../utils/config";

const LoginForm = () => {
      const navigator = useNavigate();
      const [email, setemail] = useState("");
      const [password, setpassword] = useState("");
      const [showPassword, setShowPassword] = useState(false);

      const handleAddCompany = async (e) => {
        try {
          const response = await NewRequest.post("/users/login", {
            email: email,
            password: password,
          });

          const userstatus = response.data.user.status;
          if (userstatus === 1) {
            navigator("/");

            console.log(response, "dataaa");
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


        useEffect(() => {
          const handleGoogleRedirect = () => {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get("token");
            const userId = urlParams.get("userId");

            if (token && userId) {
              sessionStorage.setItem("authToken", token);
              localStorage.setItem("userdata", userId);
              // sessionStorage.setItem("userResponse", userId);
              navigator("/"); // Redirect to dashboard
            }
          };

          handleGoogleRedirect();
        }, [navigator]);

        const handleGoogleLogin = () => {
          window.location.href = `${baseUrl}/users/login_with_google`;
        };



  return (
    <section className="bg-gray-50">
      <div className="flex flex-col lg:flex-row items-center justify-between bg-gray-900 mx-auto">
        <div className="w-full lg:w-1/2 sm:w-full dark:bg-gray-800 border rounded-lg shadow dark:border-gray-700 h-screen flex flex-col lg:flex-row items-center justify-between">
          <div className="w-full  mx-auto bg-white rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 p-6 space-y-4 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-10"
                  required
                />
                <div
                  className="absolute inset-y-0 right-0 text-white mt-7 flex items-center pr-3 cursor-pointer"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </div>
              </div>
              {/* <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div> */}
              <button
                // type="submit"
                type="button"
                onClick={handleAddCompany}
                className="w-full text-white bg-headingcolor hover:bg-viewmorebutton focus:ring-4 focus:outline-none  font-medium rounded-lg text-md px-5 py-2.5 text-center"
              >
                Sign in
              </button>
            </form>
            <div className="flex w-full my-auto">
              <hr className="w-full my-auto" />
              <p className="my-auto mx-3 text-white">OR</p>
              <hr className="w-full my-auto" />
            </div>
            <p
              className="w-full flex justify-center text-white shadow-lg text-lg hover:border-white cursor-pointer dark:bg-gray-800 dark:border-gray-700 border  font-medium rounded-lg  px-5 py-2.5 text-center "
              onClick={handleGoogleLogin}
            >
              <img
                src={Googleicon}
                alt=""
                className="w-10 h-8 p-1 object-contain bg-transparent"
              />{" "}
              <span className="my-auto mx-3">Login with Google</span>
            </p>
            <p className="text-sm font-light text-viewmorebutton cursor-pointer" onClick={()=>navigator("/SinUpForm")}>
              Don’t have an account yet?{" "}
              <a
                href="#"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 h-screen ">
          <img
            src={logimage}
            alt="Login Illustration"
            className="object-contain w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
