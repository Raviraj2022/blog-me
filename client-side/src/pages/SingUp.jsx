import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

const SingUp = () => {
  return (
    <div className="min-h-screen mt-20">
      <div className=" flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left side */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl text-white">
              Ravi
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            Your answer could be improved with additional supporting
            information. Please edit to add further details, such as citations
            or documentation, so that others can confirm that your answer is
            correct. You can find more information on how to write good answers
          </p>
        </div>
        {/* right side */}
        <div className="flex-1 ">
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Your Username" />
              <TextInput type="text" placeholder="Username" id="username" />
            </div>
            <div>
              <Label value="Your Email" />
              <TextInput type="text" placeholder="Email" id="email" />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput type="text" placeholder="Password" id="password" />
            </div>
            <Button gradientDuoTone="purpleToPink">Sign Up</Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/signIn" className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingUp;
