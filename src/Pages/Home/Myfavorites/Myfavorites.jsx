import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import NewRequest from "../../../../utils/NewRequest";
import { toast } from "react-toastify";
import DescriptionWithToggle from "../MoreinKids/DescriptionWithToggle";
import imageLiveUrl from "../../../../utils/urlConverter/imageLiveUrl";

const Myfavorites = () => {
  const navigate = useNavigate();
  const moreproduct = sessionStorage.getItem("productmore");
  const subCategoriesResponse = JSON.parse(moreproduct);
  const storedUserResponseString = localStorage.getItem("userResponse");
  const storedUserResponse = JSON.parse(storedUserResponseString);
  const loginuserid = storedUserResponse?.data?.user?._id || "";

  const {
    isLoading,
    error,
    data: wishlistData,
    refetch,
  } = useQuery("wishlist", fetchwishlistData);
  async function fetchwishlistData() {
    const response = await NewRequest.get(`/wishlist/${loginuserid || ""}`);
    return response?.data?.products || [];
  }

  const postcard = (Product) => {
    try {
      const response = NewRequest.post(`/wishlist/${loginuserid}`, {
        productId: Product,
      });
      toast.success(`Product has been Remove from wishlist successfully".`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
        refetch();
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
    }
  };

  const charfunction = (Product) => {
    const subResponsechat = JSON.stringify(Product);
    sessionStorage.setItem("chardata", subResponsechat);
    navigate("/Chat");
  };

  return (
    <>
      {/* <Header /> */}
      <div className=" lg:px-10 mt-5 lg:mt-40 sm:mt-2">
        <div className="mb-5">
            <div className="bg-maincolor text-white rounded-full py-2 shadow-md px-3">
          <span
            className="cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </span>

            </div>
          <h6 className="text-maincolor text-3xl font-bold overflow-hidden my-5">
            Favourites & Saved searches
          </h6>
        </div>

        <div className="flex">
          {/* Main Content */}
          <main className="flex-1 p-4 ">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {/* Card 1 */}
              {isLoading ? (
                <div>Loading...</div>
              ) : error ? (
                ""
              ) : wishlistData.length === 0 ? (
                <>
                  <div className="flex  w-full"></div>
                  <div className="flex w-full">
                    <p className="text-gray-500 text-xl ">No favorites yet.</p>
                  </div>
                </>
              ) : (
                wishlistData.map((item, index) => (
                  <div className="border rounded shadow " key={index}>
                    <div className="flex gap-3 flex-col">
                      <div className="w-full ">
                        <img
                          src={imageLiveUrl(item?.images?.[0]) || ""}
                          alt="Product"
                          className="w-full h-52 object-contain"
                        />
                      </div>

                      <div className="w-full mb-5 p-4">
                        <div className="flex justify-between">
                          <h3 className="font-bold text-maincolor text-lg mb-2">
                            {item?.currency || "Rs"} {item?.price || ""}
                          </h3>
                          <button
                            className="bg-black text-yellow-50 px-5 py-2 rounded-full"
                            onClick={() => postcard(item._id)}
                          >
                            Remove To Cart
                          </button>
                        </div>
                        <DescriptionWithToggle description={item.name} />
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
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Myfavorites;
