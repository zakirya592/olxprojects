import React, { useState } from "react";

const DescriptionWithToggle = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Define the character limit
  const characterLimit = 60;

  // Only show the "More" button if the description exceeds the character limit
  const showMore = description.length > characterLimit;

  // Slice the description to the character limit
  const truncatedDescription = description.slice(0, characterLimit);

  return (
    <div>
      {/* Display the full description if expanded, otherwise display the truncated version */}
      <p className="pe-3 mt-3 text-maincolor font-normal">
        {isExpanded || !showMore ? description : `${truncatedDescription}...`}
      </p>

      {/* Show "More" or "Show Less" button based on the state */}
      {/* {showMore && (
        <button
          className="px-3 mt-2 text-primary sm:text-sm font-semibold"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show Less" : "More"}
        </button>
      )} */}
    </div>
  );
};

export default DescriptionWithToggle;
