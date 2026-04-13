import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import NewRequest from "../../../utils/NewRequest";
import imageLiveUrl from "../../../utils/urlConverter/imageLiveUrl";
import SearchAllCategoriesModal from "../../components/Header/SearchAllCategoriesModal";
import "./HomeCategoryCircles.css";

async function fetchCategories() {
  const response = await NewRequest.get("/category");
  return response?.data?.filter((c) => c.status === 1) || [];
}

async function fetchCategoryProducts() {
  const response = await NewRequest.get("/product/getcategoryproduct");
  return response?.data;
}

function isDealsName(name) {
  return /^deals$/i.test(String(name || "").trim());
}

/** Put Deals first (Motta reference); add synthetic Deals if missing. */
function buildDisplayList(categories) {
  const list = [...categories];
  const dealsIdx = list.findIndex((c) => isDealsName(c.name));
  if (dealsIdx > 0) {
    const [d] = list.splice(dealsIdx, 1);
    list.unshift(d);
  } else if (dealsIdx === -1) {
    list.unshift({
      _id: "__synthetic_deals__",
      name: "Deals",
      icon: null,
      status: 1,
      isSyntheticDeals: true,
    });
  }
  return list;
}

function HomeCategoryCircles() {
  const navigate = useNavigate();
  const [seeAllOpen, setSeeAllOpen] = useState(false);
  const { data: categories = [], isLoading } = useQuery("category", fetchCategories);
  const { data: productsdata } = useQuery(
    "productgetcategoryss",
    fetchCategoryProducts
  );

  const displayCategories = useMemo(
    () => (categories.length ? buildDisplayList(categories) : []),
    [categories]
  );

  const goTo = (item) => {
    if (item.isSyntheticDeals) {
      const match = productsdata?.find((p) => isDealsName(p.category?.name));
      if (match) {
        sessionStorage.setItem("productmore", JSON.stringify(match));
        navigate(`/moreproduct/${match.category.name}`);
      } else {
        navigate("/");
      }
      return;
    }
    const selected = productsdata?.find((p) => p.category.name === item.name);
    if (selected) {
      sessionStorage.setItem("productmore", JSON.stringify(selected));
      navigate(`/moreproduct/${selected.category.name}`);
    }
  };

  if (isLoading) {
    return (
      <section id="shop-by-category" className="shop-cat-section mb-6">
        <div className="shop-cat-header">
          <div className="h-8 w-52 animate-pulse rounded bg-gray-100" />
          <div className="h-4 w-14 animate-pulse rounded bg-gray-100" />
        </div>
        <div className="shop-cat-row">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <div key={i} className="shop-cat-item" style={{ pointerEvents: "none" }}>
              <div
                className={`shop-cat-circle ${i === 1 ? "shop-cat-circle--deals" : "shop-cat-circle--default"} animate-pulse`}
              />
              <div className="mt-2 h-3 w-12 animate-pulse rounded bg-gray-100" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!displayCategories.length) return null;

  return (
    <section id="shop-by-category" className="shop-cat-section mb-6 scroll-mt-24">
      <div className="shop-cat-header">
        <h2 className="shop-cat-title">Shop by Category</h2>
        <button
          type="button"
          className="shop-cat-see-all"
          onClick={() => setSeeAllOpen(true)}
        >
          See All
        </button>
      </div>

      <div className="shop-cat-row">
        {displayCategories.map((item) => {
          const isDealsChip =
            item.isSyntheticDeals || isDealsName(item.name);
          const circleClass = isDealsChip
            ? "shop-cat-circle shop-cat-circle--deals"
            : "shop-cat-circle shop-cat-circle--default";
          const showDealsWordmark = isDealsChip && !item?.icon;

          return (
            <button
              key={item._id || item.name}
              type="button"
              className="shop-cat-item"
              onClick={() => goTo(item)}
            >
              <span className={circleClass}>
                {showDealsWordmark ? (
                  <span className="shop-cat-deals-text">Deals</span>
                ) : item?.icon ? (
                  <img src={imageLiveUrl(item.icon)} alt="" />
                ) : (
                  <span className="text-xs font-bold text-[#004747]">
                    {item.name?.slice(0, 2)}
                  </span>
                )}
              </span>
              <span className="shop-cat-label">{item.name}</span>
            </button>
          );
        })}
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
