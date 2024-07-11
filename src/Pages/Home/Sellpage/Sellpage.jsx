import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { GrNext } from "react-icons/gr";

function Sellpage() {
  const navigator = useNavigate();
  const categories = [
    { name: "Mobiles", icon: "📱", subcategories: [] },
    {
      name: "Vehicles",
      icon: "🚗",
      subcategories: [
        "Cars",
        "Cars on Installments",
        "Car Accessories",
        "Spare Parts",
        "Buses, Vans & Trucks",
        "Rickshaw & Chingchi",
        "Other Vehicles",
        "Boats",
        "Tractors & Trailers",
      ],
    },
    { name: "Property for Sale", icon: "🏠", subcategories: [] },
    { name: "Property for Rent", icon: "🔑", subcategories: [] },
    { name: "Electronics & Home Appliances", icon: "📷", subcategories: [] },
    { name: "Bikes", icon: "🏍️", subcategories: [] },
    {
      name: "Business, Industrial & Agriculture",
      icon: "🚜",
      subcategories: [],
    },
    { name: "Services", icon: "🛠️", subcategories: [] },
    { name: "Jobs", icon: "💼", subcategories: [] },
    { name: "Animals", icon: "🐶", subcategories: [] },
    { name: "Furniture & Home Decor", icon: "🛋️", subcategories: [] },
    { name: "Fashion & Beauty", icon: "👗", subcategories: [] },
    { name: "Books, Sports & Hobbies", icon: "📚", subcategories: [] },
    { name: "Kids", icon: "🧸", subcategories: [] },
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
  };

  return (
    <div>
      <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-100">
        <div
          className="cursor-pointer flex my-auto"
          onClick={() => navigator("/")}
        >
          <IoMdArrowBack size={24} />
          <p className="text-lg font-bold text-center ms-3 my-auto">OLX</p>
        </div>
      </div>
      <div className="bg-white">
        <div className="mx-10">
          <h1 className="text-3xl font-bold mb-10 text-center">Post Your Ad</h1>
          {selectedCategory ? (
            <div>
              <button
                className="mb-4 flex items-center text-lg font-semibold text-gray-600"
                onClick={handleBackClick}
              >
                <IoMdArrowBack size={20} className="mr-2" />
                Back
              </button>
              <h2 className="text-2xl font-bold mb-4">
                {selectedCategory.name}
              </h2>
              <div className="w-full border rounded-sm">
                {selectedCategory.subcategories.map((sub, index) => (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
                    <p key={index} className="p-3 border-b justify-between border-r flex my-auto bg-transparent hover:bg-[#c8f8f6] active:bg-[#c8f8f6]  ">
                      {sub}
                       <GrNext size={24} className="my-auto" />
                    </p>
                    <p key={index} className="border-b p-3 justify-center border-r">
                      {sub}
                    </p>
                  
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="flex border border-black rounded-lg py-3 justify-between my-auto bg-transparent hover:bg-[#c8f8f6] cursor-pointer"
                  onClick={() => handleCategoryClick(category)}
                >
                  <div className="flex">
                    <span className="text-2xl mr-4">{category.icon}</span>
                    <span className="text-lg font-semibold">
                      {category.name}
                    </span>
                  </div>
                  <GrNext size={24} className="my-auto" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sellpage;
