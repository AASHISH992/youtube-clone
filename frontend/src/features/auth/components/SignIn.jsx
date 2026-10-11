import {
  Container,
  Input,
  Button,
  Logo,
    ButtonLink,
} from "../../../shared/components/index.js";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth.js";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isSubmitting, error } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill all the fields");
      return;
    }

    const identifier = formData.email.trim();

    const credentials = {
      username: identifier,
      email: identifier,
      password: formData.password,
    };

    await login(credentials);
  }

  return (
    <Container className="flex p-4 h-full w-full justify-center items-center bg-gray-200">
      <div className="flex flex-col md:w-2xl w-xs bg-white rounded-lg p-3">
        <Logo />
        <div className="flex flex-col">
          <h1 className="text-2xl font-normal antialiased my-4"> Sign in </h1>
          <p className="text-base text-[#1f1f1f] antialiased">
            to continue to Youtube
          </p>
        </div>

        {error && (
          <div className="text-red-500 text-sm mb-2 text-center bg-red-100 rounded-md h-8 flex items-center justify-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="m-4 p-4">
            <Input
              placeholder="Email or username"
              className="rounded-md ring mb-4"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <Input
              placeholder="Enter your password"
              className="rounded-md ring"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <div className="flex  justify-between items-center h-10">
            <ButtonLink
              to='/register'
              className="w-xs text-[#0b57d0] bg-white active:bg-[#3c78d940] transition-discrete"
            >
              Create account
            </ButtonLink>

            <Button type="submit" className="text-md p-2 w-xs">
              Login
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}
