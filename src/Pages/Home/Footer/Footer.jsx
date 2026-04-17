import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TiSocialTwitterCircular } from "react-icons/ti";
import { CiFacebook } from "react-icons/ci";
import { FiInstagram } from "react-icons/fi";
import { FaYoutube } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { toast } from "react-toastify";
import "./Footer.css";
import { FOOTER_LOGO_SRC } from "../../../constants/brandLogo";

function MottaLogoFooter() {
  return (
    <div className="motta-footer__logo-wrap flex items-center gap-2">
      <img
        src={FOOTER_LOGO_SRC}
        alt="Pakardai"
        className="motta-footer__logo-img"
      />
    </div>
  );
}

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.warn("Please enter your email address.");
      return;
    }
    toast.success("Thanks for subscribing!");
    setEmail("");
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="motta-footer min-w-0 overflow-x-clip pb-20 lg:pb-6">
        <div className="motta-footer__inner">
          {/* Top: contact + newsletter */}
          <div className="motta-footer__top">
            <div className="motta-footer__contact-grid">
              <div className="motta-footer__contact-block">
                <div className="motta-footer__contact-icon">
                  <PhoneOutlinedIcon sx={{ fontSize: 36, color: "#4b5563" }} />
                </div>
                <div>
                  <p className="motta-footer__contact-title">Call</p>
                  <p className="motta-footer__contact-text">
                    Call us from 8am to 12am ET.
                  </p>
                  <p className="motta-footer__phone">+92 300 5868401</p>
                </div>
              </div>
              <div className="motta-footer__contact-block">
                <div className="motta-footer__contact-icon">
                  <EmailOutlinedIcon sx={{ fontSize: 36, color: "#4b5563" }} />
                </div>
                <div>
                  <p className="motta-footer__contact-title">Email</p>
                  <p className="motta-footer__contact-text">
                    Our response time is 1 to 3 business days.
                  </p>
                  <Link to="/contactus" className="motta-footer__link-inline">
                    Send a Message
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <h3 className="motta-footer__newsletter-title">
                Let&apos;s keep in touch
              </h3>
              <p className="motta-footer__newsletter-desc">
                Get recommendations, tips, updates, promotions and more.
              </p>
              <form
                className="motta-footer__newsletter-form"
                onSubmit={handleSubscribe}
              >
                <input
                  type="email"
                  className="motta-footer__newsletter-input"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
                <button type="submit" className="motta-footer__subscribe-btn">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <hr className="motta-footer__divider" />

          {/* Brand + link columns */}
          <div className="motta-footer__mid">
            <div className="motta-footer__brand">
              <MottaLogoFooter />
              <p className="motta-footer__brand-tagline">Best For Shopping</p>
              <p className="motta-footer__brand-desc">
                Sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
              </p>
              <div className="motta-footer__social">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <TiSocialTwitterCircular size={28} />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61565875032026"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <CiFacebook size={28} />
                </a>
                <a
                  href="https://youtube.com/@pakardi-o8m?si=gi-78VrlpcaDMN0Q"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                >
                  <FaYoutube size={24} />
                </a>
                <a
                  href="https://www.instagram.com/pakardicom"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <FiInstagram size={24} />
                </a>
                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp size={24} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="motta-footer__col-title">Get to Know Us</h4>
              <ul className="motta-footer__links">
                <li>
                  <Link to="/Aboutus">About Us</Link>
                </li>
                <li>
                  <a href="#news">News &amp; Blog</a>
                </li>
                <li>
                  <a href="#careers">Careers</a>
                </li>
                <li>
                  <a href="#investors">Investors</a>
                </li>
                <li>
                  <Link to="/contactus">Contact Us</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="motta-footer__col-title">Customer Service</h4>
              <ul className="motta-footer__links">
                <li>
                  <Link to="/contactus">Help Center</Link>
                </li>
                <li>
                  <a href="#faq">FAQ&apos;s</a>
                </li>
                <li>
                  <a href="#accessibility">Accessibility</a>
                </li>
                <li>
                  <a href="#feedback">Feedback</a>
                </li>
                <li>
                  <a href="#size">Size Guide</a>
                </li>
                <li>
                  <a href="#payment">Payment Method</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="motta-footer__col-title">Orders &amp; Returns</h4>
              <ul className="motta-footer__links">
                <li>
                  <a href="#track">Track Order</a>
                </li>
                <li>
                  <a href="#shipping">Shipping &amp; Delivery</a>
                </li>
                <li>
                  <a href="#return">Return &amp; Exchange</a>
                </li>
                <li>
                  <a href="#price-match">Price Match Guarantee</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Legal + payments */}
          <div className="motta-footer__bottom">
            <nav className="motta-footer__legal" aria-label="Legal">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Use</a>
              <a href="#legal">Legal</a>
              <a href="#sitemap">Site Map</a>
            </nav>
            <div
              className="motta-footer__payments"
              aria-label="Payment methods"
            >
              <span className="motta-footer__pay-badge">BANK TRANSFER</span>
              <span className="motta-footer__pay-badge">VISA</span>
              <span className="motta-footer__pay-badge">MASTERCARD</span>
              <span className="motta-footer__pay-badge">PayPal</span>
            </div>
          </div>
        </div>
      </footer>

      <button
        type="button"
        className="motta-footer__back-top"
        onClick={scrollTop}
        aria-label="Back to top"
      >
        <KeyboardArrowUpIcon sx={{ fontSize: 26 }} />
      </button>
    </>
  );
};

export default Footer;
