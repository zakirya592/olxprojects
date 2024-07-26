import { DataGrid } from "@mui/x-data-grid";
// import { DataGridPro, GridLogicOperator, GridToolbar } from '@mui/x-data-grid-pro';
import { alpha, styled } from "@mui/material/styles";
import { gridClasses } from "@mui/x-data-grid";

const ODD_OPACITY = 0.2;
const EVEN_OPACITY = 0.5;

function customCheckbox(theme) {
  return {
    "& .MuiCheckbox-root svg": {
      width: 16,
      height: 16,
      backgroundColor: "transparent",
      border: `1px solid ${
        theme.palette.mode === "light" ? "#d9d9d9" : "rgb(67, 67, 67)"
      }`,
      borderRadius: 2,
    },
    "& .MuiCheckbox-root svg path": {
      display: "none",
    },
    "& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg": {
      backgroundColor: "#406367",
      borderColor: "#406367",
    },
    "& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after": {
      position: "absolute",
      display: "table",
      border: "2px solid #fff",
      borderTop: 0,
      borderLeft: 0,
      transform: "rotate(45deg) translate(-50%,-50%)",
      opacity: 1,
      transition: "all .2s cubic-bezier(.12,.4,.29,1.46) .1s",
      content: '""',
      top: "50%",
      left: "39%",
      width: 5.71428571,
      height: 9.14285714,
    },
    "& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after":
      {
        width: 8,
        height: 8,
        backgroundColor: "#406367",
        transform: "none",
        top: "39%",
        border: 0,
      },
  };
}

export const MuiCustomTable = styled(DataGrid)(({ theme, secondaryColor }) => {
  const defaultColors = {
    oddRow: "#B4E4FF",
    oddRowHover: alpha("#B4E4FF", 0.5),
    oddRowSelected: alpha("#9AC5F4", 0.8),
    evenRow: "#000000",
    evenRowHover: alpha("#F8F6F4", 1),
    evenRowSelected: alpha("#9AC5F4", 0.8),
    columnHeader: "#0079FF",
    columnHeaderText: "#000000",
    columnMenuIcon: "#000000",
    iconButton: "#000000",
    sortIcon: "#000000",
    columnsContainer: theme.palette.mode === "light" ? "#1d1d1d" : "#1d1d1d",
    cellBorderBottom: "1px solid #0079FF",
    cellText: "rgba(0,0,0,.85)",
    paginationItem: {
      borderRadius: 0,
    },
    iconSeparator: "#000000",
    grayHeader: "#A9A9A9", // Replace with your desired gray header color
  };

  const colorOptions = {
    primary: defaultColors,
    secondary: {
      oddRow: "#406367",
      oddRowHover: alpha("#406367", 0.5),
      oddRowSelected: alpha("#406367", 0.8),
      evenRow: "#000000",
      evenRowHover: alpha("#F8F6F4", 1),
      evenRowSelected: alpha("#406367", 0.8),
      columnHeader: "#406367",

      columnHeaderText: "#feffff",
      columnMenuIcon: "#feffff",
      iconButton: "#feffff",
      sortIcon: "#feffff",
      columnsContainer: theme.palette.mode === "light" ? "#1d1d1d" : "#1d1d1d",
      cellBorderBottom: "1px solid #406367",
      cellText: "rgba(0,0,0,.85)",
      paginationItem: {
        borderRadius: 0,
      },
      iconSeparator: "#000000",
    },
  };

  // const colors = secondaryColor === 'secondary' ? colorOptions['secondary'] : defaultColors;
  const colors =
    secondaryColor === "secondary"
      ? colorOptions["secondary"]
      : secondaryColor === "gray"
      ? { ...defaultColors, ...{ columnHeader: defaultColors.grayHeader } }
      : defaultColors;

  return {
    // [`& .${gridClasses.row}`]: {
    //     '&.odd': {
    //         backgroundColor: colors.oddRow,
    //         '&:hover': {
    //             backgroundColor: colors.oddRowHover,
    //         },
    //         '&.Mui-selected': {
    //             backgroundColor: colors.oddRowSelected,
    //         },
    //     },
    //     '&.even': {
    //         backgroundColor: colors.evenRow,
    //         '&:hover': {
    //             backgroundColor: colors.evenRowHover,
    //         },
    //         '&.Mui-selected': {
    //             backgroundColor: colors.evenRowSelected,
    //         },
    //     },
    // },
    [`& .${gridClasses.columnHeader}`]: {
      backgroundColor: colors.columnHeader,
      color: colors.columnHeaderText,
      "& .MuiDataGrid-columnMenuIcon": {
        color: colors.columnMenuIcon,
      },
      "& .MuiSvgIcon-root": {
        color: colors.columnHeaderText,
      },
    },
    [`& .${gridClasses.iconButtonContainer}`]: {
      color: colors.iconButton,
    },
    [`& .${gridClasses.sortIcon}`]: {
      color: colors.sortIcon,
    },
    WebkitFontSmoothing: "auto",
    letterSpacing: "normal",
    "& .MuiDataGrid-columnsContainer": {
      backgroundColor: colors.columnsContainer,
    },
    "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
      borderBottom: colors.cellBorderBottom,
    },
    "& .MuiDataGrid-cell": {
      color: colors.cellText,
    },
    "& .MuiPaginationItem-root": {
      borderRadius: colors.paginationItem.borderRadius,
    },
    "& .MuiDataGrid-iconSeparator": {
      color: colors.iconSeparator,
    },
    ...customCheckbox(theme),
  };
});
