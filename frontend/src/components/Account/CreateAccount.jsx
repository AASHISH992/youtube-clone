import { Container, Input, Button } from "../index.js";

function CreateAccount() {
  return (
    <Container className="flex flex-col m-4">
import Logo from "../components/Logo";
      <div>
        <h1 className="text-2xl font-normal antialiased my-4">
          {" "}
          Create an account{" "}
        </h1>
      </div>
      <div>
        <p className="text-base text-[#1f1f1f] antialiased">Enter your name</p>
      </div>
      <div className="my-4">
        <Input
          type="text"
          placeholder="Full name"
          className="ring rounded-md mb-8"
        />
      <div>
        <p className="text-base text-[#1f1f1f] mb-4 antialiased">Enter your username</p>
      </div>
        <Input
          type="text"
          placeholder="Username"
          className="ring rounded-md"
        />
      </div>

      <div className="flex flex-col my-4 ">
      <div>
        <p className="text-base text-[#1f1f1f] mb-4 antialiased">Enter your email</p>
      </div>
        <Input
          type="email"
          placeholder="Email"
          className="ring rounded-md"
        />
      </div>

      <div className="flex flex-col my-4 ">
      <div>
        <p className="text-base text-[#1f1f1f] mb-4 antialiased">Create Password </p>
      </div>
        <Input
          type="password"
          placeholder="Enter your Password"
          className="ring rounded-md"
        />
      </div>



      <div className="flex flex-col my-4 ">
      <div>
        <p className="text-base text-[#1f1f1f] mb-4 antialiased">Upload your avatar</p>
      </div>
        <Input
          type="file"
          accept='.jpg, .jpeg, .png'
          className="ring rounded-md"
        />
      </div>

      <div className="flex flex-col my-4 ">
      <div>
        <p className="text-base text-[#1f1f1f] mb-4 antialiased">Upload your cover image (optional) </p>
      </div>
        <Input
          type="file"
          accept='.jpg, .jpeg, .png'
          className="ring rounded-md"
        />
      </div>
      <div className="flex justify-between items-end">
        <Button className=''>Next</Button>
      </div>
    </Container>
  );
}

export default CreateAccount;
