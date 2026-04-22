import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import imageLiveUrl from "../../../utils/urlConverter/imageLiveUrl";

function SearchResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchResults = location.state?.searchResults || [];
  const [isLoading, setisLoading] = useState(false);

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
    </div>
  );
}

export default SearchResultsPage;
