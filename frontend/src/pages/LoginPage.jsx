import { Mail, Lock, UserPen } from "lucide-react";
import { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
const LoginPage = () => {
  const [state, setState] = useState("Login");

  const handleClick = () => {
    setState(state === "Login" ? "Register" : "Login");
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex w-3/4 max-w-4xl shadow-lg">
        {/* Left side - Sign In form */}
        <div className="w-1/2 bg-white p-8">
          <h2 className="text-2xl font-semibold mb-8">
            {state === "Login" ? "Sign In" : "Sign Up"}
          </h2>
          <form className="flex flex-col mx-4">
            {state === "Login" && (
              <div className="">
                <label className="mb-2 text-gray-600">Name</label>
                <div className="relative">
                  <UserPen className="absolute top-4 left-2 h-5 w-5 text-info" />
                  <input
                    type="text"
                    placeholder="Name"
                    className="mb-4 p-3 px-10 w-full border rounded-md outline-none focus:border-pink-500"
                  />
                </div>
              </div>
            )}

            <label className="mb-2 text-gray-600">Email</label>
            <div className="relative">
              <Mail className="absolute top-4 left-2 h-5 w-5 text-info" />
              <input
                type="text"
                placeholder="Email"
                className="mb-4 p-3 px-10 w-full border rounded-md outline-none focus:border-pink-500"
              />
            </div>
            <label className="mb-2 text-gray-600">Password</label>
            <div className="relative">
              <Lock className="absolute top-4 left-2 h-5 w-5 text-info" />
              <input
                type="text"
                placeholder="Email"
                className="mb-4 p-3 px-10 border rounded-md outline-none focus:border-pink-500 w-full"
              />
            </div>
            <button className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-md my-4">
              Email
            </button>
            <div className="flex items-center gap-4 justify-center">
              <div className="flex flex-grow h-0.5 w-1/4 bg-gray-300" />
              <span>or sign in with</span>
              <div className="flex flex-grow  h-0.5 w-1/4 bg-gray-300" />
            </div>
            <div className="flex mt-5 items-center gap-4 justify-center">
              <div className="w-10 h-10 flex items-center justify-center text-pink-600 border-none rounded-full hover:bg-gray-100 cursor-pointer hover:scale-105">
                <FaGoogle size={30}  />
              </div>
              <div className="w-10 h-10 flex items-center justify-center  text-pink-600 border-none rounded-full hover:bg-gray-100 cursor-pointer hover:scale-105">
                <FaGithub size={30}  />
              </div>
            </div>
          </form>
        </div>

        {/* Right side - Welcome section */}
        <div className="w-1/2 bg-gradient-to-br from-pink-400 to-pink-600 text-white p-8 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold mb-2">
            {state === "Login" ? "Welcome to login" : "Welcome to sign up"}
          </h2>
          <p className="mb-6">
            {state === "Login"
              ? "Do not have an account?"
              : "Already hace an account?"}
          </p>
          <button
            onClick={handleClick}
            className="border-2 border-none py-2 px-4 rounded-full w-[100px] hover:bg-white ring-1 ring-white hover:text-pink-600 transition"
          >
            {state === "Login" ? "Sign Up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
