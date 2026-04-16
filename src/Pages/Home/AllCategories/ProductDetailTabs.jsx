import React, { useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import Commentproduct from "../../Commentproduct/Commentproduct";
import {
  formatProductPriceDisplay,
} from "../../../../utils/formatProductPrice";
import "./ProductDetailTabs.css";

function ProductDetailTabs({
  data,
  isLoading,
  reviewCount,
  productRouteParams,
  onReviewsChange,
}) {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { id: "description", label: "Description" },
    { id: "additional", label: "Additional Information" },
    {
      id: "reviews",
      label: `Reviews (${typeof reviewCount === "number" ? reviewCount : 0})`,
    },
    { id: "shipping", label: "Shipping & Returns" },
  ];

  return (
    <section className="pdp-tabs" aria-label="Product details">
      <div className="pdp-tabs__list" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            id={`pdp-tab-${tab.id}`}
            className={`pdp-tabs__btn ${
              activeTab === tab.id ? "pdp-tabs__btn--active" : ""
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "description" && (
        <div
          className="pdp-tabs__panel pdp-tabs__panel--description"
          role="tabpanel"
          aria-labelledby="pdp-tab-description"
        >
          {isLoading ? (
            <Skeleton variant="rounded" height={120} />
          ) : (
            <div className="pdp-description">
              {data?.description ? (
                <p className="text-productdesc mb-0 w-full">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: data.description,
                    }}
                  />
                </p>
              ) : (
                <p className="pdp-tabs__empty">No description provided.</p>
              )}
            </div>
          )}
        </div>
      )}

      {activeTab === "additional" && (
        <div
          className="pdp-tabs__panel"
          role="tabpanel"
          aria-labelledby="pdp-tab-additional"
        >
          {isLoading ? (
            <Skeleton variant="rounded" height={160} />
          ) : (
            <dl className="pdp-additional">
              <div className="pdp-additional__row">
                <dt className="pdp-additional__dt">Category</dt>
                <dd className="pdp-additional__dd">
                  {data?.Category?.name || "—"}
                </dd>
              </div>
              <div className="pdp-additional__row">
                <dt className="pdp-additional__dt">Location</dt>
                <dd className="pdp-additional__dd">
                  {data?.location || "—"}
                </dd>
              </div>
              <div className="pdp-additional__row">
                <dt className="pdp-additional__dt">Status</dt>
                <dd className="pdp-additional__dd">
                  {data?.status ? String(data.status) : "—"}
                </dd>
              </div>
              <div className="pdp-additional__row">
                <dt className="pdp-additional__dt">Price</dt>
                <dd className="pdp-additional__dd">
                  {data ? formatProductPriceDisplay(data) : "—"}
                </dd>
              </div>
            </dl>
          )}
        </div>
      )}

      {activeTab === "reviews" && (
        <div
          className="pdp-tabs__panel"
          role="tabpanel"
          aria-labelledby="pdp-tab-reviews"
        >
          <Commentproduct
            productdata={productRouteParams}
            layout="split"
            onReviewsChange={onReviewsChange}
          />
        </div>
      )}

      {activeTab === "shipping" && (
        <div
          className="pdp-tabs__panel"
          role="tabpanel"
          aria-labelledby="pdp-tab-shipping"
        >
          <div className="pdp-shipping-tab">
            <h3>Shipping</h3>
            <p>
              Delivery times depend on the seller and your location. Contact the
              seller before purchase to confirm shipping options and costs.
            </p>
            <h3>Returns</h3>
            <p>
              Return and refund policies vary by listing. Use Chat on the
              product page to agree on terms with the seller before you buy.
            </p>
            <h3>Support</h3>
            <p>
              For issues after purchase, reach out to the seller via the in-app
              chat or the contact options on this listing.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProductDetailTabs;
