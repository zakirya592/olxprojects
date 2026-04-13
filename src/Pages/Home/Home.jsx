import React from "react";
import Hadersilder from "./HaderSilder/Hadersilder";
import MoreinKidscard from "./MoreinKids/MoreinKidscard";
import HomeCategoryCircles from "./HomeCategoryCircles";
import RtlToggle from "./RtlToggle";

function Home() {
  return (
    <div className="relative">
      <RtlToggle />
      <div className="mx-auto w-full max-w-[1760px] bg-[#fafafa] px-3 pb-8 pt-2 sm:px-4 lg:px-8 lg:pb-12">
        <Hadersilder />
        <HomeCategoryCircles />
        <MoreinKidscard />
      </div>
    </div>
  );
}

export default Home