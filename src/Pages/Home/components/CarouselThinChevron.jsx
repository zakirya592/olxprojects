import React from "react";

/**
 * Thin stroke chevron for carousel prev/next buttons (Motta-style).
 */
export function CarouselThinChevron({
  direction = "left",
  className = "",
}) {
  const isLeft = direction === "left";
  return (
    <svg
      className={className}
      width="11"
      height="18"
      viewBox="0 0 11 18"
      aria-hidden
    >
      <path
        d={isLeft ? "M8.5 1.5L2.5 9l6 7.5" : "M2.5 1.5l6 7.5-6 7.5"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default CarouselThinChevron;
