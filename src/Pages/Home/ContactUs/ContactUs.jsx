import React, { useEffect, useState } from "react";
import DropDownSelection from "../../../components/DropDownSelection/DropDownSelection";
import contusimage from "../../../assets/Images/ContactUs.jpg";
import contusimagebg from "../../../assets/Images/ContactUsbg.jpg";
import NewRequest from "../../../../utils/NewRequest";
import { Box } from "@mui/material";

function ContactUs() {
  const [data, setdata] = useState([]);

  useEffect(() => {
    NewRequest.get(`/about/contact`).then((response) => {
        const userdata = response.data;
        setdata(userdata);
      }).catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="lg:px-10 my-5 lg:my-40 sm:my-2">
        {/* <DropDownSelection /> */}
        <div className="relative w-full h-[250px]">
          <img
            src={contusimagebg}
            className="w-full h-full object-cover rounded-md"
            alt=""
          />
          <div
            className={`absolute w-full sm:top-1/4 top-2.5 text-black md:px-10 px-3`}
          >
            <h2 className="sm:text-5xl text-3xl font-sans font-semibold mb-4">
              Contact Us
            </h2>
            <p className="sm:text-2xl text-xl font-medium font-sans">
              Reach us
            </p>
          </div>
        </div>
        <div className="w-full py-8">
          <div className={`bg-gray-100 flex flex-wrap justify-start`}>
            <div className={`w-full md:w-1/2 p-4 sm:px-10 px-3 flex`}>
              <p className="font-sans sm:text-lg text-base mt-3">
                {data &&
                  data.map((item, index) => (
                    <p key={index}>
                      {" "}
                      <Box dangerouslySetInnerHTML={{ __html: item.caption }} />
                    </p> // Displaying caption
                  ))}
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <img
                src={contusimage}
                className="h-auto w-full object-contain"
                alt="Section Image"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
