import { ArrowLeft, Search, EllipsisVertical } from "lucide-react";
import { Button, TouchFeedback } from "../components/index.js";
import MobileTopbarBackArrow from "./MobileTopbarBackArrow.jsx";
import { AttributedStringHost } from "../../features/playlist/components/PlaylistDialogBox.jsx";

function MobileTopbarHeader({children, className}) {
  return (
    <div className={`flex bg-white justify-between h-12 items-center ${className}`}>
      <MobileTopbarBackArrow></MobileTopbarBackArrow>
        <AttributedStringHost className="text-lg font-bold w-full">
      {children}
      </AttributedStringHost>

      <Button bgColor="bg-transparent" textColor="text-black" className="w-12 h-12 rounded-none flex justify-center items-center flex-none">
      <Search  />
      </Button>
      <TouchFeedback> <EllipsisVertical />  </TouchFeedback>
    </div>
  );
}

export { MobileTopbarHeader };
export default MobileTopbarHeader;
