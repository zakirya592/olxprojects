import React, { useState, useEffect, useContext } from "react";
import Headerpost from "../Headeepost/Headerpost";
import { Selectioncardcontext } from "../../../Contextapi/Selectioncardcontext";
import NewRequest from "../../../../utils/NewRequest";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Autocomplete, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { DotLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { currencies } from "./CountryData.js";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./PostAttributes.css";

const PostAttributes = () => {
  const { DataSelectionModel } = useContext(Selectioncardcontext);

  const navigate = useNavigate();
  const storedUserResponseString = localStorage.getItem("userResponse");
  const [selectedCurrency, setSelectedCurrency] = useState("₨"); 

  const storedUserResponse = JSON.parse(storedUserResponseString);
  let loginuserdata = storedUserResponse?.data?.user?._id || "";
  if (!loginuserdata) {
    loginuserdata = localStorage.getItem("userdata") || "";
  }

  const [form, setForm] = useState({
    brand: "",
    condition: "",
    title: "",
    description: "",
    Location: "",
    price: "",
    user: "",
  });

  const [phoneNumber, setphoneNumber] = useState("");
  const updateBrandData = JSON.parse(sessionStorage.getItem("footer"));
  const [images, setImages] = useState(Array(6).fill(null));
  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [selectedDeviceType, setSelectedDeviceType] = useState(null);
  const [deviceTypes, setDeviceTypes] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [filterdata, setfilterdata] = useState([]);
  const [selecteddropdowndata, setselecteddropdowndata] = useState(null);
  const subCategoriesdataget = sessionStorage.getItem("subCategories");
  const subCategoriesResponse = JSON.parse(subCategoriesdataget);
 const handleCurrencyChange = (e) => {
   setSelectedCurrency(e.target.value);
 };
  useEffect(() => {
    NewRequest.get(`/users/${loginuserdata || ""}`)
      .then((response) => {
        const userdata = response.data;
        setForm({
          ...form,
          user: userdata?.username || "",
        });
        setphoneNumber(userdata?.phone || "");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

const handleImageChange = (e, index) => {
  const files = e.target.files;
  if (files && files.length > 0) {
    const newImages = [...images];
    for (let i = 0; i < files.length; i++) {
      if (newImages[index + i] !== undefined) {
        newImages[index + i] = files[i]; // Store the File object
      }
    }
    setImages(newImages);
  }
};

   const formatPrice = (value) => {
     // Remove any non-digit characters before formatting
     const cleanValue = value.replace(/\D/g, "");

     // Format the value with commas for every 3 digits
     return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   };

    const handlePriceChange = (e) => {
      const formattedPrice = formatPrice(e.target.value);

      setForm({
        ...form,
        price: formattedPrice,
      });
    };

  // Get api
  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await NewRequest.get(
        `/brand/getAllModelsByFooterCategory/${updateBrandData?._id || ""}`
      );
      const filterdata = response.data.find((item) => item.model);

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
      setIsLoading(false);
    }

    try {
      const response = await NewRequest.get(
        `/brand/filter_masterdata_in_subcategory/${
          subCategoriesResponse?._id || ""
        }`
      );
      setFields(response.data || []);
      const filterdata = response.data.find((item) => item.model);
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
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [DataSelectionModel]);

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

  const CustomRadioButton = ({ options, selectedOption, onChange }) => (
    <div className="post-attr-pills">
      {options.map((option) => (
        <button
          type="button"
          key={option._id}
          className={
            selectedOption === option.name
              ? "post-attr-pill post-attr-pill--active"
              : "post-attr-pill"
          }
          onClick={() => onChange(option.name)}
        >
          {option.name}
        </button>
      ))}
    </div>
  );

  // Phone number
  const handlecompanyLandLine = (value) => {
    // Set the mobile number
    setphoneNumber(value);
  };

  const handlefilter = (event, newValue, model) => {
    setselecteddropdowndata(newValue);

    setForm((prevForm) => ({
      ...prevForm,
      [model]: newValue || "", // Use the field model as the key
    }));
  };


  // Post api herer
  const Categorydataget = sessionStorage.getItem("category");
  const categoryResponse = JSON.parse(Categorydataget);
  const categorydata = categoryResponse?._id || "";

  const handleAddCompany = async (e) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("location", form.Location);
    formData.append("User", loginuserdata || "");
    formData.append("Category", categorydata);
    formData.append("SubCategory", subCategoriesResponse?._id || "");
    formData.append("currency", selectedCurrency);
    if (updateBrandData?._id) {
      formData.append("FooterCategory", updateBrandData._id);
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
      const response = await NewRequest.post("/product", formData);
      setIsLoading(false);
      sessionStorage.removeItem("updateBrandData");
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
      navigate("/Post");
    } catch (error) {
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

    const selectedCurrencySymbol = currencies.find(
      (currency) => currency.symbol === selectedCurrency
    )?.symbol;

      const modules = {
        toolbar: [
          // [{ header: "1" }, { header: "2" }, { font: [] }],
          // [{ size: [] }],
          // ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            // { indent: "-1" },
            // { indent: "+1" },
          ],
          // ["link", "image", "video"],
          ["link",],
          // ["clean"],
          [{ color: [] }],
          // [{ background: [] }],
          // [{ font: [] }],
        ],
        clipboard: {
          matchVisual: false,
        },
      };

      const formats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "color",
        "background",
      ];


  return (
    <div className="post-attr-page">
      <Headerpost />
      <div className="post-attr-inner">
        <h1 className="post-attr-title">Create a new Ad</h1>
        {isLoading && (
          <div className="post-attr-loading">
            <DotLoader size={45} color="#792998" loading={isLoading} />
          </div>
        )}
        <div className="post-attr-card">
          <form>
            <div className="post-attr-section">
              <div className="post-attr-row">
                <label className="post-attr-label">Upload Images</label>
                <div className="post-attr-field">
                  <div className="post-attr-upload-grid">
                    {images.map((image, index) => (
                      <div key={index} className="post-attr-upload-slot">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id={`image-upload-${index}`}
                          onChange={(e) => handleImageChange(e, index)}
                          multiple
                        />
                        <label htmlFor={`image-upload-${index}`}>
                          <div className="post-attr-upload-box">
                            {image ? (
                              <img
                                src={URL.createObjectURL(image)}
                                alt={`Uploaded ${index}`}
                              />
                            ) : (
                              <span className="post-attr-upload-placeholder">
                                +
                              </span>
                            )}
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="post-attr-section post-attr-fields-block">
              {fields.map((field, index) => (
                <div key={index} className="post-attr-row">
                  <label className="post-attr-label">
                    {field.model} <span className="text-red-600">*</span>
                  </label>
                  <div className="post-attr-field">
                    {field.model === "Condition" ? (
                      <CustomRadioButton
                        options={conditions}
                        selectedOption={selectedCondition}
                        onChange={handleConditionChange}
                      />
                    ) : field.model === "DeviceType" ? (
                      <CustomRadioButton
                        options={deviceTypes}
                        selectedOption={selectedDeviceType}
                        onChange={handleDeviceTypeChange}
                      />
                    ) : filterdata.length > 0 ? (
                      <Autocomplete
                        id="model"
                        options={filterdata}
                        value={form[field.model] || null}
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
                            {...params}
                            autoComplete="off"
                            className="post-attr-mui w-full"
                            placeholder={`Select ${field.model}`}
                          />
                        )}
                      />
                    ) : (
                      <input
                        type="text"
                        value={form[field.model] || ""}
                        onChange={(e) =>
                          handleChange(field.model, e.target.value)
                        }
                        className="post-attr-input"
                        placeholder={`Select ${field.model}`}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="post-attr-section">
              <div className="post-attr-row">
                <label className="post-attr-label">
                  Ad title <span className="text-red-600">*</span>
                </label>
                <div className="post-attr-field">
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        title: e.target.value,
                      });
                    }}
                    className="post-attr-input"
                    placeholder="Enter title"
                  />
                </div>
              </div>

              <div className="post-attr-row">
                <label className="post-attr-label">
                  Description <span className="text-red-600">*</span>
                </label>
                <div className="post-attr-field post-attr-quill">
                  <ReactQuill
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    placeholder="Describe the item you're selling"
                    onChange={(value) => {
                      setForm({
                        ...form,
                        description: value,
                      });
                    }}
                  />
                </div>
              </div>

              <div className="post-attr-row">
                <label className="post-attr-label">
                  Location <span className="text-red-600">*</span>
                </label>
                <div className="post-attr-field">
                  <input
                    id="location"
                    type="text"
                    value={form.Location}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        Location: e.target.value,
                      });
                    }}
                    className="post-attr-input"
                    placeholder="Enter Location"
                  />
                </div>
              </div>
            </div>

            <div className="post-attr-section">
              <div className="post-attr-row">
                <label htmlFor="currency" className="post-attr-label">
                  Select Currency
                </label>
                <div className="post-attr-field">
                  <select
                    id="currency"
                    value={selectedCurrency}
                    onChange={handleCurrencyChange}
                  >
                    {currencies.map((currency) => (
                      <option key={currency.code} value={currency.symbol}>
                        {currency.name} ({currency.code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="post-attr-row">
                <label className="post-attr-label">
                  Price <span className="text-red-600">*</span>
                </label>
                <div className="post-attr-field">
                  <div className="post-attr-price-wrap">
                    <span className="post-attr-price-prefix">
                      {selectedCurrencySymbol}:
                    </span>
                    <input
                      type="text"
                      value={form.price}
                      onChange={handlePriceChange}
                      className="post-attr-input post-attr-input--price"
                      placeholder="Enter price"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="post-attr-section">
              <div className="post-attr-row">
                <label className="post-attr-label">Name</label>
                <div className="post-attr-field">
                  <input
                    type="text"
                    value={form.user}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        user: e.target.value,
                      });
                    }}
                    className="post-attr-input"
                    placeholder="Enter your Name"
                  />
                </div>
              </div>
              <div className="post-attr-row">
                <label className="post-attr-label">Your phone number</label>
                <div className="post-attr-field post-attr-phone">
                  <PhoneInput
                    international
                    country={"pk"}
                    defaultCountry={"pk"}
                    value={phoneNumber}
                    onChange={handlecompanyLandLine}
                    inputProps={{
                      id: "landline",
                      placeholder: "Phone number",
                      autoComplete: "off",
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="post-attr-section">
              <button
                type="button"
                onClick={handleAddCompany}
                className="post-attr-submit"
              >
                Post Ad
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostAttributes;
