import React, { useEffect, useState } from "react";
import forntpage from "../../../assets/Images/CNICfront.jpg";
import backpage from "../../../assets/Images/CNICback.jpg";
import Googleicon from "../../../assets/Images/googleicon.png";
import { toast } from "react-toastify";
import NewRequest from "../../../../utils/NewRequest";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { baseUrl } from "../../../../utils/config";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import TermsAndCondition from "./TermsAndCondition/TermsAndCondition";
import "./SinUpForm.css";

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
  const [status, setStatus] = useState("");
  const [isGemstone, setIsGemstone] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [taxNo, settaxNo] = useState('')
  const [id_cardNo, setid_cardNo] = useState('')
  const [isTermsAndConditionPopUp, setIsTermsAndConditionPopUp] = useState(false);
  const [companyLandlineError, setCompanyLandlineError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageshow, setimageshow] = useState("");
  const [selectedFilefrontcnic, setSelectedFilefrontcnic] = useState(null);
  const [imageshowfrontcnic, setimageshowfrontcnic] = useState(forntpage || "");
  const [selectedFilebackcnic, setSelectedFilebackcnic] = useState(null);
  const [imageshowbackcnic, setimageshowbackcnic] = useState(backpage || "");

  useEffect(() => {
    const pre = sessionStorage.getItem("prefillEmail");
    if (pre) {
      setemail(pre);
      sessionStorage.removeItem("prefillEmail");
    }
  }, []);

  const handleChangeStatus = (e) => {
    const value = e.target.value;
    setStatus(value);
    setIsGemstone(value === "Gemstone" || value === "wholesale");
  };

  function handleChangeback(e) {
    setSelectedFile(e.target.files[0]);
    setimageshow(e.target.files[0]);
  }
  function handleChangebackfrontcnic(e) {
    setSelectedFilefrontcnic(e.target.files[0]);
    setimageshowfrontcnic(e.target.files[0]);
  }
  function handleChangebackbackcnic(e) {
    setSelectedFilebackcnic(e.target.files[0]);
    setimageshowbackcnic(e.target.files[0]);
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
    formData.append("image", null);

    if (isGemstone) {
      formData.append("isGemstone", true);
      formData.append("pictureBusinessCertificate", imageshow);
      formData.append("frontImage", imageshowfrontcnic);
      formData.append("backImage", imageshowbackcnic );
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
    <section className="auth-signup-page">
      <div className="auth-signup-card">
        <h1 className="auth-signup-title">Create a new account</h1>

        <form>
          <div className="auth-signup-field">
            <label htmlFor="name">User Name</label>
            <input
              type="text"
              required
              id="name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              placeholder="User Name"
              className="auth-signup-input"
            />
          </div>

          <div className="auth-signup-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="Enter your Email"
              className="auth-signup-input"
            />
          </div>

          <div className="auth-signup-field auth-signup-phone-wrap">
            <label htmlFor="landline">Phone Number</label>
            <PhoneInput
              international
              country={"pk"}
              defaultCountry={"pk"}
              value={companyLandLine}
              onChange={handlecompanyLandLine}
              inputProps={{
                id: "landline",
                placeholder: "Phone Number",
                autoComplete: "off",
              }}
            />
            {companyLandlineError && (
              <p className="auth-signup-error">{companyLandlineError}</p>
            )}
          </div>

          <div className="auth-signup-field">
            <label htmlFor="password">Password</label>
            <div className="auth-signup-pass-wrap">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                required
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                placeholder="Enter password"
                className="auth-signup-input auth-signup-input--password"
              />
              <button
                type="button"
                className="auth-signup-eye"
                onClick={toggleShowPassword}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </button>
            </div>
          </div>

          <div className="auth-signup-field">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={status}
              onChange={handleChangeStatus}
              className="auth-signup-input auth-signup-select"
            >
              <option value="">-- status --</option>
              <option value="Gemstone">Gemstone</option>
              <option value="wholesale">Wholesale</option>
            </select>
          </div>

          {(status === "wholesale" || status === "Gemstone") && (
            <div className="auth-signup-extra">
              <p className="auth-signup-extra-title">Business Details</p>

              <div className="auth-signup-field">
                <label htmlFor="idCardNumber">ID card / Passport Number</label>
                <input
                  type="text"
                  id="idCardNumber"
                  value={id_cardNo}
                  onChange={handleChange}
                  className="auth-signup-input"
                  placeholder="Enter your ID card / Passport Number"
                />
              </div>

              <div className="auth-signup-field">
                <label htmlFor="taxNumber">Tax No</label>
                <input
                  type="text"
                  id="taxNumber"
                  value={taxNo}
                  onChange={(e) => settaxNo(e.target.value)}
                  className="auth-signup-input"
                  placeholder="Enter Tax No"
                />
              </div>

              <div className="auth-signup-upload-grid">
                <div className="auth-signup-upload-box">
                  <label htmlFor="file-inputs">Business Certificate</label>
                  <img
                    src={selectedFile ? URL.createObjectURL(selectedFile) : imageshow || ""}
                    alt="Uploaded Business Certificate"
                  />
                  <label htmlFor="file-inputs" className="auth-signup-choose">
                    Choose file
                  </label>
                  <input
                    id="file-inputs"
                    type="file"
                    onChange={handleChangeback}
                    style={{ display: "none" }}
                  />
                </div>

                <div className="auth-signup-upload-box">
                  <label htmlFor="frontCNIC">Front CNIC</label>
                  <img
                    src={
                      selectedFilefrontcnic
                        ? URL.createObjectURL(selectedFilefrontcnic)
                        : imageshowfrontcnic || ""
                    }
                    alt="Front CNIC"
                  />
                  <label htmlFor="frontCNIC" className="auth-signup-choose">
                    Upload
                  </label>
                  <input
                    id="frontCNIC"
                    type="file"
                    onChange={handleChangebackfrontcnic}
                    style={{ display: "none" }}
                  />
                </div>

                <div className="auth-signup-upload-box">
                  <label htmlFor="backcnic">Back CNIC</label>
                  <img
                    src={
                      selectedFilebackcnic
                        ? URL.createObjectURL(selectedFilebackcnic)
                        : imageshowbackcnic || ""
                    }
                    alt="Back CNIC"
                  />
                  <label htmlFor="backcnic" className="auth-signup-choose">
                    Upload
                  </label>
                  <input
                    id="backcnic"
                    type="file"
                    onChange={handleChangebackbackcnic}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="auth-signup-terms">
            <input
              id="remember"
              aria-describedby="remember"
              type="checkbox"
              checked={isChecked}
              onChange={handleTermsAndCondition}
            />
            <label htmlFor="remember">Accept Term & Conditions</label>
          </div>

          <button
            type="button"
            onClick={handleAddCompany}
            className="auth-signup-btn"
          >
            Sign Up
          </button>
        </form>

        <div className="auth-signup-divider">
          <span>OR</span>
        </div>

        <button type="button" className="auth-signup-google" onClick={handleGoogleSignup}>
          <img src={Googleicon} alt="" />
          Signup with Google
        </button>

        <p className="auth-signup-footer">
          Already have an account?{" "}
          <button type="button" onClick={() => navigator("/LoginForm")}>
            Login
          </button>
        </p>
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
