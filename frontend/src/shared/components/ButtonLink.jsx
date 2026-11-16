import { Link } from "react-router-dom";

export function ButtonLink({ children, className ,textColor = "text-[#0b57d0]", bgColor, to, ...props }) {
  return (
    <Link
      to={to}
      className={`flex justify-center items-center text-md p-2 rounded-full ${className} ${textColor} ${bgColor}`}
    >
      {children}
    </Link>
  );
}
