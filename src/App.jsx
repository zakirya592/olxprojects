import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
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
import OperatingSystem from "./Pages/Admin/MasterData/OperatingSystem/OperatingSystem";
import HardDriveType from "./Pages/Admin/MasterData/HardDriveType/HardDriveType";
import FunctionType from "./Pages/Admin/MasterData/FunctionType/FunctionType";
import SensorSize from "./Pages/Admin/MasterData/SensorSize/SensorSize";
import Wifi from "./Pages/Admin/MasterData/Wifi/Wifi";
import Resolution from "./Pages/Admin/MasterData/Resolution/Resolution";
import EngineType from "./Pages/Admin/MasterData/EngineType/EngineType";
import EngineCapacity from "./Pages/Admin/MasterData/EngineCapacity/EngineCapacity";
import ScreenSize from "./Pages/Admin/MasterData/ScreenSize/ScreenSize";
import MaxAperatureRange from "./Pages/Admin/MasterData/MaxAperatureRange/MaxAperatureRange";
import MinFocalLengthRange from "./Pages/Admin/MasterData/MinFocalLengthRange/MinFocalLengthRange";
import RegistrationCity from "./Pages/Admin/MasterData/RegistrationCity/RegistrationCity";
import HiringPerson from "./Pages/Admin/MasterData/HiringPerson/HiringPerson";
import CareerLevel from "./Pages/Admin/MasterData/CareerLevel/CareerLevel";
import PositionType from "./Pages/Admin/MasterData/PositionType/PositionType";
import TypeofAd from "./Pages/Admin/MasterData/TypeofAd/TypeofAd";
import Breed from "./Pages/Admin/MasterData/Breed/Breed";
import Sex from "./Pages/Admin/MasterData/Sex/Sex";
import Materialtype from "./Pages/Admin/MasterData/Materialtype/Materialtype";
import Handmade from "./Pages/Admin/MasterData/Handmade/Handmade";
import Origin from "./Pages/Admin/MasterData/Origin/Origin";
import Language from "./Pages/Admin/MasterData/Language/Language";
import MaxFocalLengthRange from "./Pages/Admin/MasterData/MaxFocalLengthRange/MaxFocalLengthRange";
import PostAttributes from "./Pages/Home/PostAttributes/PostAttributes";
import SelectionDataProvider from "./Contextapi/Selectioncardcontext";
import Chat from "./components/Chat/Chat";
import Product from "./Pages/Admin/Product/Product";
import MoreProductview from "./Pages/Home/MoreProductview/MoreProductview";
import Header from "./components/Header/Header";
import Myfavorites from "./Pages/Home/Myfavorites/Myfavorites";
import Footer from "./Pages/Home/Footer/Footer";
import Singleitem from "./Pages/Home/AllCategories/Singleitem";
import Dashboard from "./Pages/Admin/Dashboard/Dashboard";
import GoogleCallbackHandler from "./Pages/Admin/Login/GoogleCallbackHandler";
import ProfilePage from "./Pages/Setting/ProfilePage/ProfilePage";
import MyProduct from "./Pages/Setting/MyProduct/MyProduct";
import SearchResultsPage from "./Pages/SearchResults/SearchResultsPage";
import UpdateMyProduct from "./Pages/Setting/MyProduct/UpdateMyProduct";
import LoginForm from "./Pages/Admin/Login/LoginForm";
import SinUpForm from "./Pages/Admin/Login/SinUpForm";

const queryClient = new QueryClient();

function App() {
  const UserLayout = () => {
    return (
      <div>
        <div className="sticky top-0 z-50 bg-white">
          <Header />
        </div>
        {/* <QueryClientProvider client={queryClient}> */}
        <main className="mx-auto flex max-w-[1760px] flex-col justify-center">
          <Outlet /> {/* Nested routes will render here */}
        </main>
        {/* </QueryClientProvider> */}
        <Footer />
        {/* <NewFooter /> */}
      </div>
    );
  };
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
        <SelectionDataProvider>
          <Routes>
            <Route path="/Post" element={<Sellpage />} />
            <Route path="/Post/Attributes" element={<PostAttributes />} />

            <Route path="/LoginForm" element={<LoginForm />} />
            <Route path="/SinUpForm" element={<SinUpForm />} />
            <Route element={<UserLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/moreproduct/:name" element={<MoreProductview />} />
              <Route path="/Singleitem/:_id" element={<Singleitem />} />{" "}
              <Route path="/Chat" element={<Chat />} />{" "}
              <Route path="/Myfavorites" element={<Myfavorites />} />
              <Route path="/ProfilePage" element={<ProfilePage />} />
              <Route path="/MyProduct" element={<MyProduct />} />
              <Route
                path="/UpdateMyProduct/:name"
                element={<UpdateMyProduct />}
              />
              <Route
                path="/auth/google/callback"
                element={<GoogleCallbackHandler />}
              />
              <Route path="/search-results" element={<SearchResultsPage />} />
            </Route>

            <Route
              path="/Admin/*"
              element={
                <MainLayout>
                  <Routes>
                    <Route path="/user" element={<Users />} />{" "}
                    <Route path="dashboard" element={<Dashboard />} />
                    {/* Frontend */}
                    <Route path="/Category" element={<Category />} />
                    <Route path="/subcategory" element={<SubCategory />} />
                    <Route
                      path="/footerCategory"
                      element={<FooterCategory />}
                    />
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
                    <Route
                      path="/ConstructionState"
                      element={<ConstructionState />}
                    />
                    <Route
                      path="/OperatingSystem"
                      element={<OperatingSystem />}
                    />
                    <Route path="/HardDriveType" element={<HardDriveType />} />
                    <Route path="/FunctionType" element={<FunctionType />} />
                    <Route path="/SensorSize" element={<SensorSize />} />
                    <Route path="/Wifi" element={<Wifi />} />
                    <Route path="/Resolution" element={<Resolution />} />
                    <Route path="/EngineType" element={<EngineType />} />
                    <Route
                      path="/EngineCapacity"
                      element={<EngineCapacity />}
                    />
                    <Route path="/ScreenSize" element={<ScreenSize />} />
                    <Route
                      path="/MaxAperatureRange"
                      element={<MaxAperatureRange />}
                    />
                    <Route
                      path="/MinFocalLengthRange"
                      element={<MinFocalLengthRange />}
                    />
                    <Route
                      path="/RegistrationCity"
                      element={<RegistrationCity />}
                    />
                    <Route
                      path="/MaxFocalLengthRange"
                      element={<MaxFocalLengthRange />}
                    />
                    <Route path="/HiringPerson" element={<HiringPerson />} />
                    <Route path="/CareerLevel" element={<CareerLevel />} />
                    <Route path="/PositionType" element={<PositionType />} />
                    <Route path="/TypeofAd" element={<TypeofAd />} />
                    <Route path="/Breed" element={<Breed />} />
                    <Route path="/Sex" element={<Sex />} />
                    <Route path="/Materialtype" element={<Materialtype />} />
                    <Route path="/Handmade" element={<Handmade />} />
                    <Route path="/Origin" element={<Origin />} />
                    <Route path="/Language" element={<Language />} />
                    <Route path="/Product" element={<Product />} />
                  </Routes>
                </MainLayout>
              }
            />
          </Routes>
        </SelectionDataProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}


export default App;
