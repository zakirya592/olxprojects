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
    renderCell: (params) => (
      <img
        src={params.row.icon}
        // src={backendUrl + "/" + params.row.address_image}
        alt="address_image"
        style={{
          width: "90%",
          height: "90%",
          objectFit: "contain",
        }}
      />
    ),
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
          padding: "4px 8px",
          borderRadius: "10px",
          border: "2px solid",
          background: params.value === 1 ? "green" : "red",
          color: "white",
          textAlign: "center",
          width: "80px", // Fixed width for consistency
          height: "30px", // Fixed height for consistency
          lineHeight: "22px", // Vertically center the text
        }}
      >
        {params.value === 1 ? "Active" : "Inactive"}
      </div>
    ),
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    type: "dateTime",
    valueGetter: (params) => {
      return params ? new Date(params) : null;
    },
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    width: 200,
    type: "dateTime",
    valueGetter: (params) => {
      return params ? new Date(params) : null;
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
    valueGetter: (params) => {
      const catagory = params;
      return catagory && catagory.name ? catagory.name : null; 
    },
  },

  {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: (params) => (
      <div
        style={{
          padding: "4px 8px",
          borderRadius: "10px",
          border: "2px solid",
          background: params.value === 1 ? "green" : "red",
          color: "white",
          textAlign: "center",
          width: "80px", // Fixed width for consistency
          height: "30px", // Fixed height for consistency
          lineHeight: "22px", // Vertically center the text
        }}
      >
        {params.value === 1 ? "Active" : "Inactive"}
      </div>
    ),
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,

    type: "dateTime",
    valueGetter: (params) => {
      return params ? new Date(params) : null;
    },
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    width: 200,
    type: "dateTime",
    valueGetter: (params) => {
    return params ? new Date(params) : null;
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
          padding: "4px 8px",
          borderRadius: "10px",
          border: "2px solid",
          background: params.value === 1 ? "green" : "red",
          color: "white",
          textAlign: "center",
          width: "80px", // Fixed width for consistency
          height: "30px", // Fixed height for consistency
          lineHeight: "22px", // Vertically center the text
        }}
      >
        {params.value === 1 ? "Active" : "Inactive"}
      </div>
    ),
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,

    type: "dateTime",
    valueGetter: (params) => {
      return params ? new Date(params) : null;
    },
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    width: 200,
    type: "dateTime",
    valueGetter: (params) => {
      return params ? new Date(params) : null;
    },
  },
];

export const AdminMegaMenu = [
  {
    field: "name",
    headerName: "Name",
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
        }}
      />
    ),
  },
  {
    field: "icon",
    headerName: "Icon",
    width: 180,
    renderCell: (params) => (
      <img
        src={params.row.icon}
        // src={backendUrl + "/" + params.row.address_image}
        alt="address_image"
        style={{
          width: "90%",
          height: "90%",
          objectFit: "contain",
        }}
      />
    ),
  },
  // {
  //   field: "subCategories",
  //   headerName: "subCategories",
  //   width: 180,
  //   valueGetter: (params) => {
  //     const subCategories = params;
  //     console.log(subCategories);
  //     // return subCategories && subCategories.catagory ? subCategories.catagory : null;
  //   },
  // },
  {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: (params) => (
      <div
        style={{
          padding: "4px 8px",
          borderRadius: "10px",
          border: "2px solid",
          background: params.value === 1 ? "green" : "red",
          color: "white",
          textAlign: "center",
          width: "80px", // Fixed width for consistency
          height: "30px", // Fixed height for consistency
          lineHeight: "22px", // Vertically center the text
        }}
      >
        {params.value === 1 ? "Active" : "Inactive"}
      </div>
    ),
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,

    type: "dateTime",
    valueGetter: (params) => {
      return params ? new Date(params) : null;
    },
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    width: 200,
    type: "dateTime",
    valueGetter: (params) => {
      return params ? new Date(params) : null;
    },
  },
];

// Master data
export const AdminBrand = [
  {
    field: "name",
    headerName: "Name",
    width: 180,
  },
  {
    field: "subCategory",
    headerName: "Sub Category",
    width: 180,
    // valueGetter: (params) => {
    //   const catagory = params;
    //   return catagory && catagory.name ? catagory.name : null;
    // },
  },
  {
    field: "footerCategory",
    headerName: "Footer Category",
    width: 180,
    // valueGetter: (params) => {
    //   const catagory = params;
    //   return catagory && catagory.name ? catagory.name : null;
    // },
  },

  {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: (params) => (
      <div
        style={{
          padding: "4px 8px",
          borderRadius: "10px",
          border: "2px solid",
          background: params.value === 1 ? "green" : "red",
          color: "white",
          textAlign: "center",
          width: "80px", // Fixed width for consistency
          height: "30px", // Fixed height for consistency
          lineHeight: "22px", // Vertically center the text
        }}
      >
        {params.value === 1 ? "Active" : "Inactive"}
      </div>
    ),
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,

    type: "dateTime",
    valueGetter: (params) => {
      return params ? new Date(params) : null;
    },
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    width: 200,
    type: "dateTime",
    valueGetter: (params) => {
      return params ? new Date(params) : null;
    },
  },
];