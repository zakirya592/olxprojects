/** Persists RTL preference to <html> class list (used by index.css .directionrtl / .directionltr). */
export const RTL_STORAGE_KEY = "motta-rtl";

export function syncDocumentDirectionFromStorage() {
  const root = document.documentElement;
  const rtl = localStorage.getItem(RTL_STORAGE_KEY) === "1";
  if (rtl) {
    root.classList.add("directionrtl");
    root.classList.remove("directionltr");
  } else {
    root.classList.add("directionltr");
    root.classList.remove("directionrtl");
  }
}
