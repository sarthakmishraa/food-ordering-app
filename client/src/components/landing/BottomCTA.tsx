import { FaArrowRight, FaRobot } from "react-icons/fa";
import { PrimaryButton } from "../PrimaryButton";

interface BottomCTAProps {
  onGetStarted: () => void;
  onAskGusto: () => void;
}

export const BottomCTA = ({
  onGetStarted,
  onAskGusto,
}: BottomCTAProps) => {
  return (
    <section className="mt-32 pb-20">
      <div
        className="
          rounded-3xl
          border
          border-[color:var(--color-border)]
          bg-[color:var(--color-bg-surface)]
          p-10
          shadow-xl
        "
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-black">
            Ready to launch your ordering platform?
          </h2>

          <p className="mt-5 text-lg leading-8 opacity-70">
            Start building your branded food ordering
            experience today or let Gusto help you get
            started.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <PrimaryButton
              onClick={onGetStarted}
              extraButtonClassNames="px-6 py-3 rounded-xl"
            >
              <div className="flex items-center gap-2">
                Get Started
                <FaArrowRight />
              </div>
            </PrimaryButton>

            <PrimaryButton
              onClick={onAskGusto}
              extraButtonClassNames="px-6 py-3 rounded-xl"
            >
              <div className="flex items-center gap-2">
                <FaRobot />
                Ask Gusto
              </div>
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
};
