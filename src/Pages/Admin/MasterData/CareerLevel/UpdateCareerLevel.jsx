import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import NewRequest from "../../../../../utils/NewRequest";

const UpdateCareerLevel = ({ isVisible, setVisibility, refreshBrandData }) => {
  const updateBrandData = JSON.parse(
    sessionStorage.getItem("updateCareerLevel")
  );
  const [name, setname] = useState(updateBrandData?.name || "");
  const [status, setstatus] = useState(updateBrandData?.status || 0);
  console.log(updateBrandData);

  const [subCategory, setsubCategory] = useState("");
  const [subCategorydropdown, setsubCategorydropdown] = useState([]);
  const [footerCategory, setfooterCategory] = useState("");
  const [footerCategorydropdown, setfooterCategorydropdown] = useState([]);

  const getpagedata = async () => {
    try {
      const response = await NewRequest.get("/subCategory");
      setsubCategorydropdown(response?.data || []);
    } catch (error) {
      // console.log(error);
    }
  };
  const footerCategorydata = async () => {
    try {
      const response = await NewRequest.get("/footerCategory");
      setfooterCategorydropdown(response?.data || []);
    } catch (error) {
      // console.log(error);
    }
  };
  const getiddata = async () => {
    try {
      const response = await NewRequest.get(
        `/brand/CareerLevel/${updateBrandData._id}`
      );
      setsubCategory({
        name: response?.data?.subCategory?.name || "",
        _id: response?.data?.subCategory?._id || "",
      });
      setfooterCategory({
        name: response?.data?.footerCategory?.name || "",
        _id: response?.data?.footerCategory?._id || "",
      });
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    getpagedata();
    footerCategorydata();
    getiddata();
  }, []);
  const handleSubCategoryChange = (e) => {
    const value = e.target.value;
    setsubCategory({ _id: value });
    if (value) {
      setfooterCategory(""); // Clear footerCategory when subCategory is selected
    }
  };

  const handleFooterCategoryChange = (e) => {
    const value = e.target.value;
    setfooterCategory({ _id: value });
    if (value) {
      setsubCategory(""); // Clear subCategory when footerCategory is selected
    }
  };
  const handleCloseCreatePopup = () => {
    setVisibility(false);
  };

  const handleAddCompany = async () => {
    try {
      const response = await NewRequest.put(
        `/brand/CareerLevel/${updateBrandData?._id}`,
        {
          name: name,
          subCategory: subCategory,
          footerCategory: footerCategory,
          status: Number(status),
        }
      );
      toast.success(`Career Level has been update successfully".`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // console.log(response.data);
      refreshBrandData();
      handleCloseCreatePopup();
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
      // console.log(error);
    }
  };

  return (
    <div>
      {/* create the post api popup */}
      {isVisible && (
        <div className="popup-overlay z-50 ">
          <div className="popup-container bg-gray-100 h-auto sm:w-[45%] justify-center w-full">
            <div
              className="popup-form w-full "
              style={{ maxHeight: "90vh", overflowY: "auto" }}
            >
              <form className="w-full">
                <h2
                  className={`text-loactioncolor font-sans font-semibold text-2xl`}
                >
                  Update Career Level
                </h2>
                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="name" className={`text-loactioncolor`}>
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                      placeholder={`Enter Name`}
                      className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3`}
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label
                      htmlFor="subCategory"
                      className={`text-loactioncolor`}
                    >
                      Sub Category
                    </label>
                    <select
                      id="subCategory"
                      value={subCategory._id}
                      onChange={handleSubCategoryChange}
                      className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3`}
                    >
                      <option value="0"> Select </option>
                      {subCategorydropdown &&
                        subCategorydropdown.map((itme, index) => {
                          return (
                            <option key={index} value={itme._id}>
                              {itme.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label
                      htmlFor="footerCategory"
                      className={`text-loactioncolor`}
                    >
                      Footer Category
                    </label>
                    <select
                      id="footerCategory"
                      value={footerCategory._id}
                      onChange={handleFooterCategoryChange}
                      className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3`}
                    >
                      <option value="0"> Select </option>
                      {footerCategorydropdown &&
                        footerCategorydropdown.map((itme, index) => {
                          return (
                            <option key={index} value={itme._id}>
                              {itme.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label htmlFor="status" className={`text-loactioncolor`}>
                      status
                    </label>
                    <select
                      id="status"
                      value={status}
                      onChange={(e) => setstatus(e.target.value)}
                      className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3`}
                    >
                      {/* <option value="0"> status </option> */}
                      <option value="1">Active</option>
                      <option value="0">InActive</option>
                    </select>
                  </div>
                </div>

                <div className="w-full flex justify-center items-center gap-8 mt-5">
                  <button
                    type="button"
                    className="px-5 py-2 w-[30%] rounded-sm bg-primary text-white font-body text-sm"
                    onClick={handleCloseCreatePopup}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={handleAddCompany}
                    className="px-5 py-2 rounded-sm w-[70%] bg-loactioncolor text-white font-body text-sm ml-2"
                  >
                    Update Career Level
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateCareerLevel;
