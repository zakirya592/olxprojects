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
  const storedUserResponseString = sessionStorage.getItem("userResponse");
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
    // console.log(response?.data?.products);
    return response?.data?.products || [];
  }

  const postcard = (Product) => {
    try {
      const response = NewRequest.post(`/wishlist/${loginuserid}`, {
        productId: Product,
      });
      console.log(response);
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
      console.log(error);
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
    console.log(Product.User);
    const subResponsechat = JSON.stringify(Product);
    sessionStorage.setItem("chardata", subResponsechat);
    navigate("/Chat");
  };

  return (
    <>
      {/* <Header /> */}
      <div className=" lg:px-10 mt-5 lg:mt-40 sm:mt-2">
        <div className="my-5">
          <span
            className="cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </span>
          <h6 className="text-headingcolor text-3xl font-bold overflow-hidden my-5">
            Favourites & Saved searches
          </h6>
        </div>

        <div className="flex">
          {/* Main Content */}
          <main className="flex-1 p-4 ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
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
                    <div className="flex gap-3 flex-col lg:flex-row sm:flex-col">
                      <div className="w-full lg:w-1/2 sm:full">
                        <img
                          src={imageLiveUrl(item?.images?.[0]) || ""}
                          alt="Product"
                          className="w-full sm:w-full lg:w-full h-full object-cover"
                        />
                      </div>

                      <div className="w-full mb-5 p-4">
                        <div className="flex justify-between">
                          <h3 className="font-bold text-lg mb-2">
                            Rs {item?.price || ""}
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
                            className="text-green-500 border border-green-500 px-4 py-2 rounded"
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
