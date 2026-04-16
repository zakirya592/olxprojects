import React from "react";
import { FOOTER_LOGO_SRC } from "../../../constants/brandLogo";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

function Headerpost() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: "#ffffff",
        borderBottom: "1px solid #eef2f7",
      }}
    >
      <div
        style={{
          maxWidth: "980px",
          margin: "0 auto",
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          fontFamily: '"Open Sans", Inter, system-ui, sans-serif',
        }}
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            border: "none",
            background: "transparent",
            color: "#004747",
            fontWeight: 700,
            cursor: "pointer",
            padding: "8px 0",
          }}
        >
          <IoMdArrowBack size={22} />
          <span>Back</span>
        </button>

        <div
          onClick={() => navigate("/")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
          }}
        >
          <img
            src={FOOTER_LOGO_SRC}
            alt="Pakardai"
            style={{ height: "70px", width: "auto", objectFit: "contain" }}
          />
          
        </div>

        <div style={{ width: "56px" }} />
      </div>
    </div>
  );
}

export default Headerpost