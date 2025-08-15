import appConfig from "../../../appConfig.json";
import { Banner } from "../components/Banner";
import { PrimaryButton } from "../components/PrimaryButton";
import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/menu");
  };

  const validTitle =
    appConfig.appTitle && appConfig.appTitle?.length > 0;
  return (
    <div className="w-full flex flex-col items-center justify-center space-y-8">
      {validTitle && (
        <Banner
          label={`Welcome to ${appConfig.appTitle}`}
        />
      )}
      <PrimaryButton
        text="Get Started"
        onClick={handleGetStartedClick}
      />
      <div className="flex justify-center items-center h-[148px] w-full border text-4xl">
        1
      </div>
      <div className="flex justify-center items-center h-[148px] w-full border text-4xl">
        2
      </div>
      <div className="flex justify-center items-center h-[148px] w-full border text-4xl">
        3
      </div>
      <div className="flex justify-center items-center h-[148px] w-full border text-4xl">
        4
      </div>
      <div className="flex justify-center items-center h-[148px] w-full border text-4xl">
        5
      </div>
      <div className="flex justify-center items-center h-[148px] w-full border text-4xl">
        6
      </div>
    </div>
  );
};
