/**
 * Price helpers — API may use `currency` (e.g. "₨") and `price` as "2,100" or 2100.
 */

export function parsePriceNumber(value) {
  if (value === undefined || value === null || value === "") return NaN;
  const s = String(value).replace(/,/g, "").replace(/[^\d.-]/g, "").trim();
  if (s === "") return NaN;
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
}

/** Symbol shown before amount (from API: ₨, Rs, $, etc.) */
export function getProductCurrencySymbol(product) {
  const c = product?.currency;
  if (c == null || String(c).trim() === "") return "₨";
  return String(c).trim();
}

/** Pretty amount (grouping), from raw price field */
export function formatPriceAmount(value) {
  if (value === undefined || value === null || value === "") return "";
  const n = parsePriceNumber(value);
  if (Number.isNaN(n)) return String(value).trim();
  return n.toLocaleString("en-PK");
}

/** One line: "₨ 2,100" */
export function formatProductPriceDisplay(product) {
  const sym = getProductCurrencySymbol(product);
  const amt = formatPriceAmount(product?.price);
  if (!amt) return sym ? `${sym} ` : "";
  return `${sym} ${amt}`.trim();
}

export function formatProductOldPriceDisplay(product) {
  const sym = getProductCurrencySymbol(product);
  const old = product?.originalPrice ?? product?.oldPrice;
  const amt = formatPriceAmount(old);
  if (!amt) return "";
  return `${sym} ${amt}`.trim();
}

export function productHasSalePrice(product) {
  const price = product?.price;
  const old = product?.originalPrice ?? product?.oldPrice;
  if (old == null || price == null) return false;
  const a = parsePriceNumber(price);
  const b = parsePriceNumber(old);
  if (Number.isNaN(a) || Number.isNaN(b)) return false;
  return b > a;
}
