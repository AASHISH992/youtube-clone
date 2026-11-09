import { useState } from "react";

function Description({ uploadDate, views, description }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-2 p-3 rounded-lg bg-gray-100">
      {/* Views and Date row */}
      <div className=" font-semibold text-sm mb-1">
        {`${views} ${uploadDate}`}
      </div>

      {/* Description text with pre-line to respect original formatting */}
      <div
        className={`text-sm whitespace-pre-line ${isExpanded ? "line-clamp-none" : "line-clamp-4"}`}
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        {description}
      </div>
      <button
        type="button"
        className="font-semibold text-sm text-black mt-1 hover:underline block"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        {isExpanded ? "Show less" : "more"}
      </button>
    </div>
  );
}

export { Description };
