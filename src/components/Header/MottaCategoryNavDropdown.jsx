import React, { useEffect, useRef, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { CategoryNavIcon } from "./categoryIcons";
import { useCategoryNavigation } from "./useCategoryNavigation";

function MottaCategoryNavDropdown({ categories, isLoading }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const { goToCategory } = useCategoryNavigation();

  useEffect(() => {
    const onDoc = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const list = (categories || []).filter((c) => c.status === 1);

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        className="motta-nav-link flex items-center gap-0.5 text-white"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        Categories
        <KeyboardArrowDownIcon sx={{ fontSize: 18 }} />
      </button>
      {open && (
        <div className="motta-cat-popover">
          <div className="motta-cat-popover__caret" aria-hidden />
          <div className="motta-cat-popover__panel">
            {isLoading ? (
              <div className="px-4 py-3 text-sm text-gray-600">Loading…</div>
            ) : (
              <ul className="motta-cat-list">
                {list.map((item) => (
                  <li key={item._id || item.name}>
                    <button
                      type="button"
                      className="motta-cat-list__row"
                      onClick={() => {
                        goToCategory(item);
                        setOpen(false);
                      }}
                    >
                      <span className="motta-cat-list__icon">
                        <CategoryNavIcon name={item.name} />
                      </span>
                      <span className="motta-cat-list__label">{item.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MottaCategoryNavDropdown;
