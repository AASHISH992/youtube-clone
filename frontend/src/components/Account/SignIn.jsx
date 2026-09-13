import { Container, Input, Button, Logo } from "../index.js";

export default function SignIn() {
  return (
    <Container className="flex flex-col p-4">
      <Logo />
      <div className="flex flex-col">
        <h1 className="text-2xl font-normal antialiased my-4"> Sign in </h1>
        <p className="text-base text-[#1f1f1f] antialiased">
          {" "}
          to continue to Youtube{" "}
        </p>
      </div>
      <form>
        <div className="m-4 p-4">
          <Input
            placeholder="Email or username"
            className="rounded-md ring mb-4"
          />
          <Input
            placeholder="Enter your password"
            className="rounded-md ring"
          />
        </div>
        <div className="flex  justify-between items-center">
          <Button
            type="submit"
            value="Sign in"
            bgColor="bg-white active:bg-[#3c78d940] transition-discrete"
            textColor="text-[#0b57d0]"
            className="w-32 text-sm"
          >
            Create account
          </Button>

          <Button className="text-sm">Next</Button>
        </div>
      </form>
    </Container>
  );
}
