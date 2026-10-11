import { Container, Input, Button } from "../../../shared/components/index.js";
import { Globe, Lock } from "lucide-react";
import { CustomSelect } from "../../../shared/components/CustomSelect.jsx";

function CreatePlaylist() {
  return (
    <Container className="flex bg-black/24 z-10 fixed inset-0 justify-center items-center">
      <div className="border bg-white rounded-4xl">

        <div className=" rounded-t-4xl w-full pb-2 px-6 pt-6">
          <div className="text-xl font-bold">New playlist</div>
        </div>

        <div className="rounded-b-4xl pb-6">
          <div className="py-3">
            <div className="px-6">
              <div className="flex flex-col gap-3 ">
                <Input
                  label="Title"
                  className="border border-gray-300 h-15 text-wrap rounded-lg focus:outline-none focus:ring"
                  placeholder="Choose a title"
                />
                <div>
                  <CustomSelect />
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 pt-4">
            <div className="w-full">
              <div className="flex right-0 gap-2">
                <Button
                  type="submit"
                  bgColor="bg-[#ffffff1A]"
                  textColor="text-black"
                  className="w-20 h-11 flex border border-gray-300 active:bg-gray-300 justify-center items-center"
                >
                  <h4>Cancel</h4>
                </Button>

                <Button
                  type="submit"
                  bgColor="bg-[#ffffff1A]"
                  textColor="text-black"
                  className="w-20 h-11 bg-gray-100 text-gray-500 active:bg-black active:text-white flex justify-center items-center"
                >
                  <h4>Create</h4>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default CreatePlaylist;
