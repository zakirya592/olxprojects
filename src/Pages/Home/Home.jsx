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
      {/* <Header /> */}
      {/* </div> */}
      {/* <hr className="lg:px-10 mt-4 lg:mt-24 sm:mt-2" /> */}

      <div className="justify-center mx-auto  mt-4 lg:mt-24 sm:mt-2">
        <DropDownSelection />
        <Hadersilder />
        <Categories />
        <MoreinKidscard />
        {/* <Cars /> */}
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Home