import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import NewRequest from "../../../../utils/NewRequest";

const ProfilePage = () => {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [dateOfBirth, setdateOfBirth] = useState("");
    const [address, setaddress] = useState("");
    const [aboutMe, setaboutMe] = useState("");
    const [companyLandLine, setCompanyLandLine] = useState("");
    const [companyLandlineError, setCompanyLandlineError] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageshow, setimageshow] = useState("");

    const storedUserResponseString = sessionStorage.getItem("userResponse");
    const storedUserResponse = JSON.parse(storedUserResponseString);
    const loginuserdata = storedUserResponse?.data?.user || "";
    console.log(loginuserdata);

    useEffect(() => {
        NewRequest.get(`/users/${loginuserdata?._id || ""}`)
            .then((response) => {
                const userdata = response.data;
                setname(userdata?.username || "");
                setemail(userdata?.email || "");
                setpassword(userdata?.password || "");
                setCompanyLandLine(userdata?.phone || "");
                setaddress(userdata?.address || "");
                setaboutMe(userdata?.aboutMe || "");
                setdateOfBirth(userdata?.dateOfBirth || "");
                setimageshow(userdata?.image || "");
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);



    const handlecompanyLandLine = (value) => {
        setCompanyLandlineError("");
        if (value.startsWith("92")) {
            if (value.length > 12) {
                setCompanyLandlineError("Number must be a maximum of 12 digits");
            }
        }
        setCompanyLandLine(value);
    };

    function handleChangeback(e) {
        setSelectedFile(e.target.files[0]);
        setimageshow(e.target.files[0]);
    }


    const handleAddCompany = async () => {
        const formData = new FormData();
        formData.append("username", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("dateOfBirth", dateOfBirth);
        formData.append("aboutMe", aboutMe);
        formData.append("phone", companyLandLine);
        formData.append("address", address);
        formData.append("image", imageshow);
        try {
            const response = await NewRequest.put(`/users/${loginuserdata?._id || ""}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response);
            toast.success(`Profile  has been updated successfully".`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (error) {
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
        }
    };

    return (
        <div className="lg:px-10 my-5 lg:my-28 sm:my-2 flex justify-center items-center flex-col">
            <div className="from-purple-400 to-blue-200 h-50 bg-gradient-to-b w-full h-40 rounded-lg ">
                <h1 className="text-white p-5 text-2xl"> Edit profile</h1>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-7xl -mt-16">

                <div className="flex flex-col md:flex-row md:space-x-6">
                    <div className="flex-shrink-0 flex justify-center md:justify-start">
                        <div className="flex justify-between flex-col sm:flex-row">
                            <div className="printerPic font-body sm:text-base text-sm flex flex-col gap-2">

                                <div className="imgesection">
                                    <img
                                        src={
                                            selectedFile
                                                ? URL.createObjectURL(selectedFile)
                                                : imageshow != null
                                                    ? imageshow
                                                    : ""
                                        }
                                        className="printerpic w-32 h-32"
                                        style={{
                                            width: selectedFile || imageshow ? "200px" : "200px",
                                            height: selectedFile || imageshow ? "200px" : "200px",
                                        }}
                                    />

                                    <div className="row " htmlFor="file-inputs">
                                        <label
                                            htmlFor="file-inputs"
                                            className="choosefile bg-loactioncolor hover:bg-primary"
                                        >
                                            choose Image
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
                        </div>
                    </div>
                    <div className="flex-grow mt-6 md:mt-0">
                        <div className="mt-8">
                            <div className="grid grid-cols-2 gap-4">
                                {/* User Name */}
                                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                    <label htmlFor="name" className={`text-loactioncolor`}>
                                        User Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setname(e.target.value)}
                                        placeholder={`Enter User Name`}
                                        className={`border w-full rounded-md border-[#8E9CAB] p-2 mb-3`}
                                    />
                                </div>
                                {/* Email */}
                                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                    <label htmlFor="email" className={`text-loactioncolor`}>
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        value={email}
                                        onChange={(e) => setemail(e.target.value)}
                                        placeholder={`Enter you Email`}
                                        className={`border w-full border-[#8E9CAB] rounded-md p-2 mb-3`}
                                    />
                                </div>
                                {/* Date Of Birth */}
                                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                    <label
                                        htmlFor="dateOfBirth"
                                        className={`text-loactioncolor`}
                                    >
                                        Date Of Birth
                                    </label>
                                    <input
                                        type="date"
                                        id="dateOfBirth"
                                        required
                                        value={dateOfBirth}
                                        onChange={(e) => setdateOfBirth(e.target.value)}
                                        //   placeholder={`User Name`}
                                        className={`border w-full rounded-md border-[#8E9CAB] p-2 mb-3`}
                                    />
                                </div>
                                {/* Address */}
                                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                    <label htmlFor="address" className={`text-loactioncolor`}>
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        required
                                        value={address}
                                        onChange={(e) => setaddress(e.target.value)}
                                        placeholder={`Enter your Address`}
                                        className={`border w-full rounded-md border-[#8E9CAB] p-2 mb-3`}
                                    />
                                </div>
                                {/* Phone Number */}
                                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                    <label
                                        htmlFor="Phonenumber"
                                        className={`text-loactioncolor`}
                                    >
                                        Phone Number
                                    </label>
                                    <PhoneInput
                                        international
                                        country={"pk"}
                                        defaultCountry={"pk"}
                                        value={companyLandLine}
                                        onChange={handlecompanyLandLine}
                                        inputProps={{
                                            id: "landline",
                                            placeholder: "Enter you Phone Number",
                                            autoComplete: "off",
                                        }}
                                        inputStyle={{
                                            width: "100%",
                                            borderRadius: "0px",
                                            border: "none",
                                        }}
                                        // required

                                        className={`border w-full rounded-md border-[#8E9CAB] p-0.5 mb-3`}
                                    />
                                    {companyLandlineError && (
                                        <p className="text-red-600">{companyLandlineError}</p>
                                    )}
                                </div>
                                {/* Password */}
                                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                    <label htmlFor="password" className={`text-loactioncolor`}>
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        required
                                        value={password}
                                        onChange={(e) => setpassword(e.target.value)}
                                        placeholder={`Enter password`}
                                        className={`border w-full rounded-md border-[#8E9CAB] p-2 mb-3`}
                                    />
                                </div>
                                {/* About Me */}
                                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                                    <label htmlFor="aboutMe" className={`text-loactioncolor`}>
                                        About Me
                                    </label>
                                    <textarea
                                        type="text"
                                        id="aboutMe"
                                        value={aboutMe}
                                        onChange={(e) => setaboutMe(e.target.value)}
                                        placeholder={`Enter your About Me`}
                                        className={`border w-full rounded-md border-[#8E9CAB] p-2 mb-3`}
                                    />
                                </div>
                            </div>
                            <div className="w-full flex justify-center items-center gap-8 mt-5">
                                <button
                                    type="button"
                                    onClick={handleAddCompany}
                                    className="px-5 py-3 rounded-sm w-[70%] bg-[#7B6C9C] hover:bg-[#474352] text-white font-body text-sm ml-2"
                                >
                                    Update Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
