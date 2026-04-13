import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import NewRequest from "../../../utils/NewRequest";
import imageLiveUrl from "../../../utils/urlConverter/imageLiveUrl";

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
  const { data: categories = [], isLoading } = useQuery("category", fetchCategories);
  const { data: productsdata } = useQuery(
    "productgetcategoryss",
    fetchCategoryProducts
  );

  const goTo = (item) => {
    const selected = productsdata?.find(
      (p) => p.category.name === item.name
    );
    if (selected) {
      sessionStorage.setItem("productmore", JSON.stringify(selected));
      navigate(`/moreproduct/${selected.category.name}`);
    }
  };

  if (isLoading) {
    return (
      <div className="mb-8 flex gap-4 overflow-x-auto py-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-24 w-24 flex-shrink-0 animate-pulse rounded-full bg-gray-200"
          />
        ))}
      </div>
    );
  }

  if (!categories.length) return null;

  return (
    <section className="mb-10 overflow-x-auto border-b border-gray-100 pb-6">
      <div className="flex min-w-min gap-4 px-1 sm:gap-6 md:justify-center">
        {categories.map((item) => (
          <button
            key={item._id || item.name}
            type="button"
            onClick={() => goTo(item)}
            className="group flex w-[76px] flex-shrink-0 flex-col items-center gap-2 text-center sm:w-[88px]"
          >
            <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition group-hover:border-[#004747] group-hover:shadow-md sm:h-20 sm:w-20">
              {item?.icon ? (
                <img
                  src={imageLiveUrl(item.icon)}
                  alt=""
                  className="h-10 w-10 object-contain sm:h-12 sm:w-12"
                />
              ) : (
                <span className="text-xs font-semibold text-[#004747]">
                  {item.name?.slice(0, 2)}
                </span>
              )}
            </span>
            <span className="line-clamp-2 text-[11px] font-medium text-gray-800 sm:text-xs">
              {item.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default HomeCategoryCircles;
