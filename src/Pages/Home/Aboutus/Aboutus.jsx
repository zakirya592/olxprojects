import React, { useEffect, useState } from "react";
import contusimagebg from "../../../assets/Images/Aboutimage.jpg";
import NewRequest from "../../../../utils/NewRequest";
import { Box } from "@mui/material";

function Aboutus() {
  const [data, setdata] = useState([]);

  useEffect(() => {
    NewRequest.get(`/about`)
      .then((response) => {
        const userdata = response.data;
        setdata(userdata);
      }) .catch((err) => {});
  }, []);

  return (
    <>
      <div className="lg:px-10 my-5 lg:my-40 sm:my-2">
        <div className="relative w-full h-[250px]">
          <img
            src={contusimagebg}
            className="w-full h-full object-cover rounded-md"
            alt=""
          />
          <div
            className={`absolute w-full sm:top-1/4 top-2.5 text-white md:px-10 px-3`}
          >
            <h2 className="sm:text-5xl text-3xl font-sans font-semibold mb-4">
              About Pakardi
            </h2>
          </div>
        </div>
        <div className="w-full py-8">
          <div className={`bg-gray-100 flex flex-wrap justify-start`}>
            <div className={`w-full p-4 sm:px-10 px-3 flex`}>
              <p className="font-sans sm:text-lg text-base mt-3">
                {data &&
                  data.map((item, index) => (
                    <p key={index}>
                      <Box dangerouslySetInnerHTML={{ __html: item.caption }} />
                    </p> // Displaying caption
                  ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Aboutus;
