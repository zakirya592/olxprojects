export const AdminUsersColumn = [
  {
    field: "name",
    headerName: "Name",
    width: 180,
  },
  {
    field: "icon",
    headerName: "Icon",
    width: 180,
  },
  {
    field: "image",
    headerName: "Image",
    width: 180,
    editable: true,
    renderCell: (params) => (
      <img
        src={params.row.image}
        // src={backendUrl + "/" + params.row.address_image}
        alt="address_image"
        style={{
          width: "90%",
          height: "90%",
          objectFit: "contain",
          cursor: "pointer",
        }}
      />
    ),
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: (params) => (
      <div
        style={{
          padding: "5px",
          paddingLeft: "10px",
          paddingRight: "10px",
          borderRadius: "20px",
          border: "2px solid",
          borderColor: params.row.status === 1 ? "green" : "red",
          color: params.row.status === 1 ? "green" : "red",
        }}
      >
        {params.row.status === 1 ? "Active" : "Inactive"}
      </div>
    ),
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,

    type: "dateTime",
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    },
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    width: 200,
    type: "dateTime",
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    },
  },
];

export const AdminSubCategory = [
  {
    field: "name",
    headerName: "Name",
    width: 180,
  },
  {
    field: "catagory",
    headerName: "Catagory",
    width: 180,
  },
  
  {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: (params) => (
      <div
        style={{
          padding: "5px",
          paddingLeft: "10px",
          paddingRight: "10px",
          borderRadius: "20px",
          border: "2px solid",
          borderColor: params.row.status === 1 ? "green" : "red",
          color: params.row.status === 1 ? "green" : "red",
        }}
      >
        {params.row.status === 1 ? "Active" : "Inactive"}
      </div>
    ),
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,

    type: "dateTime",
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    },
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    width: 200,
    type: "dateTime",
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    },
  },
];

export const AdminFooterCategory = [
  {
    field: "name",
    headerName: "Name",
    width: 180,
  },
  // {
  //   field: "catagory",
  //   headerName: "Catagory",
  //   width: 180,
  // },

  {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: (params) => (
      <div
        style={{
          padding: "5px",
          paddingLeft: "10px",
          paddingRight: "10px",
          borderRadius: "20px",
          border: "2px solid",
          borderColor: params.row.status === 1 ? "green" : "red",
          color: params.row.status === 1 ? "green" : "red",
        }}
      >
        {params.row.status === 1 ? "Active" : "Inactive"}
      </div>
    ),
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,

    type: "dateTime",
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    },
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    width: 200,
    type: "dateTime",
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    },
  },
];