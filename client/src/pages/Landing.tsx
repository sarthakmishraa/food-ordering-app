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

  const handleAskGustoClick = () => {
    navigate("/gusto");
  };
  const validTitle =
    appConfig?.appTitle && appConfig.appTitle?.length > 0;

  const validDescription =
    appConfig?.hero?.description &&
    appConfig?.hero?.description?.length > 0;

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
              label={`${appConfig?.hero?.title}`}
              labelClassNames="text-xl sm:!text-2xl md:!text-3xl lg:!text-4xl xl:!text-5xl"
            />
          )}
          {validDescription && (
            <Label
              text={`${appConfig.hero.description}`}
              className="sm:px-6 lg:px-36 text-sm sm:text-lg lg:text-xl text-center font-normal leading-snug tracking-normal"
            />
          )}
          <div className="flex justify-around items-center space-x-4">
            <PrimaryButton
              text="Get Started"
              onClick={handleGetStartedClick}
            />
            <PrimaryButton
              text="Ask Gusto"
              onClick={handleAskGustoClick}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};
