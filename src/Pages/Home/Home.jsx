import React from "react";
import Hadersilder from "./HaderSilder/Hadersilder";
import MoreinKidscard from "./MoreinKids/MoreinKidscard";
import HomeCategoryCircles from "./HomeCategoryCircles";
import RtlToggle from "./RtlToggle";

function Home() {
  return (
    <div className="relative bg-white">
      <RtlToggle />
      {/* Boxed column: empty white gutters on large viewports (matches Motta reference) */}
      <div className="mx-auto w-full max-w-[1200px] px-4 pb-10 pt-2 sm:px-5 sm:pb-12 lg:px-6">
        <div className="rounded-2xl bg-[#fafafa] px-3 py-4 sm:px-4 sm:py-5 lg:px-5 lg:py-6">
          <Hadersilder />
        </div>
        {/* Inset white card with visible gray “empty” margin on left/right (same language as hero) */}
        <div className="mt-5 rounded-2xl bg-[#fafafa] p-3 sm:mt-6 sm:p-4 lg:mt-8 lg:p-5 xl:p-6">
          <HomeCategoryCircles />
        </div>
        <MoreinKidscard />
      </div>
    </div>
  );
}

export default Home