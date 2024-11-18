import { Mail, Lock, UserPen, Loader } from "lucide-react";
import { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
const LoginPage = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { signup, error, isLoading, login } = useAuthStore();
  const navigate = useNavigate();

  const handleClick = () => {
    setState(state === "Login" ? "Register" : "Login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state === "Login") {
        await login(email, password);
        navigate("/");
        toast.success("Successfull login!");
      } else {
        await signup(email, password, name);
        navigate("/");
        toast.success("Sign up completed successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex w-3/4 max-w-4xl shadow-lg ">
        {/* Left side - Sign In form */}
        <div className="md:w-1/2 w-full  bg-white p-8">
          <h2 className="text-2xl font-semibold mb-8 text-gray-600 text-center">
            {state === "Login" ? "Sign In" : "Sign Up"}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col mx-4">
            {state !== "Login" && (
              <div className="">
                <label className="mb-2 text-gray-600">Name</label>
                <div className="relative">
                  <UserPen className="absolute top-4 left-3 h-5 w-5 text-green-600" />
                  <input
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Name"
                    className="mb-4 p-3 px-10 w-full border rounded-md outline-none focus:border-pink-500"
                  />
                </div>
              </div>
            )}

            <label className="mb-2 text-gray-600">Email</label>
            <div className="relative">
              <Mail className="absolute top-4 left-3 h-5 w-5 text-green-600" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                required
                placeholder="Email"
                className="mb-4 p-3 px-10 w-full border rounded-md outline-none focus:border-pink-500"
              />
            </div>
            <label className="mb-2 text-gray-600">Password</label>
            <div className="relative">
              <Lock className="absolute top-4 left-3 h-5 w-5 text-green-600" />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                placeholder="Password"
                className="mb-4 p-3 px-10 border rounded-md outline-none focus:border-pink-500 w-full"
              />
            </div>
            {error && (
              <p className="text-red-500 font-semibold mt-2">{error}</p>
            )}
            <button
              disabled={isLoading}
              className=" bg-gradient-to-br from-slate-800 to-pink-600 hover:bg-pink-600 text-white py-2 px-4 rounded-md my-4"
            >
              {isLoading ? (
                <Loader className="animate-spin mx-auto" />
              ) : state === "Login" ? (
                "Login"
              ) : (
                "Sign Up"
              )}
            </button>
            <div className="flex items-center gap-4 justify-center">
              <div className="flex flex-grow h-0.5 w-1/4 bg-gray-300" />
              <span className="text-gray-500">or sign in with</span>
              <div className="flex flex-grow  h-0.5 w-1/4 bg-gray-300" />
            </div>
            <div className="flex mt-5 items-center gap-4 justify-center">
              <div className="w-10 h-10 flex items-center justify-center text-pink-600 border-none rounded-full hover:bg-gray-100 cursor-pointer hover:scale-105">
                <FaGoogle size={30} />
              </div>
              <div className="w-10 h-10 flex items-center justify-center  text-pink-600 border-none rounded-full hover:bg-gray-100 cursor-pointer hover:scale-105">
                <FaGithub size={30} />
              </div>
            </div>
            <div className="flex md:hidden text-gray-500 mt-4 ">
              {state === "Login" ? (
                <p>
                  Dont you have an account?{" "}
                  <span
                    onClick={() => setState("Sign Up")}
                    className="text-blue-500 cursor-pointer hover:underline"
                  >
                    Sign up
                  </span>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <span onClick={()=>setState('Login')} className="text-blue-500 cursor-pointer hover:underline">
                    Login
                  </span>
                </p>
              )}
            </div>
          </form>
        </div>

        {/* Right side - Welcome section */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-slate-800 to-pink-600 text-white p-8  flex-col items-center justify-center">
          <h2 className="text-3xl font-bold mb-2">
            <p>Welcome to</p>
            <p className="text-white font-extralight hover:text-yellow-500">
              Admin
              <span className="text-gray-200 font-bold hover:text-yellow-500">
                PANEL
              </span>
            </p>
          </h2>
          <p className="mb-6 text-gray-400">
            {state === "Login"
              ? "Do not have an account?"
              : "Already have an account?"}
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
