import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import imageLiveUrl from "../../../utils/urlConverter/imageLiveUrl";
import NewRequest from "../../../utils/NewRequest";

function SearchResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchResults = location.state?.searchResults || [];
  const [isLoading, setisLoading] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(false);

  const singproductitem = (card) => {
    navigate(`/Singleitem/${card._id}`, { state: { cardData: card } });
  };

  const formatPrice = (value) => {
    if (value === null || value === undefined || value === "") {
      return "N/A";
    }

    const parsed = Number(value);
    if (Number.isNaN(parsed)) {
      return value;
    }

    return new Intl.NumberFormat("en-PK").format(parsed);
  };

  const getStatusClasses = (status) => {
    const normalized = String(status || "").toLowerCase();
    if (normalized === "active") {
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    }
    if (normalized === "sold") {
      return "bg-rose-100 text-rose-700 border-rose-200";
    }
    return "bg-slate-100 text-slate-700 border-slate-200";
  };

  const searchResultIds = useMemo(
    () => new Set(searchResults.map((item) => item?._id).filter(Boolean)),
    [searchResults]
  );

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!searchResults.length) {
        setRelatedProducts([]);
        return;
      }

      const categoryIds = [
        ...new Set(
          searchResults
            .map((item) => {
              if (typeof item?.Category === "string") return item.Category;
              if (typeof item?.category === "string") return item.category;
              return item?.Category?._id || item?.category?._id || "";
            })
            .filter(Boolean)
        ),
      ].slice(0, 3);

      if (!categoryIds.length) {
        setRelatedProducts([]);
        return;
      }

      setRelatedLoading(true);
      try {
        const responses = await Promise.all(
          categoryIds.map((categoryId) =>
            NewRequest.get(`/product/getProductsByCategory/${categoryId}`)
          )
        );

        const merged = responses.flatMap((response) =>
          Array.isArray(response?.data) ? response.data : []
        );

        const uniqueById = [];
        const seenIds = new Set();

        for (const product of merged) {
          const productId = product?._id;
          if (!productId || seenIds.has(productId) || searchResultIds.has(productId)) continue;

          const status = String(product?.status || "").toLowerCase();
          if (status !== "active") continue;

          seenIds.add(productId);
          uniqueById.push(product);

          if (uniqueById.length >= 8) break;
        }

        setRelatedProducts(uniqueById);
      } catch {
        setRelatedProducts([]);
      } finally {
        setRelatedLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [searchResults, searchResultIds]);

  return (
    <div className="mx-auto min-h-screen max-w-7xl bg-slate-50/60 px-4 py-6 lg:px-10 lg:py-12">
      <div className="mb-6 border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Search Results</h1>
        <p className="mt-1 text-sm text-gray-500">
          {searchResults.length} product{searchResults.length !== 1 ? "s" : ""} found
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {searchResults.length === 0 && !isLoading && (
          <p className="rounded-md border border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center text-gray-600">
            No products found
          </p>
        )}

        {searchResults.map((item, index) => (
          <article
            key={index}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            onClick={() => singproductitem(item)}
          >
            <div className="flex h-full flex-col lg:flex-row">
              <div className="relative w-full bg-slate-100 lg:w-2/5">
                <img
                  src={
                    item?.images?.[0]
                      ? item?.images?.[0].startsWith("https")
                        ? item?.images?.[0]
                        : imageLiveUrl(item?.images?.[0])
                      : ""
                  }
                  alt="Product"
                  className="h-64 w-full object-cover transition duration-300 group-hover:scale-[1.03] lg:h-full"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              </div>
              <div className="w-full p-6 lg:w-3/5">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="line-clamp-2 text-3xl font-semibold tracking-tight text-slate-900">
                    {item?.name || "Unnamed Product"}
                  </h2>
                  <span
                    className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${getStatusClasses(
                      item?.status
                    )}`}
                  >
                    {item?.status || "N/A"}
                  </span>
                </div>

                <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Product Description
                  </p>
                  <div
                    className="max-h-44 overflow-hidden pr-1 text-[17px] leading-8 text-slate-700 [&_p]:mb-2 [&_p]:leading-8 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_strong]:text-slate-900"
                    dangerouslySetInnerHTML={{ __html: item?.description || "" }}
                  />
                </div>

                <div className="mt-5 flex flex-wrap items-end justify-between gap-4 border-t border-slate-200 pt-4">
                  <p className="text-4xl font-bold tracking-tight text-slate-900">
                    Rs {formatPrice(item?.price)}
                  </p>
                  <p className="text-sm font-medium text-slate-500">Tap to view full details</p>
                </div>

                <p className="mt-3 text-[15px] text-slate-600">
                  <span className="font-semibold text-slate-700">Condition:</span>{" "}
                  {item?.condition || "Not specified"}
                </p>
                <p className="mt-1 text-[15px] text-slate-600">
                  <span className="font-semibold text-slate-700">Location:</span>{" "}
                  {item?.location || "Location not provided"}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3">
          <h2 className="text-xl font-bold text-slate-900">Related Products</h2>
          <p className="text-sm text-slate-500">Based on similar categories</p>
        </div>

        {relatedLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="h-60 animate-pulse rounded-xl border border-slate-200 bg-white"
              />
            ))}
          </div>
        ) : relatedProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.map((product) => (
              <article
                key={product._id}
                onClick={() => singproductitem(product)}
                className="cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <img
                  src={
                    product?.images?.[0]
                      ? product.images[0].startsWith("https")
                        ? product.images[0]
                        : imageLiveUrl(product.images[0])
                      : ""
                  }
                  alt={product?.name || "Related product"}
                  className="h-40 w-full object-cover"
                />
                <div className="p-3">
                  <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">
                    {product?.name || "Unnamed Product"}
                  </h3>
                  <p className="mt-2 text-base font-bold text-slate-900">
                    Rs {formatPrice(product?.price)}
                  </p>
                  <p className="mt-1 line-clamp-1 text-xs text-slate-500">
                    {product?.location || "Location not provided"}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="rounded-md border border-dashed border-slate-300 bg-white px-4 py-6 text-center text-sm text-slate-500">
            No related products available right now.
          </p>
        )}
      </section>
    </div>
  );
}

export default SearchResultsPage;
