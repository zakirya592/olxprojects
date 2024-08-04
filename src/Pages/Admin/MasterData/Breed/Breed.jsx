import React, { useEffect, useState } from "react";
import DataTable from "../../../../components/DataTable/DataTable";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { AdminBrand } from "../../../../../utils/Datatablesource";
import NewRequest from "../../../../../utils/NewRequest";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import AddBreed from "./AddBreed";
import UpdateBreed from "./UpdateBreed";

const Breed = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const [isCreatePopupVisible, setCreatePopupVisibility] = useState(false);
  const [isUpdatePopupVisible, setUpdatePopupVisibility] = useState(false);
  const handleShowCreatePopup = () => {
    setCreatePopupVisibility(true);
  };
  const handleShowUpdatePopup = (row) => {
    setUpdatePopupVisibility(true);
    sessionStorage.setItem("updateBreed", JSON.stringify(row));
  };
  const navigate = useNavigate();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [brandResponse, subCategoryResponse, footerCategoryResponse] =
        await Promise.all([
          NewRequest.get("/brand/Breed"),
          NewRequest.get("/subCategory"),
          NewRequest.get("/footerCategory"),
        ]);

      const brands = brandResponse?.data || [];
      const subCategories = subCategoryResponse?.data || [];
      const footerCategories = footerCategoryResponse?.data || [];

      // Create a map for easy lookup
      const subCategoryMap = subCategories.reduce((acc, subCategory) => {
        acc[subCategory._id] = subCategory.name;
        return acc;
      }, {});

      const footerCategoryMap = footerCategories.reduce(
        (acc, footerCategory) => {
          acc[footerCategory._id] = footerCategory.name;
          return acc;
        },
        {}
      );

      // Map the subCategory and footerCategory IDs to names
      const dataWithNames = brands.map((brand) => ({
        ...brand,
        subCategory: subCategoryMap[brand.subCategory],
        footerCategory: footerCategoryMap[brand.footerCategory],
      }));

      setData(dataWithNames);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (row) => {
    Swal.fire({
      title: "Are you sure to delete this record?",
      text: "You will not be able to recover this",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes,Delete",
      cancelButtonText: "No, keep it",
      // changes the color of the confirm button to red
      confirmButtonColor: "#1E3B8B",
      cancelButtonColor: "#FF0032",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const isDeleted = await NewRequest.delete(
            "/brand/Breed/" + row?._id
          );
          if (isDeleted) {
            toast.success(`Breed has been deleted successfully!`);

            // filter out the deleted user from the data
            // const filteredData = data.filter((item) => item?._id !== row?._id);
            // setData(filteredData);
            fetchData();
          } else {
            // Handle any additional logic if the user was not deleted successfully
            toast.error("Failed to delete user");
          }
        } catch (error) {
          // Handle any error that occurred during the deletion
          console.error("Error deleting user:", error);
          toast.error(
            error?.response?.data?.error ||
              "Something went wrong while deleting user"
          );
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return;
      }
    });
  };

  const handleRowClickInParent = (item) => {
    if (!item || item?.length === 0) {
      return;
    }
  };

  return (
    <div>
      <div className={`p-0 h-full sm:ml-72`}>
        <div className="flex justify-center items-center">
          <div className="h-auto w-[97%] px-0 pt-4">
            <div className="h-auto w-full p-4 bg-white shadow-xl rounded-md">
              <div className={`flex px-3 flex-row justify-start`}>
                <button
                  onClick={handleShowCreatePopup}
                  className="rounded-full bg-secondary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary"
                >
                  <i className="fas fa-plus mr-2"></i>Add Breed
                </button>
              </div>

              {/* DataGrid */}
              <div style={{ marginLeft: "-11px", marginRight: "-11px" }}>
                <DataTable
                  data={data}
                  title="Breed"
                  columnsName={AdminBrand}
                  loading={isLoading}
                  secondaryColor="secondary"
                  //   checkboxSelection={"disabled"}
                  // actionColumnVisibility={false}
                  handleRowClickInParent={handleRowClickInParent}
                  dropDownOptions={[
                    {
                      label: `Edit`,
                      icon: (
                        <EditIcon
                          fontSize="small"
                          color="action"
                          style={{ color: "rgb(37 99 235)" }}
                        />
                      ),
                      action: handleShowUpdatePopup,
                    },
                    {
                      label: `Delete`,
                      icon: (
                        <DeleteIcon
                          fontSize="small"
                          color="action"
                          style={{ color: "rgb(37 99 235)" }}
                        />
                      ),
                      action: handleDelete,
                    },
                  ]}
                  uniqueId="gtinMainTableId"
                />
              </div>
            </div>
          </div>
        </div>
        {isCreatePopupVisible && (
          <AddBreed
            isVisible={isCreatePopupVisible}
            setVisibility={setCreatePopupVisibility}
            refreshBrandData={fetchData}
          />
        )}

        {isUpdatePopupVisible && (
          <UpdateBreed
            isVisible={isUpdatePopupVisible}
            setVisibility={setUpdatePopupVisibility}
            refreshBrandData={fetchData}
          />
        )}
      </div>
    </div>
  );
};

export default Breed;
