import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Sellpage from "./Pages/Home/Sellpage/Sellpage";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Sidebar from "./components/Admin/Sidebar/Sidebar";
import Category from "./Pages/Admin/Frontend/Category/Category";
import SubCategory from "./Pages/Admin/Frontend/subCategory/SubCategory";
import FooterCategory from "./Pages/Admin/Frontend/FooterCategory/FooterCategory";
import Megamenu from "./Pages/Admin/Frontend/Megamenu/Megamenu";
import Brand from "./Pages/Admin/MasterData/Brand/Brand";
import Condition from "./Pages/Admin/MasterData/Condition/Condition";
import DeviceType from "./Pages/Admin/MasterData/DeviceType/DeviceType";
import Type from "./Pages/Admin/MasterData/Type/Type";
import Make from "./Pages/Admin/MasterData/Make/Make";
import Furnished from "./Pages/Admin/MasterData/Furnished/Furnished";
import Bedroom from "./Pages/Admin/MasterData/Bedroom/Bedroom";
import Users from "./Pages/Admin/User/Users";
import Bathroom from "./Pages/Admin/MasterData/Bathroom/Bathroom";
import Storey from "./Pages/Admin/MasterData/Storey/Storey";
import Construction from "./Pages/Admin/MasterData/Construction/Construction";
import Feature from "./Pages/Admin/MasterData/Feature/Feature";
import Areaunit from "./Pages/Admin/MasterData/Areaunit/Areaunit";
import ConstructionState from "./Pages/Admin/MasterData/ConstructionState/ConstructionState";

const queryClient = new QueryClient();

function App() {
   const MainLayout = ({ children }) => {
     return (
       <div className="main-layout-container">
         <Sidebar />
         <span className="right-layout">{children}</span>
       </div>
     );
   };

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Post" element={<Sellpage />} />

          <Route
            path="/Admin/*"
            element={
              <MainLayout>
                <Routes>
                  <Route path="/user" element={<Users />} />
                  {/* Frontend */}
                  <Route path="/Category" element={<Category />} />
                  <Route path="/subcategory" element={<SubCategory />} />
                  <Route path="/footerCategory" element={<FooterCategory />} />
                  <Route path="/Megamenu" element={<Megamenu />} />
                  {/* Masterdata */}
                  <Route path="/Brand" element={<Brand />} />
                  <Route path="/Condition" element={<Condition />} />
                  <Route path="/DeviceType" element={<DeviceType />} />
                  <Route path="/types" element={<Type />} />
                  <Route path="/make" element={<Make />} />
                  <Route path="/Furnished" element={<Furnished />} />
                  <Route path="/Bedroom" element={<Bedroom />} />
                  <Route path="/Bathroom" element={<Bathroom />} />
                  <Route path="/Storey" element={<Storey />} />
                  <Route path="/construction" element={<Construction />} />
                  <Route path="/Feature" element={<Feature />} />
                  <Route path="/Areaunit" element={<Areaunit />} />
                  <Route path="/ConstructionState" element={<ConstructionState />} />
                </Routes>
              </MainLayout>
            }
          />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}


export default App;
