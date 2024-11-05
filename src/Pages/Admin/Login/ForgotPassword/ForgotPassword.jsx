import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NewRequest from "../../../../../utils/NewRequest";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigator = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setloading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const response = await NewRequest.post("/otp/sendOtpForPasswordChange",
        { email: email }
      );
      setMessage(response.data.message || "Check your email for the reset link.");
      navigator("/Otp");
      setloading(false);
      toast.success(response?.data?.message || "OTP sent successfully To your email please check your email", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      localStorage.setItem("emailget", email);
    } catch (error) {
      setMessage(error?.response?.data?.message || "Failed to send reset email. Try again.");
      setloading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <section className="bg-gray-50 h-screen">
      <div className="h-full w-full lg:w-1/2  sm:w-full mx-auto rounded-md shadow-xl bg-white flex flex-col items-center justify-between p-0 lg:p-8 sm:p-0">
        <div className="w-full  sm:w-full dark:bg-gray-800 border rounded-lg shadow dark:border-gray-700 h-screen flex flex-col lg:flex-row items-center justify-between ">
          <div className="w-full  mx-auto bg-white rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 p-6 space-y-4 md:space-y-6">
            <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Forgot Password
            </h2>
            <form>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  onKeyDown={handleKeyDown}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="w-full text-white bg-headingcolor hover:bg-viewmorebutton focus:ring-4 focus:outline-none mt-10 font-medium rounded-lg text-md px-5 py-2.5 text-center"
              >
                {loading ? "Send ..." : "Send"}
              </button>
            </form>
            {message && (
              <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
