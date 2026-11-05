import { ThumbsDown } from "lucide-react";
import {
  AttributedStringHost,
  AttributedStringWhiteSpacePreWrap,
} from "../../../shared/components/index.js";

function DislikeButton({
  className = "size-8 hover:bg-gray-200 p-1 rounded-full",
}) {
  return (
      <div className={`flex justify-center items-center ${className}`}>
        <ThumbsDown className="p-0.5" />
      </div>
  );
}

export { DislikeButton };

