import React, { useEffect, useState } from "react";
import {
  RTL_STORAGE_KEY,
  syncDocumentDirectionFromStorage,
} from "../../../utils/rtlDocumentSync";

function RtlToggle() {
  const [rtl, setRtl] = useState(() => localStorage.getItem(RTL_STORAGE_KEY) === "1");

  useEffect(() => {
    localStorage.setItem(RTL_STORAGE_KEY, rtl ? "1" : "0");
    syncDocumentDirectionFromStorage();
  }, [rtl]);

  return (
    <button
      type="button"
      onClick={() => setRtl((v) => !v)}
      className="fixed bottom-24 right-3 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#4a0157] text-xs font-bold text-white shadow-lg ring-2 ring-white/30 hover:bg-[#3b0146] lg:bottom-8"
      title="Toggle RTL / LTR"
      aria-pressed={rtl}
    >
      RTL
    </button>
  );
}

export default RtlToggle;
