import { X, Check} from "lucide-react";
import { Container } from '../index.js'

function Appearance() {
  return (
    <Container>
      <div className="flex border-b-2 border-gray-300 items-center gap-2 p-4">
        <X />
        <p> Appearance </p>
      </div>
      <div className="flex items-center gap-2 p-4">
        <p>Dark theme</p>
      </div>
      <div className="flex justify-between items-center gap-2 p-4">
        <p>Light theme</p>
      <Check />
      </div>
    </Container>
  );
}

export default Appearance;
