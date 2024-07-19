import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import NewRequest from "../../../../../utils/NewRequest";
import "./Categories.css";

const Addcategories = ({ isVisible, setVisibility, refreshBrandData }) => {
  const [name, setname] = useState("");
  const [Page, setPage] = useState("");

  const handleCloseCreatePopup = () => {
    setVisibility(false);
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageshow, setimageshow] = useState("");
  const [selectedFile_ar, setSelectedFile_ar] = useState(null);
  const [imageshow_ar, setimageshow_ar] = useState("");

  function handleChangeback(e) {
    setSelectedFile(e.target.files[0]);
    setimageshow(e.target.files[0]);
  }

  function handleChangeback_ar(e) {
    setSelectedFile_ar(e.target.files[0]);
    setimageshow_ar(e.target.files[0]);
  }

  const handleAddCompany = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", imageshow);
    formData.append("icon", imageshow_ar);
    formData.append("status", Page);
    console.log(formData);
    try {
      const response = await NewRequest.post("/category", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
console.log(response);
      toast.success(`Categories has been added successfully".`, {
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
                  Add Categories
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
                    <label htmlFor="status" className={`text-loactioncolor`}>
                      status
                    </label>
                    <select
                      id="status"
                      value={Page}
                      onChange={(e) => setPage(e.target.value)}
                      className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3`}
                    >
                      <option value="0">-- status --</option>
                      <option value="1">Active</option>
                      <option value="0">InActive</option>
                      {/* {Pagedropdown &&
                        Pagedropdown.map((itme, index) => {
                          return (
                            <option key={index} value={itme.slug}>
                              {itme.name}
                            </option>
                          );
                        })} */}
                    </select>
                  </div>

                  <div className="flex justify-between flex-col sm:flex-row">
                    <div className="printerPic font-body sm:text-base text-sm flex flex-col gap-2">
                      {/* <center> */}
                      <label htmlFor="Image" className={`text-loactioncolor`}>
                        Image
                      </label>
                      <div className="imgesection">
                        <img
                          src={
                            selectedFile
                              ? URL.createObjectURL(selectedFile)
                              : imageshow != null
                              ? imageshow
                              : ""
                          }
                          className="printerpic"
                          style={{
                            width:
                              selectedFile || imageshow ? "200px" : "200px",
                            height:
                              selectedFile || imageshow ? "200px" : "200px",
                          }}
                        />

                        <div className="row " htmlFor="file-inputs">
                          <label
                            htmlFor="file-inputs"
                            className="choosefile bg-loactioncolor hover:bg-primary"
                          >
                            choose file
                          </label>
                          <input
                            id="file-inputs"
                            type="file"
                            onChange={handleChangeback}
                            style={{ display: "none" }}
                          />
                        </div>
                      </div>

                      {/* </center> */}
                    </div>

                    <div className="printerPic font-body sm:text-base text-sm flex flex-col gap-2">
                      <label htmlFor="Imagear" className={`text-loactioncolor`}>
                        Icon
                      </label>
                      <div className="imgesection">
                        <img
                          src={
                            selectedFile_ar
                              ? URL.createObjectURL(selectedFile_ar)
                              : imageshow_ar != null
                              ? imageshow_ar
                              : ""
                          }
                          className="printerpic"
                          style={{
                            width:
                              selectedFile_ar || imageshow_ar
                                ? "200px"
                                : "200px",
                            height:
                              selectedFile_ar || imageshow_ar
                                ? "200px"
                                : "200px",
                          }}
                        />

                        <div className="row " htmlFor="imagear">
                          <label
                            htmlFor="imagear"
                            className="choosefile bg-loactioncolor hover:bg-primary"
                          >
                            choose file
                          </label>
                          <input
                            id="imagear"
                            type="file"
                            onChange={handleChangeback_ar}
                            style={{ display: "none" }}
                          />
                        </div>
                      </div>
                    </div>
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
                    Add Categories
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

export default Addcategories;
