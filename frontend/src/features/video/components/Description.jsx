function Description({ uploadDate, views, description }) {
  return (
    <div className="mt-2 p-3 rounded-lg bg-gray-100">
      {/* Views and Date row */}
      <div className=" font-semibold text-sm mb-1">
        {`${views} ${uploadDate}`}
      </div>

      {/* Description text with pre-line to respect original formatting */}
      <div className="text-sm whitespace-pre-line line-clamp-4 active:line-clamp-none">
        {description}
      </div>
    </div>
  );
}

export { Description };
