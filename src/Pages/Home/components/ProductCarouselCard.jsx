import React from "react";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import imageLiveUrl from "../../../../utils/urlConverter/imageLiveUrl";
import {
  formatProductPriceDisplay,
  formatProductOldPriceDisplay,
  productHasSalePrice,
} from "../../../../utils/formatProductPrice";
import "./ProductCarouselCard.css";

/**
 * Motta-style product card (You Might Also Like / carousels).
 */
function ProductCarouselCard({ product, ratingAverage = 0, reviewCount = 0, onClick }) {
  const img = product?.images?.[0];
  const user = product?.User || product?.user;
  const sellerName = user?.username || user?.name || "Store";
  const sellerImg = user?.image
    ? user.image.startsWith("http")
      ? user.image
      : imageLiveUrl(user.image)
    : "";

  const showSale = productHasSalePrice(product);

  const colorCount = Array.isArray(product?.colors)
    ? product.colors.length
    : typeof product?.colorCount === "number"
      ? product.colorCount
      : null;

  return (
    <button
      type="button"
      onClick={onClick}
      className="pcard group w-full text-left"
    >
      <div className="pcard__image-wrap">
        {showSale && (
          <span className="pcard__badge" aria-hidden>
            Sale
          </span>
        )}
        {img ? (
          <img
            src={imageLiveUrl(img)}
            alt=""
            className="pcard__img"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100 text-xs text-gray-400">
            No image
          </div>
        )}
      </div>

      {colorCount != null && colorCount > 0 && (
        <p className="pcard__colors">{colorCount} Colors</p>
      )}

      <h3 className="pcard__title line-clamp-2">{product?.name || ""}</h3>

      <div className="pcard__rating">
        <Rating
          name={`rate-${product?._id}`}
          value={ratingAverage}
          precision={0.5}
          readOnly
          size="small"
          sx={{
            "& .MuiRating-iconFilled": { color: "#f5b301" },
            "& .MuiRating-iconEmpty": { color: "#e5e7eb" },
          }}
        />
        <span className="pcard__reviews">({reviewCount})</span>
      </div>

      <div className="pcard__price-row">
        <span className="pcard__price">{formatProductPriceDisplay(product)}</span>
        {showSale && (
          <span className="pcard__price-old">
            {formatProductOldPriceDisplay(product)}
          </span>
        )}
      </div>

      <div className="pcard__vendor">
        <Avatar
          src={sellerImg || undefined}
          alt=""
          sx={{ width: 22, height: 22, fontSize: 11 }}
        >
          {sellerName?.charAt(0)}
        </Avatar>
        <span className="pcard__vendor-name">{sellerName}</span>
      </div>
    </button>
  );
}

export default ProductCarouselCard;
