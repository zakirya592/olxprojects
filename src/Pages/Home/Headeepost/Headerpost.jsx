import React from "react";
import log from "../../../assets/Images/logo1.png";
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
            color: "#8bc34a",
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
            src={log}
            alt="Pakardai"
            style={{ height: "34px", width: "auto", objectFit: "contain" }}
          />
          <span
            style={{
              fontSize: "22px",
              fontWeight: 800,
              color: "#1f2937",
              letterSpacing: "-0.02em",
            }}
          >
            Pakardai
          </span>
        </div>

        <div style={{ width: "56px" }} />
      </div>
    </div>
  );
}

export default Headerpost