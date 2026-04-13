import React from "react";
import Hadersilder from "./HaderSilder/Hadersilder";
import MoreinKidscard from "./MoreinKids/MoreinKidscard";
import HomeCategoryCircles from "./HomeCategoryCircles";
import RtlToggle from "./RtlToggle";

function Home() {
  return (
    <div className="relative">
      <RtlToggle />
      <div className="mx-auto w-full max-w-[1760px] px-2 sm:px-3 lg:px-6">
        <Hadersilder />
        <HomeCategoryCircles />
        <MoreinKidscard />
      </div>
    </div>
  );
}

export default Home