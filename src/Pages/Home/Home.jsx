import React from 'react'
import Hadersilder from './HaderSilder/Hadersilder';
import Categories from "./AllCategories/Categories"
import MoreinKidscard from "./MoreinKids/MoreinKidscard"
import Cars from './Cars/Cars';
import Footer from './Footer/Footer';
import Header from '../../components/Header/Header';
import DropDownSelection from '../../components/DropDownSelection/DropDownSelection';

function Home() {
  return (
    <div>
      {/* <h1>Home</h1> */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>
      <hr className="lg:px-10 mt-40" />
      
      <div className="px-10 smm:px-3 ">
        <DropDownSelection/>
        <Hadersilder />
        <Categories />
        <MoreinKidscard />
        <Cars />
      </div>
      <Footer />
    </div>
  );
}

export default Home