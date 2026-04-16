import React, { useEffect, useState } from "react";
import Googleicon from "../../../assets/Images/googleicon.png";
import { FOOTER_LOGO_SRC } from "../../../constants/brandLogo";
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
  const [rememberMe, setRememberMe] = useState(false);

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
      handleAddCompany(event);
    }
  };

  const handleCreateAccountNavigate = () => {
    if (email.trim()) {
      sessionStorage.setItem("prefillEmail", email.trim());
    }
    navigator("/SinUpForm");
  };

  return (
    <section className="auth-page">
      <div className="auth-page__logo-wrap">
        <img
          src={FOOTER_LOGO_SRC}
          alt="Pakardai"
          style={{ height: "70px", width: "auto", objectFit: "contain" }}
        />
      </div>

      <div className="auth-card">
        <div className="auth-card__tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected
            className="auth-card__tab auth-card__tab--active"
          >
            Sign in
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={false}
            className="auth-card__tab"
            onClick={handleCreateAccountNavigate}
          >
            Create Account
          </button>
        </div>

        <div className="auth-card__body">
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
                  aria-label={showPassword ? "Hide password" : "Show password"}
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
            <button type="button" onClick={handleCreateAccountNavigate}>
              Create account
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
