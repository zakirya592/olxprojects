import React, { useState, useEffect, useRef, useContext } from "react";
import { Selectioncardcontext } from "../../../Contextapi/Selectioncardcontext";
import NewRequest from "../../../../utils/NewRequest";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Autocomplete, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { DotLoader } from "react-spinners";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
const UpdateMyProduct = () => {
  const { DataSelectionModel } = useContext(Selectioncardcontext);
  const location = useLocation();
  const navigate = useNavigate();
  const cardData = location.state;
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);


  
  const { error, data: eventsData = [] } = useQuery(
    "footerCategory",
    fetchUpcomingEventsData
  );

  async function fetchUpcomingEventsData() {
    const response = await NewRequest.get("/footerCategory/megamenu");
    return response?.data.filter((item) => item.status === 1) || [];
  }

  console.log(cardData, "dataaa");

  const storedUserResponseString = sessionStorage.getItem("userResponse");
  const storedUserResponse = JSON.parse(storedUserResponseString);
  const loginuserdata = storedUserResponse.data.user;
  const [form, setForm] = useState({
    brand: "",
    condition: "",
    title: cardData?.ProductData?.name || "",
    description: cardData?.ProductData?.description || "",
    Location: cardData?.ProductData?.location || "",
    price: cardData?.ProductData?.price || "",
    user: loginuserdata?.username || "",
  });
  const [phoneNumber, setphoneNumber] = useState(loginuserdata?.phone || "");

  // const [images, setImages] = useState(Array(6).fill(null));
  const [images, setImages] = useState(() => {
    const initialImages = cardData?.ProductData?.images || [];
    return [...initialImages, ...Array(6 - initialImages.length).fill(null)];
  });

  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState([]);
  
  const [selectedCondition, setSelectedCondition] = useState(
    cardData?.ProductData?.Condition?.name || conditions[0]?.name || null
  );
   
  const [selectedDeviceType, setSelectedDeviceType] = useState(
    cardData?.ProductData?.DeviceType?.name  || null
  );
  const [deviceTypes, setDeviceTypes] = useState([]);
  const [conditions, setConditions] = useState(
    // cardData?.ProductData?.Condition?._id || []
    {
    name: cardData.ProductData?.Category?.name || [],
    _id: cardData?.ProductData?.Condition?._id || [],
  }
  );
  
  const [filterdata, setfilterdata] = useState(
    cardData?.ProductData || []
  );
  
  const [Category, setCategory] = useState({
    name: cardData?.ProductData?.Category?.name || "",
    _id: cardData?.ProductData?.Category?._id || "",
  });
  console.log("Category", Category.name);
  
  const [SubCategory, setSubCategory] = useState({
    name: cardData?.ProductData?.SubCategory?.name || "",
    _id: cardData?.ProductData?.SubCategory?._id || "",
  });
  const [SubCategorydropdown, setSubCategorydropdown] = useState([]);
  const [footerCategory, setfooterCategory] = useState({
    name: cardData?.ProductData?.FooterCategory?.name || "",
    _id: cardData?.ProductData?.FooterCategory?._id || "",
  });
  const [footerCategorydropdown, setfooterCategorydropdown] = useState([]);
  
  console.log(cardData, "cardData?.ProductData");

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = file; // Store File object
      setImages(newImages);
    }
  };

  const handleChange = (model, value) => {
    const selectedData = fields
      .find((field) => field.model === model)
      ?.data.find((item) => item.name === value);

    setForm((prevForm) => ({
      ...prevForm,
      [model]: selectedData || "", // Store the _id in form state
    }));
    
  };

  const handleConditionChange = (name) => {
    setSelectedCondition(name);
   
    handleChange("Condition", name);
  };

  const handleDeviceTypeChange = (name) => {
    setSelectedDeviceType(name);
    handleChange("DeviceType", name);
  };

  const CustomRadioButton = ({ options, selectedOption, onChange }) => {
    return (
      <div className="flex space-x-2">
        {options.map((option) => (
          <div
            key={option._id}
            className={`cursor-pointer border rounded px-4 py-2 ${
              selectedOption === option.name
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

  const handlefilter = (event, newValue, model) => {
    setForm((prevForm) => ({
      ...prevForm,
      [model]: newValue || "", // Use the field model as the key
    }));
  };

  useEffect(() => {
    const loadScript = (url, callback) => {
      let script = document.createElement("script");
      script.type = "text/javascript";
      script.src = url;
      script.onload = callback;
      document.head.appendChild(script);
    };

    const handleScriptLoad = () => {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ["geocode"],
          componentRestrictions: { country: "pk" },
        }
      );

      autocompleteRef.current.addListener("place_changed", handlePlaceSelect);
    };

    const handlePlaceSelect = () => {
      const place = autocompleteRef.current.getPlace();
      setForm((prevForm) => ({
        ...prevForm,
        Location: place.formatted_address || place.name,
      }));
      console.log("Selected place:", place.formatted_address || place.name);
    };

    if (!window.google) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`,
        handleScriptLoad
      );
    } else {
      handleScriptLoad();
    }
  }, []);


  useEffect(() => {
    const SubCategorydata = async () => {
      try {
        const response = await NewRequest.get("/subCategory");
        setSubCategorydropdown(response?.data || []);
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

    SubCategorydata();
    footerCategorydata();
  }, []);

  const handleCategoryChange = (e, newValue) => {
    // setCategory(eventsData)
    // const selectedCategory = eventsData.find(
    //   (item) => item._id === e.target.value
    // );
    setCategory(newValue);
    setSubCategorydropdown(newValue.subCategories);
    console.log(newValue, "newValue");
  };

  const handleFooterCategoryChange = (e) => {
    const value = e.target.value;
    setfooterCategory({ _id: value });
  };

  // Handle sub-category change
  const handleSubCategoryChange = (e) => {
    const selectedSubCategory = SubCategorydropdown.find(
      (item) => item._id === e.target.value
    );
    setSubCategory(selectedSubCategory || { _id: "", name: "" });
    console.log(selectedSubCategory, "selectedSubCategory");
    
    // Check if sub-category has footer categories
    if (selectedSubCategory?.footerCategories) {
      setfooterCategorydropdown(selectedSubCategory.footerCategories);
    } else {
      setfooterCategorydropdown([]);
    }
  };

  // Get api
  const fetchData = async () => {
    setIsLoading(true);

    if (footerCategory?._id) {
      try {
        const response = await NewRequest.get(
          `/brand/getAllModelsByFooterCategory/${footerCategory?._id || ""}`
        );
        const filterdata = response.data.find((item) => item.model);

        console.log("filterdata", filterdata);

        setfilterdata(filterdata.data);
        const conditionData = response.data.find(
          (item) => item.model === "Condition"
        );
        setConditions(conditionData.data);
        const deviceTypeData = response.data.find(
          (item) => item.model === "DeviceType"
        );
        setDeviceTypes(deviceTypeData ? deviceTypeData.data : []);

        setFields(response.data || []);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        //  setDeviceTypes([]);
        //  setConditions([]);
        //  setfilterdata([]);
        //  setFields([]);
        setIsLoading(false);
      }
    } else {
      try {
        const response = await NewRequest.get(
          `/brand/filter_masterdata_in_subcategory/${SubCategory?._id || ""}`
        );
        setFields(response.data || []);

        const filterdata = response.data.find((item) => item.model);
        console.log(filterdata, "filterdata");
        console.log("Length of data:", filterdata.data.length);
        setfilterdata(filterdata.data);
        const conditionData = response.data.find(
          (item) => item.model === "Condition"
        );
        setConditions(conditionData.data);
        const deviceTypeData = response.data.find(
          (item) => item.model === "DeviceType"
        );
        setDeviceTypes(deviceTypeData ? deviceTypeData.data : []);

        setIsLoading(false);
      } catch (err) {
        console.log(err);
        // setDeviceTypes([])
        // setConditions([])
        // setfilterdata([])
        setFields([]);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [DataSelectionModel, SubCategory?._id, footerCategory?._id]);

  const handleAddCompany = async (e) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("location", form.Location);
    formData.append("User", loginuserdata?._id || "");
    formData.append("Category", Category?._id);
    formData.append("SubCategory", SubCategory?._id || "");
    if (footerCategory?._id) {
      formData.append("FooterCategory", footerCategory._id);
    }
    // For the image append
    images.forEach((image, index) => {
      if (image) {
        formData.append(`images`, image); // Unique key for each image
      }
    });

    
    
    fields.forEach((field) => {
      if (field.model) {
        formData.append(field.model, form[field.model]._id);
      }
    });

    try {
      const response = await NewRequest.put(
        `/product/${cardData?.ProductData?._id}`,
        formData
      );
      setIsLoading(false);
      toast.success(`Your ad has been Updated successfully".`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/MyProduct");
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
      <h2 className="text-2xl font-semibold mb-4 text-center mt-5">
        Update Product
      </h2>
      {isLoading && (
        <div
          className="loading-spinner-background"
          style={{
            zIndex: 9999,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
          }}
        >
          <DotLoader
            size={45}
            color={"#406367"}
            // height={4}
            loading={isLoading}
          />
        </div>
      )}
      <div className="w-full sm:w-1/2 lg:w-[900px] my-10 mx-auto bg-white border border-bordderscolor shadow-md rounded-lg">
        <form>
          <div className="border-t border-b border-bordderscolor p-6">
            <div className="mb-4 flex items-center">
              <label className="w-1/4 mb-1 font-semibold">Upload Images</label>
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
                          image instanceof File ? (
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Uploaded ${index}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <img src={image} alt="" />
                          )
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
            <div className="mb-4 flex items-center">
              <label className="w-1/4 mb-1 font-semibold">
                Category <span className="text-red-600"> *</span>
              </label>
              <div className="w-full">
                <Autocomplete
                  options={eventsData}
                  getOptionLabel={(option) => option.name}
                  onChange={handleCategoryChange}
                  value={Category}
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
                      placeholder={`Select Category`}
                    />
                  )}
                />
              </div>
            </div>

            <div className="mb-4 flex items-center">
              <label className="w-1/4 mb-1 font-semibold">
                Sub Category <span className="text-red-600"> *</span>
              </label>
              <div className="w-full">
                <select
                  id="SubCategory"
                  value={SubCategory._id}
                  onChange={handleSubCategoryChange}
                  className={`border w-full rounded-lg border-[#8E9CAB] p-2 `}
                >
                  <option value="0"> Select </option>
                  {SubCategorydropdown &&
                    SubCategorydropdown.map((itme, index) => {
                      return (
                        <option key={index} value={itme._id}>
                          {itme.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            {footerCategorydropdown.length > 0 && (
              <div className="mb-4 flex items-center">
                <label className="w-1/4 mb-1 font-semibold">
                  Footer Category <span className="text-red-600"> *</span>
                </label>
                <div className="w-full">
                  <select
                    id="footerCategory"
                    value={footerCategory._id}
                    onChange={handleFooterCategoryChange}
                    className={`border w-full rounded-md border-[#8E9CAB] p-2 `}
                  >
                    <option> Select </option>
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
              </div>
            )}

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
                        value={form[field.model] || null} // Ensure the correct value is displayed
                        required
                        getOptionLabel={(option) => option?.name || ""}
                        onChange={(event, newValue) =>
                          handlefilter(event, newValue, field.model)
                        }
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
                  ref={inputRef}
                  id="location"
                  type="text"
                  value={form.Location}
                  onChange={(e) =>
                    setForm({ ...form, Location: e.target.value })
                  }
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
              className="w-full bg-headingcolor text-white hover:bg-primary py-2 rounded"
            >
              Update Ad
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateMyProduct;
