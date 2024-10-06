import React from 'react'
import Hadersilder from './HaderSilder/Hadersilder';
import Categories from "./AllCategories/Categories"
import MoreinKidscard from "./MoreinKids/MoreinKidscard"
import DropDownSelection from '../../components/DropDownSelection/DropDownSelection';

function Home() {
  return (
    <div>
      <div className="w-full lg:w-[90%]  sm:w-full mx-auto mt-4 lg:mt-40 sm:mt-2 px-4">
        {/* <DropDownSelection /> */}
        <Hadersilder />
        <Categories />
        <MoreinKidscard />
      </div>
    </div>
  );
}

export default Home