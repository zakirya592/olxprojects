import React, { useContext, useEffect, useState } from "react";
import Headerpost from "../Headeepost/Headerpost";
import { Selectioncardcontext } from "../../../Contextapi/Selectioncardcontext";
import NewRequest from "../../../../utils/NewRequest";

const PostAttributes = () => {
    const { DataSelectionModel } = useContext(Selectioncardcontext);

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

    const updateBrandData = JSON.parse(sessionStorage.getItem("footer"));
    const [images, setImages] = useState(Array(6).fill(null));
    const [isLoading, setIsLoading] = useState(false);
    const [fields, setFields] = useState([]);
    const [selectedCondition, setSelectedCondition] = useState(null);
    const [selectedDeviceType, setSelectedDeviceType] = useState(null);
    const [deviceTypes, setDeviceTypes] = useState([]);
    const [conditions, setConditions] = useState([]);

    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const newImages = [...images];
            newImages[index] = URL.createObjectURL(file);
            setImages(newImages);
        }
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await NewRequest.get(
                `/brand/getAllModelsByFooterCategory/${updateBrandData?._id || ""}`
            );
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
    }, [DataSelectionModel]); // Add DataSelectionModel as a dependency

    const handleChange = (model, value) => {
        setForm((prevForm) => ({
            ...prevForm,
            [model]: value,
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

    return (
        <>
            <Headerpost />
            <h2 className="text-2xl font-semibold mb-4 text-center">
                Create a new Ad
            </h2>
            <div className="w-full sm:w-1/2 lg:w-[900px] my-10 mx-auto bg-white border border-bordderscolor shadow-md rounded-lg">
                <form>
                    <div className="border-t border-b border-bordderscolor p-6">
                        <div className="mb-4 flex items-center">
                            <label className="w-1/4 mb-1 font-semibold">
                                Category <span className="text-red-600"> *</span>
                            </label>
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

                    <div className="border-t border-b border-bordderscolor p-6">
                        <div className="mb-4 flex items-center">
                            <label className="w-1/4 mb-1 font-semibold">
                                Upload Images
                            </label>
                            <div className="w-3/4 p-2 flex space-x-2">
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
                                                        src={image}
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
                            <div key={index} className="mb-4 flex items-center">
                                <label className="w-1/4 mb-1 font-semibold">
                                    {field.model} <span className="text-red-600"> *</span>
                                </label>
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
                                ) : (
                                    <input
                                        type="text"
                                        value={form[field.model] || ""}
                                        onChange={(e) =>
                                            handleChange(field.model, e.target.value)
                                        }
                                        className="w-3/4 p-2 border border-gray-300 rounded"
                                        placeholder={`Select ${field.model}`}
                                    />
                                )}
                            </div>
                        ))}
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
