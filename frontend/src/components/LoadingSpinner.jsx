import { Loader } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex h-screen items-center justify-center gap-4">
      <Loader size={40} className="animate-spin" />{" "}
      <span className="text-semibold text-2xl text-gray-600">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
