import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import NewRequest from "../../../../utils/NewRequest";
import { toast } from "react-toastify";

const MoreProductview = () => {

    const navigate = useNavigate();
    const moreproduct = sessionStorage.getItem("productmore");
    const subCategoriesResponse = JSON.parse(moreproduct);
    const storedUserResponseString = sessionStorage.getItem("userResponse");
    const storedUserResponse = JSON.parse(storedUserResponseString);
    const loginuserid = storedUserResponse?.data?.user?._id || "";


    const {
        isLoading,
        error,
        data: moreproductData,
    } = useQuery("category", fetchmoreproductData);
    async function fetchmoreproductData() {
        const response = await NewRequest.get(`/product/getProductsByCategory/${subCategoriesResponse?.category?._id || ""}`);
        console.log(response?.data);
        return response?.data || [];
    }

    const postcard = (Product) => {
console.log(Product);

        try {
            const response = NewRequest.post(`/wishlist/${loginuserid}`, {
                productId: Product,
            });
            console.log(response);
            toast.success(`Product has been added successfully".`, {
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
        }
    };

    const charfunction = (Product) => {
        console.log(Product.User);
         const subResponsechat = JSON.stringify(Product);
         sessionStorage.setItem("chardata", subResponsechat);
         navigate("/Chat");
    };


    return (
        <>
            {/* <Header /> */}
            <div className=" lg:px-10 mt-5 lg:mt-40 sm:mt-2">
                <div className="my-5">
                    <span
                        className="cursor-pointer"
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        Home
                    </span>{" "}
                    |{" "}
                    <span className="cursor-pointer">
                        {" "}
                        {subCategoriesResponse?.category?.name || ""}
                    </span>
                </div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">
                        {subCategoriesResponse?.category?.name || ""} in Pakistan
                    </h2>
                </div>
                <div className="flex">
                    {/* Sidebar */}
                    <aside className="w-1/4 p-4 border-r bg-gray-100 h-screen">
                        <div className="mb-4">
                            <h2 className="font-bold text-lg mb-2">Categories</h2>
                            <ul>
                                <li className="mb-2">
                                    <a href="#">Mobile Phones (217034)</a>
                                </li>
                                <li className="mb-2">
                                    <a href="#">Accessories (23791)</a>
                                </li>
                                <li className="mb-2">
                                    <a href="#">Smart Watches (10441)</a>
                                </li>
                                <li>
                                    <a href="#">Tablets (5068)</a>
                                </li>
                            </ul>
                        </div>
                        <div className="mb-4">
                            <h2 className="font-bold text-lg mb-2">Location</h2>
                            <select className="w-full p-2 border rounded">
                                <option>Pakistan</option>
                                <option>Punjab</option>
                                <option>Sindh</option>
                                <option>KPK</option>
                            </select>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 p-4">
                        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                            {/* Card 1 */}
                            {isLoading ? (
                                <div>Loading...</div>
                            ) : error ? (
                                ""
                            ) : (
                                moreproductData.map((item, index) => (
                                    <div className="border rounded shadow " key={index}>
                                        <div className="flex gap-3">
                                            <img
                                                src={item?.images?.[0] || ""} // Provide a fallback image URL if mages[0] is undefined
                                                alt="Product"
                                                className="w-full h-52 object-cover"
                                            />

                                            <div className="w-full mb-5 p-4">
                                                <div className="flex justify-between">
                                                    <h3 className="font-bold text-lg mb-2">
                                                        Rs {item?.price || ""}
                                                    </h3>
                                                    <FaRegHeart
                                                        className="cursor-pointer"
                                                        onClick={() => postcard(item._id)}
                                                    />
                                                </div>
                                                <p className="text-gray-700 mb-5">
                                                    {item?.description || ""}
                                                </p>
                                                <p className="text-gray-500 text-sm">
                                                    {item?.location || ""} - 2 weeks ago
                                                </p>
                                                <div className="flex mt-4">
                                                    <button className="text-blue-500 border border-blue-500 px-4 py-2 rounded mr-2">
                                                        Call
                                                    </button>
                                                    <button className="text-green-500 border border-green-500 px-4 py-2 rounded" 
                                                    onClick={()=>charfunction(item)}>
                                                        Chat
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </main>
                </div>
            </div>
            {/* <Footer /> */}
        </>
    );
};

export default MoreProductview;
