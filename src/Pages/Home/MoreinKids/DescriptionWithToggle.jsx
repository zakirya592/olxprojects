import React, { useState } from "react";

const DescriptionWithToggle = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const words = description.split(" ");
  const showMore = words.length > 20;
  const truncatedDescription = words.slice(0, 20).join(" ");

  return (
    <div>
      <p className="px-3 mt-3 text-detailscolor font-normal">
        {isExpanded || !showMore ? description : `${truncatedDescription}...`}
      </p>
      {showMore && (
        <button
          className="px-3 mt-2 text-primary font-semibold"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show Less" : "More"}
        </button>
      )}
    </div>
  );
};

export default DescriptionWithToggle;
