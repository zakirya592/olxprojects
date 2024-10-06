import React, { useState, useEffect } from "react";

const DescriptionWithToggle = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [characterLimit, setCharacterLimit] = useState(60); // Default limit for larger screens

  // Update character limit based on window size
  useEffect(() => {
    const updateCharacterLimit = () => {
      // Set character limit based on screen width
      setCharacterLimit(window.innerWidth < 640 ? 30 : 60); // 640px is Tailwind's "sm" breakpoint
    };

    // Set initial limit
    updateCharacterLimit();

    // Add event listener for window resize
    window.addEventListener("resize", updateCharacterLimit);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", updateCharacterLimit);
    };
  }, []);

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
