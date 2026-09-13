import logo from "../assets/logo.svg";
import { Compass, Mic } from "lucide-react";
import { Container, Input } from "./index.js";

function SearchBar() {
  return (
    <div className="w-full h-52 flex flex-col items-center gap-2 px-4 py-11 ">
      <div className="flex justify-center items-center -mb-2 w-full">
        <img
          src={logo}
          alt="Company Logo"
          width="80"
          style={{
            filter:
              "invert(31%) sepia(94%) saturate(7191%) hue-rotate(357deg) brightness(105%) contrast(128%)",
          }}
        />
      </div>
      <Container className="w-full flex items-center justify-center gap-2 ">
        <div className="flex flex-row items-center justify-evenly">
          <Compass className="bg-[#F2F2F2] rounded-full p-2" size={40} />
        </div>
        <div className="flex-1">
          <Input lable="Search Youtube" className="w-full" />
        </div>
        <div className="flex items-center justify-center">
          <Mic className="bg-[#F2F2F2] rounded-full p-2" size={40} />
        </div>
      </Container>
    </div>
  );
}

export default SearchBar;
