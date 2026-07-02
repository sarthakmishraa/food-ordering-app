import { FaArrowRight, FaRobot } from "react-icons/fa";
import { Banner } from "../Banner";
import { Label } from "../Label";
import { PrimaryButton } from "../PrimaryButton";

interface HeroSectionProps {
  config: any;
  onGetStarted: () => void;
  onAskGusto: () => void;
}

export const HeroSection = ({
  config,
  onGetStarted,
  onAskGusto,
}: HeroSectionProps) => {
  return (
    <section className="py-4 text-center">
      <div
        className="inline-flex items-center rounded-full border px-5 py-2 text-sm font-semibold shadow-sm"
        style={{
          background: config.colors.accentColor,
          borderColor: config.colors.borderColor,
        }}
      >
        {config.tagline}
      </div>

      <div className="mt-8">
        <Banner
          label={config.hero.title}
          labelClassNames="text-2xl sm:!text-3xl lg:!text-5xl font-black leading-tight tracking-tight"
        />
      </div>

      <div className="mx-auto mt-8 max-w-3xl">
        <Label
          text={config.hero.description}
          className="text-lg leading-8 md:text-xl"
        />
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <PrimaryButton
          onClick={onGetStarted}
          extraContainerClassNames="rounded-xl"
          extraButtonClassNames="px-6 py-3 rounded-xl"
        >
          <div className="flex items-center gap-2">
            Get Started
            <FaArrowRight />
          </div>
        </PrimaryButton>

        <PrimaryButton
          onClick={onAskGusto}
          extraContainerClassNames="rounded-xl"
          extraButtonClassNames="px-6 py-3 rounded-xl"
        >
          <div className="flex items-center gap-2">
            <FaRobot />
            Ask Gusto
          </div>
        </PrimaryButton>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm font-medium opacity-70">
        <span>Restaurants</span>

        <span>Cafés</span>

        <span>Bakeries</span>

        <span>Cloud Kitchens</span>
      </div>
    </section>
  );
};
