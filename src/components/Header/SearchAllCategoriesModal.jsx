import React from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useCategoryNavigation } from "./useCategoryNavigation";

function splitIntoColumns(items, cols = 3) {
  const sorted = [...items].sort((a, b) =>
    (a.name || "").localeCompare(b.name || "")
  );
  const out = Array.from({ length: cols }, () => []);
  sorted.forEach((it, i) => {
    out[i % cols].push(it);
  });
  return out;
}

function SearchAllCategoriesModal({ open, onClose, categories, isLoading }) {
  const navigate = useNavigate();
  const { goToCategory } = useCategoryNavigation();
  const list = (categories || []).filter((c) => c.status === 1);
  const columns = splitIntoColumns(list, 3);

  const handlePick = (item) => {
    goToCategory(item);
    onClose();
  };

  const handleAll = () => {
    navigate("/");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        className: "motta-search-modal-paper",
        sx: { borderRadius: "12px" },
      }}
    >
      <div className="motta-search-modal">
        <div className="motta-search-modal__head">
          <h2 className="motta-search-modal__title">Select Categories</h2>
          <IconButton onClick={onClose} size="small" aria-label="Close">
            <CloseIcon />
          </IconButton>
        </div>
        {isLoading ? (
          <p className="px-4 py-6 text-gray-600">Loading…</p>
        ) : (
          <div className="motta-search-modal__grid">
            {columns.map((col, ci) => (
              <ul key={ci} className="motta-search-modal__col">
                {col.map((item) => (
                  <li key={item._id || item.name}>
                    <button
                      type="button"
                      className="motta-search-modal__link"
                      onClick={() => handlePick(item)}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
                {ci === 2 && (
                  <li>
                    <button
                      type="button"
                      className="motta-search-modal__link motta-search-modal__link--all"
                      onClick={handleAll}
                    >
                      All
                    </button>
                  </li>
                )}
              </ul>
            ))}
          </div>
        )}
      </div>
    </Dialog>
  );
}

export default SearchAllCategoriesModal;
