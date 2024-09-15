import { Skeleton } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SearchResultsPage() {
    const location = useLocation();
    const navigate=useNavigate()
    const searchResults = location.state?.searchResults || [];
    console.log(searchResults, "searchResults");
    const [isLoading, setisLoading] = useState(false);

  const singproductitem = (card) => {
    console.log(card);
    
    navigate(`/Singleitem/${card._id}`, { state: { cardData: card } });
  };
    return (
      <div className="lg:px-10 my-5 lg:my-32 sm:mt-2">
        <h1>Search Results</h1>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
          {searchResults.length === 0 && !isLoading && <p>No products found</p>}

          {searchResults.map((item, index) => (
            <div
              className="border rounded shadow cursor-pointer hover:shadow-lg hover:border-black"
              key={index}
              onClick={() => singproductitem(item)} // Moved the onClick event to the entire div
            >
              <div className="flex gap-3">
                <img
                  src={item?.images?.[0] || ""}
                  alt="Product"
                  className="w-full h-64 object-cover"
                />
                <div className="w-full mb-5 p-4">
                  {/* <DescriptionWithToggle description={item.name} /> */}
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
                    {item?.location || ""} - 2 weeks ago
                  </p>
                  {/* <div className="flex mt-4">
            <button
              className="text-green-500 border border-green-500 px-4 py-2 rounded"
              onClick={(e) => { e.stopPropagation(); charfunction(item); }}
            >
              Chat
            </button>
          </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}

export default SearchResultsPage;
