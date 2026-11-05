import { ThumbsUp } from "lucide-react";
import {
  AttributedStringHost,
  AttributedStringWhiteSpacePreWrap,
  TouchFeedback,
} from "../../../shared/components/index.js";

function LikeButton({
  className = "size-8 hover:bg-gray-200 p-1 rounded-full",
  isLiked,
  likeCount,
  isTouchFeedback = true,
}) {
  return (
    <div className="flex items-center justify-center h-full">
      <div className={`flex items-center justify-center ${className}`}>
        {isTouchFeedback ? (
          <TouchFeedback>
            <ThumbsUp className={`${isLiked ? "fill-black" : ""} p-0.5`} />
          </TouchFeedback>
        ) : (
          <ThumbsUp className={`${isLiked ? "fill-black" : ""} p-0.5`} />
        )}
      </div>
      <AttributedStringHost>
        <AttributedStringWhiteSpacePreWrap>
          <p className="text-gray-500 text-sm font-medium antialiased h-full flex justify-center ">
            {likeCount !== undefined ? likeCount : ""}
          </p>
        </AttributedStringWhiteSpacePreWrap>
      </AttributedStringHost>
    </div>
  );
}

export { LikeButton };
