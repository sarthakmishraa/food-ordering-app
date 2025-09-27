import { Banner } from "../components/Banner";
import { PrimaryButton } from "../components/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { NetworkStatusEnum } from "../utils/constants";
import { LoadingScreen } from "../components/LoadingScreen";
import { useUIConfig } from "../slices/appContextSlice";
import { useAppSelector } from "../store/hooks";
import { Label } from "../components/Label";

export const Landing = () => {
  const navigate = useNavigate();

  const {
    data: appConfig,
    networkStatus: appConfigNetworkStatus,
  } = useAppSelector(useUIConfig);

  const handleGetStartedClick = () => {
    navigate("/menu");
  };

  const validTitle =
    appConfig?.appTitle && appConfig.appTitle?.length > 0;

  const validDescription =
    appConfig?.heroSectionDescription &&
    appConfig?.heroSectionDescription?.length > 0;

  const loggedIn = true;

  if (!loggedIn) return <div>Sign Up</div>;

  return (
    <div
      className={`w-full h-full flex flex-col ${
        appConfigNetworkStatus === NetworkStatusEnum.Loading
          ? "justify-center"
          : "justify-start"
      } items-center space-y-8 mt-12`}
    >
      {appConfigNetworkStatus ===
      NetworkStatusEnum.Loading ? (
        <LoadingScreen />
      ) : appConfigNetworkStatus ===
        NetworkStatusEnum.Loaded ? (
        <>
          {validTitle && (
            <Banner
              label={`Welcome to ${appConfig?.appTitle}`}
            />
          )}
          {validDescription && (
            <Label
              text={`${appConfig.heroSectionDescription}`}
              className="text-center lg:w-[640px] text-sm font-normal leading-snug tracking-normal"
            />
          )}
          <PrimaryButton
            text="Get Started"
            onClick={handleGetStartedClick}
          />
        </>
      ) : null}
    </div>
  );
};
