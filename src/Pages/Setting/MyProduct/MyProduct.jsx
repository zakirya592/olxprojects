import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import NewRequest from "../../../../utils/NewRequest";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PinDropIcon from "@mui/icons-material/PinDrop";
import imageLiveUrl from "../../../../utils/urlConverter/imageLiveUrl";
import { formatProductPriceDisplay } from "../../../../utils/formatProductPrice";
import "./MyProduct.css";

const STRUCTURED_KEYS = new Set([
  "name",
  "description",
  "price",
  "currency",
  "location",
  "images",
  "Category",
  "SubCategory",
  "FooterCategory",
  "Condition",
  "DeviceType",
  "User",
  "_id",
  "__v",
  "status",
  "phone",
  "createdAt",
  "updatedAt",
  "originalPrice",
  "oldPrice",
]);

function humanizeKey(key) {
  return String(key)
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

function isEmptyDescription(html) {
  if (!html || typeof html !== "string") return true;
  const text = html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim();
  return text.length === 0;
}

function buildExtraRows(item) {
  const rows = [];
  for (const key of Object.keys(item)) {
    if (STRUCTURED_KEYS.has(key)) continue;
    const val = item[key];
    if (val === null || val === undefined) continue;

    if (Array.isArray(val)) {
      if (val.length === 0) continue;
      const allNamed = val.every(
        (v) => v && typeof v === "object" && v.name != null
      );
      if (allNamed) {
        rows.push({
          key,
          label: humanizeKey(key),
          value: val.map((v) => v.name).join(", "),
        });
        continue;
      }
      const primitives = val.every(
        (v) => v === null || ["string", "number", "boolean"].includes(typeof v)
      );
      if (primitives) {
        rows.push({
          key,
          label: humanizeKey(key),
          value: val.map(String).join(", "),
        });
      }
      continue;
    }

    if (typeof val === "object" && val !== null && val.name != null) {
      rows.push({ key, label: humanizeKey(key), value: String(val.name) });
      continue;
    }

    if (typeof val === "object") continue;

    rows.push({ key, label: humanizeKey(key), value: String(val) });
  }
  return rows;
}

function CategoryTrail({ item }) {
  const parts = [];
  if (item?.Category?.name) parts.push({ label: "Category", text: item.Category.name });
  if (item?.SubCategory?.name)
    parts.push({ label: "Subcategory", text: item.SubCategory.name });
  if (item?.FooterCategory?.name)
    parts.push({ label: "Listing type", text: item.FooterCategory.name });

  if (parts.length === 0) {
    return <p className="mp-breadcrumb mp-crumb">—</p>;
  }

  return (
    <div className="mp-breadcrumb" aria-label="Category path">
      {parts.map((p, i) => (
        <React.Fragment key={p.label}>
          {i > 0 ? <span aria-hidden>/</span> : null}
          <span className="mp-crumb">{p.text}</span>
        </React.Fragment>
      ))}
    </div>
  );
}

function DetailAttributes({ item }) {
  const pairs = useMemo(() => {
    const out = [];
    if (item?.Condition?.name) {
      out.push({ label: "Condition", value: item.Condition.name });
    }
    if (item?.DeviceType?.name) {
      out.push({ label: "Device type", value: item.DeviceType.name });
    }
    return out;
  }, [item]);

  if (pairs.length === 0) return null;

  return (
    <section className="mp-section">
      <h3 className="mp-section-label">Product details</h3>
      <dl className="mp-dl">
        {pairs.map((p) => (
          <React.Fragment key={p.label}>
            <dt>{p.label}</dt>
            <dd>{p.value}</dd>
          </React.Fragment>
        ))}
      </dl>
    </section>
  );
}

function ProductCard({ item, onOpen, onEdit, onDelete }) {
  const [imgIdx, setImgIdx] = useState(0);
  const images = Array.isArray(item?.images) ? item.images : [];
  const safeIdx = images.length ? Math.min(imgIdx, images.length - 1) : 0;
  const mainSrc = images.length ? imageLiveUrl(images[safeIdx]) : "";
  const extraRows = useMemo(() => buildExtraRows(item), [item]);
  const descEmpty = isEmptyDescription(item?.description);

  return (
    <article className="mp-card">
      <div className="mp-card-inner">
        <div className="mp-card-media">
          {mainSrc ? (
            <img
              src={mainSrc}
              alt={item?.name || "Product"}
              className="mp-main-img"
              onClick={() => onOpen(item)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onOpen(item);
              }}
              role="presentation"
            />
          ) : (
            <div
              className="mp-main-img"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#9ca3af",
                fontWeight: 600,
              }}
            >
              No image
            </div>
          )}
          {images.length > 1 ? (
            <div className="mp-thumbs">
              {images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  className={
                    i === safeIdx ? "mp-thumb mp-thumb--active" : "mp-thumb"
                  }
                  onClick={() => setImgIdx(i)}
                  aria-label={`Photo ${i + 1}`}
                >
                  <img
                    src={imageLiveUrl(img) || ""}
                    alt=""
                    width={52}
                    height={52}
                    style={{ borderRadius: 6, objectFit: "cover" }}
                  />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="mp-card-body">
          <div className="mp-card-top">
            <div>
              <h2
                className="mp-product-title"
                onClick={() => onOpen(item)}
                role="presentation"
              >
                {item?.name || "Untitled listing"}
              </h2>
              {item?.status != null && String(item.status).trim() !== "" ? (
                <span className="mp-badge">{String(item.status)}</span>
              ) : (
                <span className="mp-badge mp-badge--muted">No status</span>
              )}
            </div>
            <div className="mp-actions">
              <button
                type="button"
                className="mp-icon-btn"
                onClick={() => onEdit(item)}
                aria-label="Edit product"
              >
                <EditIcon sx={{ fontSize: 20 }} />
              </button>
              <button
                type="button"
                className="mp-icon-btn mp-icon-btn--danger"
                onClick={() => onDelete(item._id)}
                aria-label="Delete product"
              >
                <DeleteIcon sx={{ fontSize: 20 }} />
              </button>
            </div>
          </div>

          <section className="mp-section">
            <h3 className="mp-section-label">Category</h3>
            <CategoryTrail item={item} />
          </section>

          <section className="mp-section">
            <h3 className="mp-section-label">Price</h3>
            <p className="mp-price">{formatProductPriceDisplay(item)}</p>
          </section>

          {item?.location ? (
            <section className="mp-section">
              <h3 className="mp-section-label">Location</h3>
              <div className="mp-location">
                <PinDropIcon sx={{ fontSize: 20 }} />
                <span>{item.location}</span>
              </div>
            </section>
          ) : null}

          <section className="mp-section">
            <h3 className="mp-section-label">Description</h3>
            {descEmpty ? (
              <p className="mp-desc mp-desc--empty">No description added.</p>
            ) : (
              <div
                className="mp-desc mp-html-body"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            )}
          </section>

          <DetailAttributes item={item} />

          {extraRows.length > 0 ? (
            <section className="mp-section mp-extra">
              <h3 className="mp-section-label">More information</h3>
              <dl className="mp-dl">
                {extraRows.map((row) => (
                  <React.Fragment key={row.key}>
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                  </React.Fragment>
                ))}
              </dl>
            </section>
          ) : null}
        </div>
      </div>
    </article>
  );
}

const MyProduct = () => {
  const navigate = useNavigate();
  const storedUserResponseString = localStorage.getItem("userResponse");
  const storedUserResponse = JSON.parse(storedUserResponseString);
  let loginuserid = storedUserResponse?.data?.user?._id || "";

  if (!loginuserid) {
    loginuserid = localStorage.getItem("userdata") || "";
  }

  const {
    isLoading,
    error,
    data: wishlistData,
    refetch,
  } = useQuery("wishlist", fetchwishlistData);

  async function fetchwishlistData() {
    try {
      const response = await NewRequest.get(
        `/product/getProductsByUserId/${loginuserid || ""}`
      );
      return response?.data || [];
    } catch (err) {
      throw new Error(err?.response?.data?.message || "Failed to fetch wishlist");
    }
  }

  const postcard = async (Product) => {
    try {
      await NewRequest.delete(`/product/${Product}`);
      toast.success(`Product has been Delete successfully`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      refetch();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Error", {
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

  const singproductitem = (card) => {
    navigate(`/Singleitem/${card._id}`, { state: { cardData: card } });
  };

  const Updateproduct = (card) => {
    navigate(`/UpdateMyProduct/${card.name}`, {
      state: { ProductData: card },
    });
  };

  const list = wishlistData || [];

  return (
    <div className="mp-page">
      <div className="mp-container">
        <div className="mp-topbar">
          <button type="button" className="mp-link-home" onClick={() => navigate("/")}>
            Home
          </button>
          <button
            type="button"
            className="mp-btn-add"
            onClick={() => navigate("/Post")}
          >
            Add Product
          </button>
        </div>

        <div className="mp-headline">
          <h1 className="mp-title">My Product</h1>
          <p className="mp-count">
            <strong>Total</strong> {list.length}
          </p>
        </div>

        <div className="mp-grid">
          {isLoading ? (
            <div className="mp-state">Loading…</div>
          ) : error ? (
            <div className="mp-state">{error?.message || "Error loading data"}</div>
          ) : list.length === 0 ? (
            <div className="mp-state">No products yet.</div>
          ) : (
            list.map((item) => (
              <ProductCard
                key={item._id || item.name}
                item={item}
                onOpen={singproductitem}
                onEdit={Updateproduct}
                onDelete={postcard}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProduct;
