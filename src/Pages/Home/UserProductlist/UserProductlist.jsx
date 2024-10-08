import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewRequest from "../../../../utils/NewRequest";
import Skeleton from "@mui/material/Skeleton";
import imageLiveUrl from "../../../../utils/urlConverter/imageLiveUrl";
import DescriptionWithToggle from "../MoreinKids/DescriptionWithToggle";
import { Avatar } from "@mui/material";
import emailicon from "../../../assets/Images/emailicon.jpg"
import phoneicon from "../../../assets/Images/phoneicon.png";


const UserProductlist = () => {
  const navigate = useNavigate();
  const [userdata, setuserdata] = useState([])
  const [isLoading, setloading] = useState(false);
  const [error, seterror] = useState(false);
   const [userdatalist, setuserdatalist] = useState("");

  const moreproduct = sessionStorage.getItem("productlist");
  const subCategoriesResponse = JSON.parse(moreproduct);
   let loginuserdata = subCategoriesResponse?.User?._id || "";
  if (!loginuserdata) {
    loginuserdata = localStorage.getItem("userdata") || "";
  }

  useEffect(() => {
    const fetchmoreproductData = async () => {
         setloading(true);
      try {
        const response = await NewRequest.get(
          `/product/getProductsByUserId/${subCategoriesResponse?.User?._id || ""}`
        );
        setloading(false)
        setuserdata(response?.data);
      } catch (error) {
         setloading(false);
         seterror(true)
      }
    };

    fetchmoreproductData();
  }, []); 
  
  
   useEffect(() => {
     NewRequest.get(`/users/${loginuserdata || ""}`)
       .then((response) => {
         const userdata = response.data;
         setuserdatalist(userdata);
       })
       .catch((err) => { });
   }, []);

  const charfunction = (Product) => {
    sessionStorage.setItem("chardata", JSON.stringify(Product));
    navigate("/Chat");
  };

  const singproductitem = (card) => {
    navigate(`/Singleitem/${card._id}`, { state: { cardData: card } });
  };

  return (
    <>
      <div className="lg:px-7 mt-5 lg:mt-40 sm:mt-2">
        <div className="flex flex-col-reverse lg:flex-row sm:flex-col-reverse">
          {/* Main Content */}
          <main className="flex-1 p-4 flex-col lg:flex-row sm:flex-col">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {isLoading ? (
                <div>
                  {[...Array(3)].map((_, index) => (
                    <div
                      className="border rounded shadow cursor-pointer"
                      key={index}
                    >
                      <div className="flex gap-3">
                        <Skeleton
                          variant="rectangular"
                          width="100%"
                          height={208}
                        />
                        <div className="w-full mb-5 p-4">
                          <Skeleton
                            variant="text"
                            width="60%"
                            height={30}
                            style={{ marginBottom: "12px" }}
                          />
                          <Skeleton
                            variant="text"
                            width="100%"
                            height={20}
                            style={{ marginBottom: "12px" }}
                          />
                          <Skeleton
                            variant="text"
                            width="80%"
                            height={20}
                            style={{ marginBottom: "12px" }}
                          />
                          <Skeleton
                            variant="rectangular"
                            width="100px"
                            height={40}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div>Error loading products</div>
              ) : userdata.length === 0 ? (
                <div>No products available</div>
              ) : (
                userdata.map((item, index) => (
                  <div
                    className="border rounded shadow cursor-pointer hover:shadow-lg"
                    key={index}
                  >
                    <div className="flex gap-3 flex-col lg:flex-col sm:flex-col">
                      <img
                        src={imageLiveUrl(item?.images?.[0]) || ""}
                        alt="Product"
                        className="w-full h-52 object-cover"
                        onClick={() => singproductitem(item)}
                      />
                      <div className="w-full mb-5 p-4">
                        <DescriptionWithToggle description={item.name} />
                        <div className="flex justify-between mt-3">
                          <h3 className="font-bold text-lg mb-2">
                            {item?.currency || "Rs"}
                            <span className="text-maincolor ms-1">
                              {item?.price || ""}
                            </span>
                          </h3>
                        </div>
                        <p className="text-gray-500 text-sm">
                          {item?.location || ""}
                        </p>
                        <div className="flex mt-4">
                          <button
                            className="text-white hover:bg-white hover:text-maincolor border bg-maincolor border-maincolor rounded-full text-lg font-sans font-bold px-4  "
                            onClick={() => charfunction(item)}
                          >
                            Chat
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </main>
          {/* Sidebar */}
          <aside className="w-full sm:w-full lg:w-1/4 p-4 border my-3 border-gray-300 bg-cardbg rounded shadow">
            <div className="mb-4">
              <div className=" my-auto mt-5 flex flex-col justify-center items-center">
                <Avatar
                  className="my-auto cursor-pointer"
                  src={
                    userdatalist?.image
                      ? userdatalist?.image.startsWith("https")
                        ? userdatalist?.image
                        : imageLiveUrl(userdatalist.image)
                      : ""
                  }
                  sx={{ width: 120, height: 120 }}
                />
                <div className="flex w-full">
                  <div className="ml-5 w-full">
                    <div className="flex flex-col justify-center items-center  my-auto w-full mt-5">
                      <p className="text-secondary">
                        {userdatalist?.username || ""}
                      </p>
                      <p className="text-secondary text-lg font-mono">
                        {userdata.length || ""}
                        <span> published ads</span>
                      </p>
                    </div>

                    <div className="flex my-3 w-full">
                      <img
                        src={emailicon}
                        alt=""
                        className="w-7 h-5 object-contain"
                      />
                      <a
                        href={`mailto:${userdatalist?.email || ""}`}
                        className="text-blue-500 hover:underline ms-5 my-auto"
                      >
                        {userdatalist?.email || ""}
                      </a>
                    </div>
                    <div className="flex ">
                      <img
                        src={phoneicon}
                        alt=""
                        className="w-7 h-7 object-contain"
                      />
                      <a
                        href={`tel:${userdatalist?.phone || ""}`}
                        className="text-blue-500 hover:underline ms-5 my-auto"
                      >
                        {userdatalist?.phone || ""}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default UserProductlist;
