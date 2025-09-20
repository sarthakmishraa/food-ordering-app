import { Loader } from "./Loader";

export const LoadingScreen = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center space-y-4">
      <div className="flex justify-center items-center">
        <Loader size={32} />
      </div>
      <div className="text-xl">Loading...</div>
    </div>
  );
};
