import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import NewRequest from "../../../../../utils/NewRequest";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords don't match");
            return;
        }

        try {
            const response = await NewRequest.post("/api/auth/reset-password", {
              password,
            });
            setMessage(
                response.data.message || "Password has been reset successfully."
            );
            navigate("/LoginForm"); 
        } catch (error) {
            setMessage("Failed to reset password. Try again.");
        }
    };

      const [showPassword, setShowPassword] = useState(false);
        const toggleShowPassword = () => {
          setShowPassword(!showPassword);
        };

    return (
      <section className="bg-gray-50 h-screen">
        <div className="h-full w-full lg:w-1/2  sm:w-full mx-auto rounded-md shadow-xl bg-white flex flex-col items-center justify-between p-0 lg:p-8 sm:p-0">
          <div className="w-full  sm:w-full dark:bg-gray-800 border rounded-lg shadow dark:border-gray-700 h-screen flex flex-col lg:flex-row items-center justify-between ">
            <div className="w-full  mx-auto bg-white rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 p-6 space-y-4 md:space-y-6">
              <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Reset Password
              </h2>
              <form onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="Password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="Password"
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="mt-5 relative">
                  <label
                    htmlFor="ConfirmPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    id="ConfirmPassword"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <div
                    className="absolute inset-y-0 right-0 text-white mt-7 flex items-center pr-3 cursor-pointer"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? (
                      <AiOutlineEye />
                    ) : (
                      <AiOutlineEyeInvisible />
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-headingcolor hover:bg-viewmorebutton focus:ring-4 focus:outline-none mt-10 font-medium rounded-lg text-md px-5 py-2.5 text-center"
                >
                  Reset Password
                </button>
              </form>
              {message && <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{message}</p>}
            </div>
          </div>
        </div>
      </section>
    );
};

export default ResetPassword;
