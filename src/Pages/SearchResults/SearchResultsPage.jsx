import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import imageLiveUrl from "../../../utils/urlConverter/imageLiveUrl";

function SearchResultsPage() {
  const location = useLocation();
  const navigate = useNavigate()
  const searchResults = location.state?.searchResults || [];
  const [isLoading, setisLoading] = useState(false);

  const singproductitem = (card) => {
    navigate(`/Singleitem/${card._id}`, { state: { cardData: card } });
  };
  return (
    <div className="lg:px-10 my-5 lg:my-32 sm:mt-2">
      <h1>Search Results</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {searchResults.length === 0 && !isLoading && <p>No products found</p>}

        {searchResults.map((item, index) => (
          <div
            key={index}
            className="border rounded shadow cursor-pointer hover:shadow-lg hover:border-black"
            onClick={() => singproductitem(item)}
          >
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="w-full lg:w-1/2 sm:full">
                <img
                  src={
                    item?.images?.[0]
                      ? item?.images?.[0].startsWith("https")
                        ? item?.images?.[0]
                        : imageLiveUrl(item?.images?.[0])
                      : ""
                  }
                  alt="Product"
                  className="w-full h-full lg-w-auto sm:w-full  object-cover"
                />
              </div>
              <div className="w-full mb-5 p-4">
                <p className="text-gray-500 text-sm">
                  <strong className="text-lg">Name:</strong> {item.name || ""}
                </p>
                <p className="text-gray-500 text-sm">
                  <strong className="text-lg">Description:</strong>{" "}
                  {item?.description || ""}
                </p>
                <div className="flex justify-between mt-3">
                  <h3 className="font-bold text-lg ">
                    <strong className="text-lg">Price:</strong> Rs{" "}
                    {item?.price || ""}
                  </h3>
                </div>
                <p className="text-gray-500 mb-2">
                  <strong className="text-lg">Status:</strong>{" "}
                  {item?.status || ""}
                </p>
                <p className="text-gray-500 text-sm">
                  {item?.location || ""}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResultsPage;
