import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Sellpage from "./Pages/Home/Sellpage/Sellpage";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import PostAttributes from "./Pages/Home/PostAttributes/PostAttributes";
import SelectionDataProvider from "./Contextapi/Selectioncardcontext";
import Chat from "./components/Chat/Chat";
import MoreProductview from "./Pages/Home/MoreProductview/MoreProductview";
import Header from "./components/Header/Header";
import Myfavorites from "./Pages/Home/Myfavorites/Myfavorites";
import Footer from "./Pages/Home/Footer/Footer";
import Singleitem from "./Pages/Home/AllCategories/Singleitem";
import GoogleCallbackHandler from "./Pages/Admin/Login/GoogleCallbackHandler";
import ProfilePage from "./Pages/Setting/ProfilePage/ProfilePage";
import MyProduct from "./Pages/Setting/MyProduct/MyProduct";
import SearchResultsPage from "./Pages/SearchResults/SearchResultsPage";
import UpdateMyProduct from "./Pages/Setting/MyProduct/UpdateMyProduct";
import LoginForm from "./Pages/Admin/Login/LoginForm";
import SinUpForm from "./Pages/Admin/Login/SinUpForm";
import ContactUs from "./Pages/Home/ContactUs/ContactUs";
import Aboutus from "./Pages/Home/Aboutus/Aboutus";
import UserProductlist from "./Pages/Home/UserProductlist/UserProductlist";
import ForgotPassword from "./Pages/Admin/Login/ForgotPassword/ForgotPassword";
import ResetPassword from "./Pages/Admin/Login/ResetPassword/ResetPassword";

const queryClient = new QueryClient();

function App() {
  const UserLayout = () => {
    return (
      <div>
        <div className="sticky top-0 z-50 bg-white">
          <Header />
        </div>
        <main className="mx-auto flex max-w-[1760px] flex-col justify-center">
          <Outlet />
        </main>
        <Footer />
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
            <Route path="/SinUpForm" element={<SinUpForm />} />{" "}
            <Route path="/forgot-password" element={<ForgotPassword />} />{" "}
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route element={<UserLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/moreproduct/:name" element={<MoreProductview />} />
              <Route path="/Singleitem/:_id" element={<Singleitem />} />{" "}
              <Route path="/Chat" element={<Chat />} />{" "}
              <Route path="/Myfavorites" element={<Myfavorites />} />
              <Route path="/ProfilePage" element={<ProfilePage />} />
              <Route path="/MyProduct" element={<MyProduct />} />
              <Route path="/Productlist/:_id" element={<UserProductlist />} />
              <Route
                path="/UpdateMyProduct/:name"
                element={<UpdateMyProduct />}
              />
              <Route
                path="/auth/google/callback"
                element={<GoogleCallbackHandler />}
              />
              <Route path="/search-results" element={<SearchResultsPage />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/Aboutus" element={<Aboutus />} />
            </Route>
          </Routes>
        </SelectionDataProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}


export default App;
