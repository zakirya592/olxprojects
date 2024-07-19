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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Post" element={<Sellpage />} />

        <Route
          path="/Admin/*"
          element={
            <MainLayout>
              <QueryClientProvider client={queryClient}>
                <Routes>
                  <Route path="/Category" element={<Category />} />
                  <Route path="/subcategory" element={<SubCategory />} />
                  <Route path="/footerCategory" element={<FooterCategory />} />
                  <Route path="/Megamenu" element={<Megamenu />} />
                </Routes>
              </QueryClientProvider>
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
