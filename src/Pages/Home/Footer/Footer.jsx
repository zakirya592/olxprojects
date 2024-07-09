import React from "react";
import { TiSocialTwitterCircular } from "react-icons/ti";
import { CiFacebook } from "react-icons/ci";
import { FaRegCirclePlay } from "react-icons/fa6";
import { FiInstagram } from "react-icons/fi";
import Appgallery from "../../../assets/Images/Appgallery.svg"
import appstore from "../../../assets/Images/appstore.svg"
import Googleplay from "../../../assets/Images/Googleplay.svg";

const Footer = () => {
    return (
      <div>
        <div className="py-4 gap-2 sm:px-16 px-8 3xl::h-[300px] 2xl:h-[300px] xl:h-[300px] lg:h-[300px] h-auto w-full bg-[#ebeeef] relative">
          <div className="w-full grid 2xl:grid-cols-5 lg:grid-cols-5 grid-cols-1">
            <div className={`h-auto w-full flex flex-col gap-8 relative `}>
              <h2 className="text-xl uppercase font-semibold text-start relative">
                POPULAR CATEGORIES
              </h2>
              <div className={`text-gray-300 flex flex-col gap-1 `}>
                <a
                  // href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-loactioncolor duration-300 hover:text-black cursor-pointer"
                >
                  {" "}
                  Cars
                </a>
                <a
                  // href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-loactioncolor duration-300 hover:text-black cursor-pointer"
                >
                  Flats for rent
                </a>
                <a
                  // href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-loactioncolor duration-300 hover:text-black cursor-pointer"
                >
                  Mobile Phones
                </a>
                <a
                  // href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-loactioncolor duration-300 hover:text-black cursor-pointer"
                >
                  jobs
                </a>
              </div>
            </div>

            <div className={`h-auto w-full flex flex-col gap-8 relative `}>
              <h2 className="text-xl uppercase font-semibold text-start relative">
                TRENDING SEARCHES
              </h2>
              <div className={`text-gray-300 flex flex-col gap-1`}>
                <a
                  // href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-loactioncolor duration-300 hover:text-black cursor-pointer"
                >
                  {" "}
                  Bikes
                </a>
                <a
                  // href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-loactioncolor duration-300 hover:text-black cursor-pointer"
                >
                  {" "}
                  Watches
                </a>
                <a
                  // href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-loactioncolor duration-300 hover:text-black cursor-pointer"
                >
                  {" "}
                  Books
                </a>
                <a
                  // href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-loactioncolor duration-300 hover:text-black cursor-pointer"
                >
                  {" "}
                  Dogs
                </a>
              </div>
            </div>

            <div className={`h-auto w-full flex flex-col gap-8 relative `}>
              <h2 className="text-xl uppercase font-semibold text-start relative">
                ABOUT US
              </h2>
              <div className={`text-gray-300 flex flex-col gap-1 `}>
                <a
                  // href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-loactioncolor duration-300 hover:text-black cursor-pointer"
                >
                  {" "}
                  About Dubizzle Group
                </a>
                <a
                  // href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-loactioncolor duration-300 hover:text-black cursor-pointer"
                >
                  OLX Blog
                </a>
                <a
                  // href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-loactioncolor duration-300 hover:text-black cursor-pointer"
                >
                  {" "}
                  Contact Us
                </a>
                <a
                  // href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-loactioncolor duration-300 hover:text-black cursor-pointer"
                >
                  {" "}
                  OLX for Businesses
                </a>
              </div>
            </div>

            <div className={`h-auto w-full flex flex-col gap-8 relative `}>
              <h2 className="text-xl uppercase font-semibold text-start relative">
                OLX
              </h2>
              <div className={`text-gray-300 flex flex-col gap-1 `}>
                <a
                  // href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-loactioncolor duration-300 hover:text-black cursor-pointer"
                >
                  {" "}
                  Help
                </a>
                <a
                  // href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-loactioncolor duration-300 hover:text-black cursor-pointer"
                >
                  Sitemap
                </a>
                <a
                  // href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-loactioncolor duration-300 hover:text-black cursor-pointer"
                >
                  {" "}
                  Terms of use
                </a>
                <a
                  // href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-loactioncolor duration-300 hover:text-black cursor-pointer"
                >
                  {" "}
                  Privacy Policy
                </a>
              </div>
            </div>

            <div className={`h-auto w-full flex flex-col gap-8 relative `}>
              <h2 className="text-xl uppercase font-semibold text-start relative">
                FOLLOW US
              </h2>
              <div className={`text-gray-300 flex flex-col gap-1 `}>
                <div className="flex flex-row">
                  <TiSocialTwitterCircular
                    size={40}
                    style={{ color: "black" }}
                  />
                  <CiFacebook
                    size={35}
                    style={{ color: "black", marginLeft: "10px" }}
                  />
                  <FaRegCirclePlay
                    size={34}
                    style={{ color: "black", marginLeft: "12px" }}
                  />
                  <FiInstagram
                    size={32}
                    style={{ color: "black", marginLeft: "12px" }}
                  />
                </div>
                <div className="flex flex-row w-full justify-between mt-4">
                  <img
                    src={Googleplay}
                    alt="Google Play"
                    className="w-1/3 h-30 object-contain mx-2"
                  />
                  <img
                    src={appstore}
                    alt="App Store"
                    className="w-1/3 h-30 object-contain mx-2"
                  />
                  <img
                    src={Appgallery}
                    alt="App Gallery"
                    className="w-1/3 h-30 object-contain mx-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`bg-[#002f34] text-white `}>
          <h2 className="text-end font-normal sm:font-semibold mb-2 sm:mb-0 p-5">
            Free Classifieds in Pakistan . © 2006-2024 OLX
          </h2>
        </div>
      </div>
    );
};

export default Footer;
