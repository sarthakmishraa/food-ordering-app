import { useNavigate } from "react-router-dom";
import { LoadingScreen } from "../components/LoadingScreen";
import { HeroSection } from "../components/landing/HeroSection";
import { CategoryPills } from "../components/landing/CategoryPills";
import { FeatureGrid } from "../components/landing/FeatureGrid";
import { StatsSection } from "../components/landing/StatsSection";
import { BottomCTA } from "../components/landing/BottomCTA";
import { NetworkStatusEnum } from "../utils/constants";
import { useUIConfig } from "../slices/appContextSlice";
import { useAppSelector } from "../store/hooks";

export const Landing = () => {
  const navigate = useNavigate();

  const { data: appConfig, networkStatus } =
    useAppSelector(useUIConfig);

  if (networkStatus === NetworkStatusEnum.Loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingScreen />
      </div>
    );
  }

  if (
    networkStatus !== NetworkStatusEnum.Loaded ||
    !appConfig
  ) {
    return null;
  }

  return (
    <main
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, ${appConfig.colors.bgColor.primary}, white)`,
      }}
    >
      <div
        className="absolute -left-40 top-0 h-[450px] w-[450px] rounded-full blur-3xl opacity-30"
        style={{ background: appConfig.colors.accentColor }}
      />

      <div
        className="absolute right-0 top-1/2 h-[350px] w-[350px] rounded-full blur-3xl opacity-20"
        style={{ background: "#FDBA74" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <HeroSection
          config={appConfig}
          onGetStarted={() => navigate("/menu")}
          onAskGusto={() => navigate("/gusto")}
        />

        <CategoryPills />

        <FeatureGrid />

        <StatsSection />

        <BottomCTA
          onGetStarted={() => navigate("/menu")}
          onAskGusto={() => navigate("/gusto")}
        />
      </div>
    </main>
  );
};
