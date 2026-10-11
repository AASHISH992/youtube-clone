import React from "react";
import { ChevronDown } from "lucide-react";
import Container from "./Container.jsx";
import BottomSheet, { VISIBILITY_OPTIONS } from "./BottomSheet.jsx";

function CustomSelect() {
  return (
    <Container className="border border-gray-300 active:bg-blue-500/24 rounded-lg px-3 py-2">
      <div className="w-full flex items-start">
        <div className="flex h-full flex-col w-full items-start">
          <div className="w-full h-full flex items-start ">
            <span className="text-xs py-1 h-full text-gray-600">
              Visibility
            </span>
          </div>
          <div className="w-full items-start flex">
            <span className="">Private</span>
          </div>
        </div>
        <div className="my-3">
          <ChevronDown className="" />
        </div>
      </div>
    </Container>
  );
}

export { CustomSelect, BottomSheet, VISIBILITY_OPTIONS };
export default CustomSelect;
