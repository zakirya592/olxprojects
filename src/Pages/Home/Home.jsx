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
      {/* <div className=""> */}
      <Header />
      {/* </div> */}
      <hr className="lg:px-10 mt-5 lg:mt-40 sm:mt-2" />

      <div className="px-2 sm:px-2 lg:px-10 smm:px-3 container justify-center mx-auto">
        {/* <DropDownSelection /> */}
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