import {
  Container,
  Input,
  Button,
  Logo,
} from "../../../shared/components/index.js";
import { Link } from "react-router-dom";

import { useState } from "react";
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
    <Container className="h-full flex items-center justify-center bg-gray-100 bg-linear-65 from-violet-500 to-fuchsia-500">
      <div className="flex flex-col my-4 rounded-lg items-center justify-center p-6 w-2xl bg-white">
        <div className="w-full h-full">
          <div className="border-b-2 border-gray-200 py-2">
            <h1 className="text-2xl font-normal antialiased text-center">
              Create an account
            </h1>
          </div>

          <div className="mt-4">
            {error && (
              <div className="text-red-500 text-sm mb-2 text-center bg-red-100 rounded-md h-8 flex items-center justify-center">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="w-full ">
                <FullNameAndEmailField
                  formData={formData}
                  setFormData={setFormData}
                />
                <UsernameAndPasswordField
                  formData={formData}
                  setFormData={setFormData}
                />
                <UploadAvatarAndCoverField
                  setAvatar={setAvatar}
                  setCoverImage={setCoverImage}
                />

                <div className="flex flex-row w-full justify-between h-10 mt-16 ">
                  <div className="">
                    <Link
                      to="/signin"
                      className="px-2 h-full w-24 bg-gray-200 rounded-full"
                    >
                      Sign Up
                    </Link>
                  </div>

                  <div className="">
                    <Button type="submit" className="px-2 h-full w-24">
                      Create
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
}

function FullNameAndEmailField({ formData, setFormData }) {
  return (
    <div>
      <div>
        <div>
          <p className="text-base text-[#1f1f1f] antialiased">
            Enter your name
          </p>
        </div>
        <div className="mt-4">
          <Input
            type="text"
            placeholder="Full name"
            className="ring rounded-md"
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
          />
        </div>
      </div>

      <div className="flex flex-col my-4 ">
        <div>
          <p className="text-base text-[#1f1f1f] mb-4 antialiased">
            Enter your email
          </p>
        </div>
        <Input
          type="email"
          placeholder="Email"
          className="ring rounded-md"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
    </div>
  );
}

function UsernameAndPasswordField({ formData, setFormData }) {
  return (
    <div>
      <div>
        <div>
          <p className="text-base text-[#1f1f1f] mb-4 antialiased">
            Set Username
          </p>
        </div>
        <Input
          type="text"
          placeholder="Username"
          className="ring rounded-md"
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
      </div>
      <div className="flex flex-col my-4 ">
        <div>
          <p className="text-base text-[#1f1f1f] mb-4 antialiased">
            Set Password
          </p>
        </div>
        <input
          type="password"
          placeholder="Password"
          className="ring rounded-md h-10 pl-3 text-sm"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
      </div>
    </div>
  );
}

function UploadAvatarAndCoverField({ setAvatar, setCoverImage }) {
  return (
    <div>
      <div className="flex flex-col my-4 ">
        <div>
          <p className="text-base text-[#1f1f1f] mb-4 antialiased">
            Upload Avatar
          </p>
        </div>
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          className="rounded-xs border-1 border-dashed h-26 text-center"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </div>
      <div className="flex flex-col my-4 ">
        <div>
          <p className="text-base text-[#1f1f1f] mb-4 antialiased">
            Upload Cover Image ( Optional )
          </p>
        </div>
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          className="rounded-md border-1 border-dashed h-26 text-center"
          onChange={(e) => setCoverImage(e.target.files[0])}
        />
      </div>
    </div>
  );
}

export default CreateAccount;
