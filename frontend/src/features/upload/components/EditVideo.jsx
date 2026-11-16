
import { useState } from "react";
import { Input, Button } from "../../../shared/components/index.js";

function EditVideo() {
  // 1. Fixed missing states
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [thumbnailFile, setThumbnailFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", { formData, videoFile, thumbnailFile });
    // Add your upload API logic here
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-slate-100">
      {/* 2. Fixed layout height to fit contents safely */}
      <div className="p-6 w-full max-w-md bg-white rounded-xl shadow-md border border-gray-100">
        <h1 className="text-xl font-semibold text-gray-800 text-center mb-6">
          Edit Video Details
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Title Input */}
          <div>
            <Input
              type="text"
              placeholder="Title"
              className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          {/* Description Input */}
          <div>
            <Input
              type="text"
              placeholder="Description"
              className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          {/* Thumbnail Dropzone */}
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-700 antialiased">
              Select Thumbnail
            </span>
            <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition p-2">
              <span className="text-xs text-gray-500 text-center">
                {thumbnailFile ? `Selected: ${thumbnailFile.name}` : "Click to upload JPG, PNG"}
              </span>
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                className="hidden" // Hiding the ugly native button
                onChange={(e) => setThumbnailFile(e.target.files[0])}
              />
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end mt-4">
            <Button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50 transition"
              textColor="text-gray-700"
      bgColor="bg-gray-100"
              onClick={() => console.log("Cancelled")}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition"
            >
              Confirm
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditVideo;

