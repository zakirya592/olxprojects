import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import NewRequest from "../../../../utils/NewRequest";
import { toast } from "react-toastify";
import Skeleton from "@mui/material/Skeleton";
import DescriptionWithToggle from "../MoreinKids/DescriptionWithToggle";
import imageLiveUrl from "../../../../utils/urlConverter/imageLiveUrl";
import { GrLike } from "react-icons/gr";
import { Rating } from "@mui/material";

const MoreProductview = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const moreproduct = sessionStorage.getItem("productmore");
  const subCategoriesResponse = JSON.parse(moreproduct);
  const storedUserResponseString = localStorage.getItem("userResponse");
  const storedUserResponse = JSON.parse(storedUserResponseString);
  const loginuserid = storedUserResponse?.data?.user?._id || "";

  const [productRatings, setProductRatings] = useState({});
  const [limit, setLimit] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  async function fetchProductRatings(products) {
    const ratings = {};

    // Loop through products and fetch ratings for each product
    for (const product of products) {
      try {
        const ratingResponse = await NewRequest.get(
          `/comment/replay/${product._id}`
        );

        const productRatings = ratingResponse?.data?.comments;

        // Calculate the average rating
        const totalRatings = productRatings.reduce((acc, comment) => acc + (comment.rating || 0), 0);
        const averageRating = productRatings ? totalRatings / productRatings.length : 0;

        ratings[product._id] = averageRating || 0;
      } catch (error) {
        ratings[product._id] = 0;
      }
    }

    setProductRatings(ratings);
  }

  const {
    isLoading,
    error,
    data: moreproductData,
  } = useQuery(
    ["category", subCategoriesResponse?.category?._id, limit],
    fetchmoreproductData,
    {
      enabled: !!subCategoriesResponse?.category?._id,
      keepPreviousData: true,
    }
  );

  const { data: productsdata } = useQuery(
    "getcategoryproduct",
    fetchproductData
  );

  async function fetchmoreproductData() {
    const response = await NewRequest.get(
      `/product/getProductsByCategoryId/${subCategoriesResponse?.category?._id || ""}?page=1&limit=${limit}`
    );
    const activeProducts = response?.data?.data
      .filter((product) => product.status.toLowerCase() === "active")
      
    
    setHasMore(response?.data?.pagination?.hasNextPage || false);
    
    fetchProductRatings(activeProducts);
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
    localStorage.setItem("singleproduct", JSON.stringify(card));
    navigate(`/Singleitem/${card._id}`);
  };

  const viewmore = async (category) => {
    sessionStorage.setItem("productmore", JSON.stringify(category.id));
    // Refetch only the data related to the new category
    queryClient.invalidateQueries(["category", category.id]);
    navigate(`/moreproduct/${category.name}`);
  };

  const loadMore = () => {
    setLimit(prevLimit => prevLimit + 10);
  };

  return (
    <>
      <div className="lg:px-7 mt-5 lg:mt-28 sm:mt-2">
        <div className="my-5 bg-maincolor text-white rounded-full py-2 shadow-md px-3">
          <span className="cursor-pointer" onClick={() => navigate("/")}>
            Home
          </span>
          |
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
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
              {isLoading ? (
                <div>
                  {[...Array(3)].map((_, index) => (
                    <div
                      className="border rounded shadow cursor-pointer"
                      key={index}
                    >
                      <div className="flex flex-col gap-1 sm:gap-1 lg:gap-3 ">
                        <Skeleton
                          variant="rectangular"
                          width="100%"
                          height={208}
                        />
                        <div className="w-full mb-5 p-4 flex flex-col gap-1 sm:gap-1 lg:gap-3">
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
                    <div className="flex flex-col gap-1 sm:gap-1 lg:gap-3">
                      <div className=" w-full">
                        <img
                          src={imageLiveUrl(item?.images?.[0]) || ""}
                          alt="Product"
                          className="w-full h-40 lg:h-52 sm:h-40  lg:object-contain sm:object-cover object-cover"
                          onClick={() => singproductitem(item)}
                        />
                      </div>
                      <div className="w-full  sm:p-1 lg:p-4 p-2">
                        <DescriptionWithToggle description={item.name} />
                        <div className="flex justify-between mt-3">
                          <Rating
                            name="half-rating"
                            precision={0.5}
                            value={productRatings[item._id] ? Number(productRatings[item._id]) : 0}
                            sx={{
                              color: "#4C005A",
                              fontSize: {
                                xs: "15px",
                                sm: "15px",
                                md: "1rem",
                                lg: "1.5rem",
                              },
                            }}
                            readOnly
                          />
                          <GrLike
                            className=" text-maincolor cursor-pointer mb-4"
                            onClick={() => postcard(item._id)}
                          />
                        </div>

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
            
            {!isLoading && hasMore && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={loadMore}
                  className="bg-maincolor text-white px-6 py-2 rounded-full hover:bg-white hover:text-maincolor border border-maincolor"
                >
                  Load More
                </button>
              </div>
            )}
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
