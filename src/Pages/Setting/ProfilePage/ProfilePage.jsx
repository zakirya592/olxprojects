import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import NewRequest from "../../../../utils/NewRequest";

import imageLiveUrl from "../../../../utils/urlConverter/imageLiveUrl";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ProfilePage = () => {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
    const [dateOfBirth, setdateOfBirth] = useState("");
    const [address, setaddress] = useState("");
    const [aboutMe, setaboutMe] = useState("");
    const [companyLandLine, setCompanyLandLine] = useState("");
    const [companyLandlineError, setCompanyLandlineError] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageshow, setimageshow] = useState("");

    const storedUserResponseString = localStorage.getItem("userResponse");
    const storedUserResponse = JSON.parse(storedUserResponseString);
    let loginuserdata = storedUserResponse?.data?.user?._id || "";
    if (!loginuserdata) {
        loginuserdata = localStorage.getItem("userdata") || "";
    }

    useEffect(() => {
        NewRequest.get(`/users/${loginuserdata || ""}`)
            .then((response) => {
                const userdata = response.data;
                setname(userdata?.username || "");
                setemail(userdata?.email || "");
                // setpassword(userdata?.password || "");
                setCompanyLandLine(userdata?.phone || "");
                setaddress(userdata?.address || "");
                setaboutMe(userdata?.aboutMe || "");
                setdateOfBirth(userdata?.dateOfBirth || "");
                const imageUrl = userdata?.image || "";
                const finalUrl =
                    imageUrl && imageUrl.startsWith("https")
                        ? imageUrl
                        : imageLiveUrl(imageUrl);

                setimageshow(finalUrl || "");
                console.log(finalUrl);
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
            const response = await NewRequest.put(`/users/${loginuserdata || ""}`, formData, {
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

      const toggleShowPassword = () => {
        setShowPassword(!showPassword);
      };

    return (
      <div className="mx-auto my-3 w-full max-w-[1320px] px-2 sm:my-4 sm:px-4 lg:my-10 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 shadow-lg">
          <div className="px-5 py-7 sm:px-8 sm:py-10">
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Edit Profile
            </h1>
            <p className="mt-1 text-sm text-indigo-100 sm:text-base">
              Keep your account details updated to build trust with buyers and sellers.
            </p>
          </div>
        </div>

        <div className="-mt-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-xl sm:-mt-6 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-[290px_1fr]">
            <aside className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Profile Picture
              </h2>

              <div className="mt-5 flex flex-col items-center gap-4">
                <div className="h-44 w-44 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <img
                    src={selectedFile ? URL.createObjectURL(selectedFile) : imageshow}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>

                <label
                  htmlFor="file-inputs"
                  className="cursor-pointer rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
                >
                  Choose Image
                </label>
                <input
                  id="file-inputs"
                  type="file"
                  onChange={handleChangeback}
                  className="hidden"
                />

                <p className="text-center text-xs text-slate-500">
                  Use a clear photo for a more trusted profile.
                </p>
              </div>
            </aside>

            <div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-700">
                    User Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    placeholder="Enter user name"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="dateOfBirth" className="text-sm font-medium text-slate-700">
                    Date Of Birth
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    required
                    value={dateOfBirth}
                    onChange={(e) => setdateOfBirth(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="address" className="text-sm font-medium text-slate-700">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    required
                    value={address}
                    onChange={(e) => setaddress(e.target.value)}
                    placeholder="Enter your address"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="landline" className="text-sm font-medium text-slate-700">
                    Phone Number
                  </label>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-2 py-1 transition focus-within:border-indigo-500 focus-within:bg-white">
                    <PhoneInput
                      international
                      country={"pk"}
                      defaultCountry={"pk"}
                      value={companyLandLine}
                      onChange={handlecompanyLandLine}
                      inputProps={{
                        id: "landline",
                        placeholder: "Enter your phone number",
                        autoComplete: "off",
                      }}
                      inputStyle={{
                        width: "100%",
                        borderRadius: "12px",
                        border: "none",
                        background: "transparent",
                        height: "38px",
                        fontSize: "14px",
                      }}
                      buttonStyle={{
                        border: "none",
                        background: "transparent",
                      }}
                    />
                  </div>
                  {companyLandlineError && (
                    <p className="text-xs text-red-600">{companyLandlineError}</p>
                  )}
                </div>

                <div className="relative flex flex-col gap-2">
                  <label htmlFor="password" className="text-sm font-medium text-slate-700">
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    required
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 pr-9 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-[38px] text-slate-500 transition hover:text-indigo-600"
                    onClick={toggleShowPassword}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                  </button>
                </div>

                <div className="md:col-span-2 flex flex-col gap-2">
                  <label htmlFor="aboutMe" className="text-sm font-medium text-slate-700">
                    About Me
                  </label>
                  <textarea
                    id="aboutMe"
                    value={aboutMe}
                    onChange={(e) => setaboutMe(e.target.value)}
                    placeholder="Tell people a little about yourself"
                    rows={4}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handleAddCompany}
                  className="w-full rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 sm:w-auto"
                >
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default ProfilePage;
