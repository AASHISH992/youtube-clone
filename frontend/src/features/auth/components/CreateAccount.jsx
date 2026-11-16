import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Input,
  Button,
  Logo,
} from "../../../shared/components/index.js";
import { useAuth } from "../hooks/useAuth.js";

function CreateAccount() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const { register, isSubmitting, error } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.username ||
      !formData.password
    ) {
      alert("Please fill all the fields");
      return;
    }

    if (!avatar) {
      alert("Avatar image is required");
      return;
    }

    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("email", formData.email);
    data.append("username", formData.username);
    data.append("password", formData.password);
    data.append("avatar", avatar);
    if (coverImage) {
      data.append("coverImage", coverImage);
    }

    await register(data);
  }

  return (
    <Container className="min-h-screen py-10 flex items-center justify-center bg-gradient-to-tr from-violet-500 to-fuchsia-500 px-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl overflow-hidden p-6 md:p-8">
        {/* Header Section */}
        <div className="border-b border-gray-100 pb-4 mb-6 flex flex-col items-center gap-2">
          {/* Logo can be un-commented if needed */}
          {/* <Logo className="h-8 w-auto" /> */}
          <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
            Create an Account
          </h1>
          <p className="text-sm text-gray-500">Join us by filling out the details below</p>
        </div>

        {error && (
          <div className="text-red-600 text-sm mb-4 text-center bg-red-50 border border-red-200 rounded-lg py-2.5 px-4 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Responsive Responsive Grid Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">

            {/* Left Column: Text Data Inputs */}
            <div className="space-y-4">
              <FullNameAndEmailField
                formData={formData}
                setFormData={setFormData}
              />
              <UsernameAndPasswordField
                formData={formData}
                setFormData={setFormData}
              />
            </div>

            {/* Right Column: File Attachments */}
            <div className="space-y-4">
              <UploadAvatarAndCoverField
                avatar={avatar}
                setAvatar={setAvatar}
                coverImage={coverImage}
                setCoverImage={setCoverImage}
              />
            </div>

          </div>

          {/* Form Actions Footer */}
          <div className="flex flex-row w-full justify-between items-center pt-4 border-t border-gray-100">
            <Link
              to="/signin"
              className="text-sm font-medium text-gray-600 hover:text-violet-600 transition"
            >
              Already have an account? Sign In
            </Link>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-violet-600 text-white rounded-lg font-medium hover:bg-violet-700 active:bg-violet-800 transition shadow-sm disabled:opacity-50"
            >
              {isSubmitting ? "Creating..." : "Register"}
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}

function FullNameAndEmailField({ formData, setFormData }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <Input
          type="text"
          placeholder="John Doe"
          value={formData.fullName}
          className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition text-sm"
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <Input
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition text-sm"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
    </div>
  );
}

function UsernameAndPasswordField({ formData, setFormData }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Username
        </label>
        <Input
          type="text"
          placeholder="johndoe123"
          value={formData.username}
          className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition text-sm"
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          placeholder="••••••••"
          value={formData.password}
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
      </div>
    </div>
  );
}

function UploadAvatarAndCoverField({ avatar, setAvatar, coverImage, setCoverImage }) {
  return (
    <div className="space-y-4">
      {/* Avatar File Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload Avatar <span className="text-red-500">*</span>
        </label>
        <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition p-3">
          <div className="text-center">
            <p className="text-xs text-gray-600 font-medium truncate max-w-[280px]">
              {avatar ? `✅ Selected: ${avatar.name}` : "Click to select avatar image"}
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5">PNG, JPG, JPEG up to 5MB</p>
          </div>
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            className="hidden"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </label>
      </div>

      {/* Cover Image File Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload Cover Image <span className="text-gray-400 font-normal">(Optional)</span>
        </label>
        <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition p-3">
          <div className="text-center">
            <p className="text-xs text-gray-600 font-medium truncate max-w-[280px]">
              {coverImage ? `✅ Selected: ${coverImage.name}` : "Click to select banner image"}
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5">PNG, JPG, JPEG banner orientation</p>
          </div>
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            className="hidden"
            onChange={(e) => setCoverImage(e.target.files[0])}
          />
        </label>
      </div>
    </div>
  );
}

export default CreateAccount;

