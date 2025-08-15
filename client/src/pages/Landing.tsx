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

  const loggedIn = true;

  if (!loggedIn) return <div>Sign Up</div>;

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
    </div>
  );
};
