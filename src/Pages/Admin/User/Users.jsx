import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { Adminuser } from "../../../../utils/Datatablesource";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import DataTable from "../../../components/DataTable/DataTable";
import NewRequest from "../../../../utils/NewRequest";
import Adduser from "./Adduser";
import Updateuser from "./Updateuser";

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const [isCreatePopupVisible, setCreatePopupVisibility] = useState(false);
  const [isUpdatePopupVisible, setUpdatePopupVisibility] = useState(false);
  const handleShowCreatePopup = () => {
    setCreatePopupVisibility(true);
  };
  const handleShowUpdatePopup = (row) => {
    setUpdatePopupVisibility(true);
    sessionStorage.setItem("updateuserdata", JSON.stringify(row));
  };

   const fetchData = async () => {
     setIsLoading(true);
     const token = localStorage.getItem("authToken"); 
     try {
       const response = await NewRequest.get("/users",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
       console.log(response);
       setData(response?.data || []);
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
          const isDeleted = await NewRequest.delete("/users/" + row?._id);
          if (isDeleted) {
            toast.success(`User has been deleted successfully!`);
            // filter out the deleted user from the data
            const filteredData = data.filter((item) => item?._id !== row?._id);
            setData(filteredData);
            // fetchData();
          } else {
            toast.error("Failed to delete user");
          }
        } catch (error) {
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
                  <i className="fas fa-plus mr-2"></i>Add User
                </button>
              </div>

              {/* DataGrid */}
              <div style={{ marginLeft: "-11px", marginRight: "-11px" }}>
                <DataTable
                  data={data}
                  title="User"
                  columnsName={Adminuser}
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
          <Adduser
            isVisible={isCreatePopupVisible}
            setVisibility={setCreatePopupVisibility}
            refreshBrandData={fetchData}
          />
        )}

        {isUpdatePopupVisible && (
          <Updateuser
            isVisible={isUpdatePopupVisible}
            setVisibility={setUpdatePopupVisibility}
            refreshBrandData={fetchData}
          />
        )}
      </div>
    </div>
  );
};

export default Users;
