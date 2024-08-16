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
  {
    field: "subCategory",
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
  {
    field: "subCategories",
    headerName: "Sub Catagory",
    width: 180,
    valueGetter: (params) => {
      const subCategories = params;
      return subCategories && subCategories.length > 0
        ? subCategories.map((sub) => sub.name).join(", ")
        : "";
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

export const AdminMake = [
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
    field: "image",
    headerName: "Image",
    width: 180,
    editable: true,
    renderCell: (params) => (
      <img
        src={params.row.image}
        // src={backendUrl + "/" + params.row.address_image}
        alt="image"
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

export const Adminuser = [
  {
    field: "username",
    headerName: "UserName",
    width: 180,
  },
  {
    field: "email",
    headerName: "Email",
    width: 180,
  },
  {
    field: "address",
    headerName: "Address",
    width: 180,
  },
  {
    field: "dateOfBirth",
    headerName: "Date Of Birth",
    width: 180,
  },
  {
    field: "aboutMe",
    headerName: "About Me",
    width: 250,
  },
  {
    field: "phone",
    headerName: "Phone",
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
];

export const AdminProduct = [
  {
    field: "name",
    headerName: "Name",
    width: 180,
  },
  {
    field: "description",
    headerName: "Description",
    width: 180,
  },
  {
    field: "price",
    headerName: "price",
    width: 180,
  },
  {
    field: "Category",
    headerName: "Category",
    width: 180,
    valueGetter: (params) => {
      const catagory = params;
      return catagory && catagory.name ? catagory.name : null;
    },
  },

  {
    field: "SubCategory",
    headerName: "SubCategory",
    width: 180,
    valueGetter: (params) => {
      const SubCategory = params;
      return SubCategory && SubCategory.name ? SubCategory.name : null;
    },
  },

  {
    field: "User",
    headerName: "User",
    width: 180,
    valueGetter: (params) => {
      const Username = params;
      return Username && Username.username ? Username.username : null;
    },
  },

  // {
  //   field: "User",
  //   headerName: "Email",
  //   width: 180,
  //   valueGetter: (params) => {
  //     const email = params;
  //     return email && email.email ? catagory.email : null;
  //   },
  // },
];