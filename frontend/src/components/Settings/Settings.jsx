import { Container } from "../index.js";
import { ArrowLeft, Palette, LogOut } from "lucide-react";

function Settings() {
  return (
    <Container>
      <div className="flex items-center gap-2 p-4">
        <ArrowLeft />
        <div>
          <h3> Settings </h3>
        </div>
      </div>
      <div className="flex items-center gap-2 p-4">
        <Palette />
        <div>
          <p> Appearance </p>
        </div>
      </div>
      <div className='flex items-center gap-2 p-4'>
        <LogOut />
        <div>Sign out</div>
      </div>
    </Container>
  );
}

export default Settings;
