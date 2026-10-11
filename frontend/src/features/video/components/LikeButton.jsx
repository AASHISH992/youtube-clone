import { ThumbsUp, ThumbsDown } from "lucide-react";
import {
  AttributedStringHost,
  AttributedStringWhiteSpacePreWrap,
} from "../../../shared/components/index.js";

function LikeButton({
  className = "size-8 hover:bg-gray-200 p-1 rounded-full",
}) {
  return (
    <div className="h-full">
        <div className={`${className}`}>
          <ThumbsUp className='p-0.5'/>
        </div>
    </div>
  );
}



export { LikeButton };
