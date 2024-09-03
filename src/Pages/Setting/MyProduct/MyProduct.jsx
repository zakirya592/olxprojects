import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import NewRequest from "../../../../utils/NewRequest";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const MyProduct = () => {
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
    const response = await NewRequest.get(
      `/product/getProductsByUserId/${loginuserid || ""}`
    );
    console.log(response?.data, "my product");
    return response?.data || [];
  }

  const postcard = async (Product) => {
    try {
      const response = await NewRequest.delete(`/product/${Product}`);
      console.log(response);
      toast.success(`Product has been Delete successfully`, {
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
      toast.error(error?.response?.data?.message || "Error", {
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

  // Dynamic rendering function to display product data
  const renderObject = (obj, keyPrefix = "") => {
    return Object.keys(obj).map((key) => {

        //   if (["images", "__v", "_id", "price", "User",'status',].includes(key)) {
        //     return null;
        //   }
      // Skip the "User" key
      if (key === "User") {
        return null;
      }
      if(key==='images'){
        return null
      } if (key === "__v") {
        return null;
      }if (key === "_id") {
        return null;
      }if (key === "price") {
        return null;
      }

      const value = obj[key];

      // Check if the value is an array
      if (Array.isArray(value)) {
        return (
          <div key={keyPrefix + key}>
            <strong>{key}:</strong>
            <ul style={{ paddingLeft: "20px" }}>
              {value.map((item, index) => (
                <li key={index}>
                  {typeof item === "object" && item !== null
                    ? renderObject(item, `${keyPrefix}${key}[${index}]`)
                    : String(item)}
                </li>
              ))}
            </ul>
          </div>
        );
      } else if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        return (
          <div key={keyPrefix + key} className="flex">
            <strong>{key}:</strong>
            <div style={{ paddingLeft: "20px" }}>
              {renderObject(value, `${keyPrefix}${key}`)}
            </div>
          </div>
        );
      } else {
        return (
          <div key={keyPrefix + key}>
            <strong>{key}:</strong> : {String(value)}
          </div>
        );
      }
    });
  };

    const singproductitem = (card) => {
      navigate(`/Singleitem/${card._id}`, { state: { cardData: card } });
    };

     const Updateproduct = (card) => {
       navigate(`/UpdateMyProduct/${card.name}`, { state: { ProductData: card } });
     };



  return (
    <>
      <div className="lg:px-10 mt-5 lg:mt-36 sm:mt-2">
        <div className="my-5">
          <div className="flex justify-between my-auto">
            <span
              className="cursor-pointer my-auto"
              onClick={() => navigate("/")}
            >
              Home
            </span>
            <button
              className="cursor-pointer border border-headingcolor px-5 py-3 rounded-md text-headingcolor hover:bg-headingcolor hover:text-white"
              onClick={() => navigate("/Post")}
            >
              Add Product
            </button>
          </div>

          <div className="flex justify-between flex-col lg:flex-row sm:flex-col">
            <h6 className="text-headingcolor text-3xl font-bold overflow-hidden my-1 sm:my-1 lg:my-5">
              My Product
            </h6>
            <h6 className=" text-3xl font-bold overflow-hidden my-1 sm:my-1 lg:my-5">
              <strong className="text-headingcolor">Total Length</strong> :{" "}
              {wishlistData?.length || "0"}
            </h6>
          </div>
        </div>

        <div className="flex">
          <main className="flex-1 p-4">
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
              {isLoading ? (
                <div>Loading...</div>
              ) : error ? (
                <div>Error loading data</div>
              ) : wishlistData.length === 0 ? (
                <div className="flex items-center justify-center w-full">
                  <p className="text-gray-500 text-xl">No Product yet.</p>
                </div>
              ) : (
                wishlistData.map((item, index) => (
                  <div
                    className="border rounded shadow hover:shadow-md hover:border-black"
                    key={index}
                  >
                    <div className="flex gap-3 flex-col lg:flex-row sm:flex-col">
                      <img
                        src={item?.images?.[0] || ""}
                        alt="Product"
                        className="w-full h-80 object-cover cursor-pointer"
                        onClick={() => singproductitem(item)}
                      />
                      <div className="w-full mb-5 p-4">
                        <div className="flex justify-between">
                          <h1></h1>
                          <div className="flex justify-end">
                            <EditIcon
                              fontSize="small"
                              color="action"
                              style={{ color: "rgb(37 99 235)" }}
                              className="cursor-pointer mx-3"
                              onClick={() => Updateproduct(item)}
                            />
                            <DeleteIcon
                              fontSize="small"
                              color="action"
                              style={{ color: "red" }}
                              className="cursor-pointer mx-3"
                              onClick={() => postcard(item._id)}
                            />
                          </div>
                        </div>
                        {renderObject(item)}
                        <h3 className="font-bold text-md mb-2">
                          <strong>Price:</strong> Rs {item?.price || ""}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          {item?.location || ""} - 2 weeks ago
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default MyProduct;
