import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Sellpage from "./Pages/Home/Sellpage/Sellpage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Post" element={<Sellpage />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
