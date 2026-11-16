import { useState } from "react";
import { Input, Button } from "../../../shared/components/index.js";
import { useUpload } from "../hooks/useUpload.js";
import { useNavigate } from "react-router-dom";

function Upload() {
  const { upload, isSubmitting: isUploading, error: uploadError } = useUpload();
  // 1. Fixed missing states
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [videoFile, setVideoFile] = useState(null); // Changed 'setAvatar' to a more explicit name
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      alert("Please fill all the fields");
      return;
    }

    if (!videoFile || !thumbnailFile) {
      alert("Video and thumbnail are required");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("videoFile", videoFile);
    data.append("thumbnail", thumbnailFile);

    const result = await upload(data);
    if (result?.success) {
      alert("Video uploaded successfully");
      navigate("/");
    }
  }

  return (
    <div className="fixed flex items-center justify-center w-full h-screen bg-black/50 z-10">
      {/* 2. Fixed layout height to fit contents safely */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="p-6 w-full max-w-md bg-white rounded-xl shadow-md border border-gray-100"
      >
        <h1 className="text-xl font-semibold text-gray-800 text-center mb-6">
          Publish Video
        </h1>
        {uploadError && (
          <p className="text-red-500 text-center">{uploadError}</p>
        )}

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

          {/* Video Dropzone */}
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-700 antialiased">
              Select Video File
            </span>
            <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition p-2">
              <span className="text-xs text-gray-500 text-center">
                {videoFile
                  ? `Selected: ${videoFile.name}`
                  : "Click to upload MP4, MOV, etc."}
              </span>
              <input
                type="file"
                accept="video/*"
                className="hidden" // Hiding the ugly native button
                onChange={(e) => setVideoFile(e.target.files[0])}
              />
            </label>
          </div>

          {/* Thumbnail Dropzone */}
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-700 antialiased">
              Select Thumbnail
            </span>
            <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition p-2">
              <span className="text-xs text-gray-500 text-center">
                {thumbnailFile
                  ? `Selected: ${thumbnailFile.name}`
                  : "Click to upload JPG, PNG"}
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
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>

            <Button
              disabled={isUploading}
              type="submit"
              className={`px-5 py-2 text-sm font-medium text-white  rounded-full  transition ${isUploading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {isUploading ? "Uploading..." : "Publish"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Upload;
