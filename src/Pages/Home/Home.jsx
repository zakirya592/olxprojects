import React from 'react'
import Hadersilder from './HaderSilder/Hadersilder';
import Categories from "./AllCategories/Categories"
import MoreinKidscard from "./MoreinKids/MoreinKidscard"
import Cars from './Cars/Cars';
import Footer from './Footer/Footer';

function Home() {
  return (
    <div>
      {/* <h1>Home</h1> */}
      <div className="px-10">
      <Hadersilder/>
      <Categories/>
      <MoreinKidscard/>
      <Cars/>
      </div>
      <Footer/>
    </div>
  );
}

export default Home