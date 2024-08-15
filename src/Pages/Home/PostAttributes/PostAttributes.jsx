import React, { useContext, useEffect, useState } from "react";
import Headerpost from "../Headeepost/Headerpost";
import { Selectioncardcontext } from "../../../Contextapi/Selectioncardcontext";
import NewRequest from "../../../../utils/NewRequest";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Autocomplete, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { DotLoader } from "react-spinners";
const PostAttributes = () => {
    const { DataSelectionModel } = useContext(Selectioncardcontext);

    const [form, setForm] = useState({
      brand: "",
      condition: "",
      title: "",
      description: "",
      Location: "",
      price: "",
      showPhoneNumber: false,
      user:"",
    });
    const [phoneNumber, setphoneNumber] = useState("")
    const updateBrandData = JSON.parse(sessionStorage.getItem("footer"));
    const [images, setImages] = useState(Array(6).fill(null));
    const [isLoading, setIsLoading] = useState(false);
    const [fields, setFields] = useState([]);
    const [selectedCondition, setSelectedCondition] = useState(null);
    const [selectedDeviceType, setSelectedDeviceType] = useState(null);
    const [deviceTypes, setDeviceTypes] = useState([]);
    const [conditions, setConditions] = useState([]);
    const [filterdata, setfilterdata] = useState([])
    const [selecteddropdowndata, setselecteddropdowndata] = useState(null);

 const handleImageChange = (e, index) => {
   const file = e.target.files[0];
   if (file) {
     const newImages = [...images];
     newImages[index] = file; // Store File object
     setImages(newImages);
   }
 };


    // Get api
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await NewRequest.get(
                `/brand/getAllModelsByFooterCategory/${updateBrandData?._id || ""}`
            );
            const filterdata = response.data.find((item) => item.model);
            console.log(response.data);
            setfilterdata(filterdata.data);
            const conditionData = response.data.find(item => item.model === 'Condition');
            setConditions(conditionData.data)
            const deviceTypeData = response.data.find(item => item.model === 'DeviceType');
            setDeviceTypes(deviceTypeData ? deviceTypeData.data : []);

            setFields(response.data || []);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }

        try {
            const response = await NewRequest.get(
                `/brand/filter_masterdata_in_subcategory/${updateBrandData?._id || ""}`
            );

            const filterdata = response.data.find(item => item.model);
            console.log(response);
            setfilterdata(filterdata.data);
            const conditionData = response.data.find(item => item.model === 'Condition');
            setConditions(conditionData.data)
            const deviceTypeData = response.data.find(item => item.model === 'DeviceType');
            setDeviceTypes(deviceTypeData ? deviceTypeData.data : []);
            setFields(response.data || []);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [DataSelectionModel]); 

    const handleChange = (model, value) => {
        const selectedData = fields.find(field => field.model === model)?.data.find(item => item.name === value);
    console.log("Selected Data:", selectedData._id,);

        setForm((prevForm) => ({
          ...prevForm,
          [model]: selectedData ? selectedData._id : "", // Store the _id in form state
        }));
        
    };

    const handleConditionChange = (name) => {
      setSelectedCondition(name);
      handleChange("Condition", name);
    };

    const handleDeviceTypeChange = (id) => {
        setSelectedDeviceType(id);
        handleChange("deviceType", id);
    };

    const CustomRadioButton = ({ options, selectedOption, onChange }) => {
        return (
            <div className="flex space-x-2">
                {options.map((option) => (
                    <div
                        key={option._id}
                        className={`cursor-pointer border rounded px-4 py-2 ${selectedOption === option.name
                            ? "bg-teal-100 border-teal-500"
                            : "border-gray-500"
                            }`}
                        onClick={() => onChange(option.name)}
                    >
                        {option.name}
                    </div>
                ))}
            </div>
        );
    };

    // Phone number
    const handlecompanyLandLine = (value) => {
        // Set the mobile number
        setphoneNumber(value);
    };

    const handlefilter = (event, newValue) => {
        setselecteddropdowndata(newValue);
        setfilterdata(newValue);
        console.log(newValue._id);
        
         setForm((prevForm) => ({
           ...prevForm,
           [selecteddropdowndata]: newValue?._id || "", // Update the form state with selected _id
         }));
    };



    // Post api herer
      const handleAddCompany = async (e) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("name", form.title);
        formData.append("description", form.description);
        formData.append("price", form.price);
        formData.append("location", form.Location);
        formData.append("User", "66a0a60182059f7e3fea2966");
        formData.append("Category", updateBrandData?._id);
        formData.append("SubCategory", updateBrandData?._id);
        formData.append("FooterCategory", updateBrandData?._id);
        // For the image append
        images.forEach((image, index) => {
          if (image) {
            formData.append(`images`, image); // Unique key for each image
          }
        });


       fields.forEach((field) => {
         if (field.model) {
           formData.append(field.model, form[field.model]);
         }
       });

        try {
          const response = await NewRequest.post("/product", formData);
          setIsLoading(false);
          toast.success(`Your ad has been added successfully".`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          console.log(response.data);
        } catch (error) {
          console.log(error);
          
          setIsLoading(false);
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

    return (
      <>
        <Headerpost />
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Create a new Ad
        </h2>
         {isLoading && <div className='loading-spinner-background'
        style={{
          zIndex: 9999, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.5)',
          display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed'
        }}
      >
        <DotLoader
          size={45}
          color={"#406367"}
          // height={4}
          loading={isLoading}
        />
      </div>
      }
        <div className="w-full sm:w-1/2 lg:w-[900px] my-10 mx-auto bg-white border border-bordderscolor shadow-md rounded-lg">
          <form>
            <div className="border-t border-b border-bordderscolor p-6">
              <div className="mb-4 flex items-center">
                <label className="w-1/4 mb-1 font-semibold">
                  Category <span className="text-red-600"> *</span>
                </label>
                <div className="w-full flex">
                  <div className="w-16 h-16 bg-gray-200 border border-dashed border-gray-400 flex items-center justify-center cursor-pointer">
                    {/* <img
                    src={updateBrandData.image}
                    alt={`Logo `}
                    className="w-full h-full object-cover"
                  /> */}
                  </div>
                  <div className="dev my-auto">
                    <p>{updateBrandData?.name || ""}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-b border-bordderscolor p-6">
              <div className="mb-4 flex items-center">
                <label className="w-1/4 mb-1 font-semibold">
                  Upload Images
                </label>
                <div className="w-full p-2 flex space-x-2">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id={`image-upload-${index}`}
                        onChange={(e) => handleImageChange(e, index)}
                      />
                      <label htmlFor={`image-upload-${index}`}>
                        <div className="w-16 h-16 bg-gray-200 border border-dashed border-gray-400 flex items-center justify-center cursor-pointer">
                          {image ? (
                            <img
                              src={URL.createObjectURL(image)} // Create a preview URL for the image
                              alt={`Uploaded ${index}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-gray-400">+</span>
                          )}
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-b border-bordderscolor p-6">
              {fields.map((field, index) => (
                <div
                  key={index}
                  className="flex flex-row gap-3 sm:flex-row sm:justify-between mt-6"
                >
                  <div className="w-full font-body sm:text-base text-sm flex flex-row items-center">
                    <label className="w-1/4 mb-1 font-semibold">
                      {field.model} <span className="text-red-600"> *</span>
                    </label>
                    {field.model === "Condition" ? (
                      <div className="w-full">
                        <CustomRadioButton
                          options={conditions}
                          selectedOption={selectedCondition}
                          onChange={handleConditionChange}
                        />
                      </div>
                    ) : field.model === "DeviceType" ? (
                      <div className="w-full">
                        <CustomRadioButton
                          options={deviceTypes}
                          selectedOption={selectedDeviceType}
                          onChange={handleDeviceTypeChange}
                        />
                      </div>
                    ) : filterdata.length > 0 ? (
                      <div className="w-full">
                        <Autocomplete
                          id="model"
                          options={filterdata}
                          value={selecteddropdowndata}
                          required
                          getOptionLabel={(option) => option?.name || ""}
                          onChange={handlefilter}
                          onInputChange={(event, value) => {
                            if (!value) {
                              console.log("Input cleared");
                            }
                          }}
                          renderInput={(params) => (
                            <TextField
                              autoComplete="off"
                              {...params}
                              InputProps={{
                                ...params.InputProps,
                                className: "text-white",
                              }}
                              InputLabelProps={{
                                ...params.InputLabelProps,
                                style: {
                                  color: "white",
                                },
                              }}
                              className="text-xs rounded-lg w-full"
                              placeholder={`Select ${field.model}`}
                            />
                          )}
                        />
                      </div>
                    ) : (
                      <div className="w-full">
                        <input
                          type="text"
                          value={form[field.model] || ""}
                          onChange={(e) =>
                            handleChange(field.model, e.target.value)
                          }
                          className="w-full p-2 border border-gray-300 rounded"
                          placeholder={`Select ${field.model}`}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-b border-bordderscolor p-6">
              <div className="mb-4 flex items-center">
                <label className="w-1/4 mb-1 font-semibold">
                  Ad title <span className="text-red-600"> *</span>
                </label>
                <div className="w-full">
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        title: e.target.value,
                      });
                    }}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter title"
                  />
                </div>
              </div>

              <div className="mb-4 flex items-center">
                <label className="w-1/4 mb-1 font-semibold">
                  Description <span className="text-red-600"> *</span>
                </label>
                <div className="w-full">
                  <textarea
                    type="text"
                    value={form.description}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        description: e.target.value,
                      });
                    }}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Describe the item you're selling"
                  />
                </div>
              </div>

              <div className="mb-4 flex items-center">
                <label className="w-1/4 mb-1 font-semibold">
                  Location <span className="text-red-600"> *</span>
                </label>
                <div className="w-full">
                  <input
                    type="text"
                    value={form.Location}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        Location: e.target.value,
                      });
                    }}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Select Location"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-b border-bordderscolor p-6">
              <div className="mb-4 flex items-center">
                <label className="w-1/4 mb-1 font-semibold">
                  Price <span className="text-red-600"> *</span>
                </label>
                <div className="w-full">
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        price: e.target.value,
                      });
                    }}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter price"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-b border-bordderscolor p-6">
              <div className="mb-4 flex items-center">
                <label className="w-1/4 mb-1 font-semibold">Name</label>
                <div className="w-full">
                  <input
                    type="text"
                    value={form.user}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        user: e.target.value,
                      });
                    }}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter your Name"
                  />
                </div>
              </div>
              <div className="mb-4 flex">
                <label className="w-1/4 mb-1 font-semibold">
                  Your phone number
                </label>
                <div className="w-full">
                  <PhoneInput
                    international
                    country={"pk"}
                    defaultCountry={"pk"}
                    value={phoneNumber}
                    onChange={handlecompanyLandLine}
                    inputProps={{
                      id: "landline",
                      placeholder: "Company Landline",
                      autoComplete: "off",
                    }}
                    className="w-full border border-gray-300 rounded"
                    inputStyle={{
                      width: "100%",
                      borderRadius: "0px",
                      border: "none",
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-b border-bordderscolor p-6">
              <button
                type="button"
                onClick={handleAddCompany}
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
