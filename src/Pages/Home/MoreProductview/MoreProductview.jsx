import React, { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import NewRequest from "../../../../utils/NewRequest";
import { toast } from "react-toastify";
import Skeleton from "@mui/material/Skeleton";
import imageLiveUrl from "../../../../utils/urlConverter/imageLiveUrl";
import "./MoreProductview.css";
import ProductCarouselCard from "../components/ProductCarouselCard";

const MoreProductview = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const moreproduct = sessionStorage.getItem("productmore");
  const subCategoriesResponse = JSON.parse(moreproduct);
  const storedUserResponseString = localStorage.getItem("userResponse");
  const storedUserResponse = JSON.parse(storedUserResponseString);
  const loginuserid = storedUserResponse?.data?.user?._id || "";

  const [productRatingMeta, setProductRatingMeta] = useState({});
  const [limit, setLimit] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [isNarrow, setIsNarrow] = useState(true);

  useEffect(() => {
    const mqNarrow = window.matchMedia("(max-width: 1023px)");
    const mqDesktop = window.matchMedia("(min-width: 1024px)");
    const sync = () => {
      setIsNarrow(mqNarrow.matches);
      if (mqDesktop.matches) setFiltersOpen(false);
    };
    sync();
    mqNarrow.addEventListener("change", sync);
    mqDesktop.addEventListener("change", sync);
    return () => {
      mqNarrow.removeEventListener("change", sync);
      mqDesktop.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    if (!mq.matches || !filtersOpen) {
      return undefined;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setFiltersOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [filtersOpen]);

  async function fetchProductRatings(products) {
    const meta = {};

    // Loop through products and fetch ratings for each product
    for (const product of products) {
      try {
        const ratingResponse = await NewRequest.get(
          `/comment/replay/${product._id}`
        );

        const comments = ratingResponse?.data?.comments || [];

        // Calculate the average rating
        const totalRatings = comments.reduce(
          (acc, comment) => acc + (comment.rating || 0),
          0
        );
        const averageRating = comments.length
          ? totalRatings / comments.length
          : 0;

        meta[product._id] = {
          avg: averageRating || 0,
          count: comments.length || 0,
        };
      } catch (error) {
        meta[product._id] = { avg: 0, count: 0 };
      }
    }

    setProductRatingMeta(meta);
  }

  const {
    isLoading,
    error,
    data: moreproductData,
  } = useQuery(
    ["category", subCategoriesResponse?.category?._id, limit],
    fetchmoreproductData,
    {
      enabled: !!subCategoriesResponse?.category?._id,
      keepPreviousData: true,
    }
  );

  const { data: productsdata } = useQuery(
    "getcategoryproduct",
    fetchproductData
  );

  async function fetchmoreproductData() {
    const response = await NewRequest.get(
      `/product/getProductsByCategoryId/${subCategoriesResponse?.category?._id || ""}?page=1&limit=${limit}`
    );
    const activeProducts = response?.data?.data
      .filter((product) => product.status.toLowerCase() === "active")
      
    
    setHasMore(response?.data?.pagination?.hasNextPage || false);
    
    fetchProductRatings(activeProducts);
    return activeProducts || [];
  }

  async function fetchproductData() {
    const response = await NewRequest.get("/product/getcategoryproduct");
    const categoriesWithCounts = response?.data.map((item) => ({
      name: item.category.name,
      count: item.products.length,
      id: item,
    }));
    return categoriesWithCounts;
  }

  const postcard = async (Product) => {
    try {
      await NewRequest.post(`/wishlist/${loginuserid}`, {
        productId: Product,
      });
      toast.success(`Product has been added successfully.`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error?.response?.data?.error || "Error", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const charfunction = (Product) => {
    sessionStorage.setItem("chardata", JSON.stringify(Product));
    navigate("/Chat");
  };

  const singproductitem = (card) => {
    localStorage.setItem("singleproduct", JSON.stringify(card));
    navigate(`/Singleitem/${card._id}`);
  };

  const viewmore = async (category) => {
    sessionStorage.setItem("productmore", JSON.stringify(category.id));
    // Refetch only the data related to the new category
    queryClient.invalidateQueries(["category", category.id]);
    navigate(`/moreproduct/${category.name}`);
  };

  const loadMore = () => {
    setLimit(prevLimit => prevLimit + 10);
  };

  const currentCategoryName = subCategoriesResponse?.category?.name || "";
  const currentCategoryMeta = productsdata?.find(
    (c) => c?.name === currentCategoryName
  );
  const currentCategoryCount = currentCategoryMeta?.count || 0;

  const allProductsCount = Array.isArray(productsdata)
    ? productsdata.reduce((acc, c) => acc + (c?.count || 0), 0)
    : 0;

  /** Merge populated `User` from `/product/getcategoryproduct` when paginated API returns an id-only `User`. */
  const categoryProductsById = useMemo(() => {
    const list = currentCategoryMeta?.id?.products;
    if (!Array.isArray(list)) return {};
    return Object.fromEntries(list.map((p) => [p._id, p]));
  }, [currentCategoryMeta]);

  const productsForGrid = useMemo(() => {
    if (!Array.isArray(moreproductData)) return [];
    return moreproductData.map((p) => {
      const paginatedUser = p.User ?? p.user;
      const hasPopulatedUser =
        paginatedUser &&
        typeof paginatedUser === "object" &&
        (paginatedUser.username || paginatedUser.name);
      if (hasPopulatedUser) return p;
      const fromCat = categoryProductsById[p._id];
      const mergedUser = fromCat?.User ?? fromCat?.user;
      if (mergedUser && typeof mergedUser === "object") {
        return { ...p, User: mergedUser };
      }
      return p;
    });
  }, [moreproductData, categoryProductsById]);

  return (
    <>
      <section className="mpv-page" dir="ltr">
        <div className="mpv-container">
          <div className="mpv-breadcrumb">
            <span className="mpv-breadcrumb-home" onClick={() => navigate("/")}>
              Home
            </span>
            <span className="mpv-breadcrumb-sep">|</span>
            <span className="mpv-breadcrumb-current">
              {subCategoriesResponse?.category?.name || ""}
            </span>
          </div>

          <div className="mpv-header">
            <h2 className="mpv-title">
              {subCategoriesResponse?.category?.name || ""}
            </h2>
          </div>

          <div className="mpv-banner" aria-hidden="true">
            {subCategoriesResponse?.category?.icon ? (
              <img
                className="mpv-banner-img"
                src={imageLiveUrl(subCategoriesResponse?.category?.icon)}
                alt=""
              />
            ) : (
              <div className="mpv-banner-placeholder" />
            )}
          </div>

          <div className="mpv-layout">
            <button
              type="button"
              className="mpv-filter-trigger"
              aria-expanded={filtersOpen}
              aria-controls="mpv-filter-panel"
              onClick={() => setFiltersOpen(true)}
            >
              <span className="mpv-filter-trigger__icon" aria-hidden>
                ◧
              </span>
              <span>Filters</span>
              {currentCategoryName ? (
                <span className="mpv-filter-trigger__pill">{currentCategoryName}</span>
              ) : null}
            </button>

            {filtersOpen ? (
              <div
                className="mpv-filter-backdrop"
                role="presentation"
                aria-hidden
                onClick={() => setFiltersOpen(false)}
              />
            ) : null}

            <aside
              id="mpv-filter-panel"
              className={`mpv-sidebar ${filtersOpen ? "mpv-sidebar--open" : ""}`}
              aria-hidden={isNarrow ? !filtersOpen : false}
            >
              <div className="mpv-sidebar-mobile-bar">
                <span className="mpv-sidebar-mobile-title">Refine by</span>
                <div className="mpv-sidebar-mobile-actions">
                  <button type="button" className="mpv-clear" onClick={() => {}}>
                    Clear All
                  </button>
                  <button
                    type="button"
                    className="mpv-sidebar-close"
                    aria-label="Close filters"
                    onClick={() => setFiltersOpen(false)}
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="mpv-sidebar-head">
                <div className="mpv-sidebar-title">Refine by</div>
                <button type="button" className="mpv-clear" onClick={() => {}}>
                  Clear All
                </button>
              </div>

              <div className="mpv-filter-block">
                <div className="mpv-filter-label">Filter</div>
                <div className="mpv-chip-row">
                  <span className="mpv-chip">
                    {currentCategoryName}
                    <button
                      type="button"
                      className="mpv-chip-x"
                      aria-label="Remove filter"
                      onClick={() => navigate("/")}
                    >
                      ×
                    </button>
                  </span>
                </div>
              </div>

              <div className="mpv-filter-block">
                <div className="mpv-filter-header">
                  <span>Categories</span>
                  <span className="mpv-collapse">-</span>
                </div>
                <div className="mpv-filter-items mpv-cat-items">
                  <div className="mpv-cat-item">
                    <span className="mpv-cat-plus">-</span>
                    <span className="mpv-cat-text">All Categories ({allProductsCount})</span>
                  </div>
                  <div className="mpv-cat-item">
                    <span className="mpv-cat-plus">+</span>
                    <span
                      className="mpv-cat-text mpv-cat-text--active"
                      onClick={() => {
                        if (currentCategoryMeta) viewmore(currentCategoryMeta);
                      }}
                    >
                      {currentCategoryName} ({currentCategoryCount})
                    </span>
                  </div>
                  <button type="button" className="mpv-lessmore">
                    Less More
                  </button>
                </div>
              </div>

              <div className="mpv-filter-block">
                <div className="mpv-filter-header">
                  <span>Price</span>
                  <span className="mpv-collapse">-</span>
                </div>
                <div className="mpv-filter-items">
                  <label className="mpv-checkbox">
                    <input type="checkbox" />
                    <span className="mpv-checkbox-text">$0 - $100.00</span>
                  </label>
                  <label className="mpv-checkbox">
                    <input type="checkbox" />
                    <span className="mpv-checkbox-text">$100.00 - $200.00</span>
                  </label>
                  <label className="mpv-checkbox">
                    <input type="checkbox" />
                    <span className="mpv-checkbox-text">$250.00 +</span>
                  </label>

                  <div className="mpv-price-range">
                    <div className="mpv-price-inputs">
                      <div className="mpv-price-col">
                        <div className="mpv-price-label">Min</div>
                        <input className="mpv-price-input" placeholder="$0" />
                      </div>
                      <div className="mpv-price-col">
                        <div className="mpv-price-label">Max</div>
                        <input className="mpv-price-input" placeholder="$250" />
                      </div>
                    </div>
                    <button type="button" className="mpv-apply-btn">
                      Apply
                    </button>
                  </div>
                </div>
              </div>

              <div className="mpv-filter-block">
                <div className="mpv-filter-header">
                  <span>Color</span>
                  <span className="mpv-collapse">-</span>
                </div>
                <div className="mpv-filter-items mpv-color-items">
                  <div className="mpv-color-dot mpv-color-dot--black" />
                  <div className="mpv-color-dot mpv-color-dot--blue" />
                  <div className="mpv-color-dot mpv-color-dot--brown" />
                  <div className="mpv-color-dot mpv-color-dot--gray" />
                </div>
              </div>
            </aside>

            <main className="mpv-main">
              <div className="mpv-toolbar">
                <div className="mpv-results">
                  1-{productsForGrid?.length || 0} of {productsForGrid?.length || 0} Results
                </div>
                <div className="mpv-toolbar-right">
                  <div className="mpv-sort">
                    <span className="mpv-sort-label">Sort by:</span>
                    <select className="mpv-select" disabled>
                      <option>Default</option>
                    </select>
                  </div>
                  <div className="mpv-view-icons">
                    <button
                      type="button"
                      className="mpv-view-btn mpv-view-btn--active"
                      aria-label="Grid view"
                    >
                      <span className="mpv-view-icon" aria-hidden="true">
                        ▦
                      </span>
                    </button>
                    <button
                      type="button"
                      className="mpv-view-btn"
                      aria-label="List view"
                    >
                      <span className="mpv-view-icon" aria-hidden="true">
                        ≡
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="mpv-grid">
                {isLoading ? (
                  [...Array(3)].map((_, index) => (
                    <div
                      className="mpv-card mpv-skeleton-card cursor-pointer"
                      key={index}
                    >
                      <div className="flex flex-col gap-1 sm:gap-1 lg:gap-3">
                        <Skeleton
                          variant="rectangular"
                          width="100%"
                          height={208}
                        />
                        <div className="w-full mb-5 p-4 flex flex-col gap-1 sm:gap-1 lg:gap-3">
                          <Skeleton
                            variant="text"
                            width="60%"
                            height={30}
                            style={{ marginBottom: "12px" }}
                          />
                          <Skeleton
                            variant="text"
                            width="100%"
                            height={20}
                            style={{ marginBottom: "12px" }}
                          />
                          <Skeleton
                            variant="text"
                            width="80%"
                            height={20}
                            style={{ marginBottom: "12px" }}
                          />
                          <Skeleton
                            variant="rectangular"
                            width="100px"
                            height={40}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                ) : error ? (
                  <div>Error loading products</div>
                ) : productsForGrid.length === 0 ? (
                  <div>No products available</div>
                ) : (
                  productsForGrid.map((item) => (
                    <ProductCarouselCard
                      key={item?._id}
                      product={item}
                      ratingAverage={productRatingMeta[item?._id]?.avg || 0}
                      reviewCount={productRatingMeta[item?._id]?.count || 0}
                      onClick={() => singproductitem(item)}
                    />
                  ))
                )}
              </div>

              {!isLoading && hasMore && (
                <div className="mpv-load-more">
                  <button
                    onClick={loadMore}
                    className="mpv-load-more-btn"
                  >
                    Load More
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>
    </>
  );
};

export default MoreProductview;
