import React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MemoryOutlinedIcon from "@mui/icons-material/MemoryOutlined";
import CheckroomOutlinedIcon from "@mui/icons-material/CheckroomOutlined";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import ChildCareOutlinedIcon from "@mui/icons-material/ChildCareOutlined";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import ToysOutlinedIcon from "@mui/icons-material/ToysOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import BrushOutlinedIcon from "@mui/icons-material/BrushOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";

const norm = (s) => (s || "").toLowerCase();

export function CategoryNavIcon({ name, className }) {
  const n = norm(name);
  let Icon = CategoryOutlinedIcon;
  if (n.includes("home") || n.includes("garden")) Icon = HomeOutlinedIcon;
  else if (n.includes("electronic")) Icon = MemoryOutlinedIcon;
  else if (n.includes("fashion") || n.includes("footwear")) Icon = CheckroomOutlinedIcon;
  else if (n.includes("jewelry") || n.includes("accessor")) Icon = DiamondOutlinedIcon;
  else if (n.includes("sport") || n.includes("entertain")) Icon = SportsBasketballOutlinedIcon;
  else if (n.includes("mother") || n.includes("kid")) Icon = ChildCareOutlinedIcon;
  else if (n.includes("beauty") || n.includes("health")) Icon = SpaOutlinedIcon;
  else if (n.includes("toy") || n.includes("game")) Icon = ToysOutlinedIcon;
  else if (n.includes("auto") || n.includes("motor")) Icon = DirectionsCarOutlinedIcon;
  else if (n.includes("collect") || n.includes("art")) Icon = BrushOutlinedIcon;
  else if (n.includes("tool") || n.includes("improvement")) Icon = HandymanOutlinedIcon;

  return <Icon className={className} sx={{ fontSize: 22, color: "#5f6368" }} />;
}
