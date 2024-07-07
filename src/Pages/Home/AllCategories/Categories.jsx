import React from 'react'
import { Link } from "react-router-dom";
import Mobliceimg from "../../../assets/Images/mobiles.png"
import vehicles from "../../../assets/Images/vehicles.png"
import PropertyforSale from "../../../assets/Images/PropertyforSale.png"
import PropertyForRent from "../../../assets/Images/property-for-rent.png"
import electronicshome from "../../../assets/Images/electronics-home-appliances.png";
import Bikes from "../../../assets/Images/bikes.png"
import BusinessIndustrialAgriculture from "../../../assets/Images/business-industrial-agriculture.png"
import Services from "../../../assets/Images/services.png"
import Jobs from "../../../assets/Images/jobs.png"
import Animals from "../../../assets/Images/animals.png"
import FurnitureHomeDecor from "../../../assets/Images/furniture-home-decor.png"
import FashionBeauty from '../../../assets/Images/fashion-beauty.png'
import BooksSportsHobbies from "../../../assets/Images/books-sports-hobbies.png"
import Kids from "../../../assets/Images/kids.png"
function Categories() {
  return (
    <div>
      <h6 className="text-headingcolor text-3xl font-bold overflow-hidden">
        All categories
      </h6>
      <div>
        <div className="grid 2xl:grid-cols-9 xl:grid-cols-9 gap-7 lg:grid-cols-7 md:grid-cols-4 grid-cols-2 sm:px-2 px-2 mb-3">
          {/* first Card */}
          {/* {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            ""
          ) : (
            eventsData.map((item) => ( */}
          <div className="h-auto w-full py-1">
            <Link
              //   to={`/${item?.link}`}
              className="font-semibold text-secondary text-center sm:text-lg text-base hover:text-primary mt-3"
            >
              <img
                //   src={imageLiveUrl(item?.image)}
                src={Mobliceimg}
                alt=""
                className="w-full p-5 mt-1"
              />
              <div className="w-full">
                <div className={`px-3 flex flex-col gap-2`}>Mobiles</div>
              </div>
            </Link>
          </div>
          <div className="h-auto w-full py-1">
            <Link
              //   to={`/${item?.link}`}
              className="font-semibold text-secondary text-center sm:text-lg text-base hover:text-primary mt-3"
            >
              <img
                //   src={imageLiveUrl(item?.image)}
                src={vehicles}
                alt=""
                className="w-full p-5 mt-1"
              />
              <div className="w-full">
                <div className={`px-3 flex flex-col gap-2`}>Vehicles</div>
              </div>
            </Link>
          </div>
          <div className="h-auto w-full py-1">
            <Link
              //   to={`/${item?.link}`}
              className="font-semibold text-secondary text-center sm:text-lg text-base hover:text-primary mt-3"
            >
              <img src={PropertyforSale} alt="" className="w-full p-5 mt-1" />
              <div className="w-full">
                <div className={`px-3 flex flex-col gap-2`}>
                  Property for Sale
                </div>
              </div>
            </Link>
          </div>
          <div className="h-auto w-full py-1">
            <Link
              //   to={`/${item?.link}`}
              className="font-semibold text-secondary text-center sm:text-lg text-base hover:text-primary mt-3"
            >
              <img src={PropertyForRent} alt="" className="w-full p-5 mt-1" />
              <div className="w-full">
                <div className={`px-3 flex flex-col gap-2`}>
                  Property For Rent
                </div>
              </div>
            </Link>
          </div>
          <div className="h-auto w-full py-1">
            <Link
              //   to={`/${item?.link}`}
              className="font-semibold text-secondary text-center sm:text-lg text-base hover:text-primary mt-3"
            >
              <img src={electronicshome} alt="" className="w-full p-5 mt-1" />
              <div className="w-full">
                <div className={`px-3 flex flex-col gap-2`}>
                  Electronics & Home Appliances
                </div>
              </div>
            </Link>
          </div>
          <div className="h-auto w-full py-1">
            <Link
              //   to={`/${item?.link}`}
              className="font-semibold text-secondary text-center sm:text-lg text-base hover:text-primary mt-3"
            >
              <img src={Bikes} alt="" className="w-full p-5 mt-1" />
              <div className="w-full">
                <div className={`px-3 flex flex-col gap-2`}>Bikes</div>
              </div>
            </Link>
          </div>
          <div className="h-auto w-full py-1">
            <Link
              //   to={`/${item?.link}`}
              className="font-semibold text-secondary text-center sm:text-lg text-base hover:text-primary mt-3"
            >
              <img
                src={BusinessIndustrialAgriculture}
                alt=""
                className="w-full p-5 mt-1"
              />
              <div className="w-full">
                <div className={`px-3 flex flex-col gap-2`}>
                  Business, Industrial & Agriculture
                </div>
              </div>
            </Link>
          </div>
          <div className="h-auto w-full py-1">
            <Link
              //   to={`/${item?.link}`}
              className="font-semibold text-secondary text-center sm:text-lg text-base hover:text-primary mt-3"
            >
              <img
                //   src={imageLiveUrl(item?.image)}
                src={Services}
                alt=""
                className="w-full p-5 mt-1"
              />
              <div className="w-full">
                <div className={`px-3 flex flex-col gap-2`}>Services</div>
              </div>
            </Link>
          </div>
          <div className="h-auto w-full py-1">
            <Link
              //   to={`/${item?.link}`}
              className="font-semibold text-secondary text-center sm:text-lg text-base hover:text-primary mt-3"
            >
              <img
                //   src={imageLiveUrl(item?.image)}
                src={Jobs}
                alt=""
                className="w-full p-5 mt-1"
              />
              <div className="w-full">
                <div className={`px-3 flex flex-col gap-2`}>Jobs</div>
              </div>
            </Link>
          </div>
          <div className="h-auto w-full py-1">
            <Link
              //   to={`/${item?.link}`}
              className="font-semibold text-secondary text-center sm:text-lg text-base hover:text-primary mt-3"
            >
              <img
                //   src={imageLiveUrl(item?.image)}
                src={Animals}
                alt=""
                className="w-full p-5 mt-1"
              />
              <div className="w-full">
                <div className={`px-3 flex flex-col gap-2`}>Animals</div>
              </div>
            </Link>
          </div>
          <div className="h-auto w-full py-1">
            <Link
              //   to={`/${item?.link}`}
              className="font-semibold text-secondary text-center sm:text-lg text-base hover:text-primary mt-3"
            >
              <img
                //   src={imageLiveUrl(item?.image)}
                src={FurnitureHomeDecor}
                alt=""
                className="w-full p-5 mt-1"
              />
              <div className="w-full">
                <div className={`px-3 flex flex-col gap-2`}>
                  Furniture & Home Decor
                </div>
              </div>
            </Link>
          </div>
          <div className="h-auto w-full py-1">
            <Link
              //   to={`/${item?.link}`}
              className="font-semibold text-secondary text-center sm:text-lg text-base hover:text-primary mt-3"
            >
              <img
                //   src={imageLiveUrl(item?.image)}
                src={FashionBeauty}
                alt=""
                className="w-full p-5 mt-1"
              />
              <div className="w-full">
                <div className={`px-3 flex flex-col gap-2`}>
                  Fashion & Beauty
                </div>
              </div>
            </Link>
          </div>
          <div className="h-auto w-full py-1">
            <Link
              //   to={`/${item?.link}`}
              className="font-semibold text-secondary text-center sm:text-lg text-base hover:text-primary mt-3"
            >
              <img
                //   src={imageLiveUrl(item?.image)}
                src={BooksSportsHobbies}
                alt=""
                className="w-full p-5 mt-1"
              />
              <div className="w-full">
                <div className={`px-3 flex flex-col gap-2`}>
                  Books, Sports & Hobbies
                </div>
              </div>
            </Link>
          </div>
          <div className="h-auto w-full py-1">
            <Link
              //   to={`/${item?.link}`}
              className="font-semibold text-secondary text-center sm:text-lg text-base hover:text-primary mt-3"
            >
              <img
                //   src={imageLiveUrl(item?.image)}
                src={Kids}
                alt=""
                className="w-full p-5 mt-1"
              />
              <div className="w-full">
                <div className={`px-3 flex flex-col gap-2`}>Kids</div>
              </div>
            </Link>
          </div>
          {/* //     ))
        //   )} */}
        </div>
      </div>
    </div>
  );
}

export default Categories