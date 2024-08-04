import React, { useState } from "react";
import Headerpost from "../Headeepost/Headerpost";

const PostAttributes = () => {
  const [form, setForm] = useState({
    brand: "",
    condition: "",
    title: "",
    description: "",
    Location: "",
    price: "",
    phoneNumber: "",
    showPhoneNumber: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <>
      <Headerpost />
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Create a new Ad
      </h2>
      <div className="w-full sm:w-1/2 lg:w-[900px] my-10 mx-auto bg-white border border-bordderscolor shadow-md rounded-lg">
        <form>
          <div className="mb-4 flex items-center">
            <label className="w-1/4 mb-1 font-semibold">Upload Images</label>
            <div className="w-3/4 p-2 flex space-x-2">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="w-16 h-16 bg-gray-200 border border-dashed border-gray-400 flex items-center justify-center"
                >
                  <span className="text-gray-400">+</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-b border-bordderscolor p-6">
            <div className="mb-4 flex items-center">
              <label className="w-1/4 mb-1 font-semibold">
                Brand <span className="text-red-600"> *</span>
              </label>
              <input
                type="text"
                value={form.brand}
                onChange={(e) => {
                  setForm({
                    ...form,
                    brand: e.target.value,
                  });
                }}
                className="w-3/4 p-2 border border-gray-300 rounded"
                placeholder="Select brand"
              />
            </div>
            <div className="mb-4 flex items-center">
              <label className="w-1/4 mb-1 font-semibold">
                Condition <span className="text-red-600"> *</span>
              </label>
              <input
                type="text"
                value={form.condition}
                onChange={(e) => {
                  setForm({
                    ...form,
                    condition: e.target.value,
                  });
                }}
                className="w-3/4 p-2 border border-gray-300 rounded"
                placeholder="Select condition"
              />
            </div>
          </div>

          <div className="border-t border-b border-bordderscolor p-6">
            <div className="mb-4 flex items-center">
              <label className="w-1/4 mb-1 font-semibold">
                Ad title <span className="text-red-600"> *</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => {
                  setForm({
                    ...form,
                    title: e.target.value,
                  });
                }}
                className="w-3/4 p-2 border border-gray-300 rounded"
                placeholder="Enter title"
              />
            </div>

            <div className="mb-4 flex items-center">
              <label className="w-1/4 mb-1 font-semibold">
                Description <span className="text-red-600"> *</span>
              </label>
              <textarea
                type="text"
                value={form.description}
                onChange={(e) => {
                  setForm({
                    ...form,
                    description: e.target.value,
                  });
                }}
                className="w-3/4 p-2 border border-gray-300 rounded"
                placeholder="Describe the item you're selling"
              />
            </div>

            <div className="mb-4 flex items-center">
              <label className="w-1/4 mb-1 font-semibold">
                Location <span className="text-red-600"> *</span>
              </label>
              <input
                type="text"
                value={form.Location}
                onChange={(e) => {
                  setForm({
                    ...form,
                    Location: e.target.value,
                  });
                }}
                className="w-3/4 p-2 border border-gray-300 rounded"
                placeholder="Select Location"
              />
            </div>
          </div>

          <div className="border-t border-b border-bordderscolor p-6">
            <div className="mb-4 flex items-center">
              <label className="w-1/4 mb-1 font-semibold">
                Price <span className="text-red-600"> *</span>
              </label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => {
                  setForm({
                    ...form,
                    price: e.target.value,
                  });
                }}
                className="w-3/4 p-2 border border-gray-300 rounded"
                placeholder="Enter price"
              />
            </div>
          </div>

          <div className="border-t border-b border-bordderscolor p-6">
            <div className="mb-4 flex items-center">
              <label className="w-1/4 mb-1 font-semibold">Name</label>
              <input
                type="text"
                // value={form.brand}
                // onChange={(e) => {
                //   setForm({
                //     ...form,
                //     brand: e.target.value,
                //   });
                // }}
                className="w-3/4 p-2 border border-gray-300 rounded"
                placeholder="Enter your Name"
              />
            </div>
            <div className="mb-4 flex">
              <label className="w-1/4 mb-1 font-semibold">
                Your phone number
              </label>
              <input
                type="number"
                value={form.phoneNumber}
                onChange={(e) => {
                  setForm({
                    ...form,
                    phoneNumber: e.target.value,
                  });
                }}
                className="w-3/4 p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <div className="border-t border-b border-bordderscolor p-6">
            <button
              type="submit"
              className="w-full bg-loactioncolor text-white hover:bg-primary py-2 rounded"
            >
              Post Ad
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PostAttributes;
