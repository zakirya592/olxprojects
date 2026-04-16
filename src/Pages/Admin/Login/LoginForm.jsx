import React, { useEffect, useState } from "react";
import Googleicon from "../../../assets/Images/googleicon.png";
import logoPakardai from "../../../assets/Images/logo1.png";
import { toast } from "react-toastify";
import NewRequest from "../../../../utils/NewRequest";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { baseUrl } from "../../../../utils/config";
import "./LoginForm.css";

const LoginForm = () => {
  const navigator = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setloading] = useState(false);
  const [activeTab, setActiveTab] = useState("signin");
  const [rememberMe, setRememberMe] = useState(false);
  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [showCreatePassword, setShowCreatePassword] = useState(false);

  useEffect(() => {
    const remembered = localStorage.getItem("rememberEmail");
    if (remembered) {
      setemail(remembered);
      setRememberMe(true);
    }
  }, []);

  const handleAddCompany = async (e) => {
    e?.preventDefault?.();
    setloading(true);
    try {
      const response = await NewRequest.post("/users/login", {
        email: email,
        password: password,
      });

      const userstatus = response.data.user.status;
      setloading(false);
      if (userstatus === 1) {
        if (rememberMe) {
          localStorage.setItem("rememberEmail", email);
        } else {
          localStorage.removeItem("rememberEmail");
        }

        navigator("/");

        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userdata", response.data);
        const userResponseString = JSON.stringify(response);
        localStorage.setItem("userResponse", userResponseString);

        toast.success(`Login has been successful.`, {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
        });
      } else {
        toast.error("Your account is not Active.", {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
        });
      }
      localStorage.setItem("authToken", response.data.token);
    } catch (error) {
      setloading(false);
      console.log(error, "errorr");

      toast.error(error?.response?.data?.error || "Error show", {
        position: "top-right",
        autoClose: 2000,
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
        localStorage.setItem("authToken", token);
        localStorage.setItem("userdata", userId);
        navigator("/");
      }
    };

    handleGoogleRedirect();
  }, [navigator]);

  const handleGoogleLogin = () => {
    window.location.href = `${baseUrl}/users/login_with_google`;
  };

  const handleGoogleSignup = () => {
    window.location.href = `${baseUrl}/users/signup_with_google`;
  };

  const handleFacebookClick = () => {
    toast.info("Facebook sign-in is not connected yet. Please use Google or email.", {
      position: "top-right",
      autoClose: 3000,
      theme: "light",
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (activeTab === "signin") handleAddCompany(event);
    }
  };

  const handleRegisterNavigate = () => {
    if (createEmail.trim()) {
      sessionStorage.setItem("prefillEmail", createEmail.trim());
    }
    navigator("/SinUpForm");
  };

  const toggleCreatePassword = () => {
    setShowCreatePassword((v) => !v);
  };

  return (
    <section className="auth-page">
      <div className="auth-page__logo-wrap">
        <img
          src={logoPakardai}
          alt="Pakardai"
          className="auth-page__logo"
        />
      </div>

      <div className="auth-card">
        <div className="auth-card__tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "signin"}
            className={`auth-card__tab ${
              activeTab === "signin" ? "auth-card__tab--active" : ""
            }`}
            onClick={() => setActiveTab("signin")}
          >
            Sign in
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "create"}
            className={`auth-card__tab ${
              activeTab === "create" ? "auth-card__tab--active" : ""
            }`}
            onClick={() => setActiveTab("create")}
          >
            Create Account
          </button>
        </div>

        <div className="auth-card__body">
          {activeTab === "signin" ? (
            <>
              <form
                className="auth-form-signin"
                onSubmit={handleAddCompany}
                noValidate
              >
                <div className="auth-field">
                  <label htmlFor="auth-email">Email</label>
                  <input
                    type="email"
                    id="auth-email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setemail(e.target.value)}
                    className="auth-input"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="auth-field">
                  <label htmlFor="auth-password">Password</label>
                  <div className="auth-field__wrap">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="auth-password"
                      name="password"
                      autoComplete="current-password"
                      placeholder="••••••••"
                      onKeyDown={handleKeyDown}
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                      className="auth-input auth-input--password"
                      required
                    />
                    <button
                      type="button"
                      className="auth-field__toggle"
                      onClick={toggleShowPassword}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <AiOutlineEye size={20} />
                      ) : (
                        <AiOutlineEyeInvisible size={20} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="auth-row-between">
                  <label className="auth-check">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    Keep me signed in
                  </label>
                  <button
                    type="button"
                    className="auth-link"
                    onClick={() => navigator("/forgot-password")}
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="auth-btn-primary"
                  disabled={loading}
                >
                  {loading ? "Signing in…" : "Sign in"}
                </button>
              </form>

              <div className="auth-social-row">
                <button
                  type="button"
                  className="auth-social-btn auth-social-btn--fb"
                  onClick={handleFacebookClick}
                >
                  <FaFacebookF size={16} />
                  Facebook
                </button>
                <button
                  type="button"
                  className="auth-social-btn auth-social-btn--google"
                  onClick={handleGoogleLogin}
                >
                  <img src={Googleicon} alt="" />
                  Google
                </button>
              </div>

              <p className="auth-footer-link">
                New Customer?{" "}
                <button
                  type="button"
                  onClick={() => setActiveTab("create")}
                >
                  Create account
                </button>
              </p>
            </>
          ) : (
            <>
              <p className="auth-create-subtitle">Sign up with…</p>

              <div className="auth-social-row">
                <button
                  type="button"
                  className="auth-social-btn auth-social-btn--fb"
                  onClick={handleFacebookClick}
                >
                  <FaFacebookF size={16} />
                  Facebook
                </button>
                <button
                  type="button"
                  className="auth-social-btn auth-social-btn--google"
                  onClick={handleGoogleSignup}
                >
                  <img src={Googleicon} alt="" />
                  Google
                </button>
              </div>

              <div className="auth-or-divider">
                <span>or sign up using your email address</span>
              </div>

              <form
                className="auth-form-create"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleRegisterNavigate();
                }}
              >
                <div className="auth-field">
                  <label htmlFor="create-email">Email</label>
                  <input
                    type="email"
                    id="create-email"
                    autoComplete="email"
                    value={createEmail}
                    onChange={(e) => setCreateEmail(e.target.value)}
                    className="auth-input"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="auth-field">
                  <label htmlFor="create-password">Password</label>
                  <div className="auth-field__wrap">
                    <input
                      type={showCreatePassword ? "text" : "password"}
                      id="create-password"
                      autoComplete="new-password"
                      value={createPassword}
                      onChange={(e) => setCreatePassword(e.target.value)}
                      className="auth-input auth-input--password"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="auth-field__toggle"
                      onClick={toggleCreatePassword}
                      aria-label={
                        showCreatePassword ? "Hide password" : "Show password"
                      }
                    >
                      {showCreatePassword ? (
                        <AiOutlineEye size={20} />
                      ) : (
                        <AiOutlineEyeInvisible size={20} />
                      )}
                    </button>
                  </div>
                </div>

                <p className="auth-privacy-notice">
                  Your personal data will be used to support your experience
                  throughout this website, to manage access to your account, and
                  for other purposes described in our{" "}
                  <button
                    type="button"
                    className="auth-privacy-inline"
                    onClick={() =>
                      toast.info(
                        "Add a Privacy policy page URL in the app when ready.",
                        { position: "top-right", autoClose: 2500 }
                      )
                    }
                  >
                    Privacy policy
                  </button>
                  .
                </p>

                <button type="submit" className="auth-btn-register">
                  Register
                </button>
              </form>

              <p className="auth-footer-link auth-footer-link--create">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setActiveTab("signin")}
                >
                  Sign in
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
