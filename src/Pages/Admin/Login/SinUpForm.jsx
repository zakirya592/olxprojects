import React, { useEffect, useState } from "react";
import logimage from "../../../assets/Images/loginimage.svg";
import Googleicon from "../../../assets/Images/googleicon.png";
import { toast } from "react-toastify";
import NewRequest from "../../../../utils/NewRequest";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { baseUrl } from "../../../../utils/config";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import TermsAndCondition from "./TermsAndCondition/TermsAndCondition";

const SinUpForm = () => {
  const navigator = useNavigate();

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [address, setaddress] = useState("");
  const [aboutMe, setaboutMe] = useState("");
  const [companyLandLine, setCompanyLandLine] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState(""); // State to track selected status  
  const [isGemstone, setIsGemstone] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [taxNo, settaxNo] = useState('')
  const [id_cardNo, setid_cardNo] = useState('')
  const [isTermsAndConditionPopUp, setIsTermsAndConditionPopUp] = useState(false);

  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
    setIsGemstone(true)
  };

  const [companyLandlineError, setCompanyLandlineError] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageshow, setimageshow] = useState("");

  function handleChangeback(e) {
    setSelectedFile(e.target.files[0]);
    setimageshow(e.target.files[0]);
  }

  const handlecompanyLandLine = (value) => {
    // Reset error message
    setCompanyLandlineError("");
    if (value.startsWith("966")) {
      if (value.length > 12) {
        setCompanyLandlineError("Number must be a maximum of 12 digits");
      }
    }
    setCompanyLandLine(value);
  };
  
  const handleChange = (e) => {
    const value = e.target.value;
    // Remove non-numeric characters to enforce the format
    const formattedValue = value.replace(/[^0-9]/g, "");

    // Check if the length is within the allowed range
    if (formattedValue.length <= 13) {
      const parts = [];
      if (formattedValue.length > 5) {
        parts.push(formattedValue.substring(0, 5));
        if (formattedValue.length > 12) {
          parts.push(formattedValue.substring(5, 12));
          parts.push(formattedValue.substring(12, 13));
        } else {
          parts.push(formattedValue.substring(5));
        }
      } else {
        parts.push(formattedValue);
      }
      setid_cardNo(parts.join("-")); // Join the parts with a dash
    }
  };

    const handleTermsAndCondition = () => {
      setIsTermsAndConditionPopUp(true);
    };

    const handleAccept = () => {
      setIsChecked(true);
      setIsTermsAndConditionPopUp(false);
    };

    const handleClose = () => {
      setIsChecked(false);
      setIsTermsAndConditionPopUp(false);
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

    if (isGemstone) {
      formData.append("isGemstone", true);
      formData.append("pictureBusinessCertificate", imageshow);
      formData.append("taxNo", taxNo);
      formData.append("id_cardNo", id_cardNo);
    }

    if (isChecked) {
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
        navigator("/LoginForm");
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
        // console.log(error);
      }
    } else {
      toast.error("Error: Are you sure you want to submit the form?", {
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

  const handleGoogleSignup = () => {
    window.location.href = `${baseUrl}/users/signup_with_google`;
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
        navigator(`/LoginForm`);
      } else {
        // Handle case where signup failed or response is unsuccessful
        console.error("Signup failed. Redirect URL:", response.redirectUrl);
        // Optionally show an error message or handle failure
      }
      if (signupSuccess) {
        // window.location.href = "/home";
        navigator("/LoginForm");
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

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="bg-gray-50">
      {/* <div className="flex flex-col lg:flex-row items-center justify-between bg-gray-900 mx-auto"> */}
      <div className="h-full w-full lg:w-1/2  sm:w-full mx-auto rounded-md shadow-xl bg-white flex flex-col items-center justify-between p-0 lg:p-8 sm:p-0">
        <div className="w-full sm:w-full dark:bg-gray-800 border rounded-lg shadow dark:border-gray-700 flex flex-col items-center justify-between overflow-y-auto h-full">
          <div className="w-full mx-auto bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 h-[100%] overflow-y-auto space-y-4 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create a new account
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                {/* Username */}
                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    User Name
                  </label>
                  <input
                    type="text"
                    required
                    id="name"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    placeholder={`User Name`}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-10"
                  />
                </div>
                {/* Email */}
                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    placeholder={`Enter you Email`}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-10"
                  />
                </div>
                <label
                  htmlFor="landline"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone Number
                </label>
                <PhoneInput
                  international
                  country={"pk"}
                  defaultCountry={"pk"}
                  value={companyLandLine}
                  // onChange={setCompanyLandLine}
                  onChange={handlecompanyLandLine}
                  inputProps={{
                    id: "landline",
                    placeholder: "Company Landline",
                    autoComplete: "off",
                  }}
                  inputStyle={{
                    width: "100%",
                    borderRadius: "0px",
                    border: "#212121",
                    background: "none",
                    // color: "white",
                  }}
                  className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 text-black dark:text-white  block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-10"

                  // required
                />
                {companyLandlineError && (
                  <p className="text-red-600">{companyLandlineError}</p>
                )}
                {/* Password */}
                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2 relative">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    required
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    placeholder={`Enter password`}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-10"
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

                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                  <label
                    htmlFor="status"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    status
                  </label>
                  <select
                    id="status"
                    value={status}
                    onChange={handleChangeStatus}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-10"
                  >
                    <option value="">-- status --</option>
                    <option value="Gemstone">Gemstone </option>
                    <option value="wholesale">wholesale</option>
                  </select>
                </div>

                {(status === "wholesale" || status === "Gemstone") && (
                  <>
                    {/* ID Card Number */}
                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                      <label
                        htmlFor="idCardNumber"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        ID card / Passport Number
                      </label>
                      <input
                        type="text"
                        id="idCardNumber"
                        value={id_cardNo}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter your ID card / Passport Number"
                      />
                    </div>

                    {/* Business Certificate */}
                    {/* <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                      <label
                        htmlFor="businessCertificate"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Business Certificate
                      </label>
                      <input
                        type="text"
                        id="businessCertificate"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter your Business Certificate Number"
                      />
                    </div> */}

                    {/* Tax Number */}
                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                      <label
                        htmlFor="taxNumber"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Tax No
                      </label>
                      <input
                        type="text"
                        id="taxNumber"
                        value={taxNo}
                        onChange={(e) => settaxNo(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter your  Passport Number"
                      />
                    </div>

                    {/* Image Upload Section */}
                    <div className="flex justify-between flex-col sm:flex-row">
                      <div className="printerPic font-body sm:text-base text-sm flex flex-col gap-2">
                        <label
                          htmlFor="Image"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Business Certificate
                        </label>
                        <div className="imgesection">
                          <img
                            src={
                              selectedFile
                                ? URL.createObjectURL(selectedFile)
                                : imageshow != null
                                ? imageshow
                                : ""
                            }
                            className="printerpic text-black"
                            alt="Uploaded Business Certificate"
                            style={{
                              width:
                                selectedFile || imageshow ? "200px" : "200px",
                              height:
                                selectedFile || imageshow ? "200px" : "200px",
                            }}
                          />
                          <div className="row " htmlFor="file-inputs">
                            <label
                              htmlFor="file-inputs"
                              className="choosefile bg-loactioncolor hover:bg-primary"
                            >
                              choose file
                            </label>
                            <input
                              id="file-inputs"
                              type="file"
                              onChange={handleChangeback}
                              style={{ display: "none" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="flex items-center justify-between mt-5">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required
                        checked={isChecked}
                        onChange={handleTermsAndCondition}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Accept Term & Conditions
                      </label>
                    </div>
                  </div>
                  {/* <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a> */}
                </div>
              </div>

              <button
                // type="submit"
                type="button"
                onClick={handleAddCompany}
                className="w-full text-white bg-headingcolor hover:bg-viewmorebutton focus:ring-4 focus:outline-none  font-medium rounded-lg text-md px-5 py-2.5 text-center"
              >
                Sign Up
              </button>
            </form>
            <div className="flex w-full my-auto">
              <hr className="w-full my-auto" />
              <p className="my-auto mx-3 text-white">OR</p>
              <hr className="w-full my-auto" />
            </div>
            <p
              className="w-full flex justify-center text-black dark:text-white  shadow-lg text-lg hover:border-white cursor-pointer dark:bg-gray-800 dark:border-gray-700 border  font-medium rounded-lg  px-5 py-2.5 text-center "
              onClick={handleGoogleSignup}
            >
              <img
                src={Googleicon}
                alt=""
                className="w-10 h-8 p-1 object-contain bg-transparent"
              />{" "}
              <span className="my-auto mx-3">Singup with Google</span>
            </p>
            <p
              className="text-sm font-light text-viewmorebutton cursor-pointer"
              onClick={() => navigator("/LoginForm")}
            >
              Already have an account?{" "}
              <span className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
      {isTermsAndConditionPopUp && (
        <TermsAndCondition
          isVisible={isTermsAndConditionPopUp}
          handleClose={handleClose}
          handleAccept={handleAccept}
        />
      )}
    </section>
  );
};

export default SinUpForm;
