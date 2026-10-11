import { Container } from "../../../shared/components/index.js";
import { ArrowLeft, Search, EllipsisVertical } from "lucide-react";
import history from "../../../assets/siente_dance.jpeg";

function History() {
  return (
    <Container>
      <div className="flex justify-between items-center gap-2 p-4">
        <div className="flex items-center gap-2 ">
          <ArrowLeft />
          <div>
            <h3> History </h3>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Search />
          <EllipsisVertical />
        </div>
      </div>

      <div className="gap-4 p-4">
        <h1> History </h1>
      </div>

      <div>
        <div className="p-4">
          <h3 className="text-base font-normal"> Date </h3>
        </div>
        <div className="flex flex-row px-3">
          <img src={history} alt="history" className="w-40 rounded-lg" />
          <div className="px-2">
            <h4>15 Books That Helped Make Me My First Million</h4>
            <p className="text-xs text-gray-600"> Channel Name</p>
            <p className="text-xs text-gray-600"> views </p>
          </div>
          <div>
            <EllipsisVertical className="h-full pb-8" size={24} />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default History;
