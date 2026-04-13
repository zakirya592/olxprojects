import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import NewRequest from "../../../utils/NewRequest";
import imageLiveUrl from "../../../utils/urlConverter/imageLiveUrl";
import SearchAllCategoriesModal from "../../components/Header/SearchAllCategoriesModal";

async function fetchCategories() {
  const response = await NewRequest.get("/category");
  return response?.data?.filter((c) => c.status === 1) || [];
}

async function fetchCategoryProducts() {
  const response = await NewRequest.get("/product/getcategoryproduct");
  return response?.data;
}

function HomeCategoryCircles() {
  const navigate = useNavigate();
  const [seeAllOpen, setSeeAllOpen] = useState(false);
  const { data: categories = [], isLoading } = useQuery("category", fetchCategories);
  const { data: productsdata } = useQuery(
    "productgetcategoryss",
    fetchCategoryProducts
  );

  const goTo = (item) => {
    const selected = productsdata?.find((p) => p.category.name === item.name);
    if (selected) {
      sessionStorage.setItem("productmore", JSON.stringify(selected));
      navigate(`/moreproduct/${selected.category.name}`);
    }
  };

  if (isLoading) {
    return (
      <section id="shop-by-category" className="mb-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="flex gap-4 overflow-x-auto py-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-24 w-24 flex-shrink-0 animate-pulse rounded-full bg-gray-200"
            />
          ))}
        </div>
      </section>
    );
  }

  if (!categories.length) return null;

  return (
    <section id="shop-by-category" className="mb-12 scroll-mt-24">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
          Shop by Category
        </h2>
        <button
          type="button"
          onClick={() => setSeeAllOpen(true)}
          className="border-0 bg-transparent pb-0.5 text-sm font-semibold text-gray-900 underline decoration-gray-900 underline-offset-[5px] transition hover:text-[#004747] hover:decoration-[#004747]"
        >
          See All
        </button>
      </div>

      <div className="-mx-1 flex gap-3 overflow-x-auto pb-2 pt-1 sm:gap-5 md:justify-center md:overflow-visible md:pb-0">
        {categories.map((item) => (
          <button
            key={item._id || item.name}
            type="button"
            onClick={() => goTo(item)}
            className="group flex w-[76px] flex-shrink-0 flex-col items-center gap-2.5 text-center sm:w-[92px]"
          >
            <span className="flex h-[76px] w-[76px] items-center justify-center rounded-full border border-gray-200/90 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition group-hover:border-[#004747] group-hover:shadow-[0_4px_14px_rgba(0,71,71,0.12)] sm:h-[88px] sm:w-[88px]">
              {item?.icon ? (
                <img
                  src={imageLiveUrl(item.icon)}
                  alt=""
                  className="h-11 w-11 object-contain sm:h-12 sm:w-12"
                />
              ) : (
                <span className="text-sm font-bold text-[#004747]">
                  {item.name?.slice(0, 2)}
                </span>
              )}
            </span>
            <span className="line-clamp-2 max-w-[88px] text-[11px] font-medium leading-snug text-gray-800 sm:text-xs">
              {item.name}
            </span>
          </button>
        ))}
      </div>

      <SearchAllCategoriesModal
        open={seeAllOpen}
        onClose={() => setSeeAllOpen(false)}
        categories={categories}
        isLoading={false}
      />
    </section>
  );
}

export default HomeCategoryCircles;
