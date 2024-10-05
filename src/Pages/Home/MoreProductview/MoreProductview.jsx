import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import NewRequest from "../../../../utils/NewRequest";
import { toast } from "react-toastify";
import Skeleton from "@mui/material/Skeleton";
import DescriptionWithToggle from "../MoreinKids/DescriptionWithToggle";

import imageLiveUrl from "../../../../utils/urlConverter/imageLiveUrl";
import { GrLike } from "react-icons/gr";

const MoreProductview = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const moreproduct = sessionStorage.getItem("productmore");
  const subCategoriesResponse = JSON.parse(moreproduct);
  const storedUserResponseString = sessionStorage.getItem("userResponse");
  const storedUserResponse = JSON.parse(storedUserResponseString);
  const loginuserid = storedUserResponse?.data?.user?._id || "";

  const {
    isLoading,
    error,
    data: moreproductData,
  } = useQuery(
    ["category", subCategoriesResponse?.category?._id],
    fetchmoreproductData,
    {
      enabled: !!subCategoriesResponse?.category?._id, // Only fetch if category ID is available
    }
  );

  const { data: productsdata } = useQuery(
    "getcategoryproduct",
    fetchproductData
  );

  async function fetchmoreproductData() {
    const response = await NewRequest.get(
      `/product/getProductsByCategory/${
        subCategoriesResponse?.category?._id || ""
      }`
    );
    const activeProducts = response?.data.filter(
      (product) => product.status.toLowerCase() === "active"
    );
    return activeProducts || [];
  }

  async function fetchproductData() {
    const response = await NewRequest.get("/product/getcategoryproduct");
    const categoriesWithCounts = response?.data.map((item) => ({
      name: item.category.name,
      count: item.products.length,
      id: item,
    }));
    return categoriesWithCounts;
  }

  const postcard = async (Product) => {
    try {
      await NewRequest.post(`/wishlist/${loginuserid}`, {
        productId: Product,
      });
      toast.success(`Product has been added successfully.`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
    sessionStorage.setItem("chardata", JSON.stringify(Product));
    navigate("/Chat");
  };

  const singproductitem = (card) => {
    navigate(`/Singleitem/${card._id}`, { state: { cardData: card } });
  };

  const viewmore = async (category) => {
    sessionStorage.setItem("productmore", JSON.stringify(category.id));
    // Refetch only the data related to the new category
    queryClient.invalidateQueries(["category", category.id]);
    navigate(`/moreproduct/${category.name}`);
  };

  return (
    <>
      <div className="lg:px-7 mt-5 lg:mt-28 sm:mt-2">
        <div className="my-5 bg-maincolor text-white rounded-full py-2 shadow-md px-3">
          <span className="cursor-pointer" onClick={() => navigate("/")}>
            Home
          </span>{" "}
          |{" "}
          <span className="cursor-pointer">
            {subCategoriesResponse?.category?.name || ""}
          </span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-maincolor">
            {subCategoriesResponse?.category?.name || ""}
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row sm:flex-col">
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
              ) : moreproductData.length === 0 ? (
                <div>No products available</div>
              ) : (
                moreproductData.map((item, index) => (
                  <div
                    className="border rounded shadow cursor-pointer hover:shadow-lg "
                    key={index}
                  >
                    <div className="flex gap-3 flex-col ">
                      <div className=" w-full">
                        <img
                          src={imageLiveUrl(item?.images?.[0]) || ""}
                          alt="Product"
                          className="w-full h-52 object-contain"
                          onClick={() => singproductitem(item)}
                        />
                      </div>
                      <div className="w-full mb-5 p-4">
                        <DescriptionWithToggle description={item.name} />
                        <div className="flex justify-between mt-3">
                          <h3 className="font-bold text-lg mb-2">
                            {item?.currency || "Rs"}
                            <span className="text-maincolor ms-2">
                              {item?.price || ""}
                            </span>
                          </h3>
                          <GrLike
                            className=" text-maincolor cursor-pointer mb-4"
                            onClick={() => postcard(item._id)}
                          />
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
              <h2 className="font-bold text-lg mb-2">Product Categories</h2>
              <ul>
                {productsdata &&
                  productsdata.length > 0 &&
                  productsdata.map((category, index) => (
                    <li key={index} className="mb-2 text-gray-500">
                      <p
                        onClick={() => viewmore(category)}
                        className="cursor-pointer"
                      >
                        {category?.name || ""} ({category?.count || "0"})
                      </p>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default MoreProductview;
