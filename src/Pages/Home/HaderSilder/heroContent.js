/** Fallback copy when slider API returns image-only (matches Motta home-v3). */
export const MAIN_SLIDE_FALLBACK = [
  {
    label: "IMAC",
    title: "Abracadabra.",
    description:
      "A perfectly poised stand. And blazingly fast Thunderbolt ports.",
  },
  {
    label: "Furniture",
    title: "Simple Style.",
    description:
      "Dining, living, and desk areas serve their purposes in total harmony of style.",
  },
  {
    label: "Electronics",
    title: "Spring Deals.",
    description:
      "Spring into incredible deals on a selection of TVs, Smart screens, and so much more.",
  },
];

export const SIDE_PROMO_FALLBACK = [
  {
    badge: "NEW ARRIVALS",
    title: "Stay Comfy",
    description: "A collection of premium organic pieces.",
  },
  {
    badge: "FEATURED",
    title: "Smart Toothbrush",
    description: "A brush that knows you. an app that shows you.",
  },
];

function firstNonEmpty(...values) {
  return values.find((value) => typeof value === "string" && value.trim()) || "";
}

export function getMainSlideCopy(item, index) {
  const fb = MAIN_SLIDE_FALLBACK[index % MAIN_SLIDE_FALLBACK.length];
  const label = firstNonEmpty(item?.label, item?.kicker, item?.tag, item?.title, fb.label);
  const title = firstNonEmpty(
    item?.heading,
    item?.headline,
    item?.name,
    item?.title,
    fb.title
  );
  const description = firstNonEmpty(item?.description, item?.subtitle, fb.description);

  return {
    label,
    title,
    description,
  };
}

export function getSidePromoCopy(item, index) {
  const fb = SIDE_PROMO_FALLBACK[index % SIDE_PROMO_FALLBACK.length];
  const badge = firstNonEmpty(item?.badge, item?.tag, item?.title, fb.badge);
  const title = firstNonEmpty(item?.heading, item?.headline, item?.title, fb.title);
  const description = firstNonEmpty(item?.description, item?.subtitle, fb.description);

  return {
    badge,
    title,
    description,
  };
}
