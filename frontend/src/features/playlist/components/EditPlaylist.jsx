import { Container, Input, Button } from "../../../shared/components/index.js";
import { Globe, Lock } from "lucide-react";
import { CustomSelect } from "../../../shared/components/CustomSelect.jsx";
import usePlaylist from "../hooks/usePlaylist.js";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditPlaylist({playlist, onClose }) {
  const { updatePlaylist, isLoading } = usePlaylist();
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (playlist) {
      setFormData({
        name: playlist.name || "",
        description: playlist.description || "",
      });
    }
  }, [playlist]);

  const isFilled = Boolean(formData.name.trim() && formData.description.trim());

  function handleCancel() {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isFilled) {
      alert("Please fill all fields ");
      return;
    }

    const res = await updatePlaylist(playlistId, {
      name: formData.name.trim(),
      description: formData.description.trim(),
    });

    if (res?.success) {
      if (onClose) {
        onClose();
      } else {
        navigate(`/playlist/${playlistId}`);
      }
    }
  }
  return (
    <Container className="flex bg-black/24 z-20 fixed inset-0 justify-center items-center">
      <div className=" bg-white rounded-4xl">
        <div className=" rounded-t-4xl w-full pb-2 px-6 pt-6">
          <div className="text-xl font-bold">Edit</div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-b-4xl pb-6">
          <div className="py-3">
            <div className=" px-6">
              <div className=" flex flex-col gap-3 ">
                <div className="border border-gray-200 rounded-lg">
                  <input
                    value={formData.name}
                    className="outline-none p-4 m-0"
                    placeholder="Title"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <Input
                  label="Description"
                  value={formData.description}
                  className="border border-gray-300  text-wrap rounded-lg focus:outline-none focus:ring"
                  placeholder="Add description"
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className="px-6 pt-4">
            <div className="w-full">
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  onClick={handleCancel}
                  bgColor="bg-white hover:bg-gray-200 active:bg-gray-300"
                  textColor="text-black"
                  className="w-20 h-11 flex border border-gray-200 justify-center items-center"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={!isFilled}
                  bgColor={
                    isFilled
                      ? "bg-black cursor-pointer "
                      : "bg-gray-100 cursor-default"
                  }
                  textColor={isFilled ? "text-white" : "text-gray-400"}
                  className="w-20 h-11 flex justify-center items-center "
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default EditPlaylist;
export { EditPlaylist };
