import React, { useEffect, useState } from "react";

const STORAGE_KEY = "motta-rtl";

function RtlToggle() {
  const [rtl, setRtl] = useState(() => localStorage.getItem(STORAGE_KEY) === "1");

  useEffect(() => {
    const root = document.documentElement;
    if (rtl) {
      root.classList.add("directionrtl");
      root.classList.remove("directionltr");
    } else {
      root.classList.add("directionltr");
      root.classList.remove("directionrtl");
    }
    localStorage.setItem(STORAGE_KEY, rtl ? "1" : "0");
  }, [rtl]);

  return (
    <button
      type="button"
      onClick={() => setRtl((v) => !v)}
      className="fixed bottom-24 right-3 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#004747] text-xs font-bold text-white shadow-lg ring-2 ring-white/30 hover:bg-[#003838] lg:bottom-8"
      title="Toggle RTL / LTR"
      aria-pressed={rtl}
    >
      RTL
    </button>
  );
}

export default RtlToggle;
