function BadgeShape({ children }) {
  return (
    <div className="text-xs font-medium px-2 py-3 flex justify-center items-center ">
      {children}
    </div>
  );
}

function BadgeShapeText({ children }) {
  return (
    <div className=" bg-black/80 text-white absolute text-xs font-medium px-2 py-0.5 rounded-md ">
      {children}
    </div>
  );
}

export { BadgeShape, BadgeShapeText };
