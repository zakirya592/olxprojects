import React from 'react'
import Hadersilder from './HaderSilder/Hadersilder';
import Categories from "./AllCategories/Categories"

function Home() {
  return (
    <div>
      {/* <h1>Home</h1> */}
      <Hadersilder/>
      <Categories/>
    </div>
  );
}

export default Home